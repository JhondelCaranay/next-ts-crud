import type { NextApiRequest, NextApiResponse } from "next";
import connectionDb from "../../../database/connectionDb";
import UserController from "../../../controller/userController";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectionDb().catch((err) =>
    res.status(500).json({ status: 500, error: "Internal Server Error", message: err })
  );

  // get, post , patch, delete
  const { method } = req;
  const controller = new UserController();

  switch (method) {
    case "GET":
      await controller.getUser(req, res);
      break;

    case "PUT":
      await controller.updateUser(req, res);
      break;
    case "DELETE":
      await controller.deleteUser(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
