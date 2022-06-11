import axios from "axios";
import { FunctionComponent } from "react";
import { useMutation, useQueryClient } from "react-query";

type Props = {
  groupId: number;
  trades: any;
};

const Trades: FunctionComponent<Props> = ({ groupId, trades }) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(() => {
    return axios
      .get(`portfolioGroups/${groupId}/calculatedtrades/${trades.id}/impact`)
      .then(() => {
        axios.post(
          `portfolioGroups/${groupId}/calculatedtrades/${trades.id}/placeOrders`
        );
      });
  });
  return (
    <>
      <span className="text-xl font-bold whitespace-nowrap">Trades</span>
      {trades?.trades?.length > 0 ? (
        <button
          className="bg-gray-500 p-2 rounded-xl ml-4 font-bold"
          onClick={() =>
            mutate(undefined, {
              onSuccess: () => queryClient.refetchQueries("portfolioGroups"),
            })
          }
        >
          Allocate
        </button>
      ) : (
        <span className="text-gray-600 ml-4">none</span>
      )}
    </>
  );
};

export default Trades;
