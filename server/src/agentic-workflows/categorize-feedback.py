import asyncio
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI
from langgraph.graph import END, START, StateGraph
from langgraph.types import Command
from pydantic import BaseModel, Field
from src.config import get_settings
from typing import TypedDict

settings = get_settings()

model: ChatOpenAI | None = None

def get_model():
    global model
    if not settings.OPENAI_API_KEY:
        raise ValueError('OPENAI_API_KEY key is missing')

    if model is not None: 
        return model
    
    # do stuff here
    model = ChatOpenAI(model="gpt-4o-mini", api_key=settings.OPENAI_API_KEY)
    return model

class GeneratorState(BaseModel):
    category: str = Field(description='LLM generated category for user given feedback')
    reason: str = Field(description='LLM generated reason why category belong to the user given feedback')

class EvaluationState(BaseModel):
    feedback: str = Field(description='Actionable feedback explains why LLM generated category is not related to user given feedback')
    is_categorized_correctly: bool = Field(description='A flag to represent whether LLM generated category is correct or not')


class State(TypedDict):
    title: str
    detail: str
    num_reviews: int
    generation: GeneratorState
    evaluation: EvaluationState



async def category_generator(state: State):
    messages = [SystemMessage(content="""You are an AI assistant that categorizes user feedback for a SaaS application.
    Your Task:
     Analyze the user’s feedback and select exactly one category from the list below. 
     Then provide a short, factual reason explaining why the feedback belongs to that category.

    Allowed Categories: 
    You must choose one and only one of the following values:
    UI, UX, Bug, Feature, Enhancement, Performance, Documentation, Other.

    Output Format:
    You must always return your response in the following JSON format:
    {
      "category": "<ONE of the allowed categories>",
      "reason": "<Brief explanation of why the feedback fits this category>"
    }

    Rules:
     - Choose exactly one category.
     - Do not invent new categories.
     - Do not suggest solutions or opinions.
     - Always return valid JSON.
    """),
                HumanMessage(content=f"Categorize the feedback: feedback_title: {state['title']}, feedback_detail: {state['detail']}")
    ]
    
    llm_structured = get_model().with_structured_output(GeneratorState)
    response = await llm_structured.ainvoke(messages)
    return {'generation': response}

async def category_evaluator(state: State):
    messages = [SystemMessage(content="""You are an AI assistant responsible for evaluating the correctness of feedback categorization for a SaaS application.
    Inputs You Will Receive:
    You will be given:
     - User feedback (raw text written by the user)
     - A proposed category
     - A proposed reason explaining the categorization

    Your Task
     - Determine whether the proposed category accurately represents the user feedback.
     - Verify that the reason logically supports the chosen category.
     - Be strict but fair — minor wording issues in the reason are acceptable if the category is correct.                       
     
    Allowed Categories: 
    You must choose one and only one of the following values:
    UI, UX, Bug, Feature, Enhancement, Performance, Documentation, Other.

    Evaluation Criteria:
    Mark the categorization as correct if:
     - The chosen category is the best possible fit for the feedback.
     - The reason is consistent with the feedback and category.
    Mark the categorization as incorrect if:
     - A different category would be clearly more appropriate.
     - The chosen category is misleading or inaccurate.
     - The reason contradicts the feedback or category.
    
    Output Format:
    You must always return a valid JSON object in the following format:
    {
        "is_categorized_correctly": true | false,
        "feedback": "<Only include this field if is_categorized_correctly is false>"
    }
    
    Rules for you:
    - If is_categorized_correctly is true, do not include feedback.
    - If is_categorized_correctly is false, provide clear, actionable feedback explaining:
        - What is wrong with the categorization and why
    - Do not re-categorize.
    - Do not rewrite the original feedback.
    - Do not add opinions or solutions unrelated to categorization.

    You must strictly follow this output format for every response.                        
    """),
    HumanMessage(
        content=f"Evaluate the category: user_feedback_title: {state['title']}, user_feedback_detail: {state['detail']}, proposed_category: {state['generation'].category}, proposed_reason: {state['generation'].reason}"
    )
    ]

    llm_structured = get_model().with_structured_output(EvaluationState)
    response = await llm_structured.ainvoke(messages)
    return {'evaluation': response, "num_reviews": state.get('num_reviews', 0) + 1}


async def category_fixer(state: State):
    messages = [SystemMessage(content="""You are an AI assistant responsible for fixing incorrect feedback categorizations for a SaaS application.
    Inputs You Will Receive:
    You will be given:
    - Original user feedback (raw text)
    - Evaluator feedback explaining why the previous categorization was incorrect
    
    Your Task:
    - Re-analyze the original user feedback.
    - Carefully follow the evaluator’s guidance.
    - Produce a corrected categorization that best fits the feedback.

    Allowed Categories: 
    You must choose one and only one of the following values:
    UI, UX, Bug, Feature, Enhancement, Performance, Documentation, Other.

    Output Format:
    You must always return your response in the following JSON format:
    {
      "category": "<ONE of the allowed categories>",
      "reason": "<Brief explanation of why the feedback fits this category>"
    }

    Rules:
    - Choose exactly one category.
    - Do not invent new categories or modify categories names.
    - The reason must clearly justify the chosen category based on the user feedback.
    - Do not suggest solutions or opinions.
    - Always return valid JSON.
    
    Priority:
    If there is any conflict:
    - Evaluator feedback takes precedence
    - Original user feedback is the source of truth for meaning
    
    You must strictly follow these instructions for every response.
    """),
    HumanMessage(
        content=f"Categorize the feedback: feedback_title: {state['title']}, feedback_detail: {state['detail']}, evaluator_feedback: {state['evaluation'].feedback}"
    )
    ]

    llm_structured = get_model().with_structured_output(GeneratorState)
    response = await llm_structured.ainvoke(messages)
    return {'generation': response}

async def route_category(state: State):
    evaluation = state.get('evaluation', None)
    num_reviews = state.get('num_reviews', 0)
    if evaluation and not evaluation.is_categorized_correctly and num_reviews < 3:
        return "Rejected + Feedback"
    return "Accepted"


async def generate_category_dispatch(state: State) -> dict:
    if "evaluation" in state and not state['evaluation'].is_categorized_correctly:
        return await category_fixer(state)
    else:
        return await category_generator(state)

feedback_categorize_builder = StateGraph(State)

# nodes
feedback_categorize_builder.add_node('category_generator', generate_category_dispatch)
feedback_categorize_builder.add_node('category_evaluator', category_evaluator)

#edges
feedback_categorize_builder.add_edge(START, 'category_generator')
feedback_categorize_builder.add_edge('category_generator', 'category_evaluator')
feedback_categorize_builder.add_conditional_edges(
    'category_evaluator', 
    route_category,
    {
        "Accepted": END,
        "Rejected + Feedback": "category_generator",
    }
)

async def categorize_feedback(title: str, detail: str):
    optimizer_workflow = feedback_categorize_builder.compile()
    print(optimizer_workflow.get_graph().draw_mermaid())
    print(await optimizer_workflow.ainvoke(
        Command(
            update={
                'title': 'Add tags for solutions', 
                'detail': 'Easier to search for solutions based on a specific stack.'
                }
        ))
    )
    


if __name__ == '__main__':
    asyncio.run(categorize_feedback('',''))
