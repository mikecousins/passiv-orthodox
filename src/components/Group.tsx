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
    <div className="p-4">
      {data?.data && (
        <>
          <div className="text-xl font-bold whitespace-nowrap">{name}</div>
          <div>Accuracy: {new Intl.NumberFormat('en-CA', { maximumSignificantDigits: 3 }).format(data.data.accuracy)}%</div>
        </>
      )}
    </div>
  )
};

export default Group;