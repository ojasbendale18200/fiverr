/* eslint-disable no-undef */
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";




export const register = async (req, res ) => {
    try {
      const hash = bcrypt.hashSync(req.body.password, 5);
      const newUser = new User({
        ...req.body,
        password: hash,
      });
  
      await newUser.save();
      res.status(201).send("User has been created.");
    } catch (err) {
        res.status(400).send(err.message)
    }
  };

    export const login = async (req, res) => {
      try {
        const user = await User.findOne({
          username: new RegExp(req.body.username, "i"),
        });

        if (!user) return res.status(400).send("User Not Found!");

        const isCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (!isCorrect)
          return res.status(400).send("Wrong password or username!");

        const token = jwt.sign(
          {
            id: user._id,
            isSeller: user.isSeller,
          },
          process.env.JWT_KEY
        );

        const { password, ...info } = user._doc;
        res.cookie("accessToken", token, {
          httpOnly: true,

          // SameSite: "none",
        });
        res.status(200).send({ ...info, token });
      } catch (err) {
        res.status(400).send(err.message);
      }
    };

  export const logout = async (req, res) => {
    res
      .clearCookie("accessToken", {
        sameSite: "none",
        secure: true, 
      })
      .status(200)
      .send("User has been logged out.");
  };