/* eslint-disable no-undef */
import User from "../models/user.model.js";

import * as dotenv from 'dotenv'
dotenv.config()


export const deleteUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);
  
    if (req.userId !== user._id.toString()) {
      return res.status(403).send("You can delete only your account!");
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("deleted.");
  };
  
  export const getUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);
  
    res.status(200).send(user);
  };


