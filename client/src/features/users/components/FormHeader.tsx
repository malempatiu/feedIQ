type FormHeaderProps = {
  heading: string;
  text: string;
}

const FormHeader = ({heading, text}: FormHeaderProps) => {
  return (
    <div className='text-center mb-4'>
      <h2 className='text-2xl font-bold text-gray-800 mb-2'>{heading}</h2>
      <p className='text-gray-600'>{text}</p>
    </div>
  );
}

export {FormHeader};