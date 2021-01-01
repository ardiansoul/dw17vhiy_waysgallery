import React from "react";

function DetailModal({ detail, setShowModal, handleButton, status }) {
  return (
    <div
      className="absolute border-4 p-4 border-base bg-white rounded-md shadow-2xl"
      style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        height: "300px",
        width: "500px",
        // cursor: "pointer",
      }}
      // onClick={() => setShowModal(false)}
    >
      <div
        className="w-full"
        style={{
          height: "200px",
        }}
      >
        <h1 className="font-bold text-lg mb-10">title: {detail.title}</h1>
        <h1 className="font-bold text-lg mb-10">
          description: {detail.description}
        </h1>
        <h1 className="font-bold text-lg mb-10">price: {detail.price}</h1>
      </div>
      <div
        className="w-full flex justify-end"
        style={{
          height: "100px",
        }}
      >
        <button
          className="w-24 h-8 bg-red-600 mr-4 text-white rounded-md"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </button>
        {status === "my-order" ? (
          <button
            className="w-24 h-8 bg-base text-white rounded-md"
            onClick={() => {
              handleButton("Success", detail.id);
              setShowModal(false);
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

export default DetailModal;
