import { useQuery } from "@tanstack/react-query";
import { BiEdit, BiTrashAlt } from "react-icons/bi";
// import data from "../database/data.json";
import { getUsers } from "../lib/helper";
import { deleteAction, toggleForm, updateAction } from "../redux/features/toggleFormSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { User } from "../types/model";

const Table = () => {
  // Queries
  const users = useQuery<User[]>({ queryKey: ["users"], queryFn: getUsers });

  if (users.isLoading) {
    return <div>Employee is Loading...</div>;
  }

  if (users.isError) {
    const error = users.error as Error;
    return <div>Error {error.message}</div>;
  }

  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr className="bg-gray-800">
          <th className="px-16 py-2">
            <span className="text-gray-200">Name</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Email</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Salary</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Birthday</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Status</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-gray-200">
        {users.isSuccess && users.data.map((user, i) => <Tr user={user} key={i} />)}
      </tbody>
    </table>
  );
};

export default Table;

type TrProps = {
  user: User;
};

function Tr({ user }: TrProps) {
  const visible = useAppSelector((state) => state.toggleForm.visible);
  const dispatch = useAppDispatch();

  const onUpdate = async () => {
    if (!visible && user._id) {
      dispatch(toggleForm());
      dispatch(updateAction(user._id));
    }
  };

  const onDelete = () => {
    if (!visible && user._id) {
      dispatch(deleteAction(user._id));
    }
  };

  return (
    <tr className="bg-gray-50 text-center">
      <td className="px-2 py-2">
        <div className="flex flex-row items-center">
          <img src={user.avatar || "#"} alt="" className="h-8 w-8 rounded-full object-cover" />
          <span className="text-center ml-2 font-semibold">{`${user.firstname} ${user.lastname}`}</span>
        </div>
      </td>
      <td className="px-2 py-2">
        <span>{user.email || "Unknown"}</span>
      </td>
      <td className="px-2 py-2">
        <span>{user.salary || "Unknown"}</span>
      </td>
      <td className="px-2 py-2">
        <span>{user.date || "Unknown"}</span>
      </td>
      <td className="px-2 py-2">
        <button className="cursor">
          <span
            className={`${
              user.status == "Active" ? "bg-green-500" : "bg-rose-500"
            } text-white px-5 py-1 rounded-full`}
          >
            {user.status || "Unknown"}
          </span>
        </button>
      </td>
      <td className="px-2 py-2">
        <div className=" flex justify-around items-center gap-5">
          <button
            className="cursor disabled:cursor-not-allowed"
            onClick={onUpdate}
            disabled={visible}
          >
            <BiEdit size={25} color={"rgb(34,197,94)"}></BiEdit>
          </button>
          <button className="cursor" onClick={onDelete}>
            <BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt>
          </button>
        </div>
      </td>
    </tr>
  );
}
