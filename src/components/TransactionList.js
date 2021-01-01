import Axios from "axios";
import { useState } from "react";
import { useMutation } from "react-query";
import { baseUrl } from "../utils/API";
import TransactionItem from "./TransactionItem";
import TransactionModal from "./TransactionModal";

function TransactionList({ transactions, status, refetch }) {
  const [mutate] = useMutation((form) =>
    Axios({
      method: "PATCH",
      url: `${baseUrl}api/v1/transaction/${form.id}`,
      data: { status: form.status },
      headers: {
        Authorization: localStorage.token,
        withCredentials: true,
        "Access-Control-Allow-Origin": "*",
      },
    })
  );

  const handleUpdate = async (status, id) => {
    try {
      const data = { status, id };

      await mutate(data, {
        onSuccess: () => {},
        onError: (error) => {
          console.error(error);
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const [detail, setDetail] = useState({});
  const [modal, setModal] = useState(false);

  const handleModal = (transaction) => {
    setDetail(transaction);
    setModal(!modal);
  };

  return (
    <>
      {modal && (
        <TransactionModal
          refetch={refetch}
          detail={detail}
          handleModal={handleModal}
          status={status}
        />
      )}
      <table className="w-full border-2 border-base rounded-md">
        <tr className="bg-base text-white h-10 rounded-md">
          <th>No</th>
          {status === "my-order" ? <th>Vendor</th> : <th>Client</th>}
          <th>Order</th>
          <th>Start Project</th>
          <th>End Project</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
        {transactions.map((transaction, index) => (
          <TransactionItem
            key={index}
            index={index}
            handleUpdate={handleUpdate}
            transaction={transaction}
            handleModal={handleModal}
            status={status}
          />
        ))}
      </table>
    </>
  );
}

export default TransactionList;
