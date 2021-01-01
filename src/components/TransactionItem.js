import {
  faCheckCircle,
  faHourglassStart,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useHistory } from "react-router-dom";

function TransactionItem({
  index,
  transaction,
  handleModal,
  handleUpdate,
  status,
}) {
  const history = useHistory();
  return (
    <tr className="h-12 text-center">
      <td>{index + 1}</td>
      {status === "my-order" ? (
        <td>{transaction.orderTo.fullName}</td>
      ) : (
        <td>{transaction.orderBy.fullName}</td>
      )}
      <td
        onClick={() => {
          handleModal(transaction);
        }}
      >
        {transaction.title}
      </td>
      <td>{moment(transaction.startDate).format("DD MMMM YYYY")}</td>
      <td>{moment(transaction.endDate).format("DD MMMM YYYY")}</td>
      {status === "my-order" &&
      transaction.status === "Waiting Approve Project" ? (
        <td className="font-bold text-md text-blue-400">Project Complete</td>
      ) : (
        <td
          className={`font-bold text-md ${
            transaction.status === "Waiting Approve"
              ? "text-yellow-400"
              : transaction.status === "Waiting Project"
              ? "text-yellow-400"
              : status === "my-order" &&
                transaction.status === "Waiting Approve Project"
              ? "text-blue-400"
              : status === "my-order" &&
                transaction.status === "Project Complete"
              ? "text-blue-400"
              : status === "my-offer" &&
                transaction.status === "Waiting Approve Project"
              ? "text-blue-400"
              : status === "my-offer" &&
                transaction.status === "Waiting Project"
              ? "text-blue-400"
              : status === "my-offer" &&
                transaction.status === "Project Complete"
              ? "text-blue-400"
              : transaction.status === "Success"
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          {transaction.status}
        </td>
      )}
      <td>
        {status === "my-offer" && transaction.status === "Waiting Approve" ? (
          <>
            <button
              className="w-24 h-8 bg-red-400 mr-2 rounded-md text-white"
              onClick={() => {
                handleUpdate("Cancel", transaction.id);
              }}
            >
              Cancel
            </button>
            <button
              className="w-24 h-8 bg-green-400 rounded-md text-white"
              onClick={() => {
                handleUpdate("Waiting Project", transaction.id);
              }}
            >
              Approve
            </button>
          </>
        ) : transaction.status === "Waiting Approve" ? (
          <FontAwesomeIcon
            icon={faHourglassStart}
            className="text-yellow-400"
          />
        ) : status === "my-offer" &&
          transaction.status === "Waiting Project" ? (
          <button
            className="w-24 h-8 bg-blue-400 text-white rounded-md"
            onClick={() => {
              history.push({
                pathname: "/add-project",
                state: { id: transaction.id },
              });
            }}
          >
            Send Project
          </button>
        ) : transaction.status === "Waiting Project" ? (
          <FontAwesomeIcon
            icon={faHourglassStart}
            className="text-yellow-400"
          />
        ) : status === "my-offer" &&
          transaction.status === "Waiting Approve Project" ? (
          <FontAwesomeIcon
            icon={faHourglassStart}
            className="text-yellow-400"
          />
        ) : status === "my-order" &&
          transaction.status === "Waiting Approve Project" ? (
          <button
            className="w-24 h-8 bg-blue-400 rounded-md text-white"
            onClick={() => history.push(`project/${transaction.project.id}`)}
          >
            View Project
          </button>
        ) : status === "my-order" && transaction.status === "Success" ? (
          <button
            className="w-24 h-8 bg-blue-400 rounded-md text-white"
            onClick={() => history.push(`project/${transaction.project.id}`)}
          >
            View Project
          </button>
        ) : transaction.status === "Success" ? (
          <FontAwesomeIcon icon={faCheckCircle} className="text-green-400" />
        ) : (
          <FontAwesomeIcon icon={faTimesCircle} className="text-red-400" />
        )}
      </td>
    </tr>
  );
}

export default TransactionItem;
