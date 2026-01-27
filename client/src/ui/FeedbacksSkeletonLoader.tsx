const FeedbacksSkeletonLoader = () => {
  return (
    <div className='flex flex-col gap-4'>
      {Array.from({length: 5}, (_, i: number) =>
        <div key={i} className='flex items-center rounded-lg bg-gray-0 px-8 py-7 animate-pulse gap-3'>
          {/* Vote Section */}
          <div className='flex flex-col items-center gap-2 bg-white rounded-xl p-3'>
            <div className='w-4 h-4 bg-indigo-200 rounded'></div>
            <div className='w-10 h-6 bg-indigo-200 rounded-lg'></div>
          </div>

          {/* Content Section */}
          <div className='flex-1 space-y-3'>
            {/* Tag */}
            <div className='inline-block'>
              <div className='h-7 w-28 bg-indigo-200 rounded-lg'></div>
            </div>
            {/* Title */}
            <div className='h-6 bg-indigo-200 rounded-lg w-2/3'></div>

            {/* Description */}
            <div className='h-4 bg-indigo-100 rounded w-4/5'></div>
          </div>

          {/* Comment Count Section */}
          <div className='flex items-center gap-2 bg-white rounded-xl p-3'>
            <div className='w-5 h-5 bg-indigo-200 rounded-full'></div>
            <div className='h-5 w-6 bg-indigo-200 rounded'></div>
          </div>
        </div>
      )}
    </div>
  );
}

export {FeedbacksSkeletonLoader};