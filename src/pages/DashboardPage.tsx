import axios from 'axios';
import { useQuery } from 'react-query';
import { useAuth } from '../hooks/useAuth';
import Group from '../components/Group';
import Goal from '../components/Goal';
import Trades from '../components/Trades';

const DashboardPage = () => {
  const { data: groups } = useQuery('portfolioGroups', () =>
    axios.get<any>('https://api.passiv.com/api/v1/portfolioGroups/'),
  );
  const { data: goals } = useQuery('goals', () =>
    axios.get<any>('https://api.passiv.com/api/v1/goals/'),
  );
  const { data: performance } = useQuery('performance', () =>
    axios.get<any>('https://api.passiv.com/api/v1/performance/all/'),
  );
  const { logout } = useAuth();

  console.log(goals);

  return (
    <>
      <div className="bg-gray-800 shadow overflow-hidden rounded-md">
        <ul role="list" className="divide-y divide-gray-900">
          {goals?.data && goals?.data.length > 0 && (
            <Goal goal={goals.data[0]} key={goals.data[0].id} performance={performance?.data} />
          )}
          <li className="flex gap-2 gap-gray-900 flex-col sm:flex-row">
            {groups?.data && groups.data.map((group: any) => <Group id={group.id} name={group.name} key={group.id} />)}
          </li>
          <Trades />
        </ul>
      </div>
      <button onClick={logout} className="text-xs text-gray-600">Logout</button>
    </>
  );
}

export default DashboardPage;