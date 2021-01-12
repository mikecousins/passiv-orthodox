import axios from 'axios';
import { useQuery } from 'react-query';
import { useAuth } from '../hooks/useAuth';
import Group from '../components/Group';

const DashboardPage = () => {
  const { data } = useQuery('portfolioGroups', () =>
    axios.get<any>('https://api.passiv.com/api/v1/portfolioGroups/')
  );
  const { logout } = useAuth();

  console.log(data);

  return (
    <>
      <div className="flex gap-2 w-64">
        {data?.data && data.data.map((group: any) => <Group id={group.id} name={group.name} key={group.id} />)}
      </div>
      <button onClick={logout} className="text-xs text-gray-600">Logout</button>
    </>
  );
}

export default DashboardPage;