import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getDbConnection } from "../db";
import { sendEmail } from "../util/sendEmail";

export const signUpRoute = {
  path: "/api/signup",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;
    const db = getDbConnection("react-auth-db");
    const user = await db.collection("users").findOne({ email });

    if (user) {
      return res.sendStatus(409);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const verificationString = uuid();

    const info = {
      hairColor: "",
      bio: "",
    };

    const result = await db.collection("users").insertOne({
      email,
      passwordHash,
      info,
      isVerified: false,
      verificationString
    });

    try {
      await sendEmail({
        to: email,
        subject: 'Please verify your email',
        text: `Thanx for signing up! To verify your email please click here:
        http://localhost:3000/verify-email/${verificationString}`,
        html: `<p>Thanx for signing up! To verify your email please click:
        <a href=http://localhost:3000/verify-email/${verificationString}>here</a></p>`
      });
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }

    const { insertedId } = result;
  
    jwt.sign(
      {
        id: insertedId,
        email,
        info,
        isVerified: false,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      },
      (err, token) => {
        if (err) {
          return res.status(500).send(err);
        }

        return res.status(200).json({ token });
      }
    );
  },
};
