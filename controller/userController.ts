import { NextApiRequest, NextApiResponse } from "next";
import { MongoError } from "mongodb";
import Users from "../model/User";

export default class UserController {
  async getUsers(req: NextApiRequest, res: NextApiResponse) {
    try {
      const users = await Users.find().sort({
        createdAt: "desc",
      });
      res.status(200).json(users);
    } catch (error) {
      if (error instanceof MongoError) {
        res.status(404).json({ message: "Error While Fetching Data" });
      }
    }
  }

  async getUser(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { id } = req.query;
      const user = await Users.findById(id);

      if (!user) {
        return res.status(404).json({ message: "User Not Found" });
      }

      res.status(200).json(user);
    } catch (error) {
      if (error instanceof MongoError) {
        res.status(404).json({ message: "Error While Fetching Data" });
      }
    }
  }

  async createUser(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { firstname, lastname, avatar, email, salary, date, status } = req.body;
      console.log({ firstname, lastname });

      if (!firstname || !lastname || !avatar || !email || !salary || !date || !status) {
        return res.status(400).json({ message: "Please Fill All Fields" });
      }

      const user = await Users.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof MongoError) {
        res.status(400).json({ message: "Error While Creating User" });
      }
    }
  }

  async updateUser(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { id } = req.query;
      const { firstname, lastname, avatar, email, salary, date, status } = req.body;

      if (!firstname || !lastname || !avatar || !email || !salary || !date || !status) {
        return res.status(400).json({ message: "Please Fill All Fields" });
      }

      const findUser = await Users.findById(id);

      if (!findUser) {
        return res.status(404).json({ message: "User Not Found" });
      }

      const user = await Users.findByIdAndUpdate(id, req.body);

      res.status(200).json(user);
    } catch (error) {
      if (error instanceof MongoError) {
        res.status(400).json({ message: "Error While Updating User" });
      }
    }
  }

  async deleteUser(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { id } = req.query;
      const findUser = await Users.findById(id);

      if (!findUser) {
        return res.status(404).json({ message: "User Not Found" });
      }

      const user = await Users.findByIdAndDelete(id);

      res.status(200).json(user);
    } catch (error) {
      if (error instanceof MongoError) {
        res.status(400).json({ message: "Error While Deleting User" });
      }
    }
  }
}
