import DetectiveLogo from '../../../assets/Detective.svg';

const NoFeedbacks = () => {
  return (
    <div className='flex flex-col items-center justify-center rounded-lg bg-gray-0 min-h-96 py-28 px-8'>
      <div className='flex flex-col gap-10 items-center justify-center'>
        <DetectiveLogo />
        <div className='flex flex-col gap-2 items-center justify-center'>
          <h2 className='font-bold text-2xl text-slate-600'>There is no feedback yet.</h2>
          <div className="text-center">
            <p className='text-base text-slate-400 font-light leading-relaxed'>
              Got a suggestion? Found a bug that needs to be squashed?
            </p>
            <p className='text-base text-slate-400 font-light'>
              We love hearing about new ideas to improve our app.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export {NoFeedbacks}