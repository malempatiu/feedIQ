
type AnimatedDotsProps = {
 color?: string,
 dots?: number,
 delayGap?: number
}

const AnimatedDots = ({color = 'bg-blue-600', dots = 3, delayGap = 150}: AnimatedDotsProps) => {
  return (
    <div className='flex justify-center space-x-2'>
      {Array.from({length: dots}, (_,i) => {
        return <AnimatedDot key={i} color={color} delay={i*delayGap} />;
      })}
    </div>
  );
}

const AnimatedDot = ({color, delay}: {color: string, delay: number}) => {
  return (
    <div
      className={`w-2 h-2 ${color} rounded-full animate-bounce`}
      style={{ animationDelay: `${delay}ms` }}
    ></div>
  );
}

export {AnimatedDots};