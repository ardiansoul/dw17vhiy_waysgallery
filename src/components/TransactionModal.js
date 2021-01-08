import React from "react";
import { useMutation } from "react-query";
import { API, options } from "../utils/API";
import { priceFormatter } from "../utils/priceFormatter";

function TransactionModal({ detail, handleModal, refetch, status }) {
  const [mutate] = useMutation(
    () =>
      API.patch(`/transaction/${detail.id}`, { status: "Success" }, options),
    {
      onSuccess: () => {
        handleModal();
        refetch();
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );

  const handleSubmit = async () => {
    try {
      await mutate();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="absolute rounded-md h-64 bg-white border-2 border-base p-4"
      style={{
        width: "500px",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="w-full h-40">
        <h1 className="text-lg font-bold">Title: {detail?.title}</h1>
        <h1 className="text-lg font-bold">
          Description: {detail?.description}
        </h1>
        <h1 className="text-lg font-bold text-green-400 mt-8">
          Price: {priceFormatter(detail?.price)}
        </h1>
      </div>
      <div className="w-full h-16 flex justify-end items-center">
        <button
          className="w-24 h-8 bg-red-600 rounded-md text-white"
          onClick={() => {
            handleModal();
          }}
        >
          Cancel
        </button>
        {detail.status === "Waiting Approve Project" ? (
          <button
            className="w-24 h-8 bg-green-600 rounded-md text-white ml-2"
            onClick={() => {
              handleSubmit();
            }}
          >
            Approve
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default TransactionModal;
