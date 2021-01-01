import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Header from "../components/Header";
import TransactionList from "../components/TransactionList";
import { API, baseUrl, options } from "../utils/API";

function Transactionpage() {
  const {
    data,
    isError,
    error,
    isLoading,
    refetch,
    isFetching,
  } = useQuery("transactions", () =>
    API.get(`/transactions`, { params: { status: status } }, options)
  );

  const [status, setStatus] = useState("my-offer");

  useEffect(() => {
    refetch();
  }, [status]);

  return (
    <div className="w-full h-screen">
      <Header />
      {isLoading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <FontAwesomeIcon icon={faSpinner} spin size="6x" />
        </div>
      ) : isError ? (
        <div>
          <h1>{error.response.data.message}</h1>
        </div>
      ) : (
        <div className="w-10/12 m-auto h-full">
          <select
            className="w-24 mb-6 h-10 border-2 rounded-md border-base"
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          >
            <option value="my-offer">My Offer</option>
            <option value="my-order">My Order</option>
          </select>
          {isFetching ? (
            <div className="w-full h-screen flex justify-center items-center">
              <FontAwesomeIcon icon={faSpinner} spin size="6x" />
            </div>
          ) : (
            <TransactionList
              transactions={data.data.data.transactions}
              status={status}
              refetch={refetch}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Transactionpage;
