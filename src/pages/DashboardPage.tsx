import axios from 'axios';
import { useQuery } from 'react-query';
import { useAuth } from '../hooks/useAuth';

const DashboardPage = () => {
  const { data } = useQuery('repoData', () =>
    axios.get<any>('https://api.passiv.com/api/v1/portfolioGroups/')
  );
  const { logout } = useAuth();

  return (
    <div>
      Dashboard
      {data?.data && data.data.map((group: any) => <div>{group.name}</div>)}
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default DashboardPage;