import { AuthPage } from "@features/users/AuthPage";
import { Login } from "@features/users/components/Login";
import { Register } from "@features/users/components/Register";
import { Navigate, Outlet, Route, Routes } from "react-router";

const AuthLayout = () => {
  return (
    <AuthPage>
      {/* will either be <Login/> or <SignUp /> */}
      <Outlet />
    </AuthPage>
  );
};

const UnAuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/auth/login' replace />} />
      <Route path='*' element={<Navigate to='/auth/login' replace />} />
      <Route path='auth' element={<AuthLayout />}>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='*' element={<Login />} />
      </Route>
    </Routes>
  );
};

export default UnAuthenticatedRoutes;
