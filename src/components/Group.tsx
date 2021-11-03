import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { FunctionComponent } from 'react';
import { useQuery } from 'react-query';
import Trades from './Trades';

type Props = {
  id: number;
  name: string;
}

const Group: FunctionComponent<Props> = ({ id, name, children }) => {
  const { data } = useQuery(['portfolioGroups', { id }], () =>
    axios.get<any>(`portfolioGroups/${id}/info`)
  );
  console.log(data);

  return (
    <>
      {data?.data ? (
        <>
          <div className="text-4xl font-bold whitespace-nowrap">{name}</div>
          {children}
          <div>Accuracy: {new Intl.NumberFormat('en-CA', { maximumSignificantDigits: 3 }).format(data.data.accuracy)}%</div>
          <div>Cash: {new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(data.data.balances.find((balance: any) => balance.currency.code === 'CAD').cash)}</div>
          <Trades groupId={id} trades={data.data.calculated_trades} />
        </>
      ) : (
        <FontAwesomeIcon icon={faSpinner} spin />
      )}
    </>
  )
};

export default Group;