import { QueryClientProvider, QueryClient } from 'react-query';
import Home from './Home';

const queryClient = new QueryClient();

const MyApp = () => (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );

export default MyApp;