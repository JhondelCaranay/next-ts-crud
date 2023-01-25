import { useEffect, useReducer, useState } from "react";
import { BiBrush } from "react-icons/bi";
import { FormType } from "../types/form";
import { Debug, Success } from "./";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUser, updateUser } from "../lib/helper";
import { User } from "../types/model";

const initialState: FormType = {
  _id: "",
  firstname: "",
  lastname: "",
  avatar: "",
  email: "",
  salary: 0,
  status: "",
  date: "",
};

const formReducer = (state: FormType, event: React.ChangeEvent<HTMLInputElement>) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

type UpdateUserProps = {
  userId: string;
};

const UpdateUser = ({ userId }: UpdateUserProps) => {
  // Access the client
  const queryClient = useQueryClient();

  const user = useQuery({
    queryKey: ["users", userId],
    queryFn: () => getUser(userId),
    onSuccess: (data: User) => {
      Object.assign(initialState, {
        _id: data._id,
        firstname: data.firstname,
        lastname: data.lastname,
        avatar: data.avatar,
        email: data.email,
        salary: data.salary,
        status: data.status,
        date: data.date,
      });
    },
    // The query will not execute until the userId exists
    enabled: !!userId,
  });

  const updateUserMutation = useMutation({
    mutationFn: (newData: FormType) => updateUser(userId, newData),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["users"]);
    },
  });

  const [formData, setFormData] = useReducer(formReducer, initialState);
  const [errors, setErrors] = useState<String[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isError = false;
    if (formData.firstname === "") {
      setErrors((errors) => [...errors, "First name is required"]);
      isError = true;
    }
    if (formData.lastname === "") {
      setErrors((errors) => [...errors, "Last name is required"]);
      isError = true;
    }
    if (formData.email === "") {
      setErrors((errors) => [...errors, "Email name is required"]);
      isError = true;
    }
    if (formData.salary <= 0) {
      setErrors((errors) => [...errors, "Salary name is required"]);
      isError = true;
    }
    if (formData.date === "") {
      setErrors((errors) => [...errors, "Date name is required"]);
      isError = true;
    }
    if (formData.status === "") {
      setErrors((errors) => [...errors, "Status name is required"]);
      isError = true;
    }

    if (!isError && user.isSuccess) {
      updateUserMutation.mutate({
        ...formData,
      });
    }
  };

  if (updateUserMutation.isSuccess) return <Success message={"Updated Successfully"} />;

  const { firstname, lastname, avatar, email, salary, status, date } = user.data ?? initialState;

  if (user.isLoading) return <div>Loading...!</div>;
  if (user.isError) return <div>Error</div>;

  return (
    <>
      <Debug data={formData} width="w-4/6" />
      {Boolean(errors.length) && (
        <div
          className="w-4/6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-3 rounded relative"
          role="alert"
        >
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
          <div
            className="absolute top-0 bottom-0 right-0 px-4 py-3 font-extrabold text-lg cursor-pointer hover:text-red-500"
            onClick={() => setErrors([])}
          >
            X
          </div>
        </div>
      )}
      <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
        <div className="group">
          <input
            onChange={setFormData}
            defaultValue={firstname}
            type="text"
            name="firstname"
            placeholder="First name"
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
          />
        </div>
        <div className="group">
          <input
            onChange={setFormData}
            defaultValue={lastname}
            type="text"
            name="lastname"
            placeholder="Last name"
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
          />
        </div>
        <div className="group">
          <input
            onChange={setFormData}
            defaultValue={email}
            autoComplete="off"
            type="email"
            name="email"
            placeholder="Email"
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
          />
        </div>
        <div className="group">
          <input
            onChange={setFormData}
            defaultValue={salary}
            type="text"
            name="salary"
            placeholder="Salary"
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
          />
        </div>

        <div className="group">
          <input
            onChange={setFormData}
            defaultValue={date}
            type="date"
            name="date"
            placeholder="Date"
            className="border px-5 py-3 focus:outline-none rounded-md"
          />
        </div>

        <div className="checkbox flex gap-10 items-center">
          <div className="group">
            <input
              onChange={setFormData}
              defaultChecked={status == "Active"}
              type="radio"
              id="radio-active"
              name="status"
              value="Active"
              className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            />
            <label htmlFor="radio-active">Active</label>
          </div>
          <div className="group">
            <input
              onChange={setFormData}
              defaultChecked={status !== "Active"}
              type="radio"
              id="radio-inactive"
              name="status"
              value="Inactive"
              className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            />
            <label htmlFor="radio-active">Inactive</label>
          </div>
        </div>

        <button
          className="flex justify-center text-md w-2/6 bg-green-500 text-white py-4 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500 transition duration-200"
          disabled={Boolean(errors.length)}
        >
          Update
          <BiBrush size={24} />
        </button>
      </form>
    </>
  );
};
export default UpdateUser;
