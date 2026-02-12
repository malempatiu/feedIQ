import { Logo } from "./Logo";

const Header = ({children}: {children: React.ReactNode}) => {
  return (
    <header className='flex flex-row items-center justify-between py-4 px-8 bg-white shadow-sm'>
      <Logo />
      {children}
    </header>
  );
}

export {Header}