import { FormType } from "../types/form";
import { User } from "../types/model";
const BASE_URL = "http://localhost:3000/";

// all user
export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${BASE_URL}api/users`);
  const json = await response.json();
  return json;
};

// single user
export const getUser = async (userId: string): Promise<User> => {
  const response = await fetch(`${BASE_URL}api/users/${userId}`);
  const json = await response.json();
  return json;
};

// posting a new user
export async function addUser(formData: FormType): Promise<User> {
  const Options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };

  const response = await fetch(`${BASE_URL}api/users`, Options);
  const json = await response.json();
  return json;
}

// Update a new user
export async function updateUser(userId: string, formData: FormType): Promise<User> {
  const Options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };

  const response = await fetch(`${BASE_URL}api/users/${formData._id}`, Options);
  const json = await response.json();
  return json;
}

// // Delete a new user
export async function deleteUser(userId: string): Promise<User | Error | string> {
  const Options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(`${BASE_URL}api/users/${userId}`, Options);
  const json = await response.json();
  return json;
}
