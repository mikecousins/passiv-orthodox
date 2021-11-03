import axios from 'axios';
import { useQuery } from 'react-query';
import { useAuth } from '../hooks/useAuth';
import Group from '../components/Group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Goal from '../components/Goal';

const DashboardPage = () => {
  const { data: groups } = useQuery('portfolioGroups', () =>
    axios.get<any>('portfolioGroups/'),
  );
  const { data: goals } = useQuery('goals', () =>
    axios.get<any>('goals/'),
  );
  const { data: performance } = useQuery('performance', () =>
    axios.get<any>('performance/all/'),
  );
  const { logout } = useAuth();

  let group;
  if (groups && goals && performance) {
    group = groups.data[0];
  }

  return (
    <>
      <div>
        {group ? (
          <Group id={group.id} name={group.name}>
            <Goal goal={goals?.data[0]} performance={performance?.data} />
          </Group>
        ) : (
          <FontAwesomeIcon icon={faSpinner} spin />
        )}
      </div>
      <button onClick={logout} className="text-xs text-gray-600">Logout</button>
    </>
  );
}

export default DashboardPage;