import { useState } from "react";
import { Logo } from "../../ui/Logo";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

export default function Auth() {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4'>
      <div className='bg-white rounded-2xl shadow-xl w-full max-w-md p-8'>
        <Logo />

        {isLogin ? <Login onToggle={toggleForm} /> : <Register onToggle={toggleForm} />}
      </div>
    </div>
  );
}
