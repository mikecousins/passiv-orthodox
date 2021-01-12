import axios from 'axios';
import { FunctionComponent } from 'react';
import { useQuery } from 'react-query';

type Props = {
  id: number;
  name: string;
}

const Group: FunctionComponent<Props> = ({ id, name }) => {
  const { data } = useQuery(['portfolioGroups', { id }], () =>
    axios.get<any>(`https://api.passiv.com/api/v1/portfolioGroups/${id}/info`)
  );

  return (
    <div className="bg-gray-800 border border-black rounded-lg shadow p-4">
      {data?.data && (
        <>
          <div className="text-xl font-bold">{name}</div>
          <div>{data.data.accuracy}%</div>
        </>
      )}
    </div>
  )
};

export default Group;