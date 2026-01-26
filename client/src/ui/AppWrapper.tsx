const AppWrapper = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='min-h-screen bg-gray-200'>
      {children}
    </div>
  )
}

export {AppWrapper};