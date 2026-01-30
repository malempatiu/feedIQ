import { Navigate, Outlet, Route, Routes } from "react-router";

const AuthenticatedAppLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

const AuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/feedIQ/feedbacks' replace />} />
      <Route path='*' element={<Navigate to='/feedIQ/feedbacks' replace />} />
      <Route path='feedIQ' element={<AuthenticatedAppLayout />}>
        <Route path='feedbacks' element={<div>Home</div>} />
        <Route path='feedbacks/:id' element={<div>detail</div>} />
      </Route>
    </Routes>
  );
};

export default AuthenticatedRoutes;
