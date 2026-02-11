import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppWrapper } from "./ui/AppWrapper";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import { useCurrentUser } from "@/shared/useCurrentUser";
import { LoadingFallback } from "@/ui/LoadingFallback";


const queryClient = new QueryClient();

const AuthenticatedApp = lazy(() => import("./routes/AuthenticatedRoutes"));
const UnAuthenticatedApp = lazy(() => import("./routes/UnAuthenticatedRoutes"));

const AppWithProviders = () => {
  return (
    <AppWrapper>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster
          position='top-center'
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "#FFFFFF",
              color: "#21214D",
            },
          }}
        />
      </QueryClientProvider>
    </AppWrapper>
  );
};


const App = () => {
  const { isLoading, isAuthenticated } = useCurrentUser();
  if (isLoading)
    return (
      <LoadingFallback />
    );
  return (
    <Suspense fallback={<LoadingFallback />}>
      {isAuthenticated ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
    </Suspense>
  );
};

export { AppWithProviders };
