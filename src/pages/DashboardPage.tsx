import axios from 'axios';
import { useQuery } from 'react-query';

const DashboardPage = () => {
  const { data } = useQuery('repoData', () =>
    axios.get<any>('https://api.passiv.com/api/v1/portfolioGroups/')
  );

  return (
    <div>
      Dashboard
      {data?.data && data.data.map((group: any) => <div>{group.name}</div>)}
    </div>
  );
}

export default DashboardPage;