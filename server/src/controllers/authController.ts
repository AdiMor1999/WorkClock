import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { data } from "../app";

// Secret key for JWT (use environment variables in production)
const JWT_SECRET = process.env.JWT_SECRET as string;

export const login = (req: Request, res: Response) => {
  {
    const { username, password } = req.body;

    const user = data.users.get(username);

    if (!user || user.password !== password) {
      res.status(401).json({ error: "Invalid username or password" });
      return;
    }

    // Generate a token with username and role
    const token = jwt.sign(
      { username: user.username, role: user.role },
      JWT_SECRET,
      {
        expiresIn: "1h", // Token expiration time
      }
    );

    res.status(200).json({ token, role: user.role });
  }
};
