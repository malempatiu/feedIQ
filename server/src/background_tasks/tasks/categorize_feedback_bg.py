from inngest import TriggerEvent, Context
from src.background_tasks.client import inngest_client
from src.feeds.dtos import FeedbackCreateDTO
from pydantic import BaseModel
from src.feeds.factory import get_feeds_service

class FeedbackCategorizeEvent(BaseModel):
    id: int
    title: str
    detail: str


@inngest_client.create_function(
    fn_id="categorize_feedback",
    trigger=TriggerEvent(event="feedback/categorize"),
    retries=2
)
async def categorize_feedback_background(ctx: Context):
    try:
        event = FeedbackCategorizeEvent.model_validate(ctx.event.data)
        ctx.logger.info(f"Processing categorization for feedback {event.id}")

        async with get_feeds_service() as (feeds_service, session):
            dto = FeedbackCreateDTO(title=event.title, detail=event.detail)
            async def categorize():
                return await feeds_service.categorize_feedback(
                    id=event.id,
                    dto=dto
                )
            result = await ctx.step.run("categorize", categorize)
            ctx.logger.info(f"Successfully categorized feedback {event.id}")
            return {"success": True, "feedback_id": event.id, "result": result}
    except ValueError as e:
        ctx.logger.error(f"Invalid event data: {e}")
        return {"error": "Invalid event data"}
    except Exception as e:
        ctx.logger.error(
            f"Failed to categorize feedback: {str(e)}",
            exc_info=True
        )
        raise  # Let Inngest handle retry
