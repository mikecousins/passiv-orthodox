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
    <div className="bg-gray-900 h-screen text-gray-300 flex flex-col">
      <div className="flex-1" />
      <div className="max-w-7xl mx-auto">
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
      </div>
      <div className="flex-1" />
    </div>
  );
}

export default App;
