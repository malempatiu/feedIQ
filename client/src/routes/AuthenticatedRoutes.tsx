import { Feedbacks } from "@features/feedbacks/Feedbacks";
import { Navigate, Outlet, Route, Routes } from "react-router";

const AuthenticatedLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

const AuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthenticatedLayout />}>
        <Route path='feedbacks' element={<Feedbacks />} />
        <Route path='feedbacks/:id' element={<div>Detail</div>} />
      </Route>
      <Route path='*' element={<Navigate to='/feedbacks' replace />} />
    </Routes>
  );
};

export default AuthenticatedRoutes;
