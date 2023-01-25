// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import connectionDb from "../../database/connectionDb";
type Data = {
  name: string;
};

type Error = {
  status: number;
  error: string;
  message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data | Error>) {
  connectionDb();

  res.status(200).json({ name: "John Doe" });
}
