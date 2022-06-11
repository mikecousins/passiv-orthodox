import { FunctionComponent } from 'react';

type Props = {
  name: string;
  progress: number;
};

const AccountProgress: FunctionComponent<Props> = ({ name, progress }) => (
  <div className="w-full bg-gray-800">
    <div className="font-bold p-2">{name}</div>
    <div className="bg-white w-full h-1">
      <div
        className="bg-blue-400 h-1"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  </div>
);

export default AccountProgress;
