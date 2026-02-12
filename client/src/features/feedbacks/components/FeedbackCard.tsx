import {ChevronUp, MessageCircle} from 'react-feather';

type Feedback = {
  id: number;
  title: string;
  detail: string;
  category: string;
  votes: number;
  commentsCount: number
}

const FeedbackCard = ({feedback}: {feedback: Feedback}) => {
  return (
    <div className='rounded-lg bg-gray-0 px-8 py-7'>
      <div className='md:hidden flex flex-col gap-4'>
        <ContentWrapper>
          <Category category={feedback.category} />
          <Content title={feedback.title} detail={feedback.detail} />
        </ContentWrapper>
        <div className='flex flex-row justify-between items-center'>
          <Voting votes={feedback.votes} />
          <CommentsCount count={feedback.commentsCount} />
        </div>
      </div>
      <div className='hidden md:flex flex-row gap-8'>
        <Voting votes={feedback.votes} />
        <ContentWrapper>
          <Category category={feedback.category} />
          <Content title={feedback.title} detail={feedback.detail} />
        </ContentWrapper>
        <CommentsCount count={feedback.commentsCount} />
      </div>
    </div>
  );
}

const Voting = ({votes}: {votes: number}) => {
  return (
    <div className="
      flex 
      flex-row
      md:flex-col
      gap-2
      md:gap-0
      justify-center 
      self-start
      items-center
      min-w-16 
      md:min-w-10
      px-3.5
      py-1.5 
      md:py-3.5
      md:px-0 
      bg-gray-400 
      rounded-lg
    ">
      <div>
        <ChevronUp color='#4661E6' />
      </div>
      <div>
        <span className='text-sm font-bold text-slate-800'>{votes}</span>
      </div>
    </div>
  )
}

const Category = ({category}: {category: string}) => {
  return (
    <div className='flex flex-row justify-center items-center rounded-lg bg-gray-400 px-4 py-1.5 w-fit'>
      <span className='text-sm text-blue-600 font-semibold'>{category}</span>
    </div>
  );
}

const ContentWrapper = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='flex flex-col gap-3 flex-1'>
      {children}
    </div>
  )
}

const Content = ({title, detail}: {title: string, detail: string}) => {
  return (
    <div className='flex flex-col gap-1.5'>
      <p className='text-lg text-slate-800 font-bold'>{title}</p>
      <p className='text-base text-slate-400 font-normal'>{detail}</p>
    </div>
  );
}

const CommentsCount = ({count}: {count: number}) => {
  return (
    <div className='flex flex-row items-center justify-center gap-2 self-center'>
      <div>
        <MessageCircle color='#CDD2EE' />
      </div>
      <span className='text-slate-800 font-bold text-base'>
        {count}
      </span>
    </div>
  );
}


export {FeedbackCard};