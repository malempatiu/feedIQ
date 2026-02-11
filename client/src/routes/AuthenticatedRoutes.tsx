import { Feedbacks } from "@/features/feedbacks/Feedbacks";
import { useLogout } from "@/shared/useLogout";
import { Button } from "@/ui/Button";
import { Navigate, Outlet, Route, Routes } from "react-router";

const AuthenticatedLayout = () => {
  const {logout} = useLogout();
  return (
    <div>
      <Outlet />
      <Button variant='text' onClick={() => logout()}>
        Logout
      </Button>
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
