import type { NextApiRequest, NextApiResponse } from "next";
import connectionDb from "../../../database/connectionDb";
import UserController from "../../../controller/userController";
// type Data = {
//   name: string;
// };

// type Error = {
//   status: number;
//   error: string;
//   message: string;
// };

// export type ctx = {
//   req: NextApiRequest;
//   res: NextApiResponse;
// };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectionDb().catch((err) =>
    res.status(500).json({ status: 500, error: "Internal Server Error", message: err })
  );
  // get, post , patch, delete
  const { method } = req;
  const controller = new UserController();

  switch (method) {
    case "GET":
      await controller.getUsers(req, res);
      break;
    case "POST":
      await controller.createUser(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
