type LoadingFallbackProps = {
  message?: string;
}

const LoadingFallback = ({ message = "Loading FeedIQ..." }: LoadingFallbackProps) => {
  return (
    <div className='min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4'>
      <div className='text-center'>
        {/* Animated Logo */}
        <div className='flex justify-center mb-6'>
          <div className='relative'>
            {/* Spinning outer ring */}
            <div className='absolute inset-0 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin w-20 h-20'></div>

            {/* Logo in center */}
            <div className='relative flex items-center justify-center w-20 h-20'>
              <div className='bg-linear-to-br from-blue-600 to-indigo-600 rounded-xl p-2 shadow-lg'>
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

              {/* AI Sparkle */}
              <div className='absolute -top-1 -right-1 bg-linear-to-r from-purple-500 to-pink-500 rounded-full p-1 animate-pulse'>
                <svg
                  className='w-3 h-3 text-white'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Brand name */}
        <h1 className='text-3xl font-bold text-gray-800 mb-2'>
          Feed
          <span className='bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
            IQ
          </span>
        </h1>

        {/* Loading message */}
        <p className='text-gray-600 mb-4'>{message}</p>

        {/* Animated dots */}
        <div className='flex justify-center space-x-2'>
          <div
            className='w-2 h-2 bg-blue-600 rounded-full animate-bounce'
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className='w-2 h-2 bg-blue-600 rounded-full animate-bounce'
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className='w-2 h-2 bg-blue-600 rounded-full animate-bounce'
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export {LoadingFallback};
