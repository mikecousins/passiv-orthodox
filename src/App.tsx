import { QueryClient, QueryClientProvider } from 'react-query';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import MarketingPage from './pages/MarketingPage';
import TwoFactorPage from './pages/TwoFactorPage';

const App = () => {
  const queryClient = new QueryClient();

  return (
    <div className="bg-gray-900 h-screen text-gray-300 flex flex-col">
      <div className="flex-1" />
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <QueryClientProvider client={queryClient}>
          <Router>
            <Routes>
              <Route path="/" element={<MarketingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/2fa" element={<TwoFactorPage />} />
              <Route path="/dashboard" element={(
                  <RequireAuth>
                    <DashboardPage />
                  </RequireAuth>
                )}
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Router>
        </QueryClientProvider>
      </div>
      <div className="flex-1" />
    </div>
  );
}

export default App;
