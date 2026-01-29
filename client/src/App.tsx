import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppWrapper } from "./ui/AppWrapper";
import { Toaster } from "react-hot-toast";
import Auth from "./features/users/AuthPage";


const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppWrapper>
            <Auth />
      </AppWrapper>
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
  );
};

export { App };
