import { FunctionComponent } from 'react';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

type Props = {
  goal: any;
  performance: any;
}

const Goal: FunctionComponent<Props> = ({ goal, performance }) => {
  const monthlyTarget = goal.contribution_target;
  const lastYearContributions = performance?.contributions1Y?.contributions;
  const percentageOfTarget = lastYearContributions / (monthlyTarget * 12);
  const onTrack = percentageOfTarget > 1;
  const totalTarget = goal.total_value_target;
  
  return (
    <div className="p-4">
      {goal && (
        <li>
          <div>
            <span className={clsx(
              'text-xl font-bold whitespace-nowrap',
              onTrack ? 'text-green-400' : 'text-red-200',
            )}>
              {onTrack ? 'On Track' : 'Off Track'}
              &nbsp;
              <span title={`$${lastYearContributions} / $${monthlyTarget * 12} last year`}>
                [{new Intl.NumberFormat('en-CA', { maximumSignificantDigits: 3 }).format(percentageOfTarget * 100)}%]
              </span>
            </span>
            <span className="text-gray-600"> for ${totalTarget}</span>
          </div>
          {performance.contributionTimeframe1Y.map(((month: any) => (
              <span
                className={clsx(
                  'pr-2',
                  month.value >= monthlyTarget ? 'text-green-200' : 'text-red-200',
                )}
                title={`$${month.value} / $${monthlyTarget}`}
              >
                {month.value >= monthlyTarget ? <FontAwesomeIcon icon={faCheckCircle} /> : <FontAwesomeIcon icon={faTimesCircle} />}
              </span>
            )))}
        </li>
      )}
    </div>
  );
}

export default Goal;

