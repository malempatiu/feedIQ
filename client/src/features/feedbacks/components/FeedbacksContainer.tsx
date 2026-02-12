const FeedbacksContainer = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="flex flex-col gap-5 mx-6 lg:mx-0">
      {children}
    </div>
  )
}

export {FeedbacksContainer}