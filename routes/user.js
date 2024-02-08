import express from "express";
import CryptoJS from "crypto-js";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "./verifyToken.js";
import User from "../models/User.js";

const router = express.Router();

//UPDATE

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET,
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true },
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET user by id (for admin only)

router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findOne(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET all users (for admin only)

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET user stats (for admin only)

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },

      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(err);
  }
});

export default router;
