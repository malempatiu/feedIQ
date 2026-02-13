const Logo = () => {
  return (
    <div className='flex items-center justify-center'>
      <div className='flex items-center space-x-3'>
        <div className='relative'>
          <div className='bg-linear-to-br from-blue-600 to-indigo-600 rounded-xl p-2.5 shadow-lg'>
            <svg
              className='w-8 h-8 text-white'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z'
              />
            </svg>
          </div>
          <div className='absolute -top-1 -right-1 bg-linear-to-r from-purple-500 to-pink-500 rounded-full p-1'>
            <svg className='w-3 h-3 text-white' fill='currentColor' viewBox='0 0 20 20'>
              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
            </svg>
          </div>
        </div>
        <div>
          <h1 className='text-2xl font-bold text-gray-800'>
            Feed
            <span className='bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
              IQ
            </span>
          </h1>
          <p className='text-xs text-gray-500 flex items-center gap-1'>
            <svg
              className='w-3 h-3 text-purple-500'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path d='M13 7H7v6h6V7z' />
              <path
                fillRule='evenodd'
                d='M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z'
                clipRule='evenodd'
              />
            </svg>
            AI-Powered Feedback Intelligence
          </p>
        </div>
      </div>
    </div>
  );
};

export {Logo};