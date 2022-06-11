import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { FunctionComponent } from 'react';
import { useQuery } from 'react-query';
import Trades from './Trades';

type Props = {
  id: number;
};

const Group: FunctionComponent<Props> = ({ id }) => {
  const { data } = useQuery(['portfolioGroups', { id }], () =>
    axios.get<any>(`portfolioGroups/${id}/info`)
  );

  return (
    <>
      {data?.data ? (
        <>
          <div className="text-xl font-bold my-4">
            Accuracy:{' '}
            {new Intl.NumberFormat('en-CA', {
              maximumSignificantDigits: 3,
            }).format(data.data.accuracy)}
            %
          </div>
          <div className="text-xl font-bold my-4">
            Cash:{' '}
            {new Intl.NumberFormat('en-CA', {
              style: 'currency',
              currency: 'CAD',
            }).format(
              data.data.balances.find(
                (balance: any) => balance.currency.code === 'CAD'
              ).cash
            )}
          </div>
          <Trades groupId={id} trades={data.data.calculated_trades} />
        </>
      ) : (
        <FontAwesomeIcon icon={faSpinner} spin />
      )}
    </>
  );
};

export default Group;
