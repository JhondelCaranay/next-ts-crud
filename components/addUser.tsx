import { useReducer, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { Debug, Success } from "./";
import { FormType } from "../types/form";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { addUser } from "../lib/helper";

const initialState: FormType = {
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

const AddUser = () => {
  // Access the client
  const queryClient = useQueryClient();

  // Mutations
  const userMutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["users"] });
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

    if (!isError) {
      // alert(JSON.stringify(formData, null, 2));
      userMutation.mutate({
        firstname: formData.firstname,
        lastname: formData.lastname,
        avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 10)}.jpg`,
        email: formData.email,
        salary: formData.salary,
        date: formData.date,
        status: formData.status ?? "Active",
      });
    }
  };

  if (userMutation.isSuccess) return <Success message={"Added Successfully"} />;

  return (
    <>
      <Debug data={formData} width="w-4/6" />
      {Boolean(errors.length) && (
        <div
          className="w-4/6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-3 rounded relative"
          role="alert"
        >
          {userMutation.error instanceof Error ? <p>{userMutation.error.message}</p> : null}
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
            type="text"
            name="firstname"
            placeholder="First name"
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
          />
        </div>
        <div className="group">
          <input
            onChange={setFormData}
            type="text"
            name="lastname"
            placeholder="Last name"
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
          />
        </div>
        <div className="group">
          <input
            onChange={setFormData}
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
            type="text"
            name="salary"
            placeholder="Salary"
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
          />
        </div>

        <div className="group">
          <input
            onChange={setFormData}
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
          Add <BiPlus size={24}></BiPlus>
        </button>
      </form>
    </>
  );
};
export default AddUser;
