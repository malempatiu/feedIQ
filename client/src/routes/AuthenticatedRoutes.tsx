import { Feedbacks } from "@features/feedbacks/Feedbacks";
import { useCurrentUser } from "@shared/useCurrentUser";
import { useLogout } from "@shared/useLogout";
import { Header } from "@ui/Header";
import { Button } from "@ui/interactions/Button";
import { UserAvatar } from "@ui/UserAvatar";
import { LogOut } from "react-feather";
import { Navigate, Outlet, Route, Routes, useSearchParams } from "react-router";

const AuthenticatedLayout = () => {
  const { logout } = useLogout();
  const {user} = useCurrentUser();
  return (
    <div className='flex flex-col gap-2'>
      <Header>
        {user ? (
          <div className='flex flex-row gap-2 items-center'>
            <UserAvatar
              firstName={user.first_name ?? ""}
              lastName={user.last_name ?? ""}
            />
            <Button variant='text' onClick={logout}>
              <LogOut size={16} color='#647196' />
              Logout
            </Button>
          </div>
        ) : null}
      </Header>
      <Outlet />
    </div>
  );
};

const FeedbacksRedirect = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");

  if (!page || !limit) {
    const newParams = new URLSearchParams({
      page: page ?? "0",
      limit: limit ?? "5",
    });
    return <Navigate to={`/feedbacks?${newParams.toString()}`} replace />;
  }

  return <Feedbacks />;
};

const AuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthenticatedLayout />}>
        <Route
          path='feedbacks'
          element={<FeedbacksRedirect />}
        />
        <Route path='feedbacks/:id' element={<div>Detail</div>} />
      </Route>
      <Route path='*' element={<Navigate to='/feedbacks' replace />} />
    </Routes>
  );
};

export default AuthenticatedRoutes;
