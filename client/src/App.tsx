import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppWrapper } from "./ui/AppWrapper";
import { Feedbacks } from "./Feedbacks";


const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppWrapper>
        <Feedbacks />
      </AppWrapper>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export { App };
