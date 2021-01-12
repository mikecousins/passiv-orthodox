import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import SecureRoute from './components/SecureRoute';
import DashboardPage from './pages/DashboardPage';

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <SecureRoute path="/">
            <DashboardPage />
          </SecureRoute>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
