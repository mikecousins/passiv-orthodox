import axios from "axios";
import { FunctionComponent } from "react";
import { useQuery } from "react-query";
import AccountProgress from "./AccountProgress";

type Props = {
  id: number;
};

const AnnualProgress: FunctionComponent<Props> = ({ id }) => {
  const { data } = useQuery(["portfolioGroups", { id }], () =>
    axios.get<any>(`portfolioGroups/${id}/info`)
  );

  return (
    <div>
      <div className="text-xl font-bold my-4">Annual Progress</div>
      <div className="flex flex-col gap-2">
        {data?.data.accounts
          .filter(
            (account: any) =>
              account.name.includes("RRSP") || account.name.includes("TFSA")
          )
          .map((account: any) => (
            <AccountProgress
              name={account.name}
              progress={0.4}
              key={account.id}
            />
          ))}
      </div>
    </div>
  );
};

export default AnnualProgress;
