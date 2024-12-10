"use server";

import connectToDB from "@/database";
import User from "@/models";
import bcryptjs from "bcryptjs";
import tws from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const registerUserAction = async (formData) => {
  await connectToDB();
  try {
    const { userName, email, password } = formData;
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return {
        success: false,
        message: "User Already exist",
      };
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newlyCreatedUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    const savedUser = await newlyCreatedUser.save();
    if (savedUser) {
      return {
        success: true,
        message: "User Added Successfully!",
        data: JSON.parse(JSON.stringify(savedUser)),
      };
    }
    return {
      success: false,
      message: "Something went wrong!",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong!",
    };
  }
};

export const loginUserAction = async (formData) => {
  await connectToDB();
  try {
    const { email, password } = formData;

    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return {
        success: false,
        message: "User doesn't exist. Please Sign Up first",
      };
    }

    const checkPassword = await bcryptjs.compare(password, checkUser.password);
    if (!checkPassword) {
      return {
        success: false,
        message: "Incorrent password",
      };
    }

    const createTokenData = {
      id: checkUser._id,
      userName: checkUser.userName,
      email: checkUser.email,
    };

    const token = tws.sign(createTokenData, "DEFAULT_KEY", { expiresIn: "1d" });

    const getCookies = cookies();
    getCookies.set("token", token);

    return {
      success: true,
      message: "Login is successfull",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went error, Please Try Again.",
    };
  }
};

export const fetchUserAction = async () => {
  await connectToDB();
  try {
    const getCookies = cookies();
    const token = getCookies.get("token")?.value || "";
    if (token === "") {
      return {
        success: false,
        message: "Token is invalid",
      };
    }
    const decodedToken = jwt.verify(token, "DEFAULT_KEY");
    const getUserInfo = await User.findOne({ _id: decodedToken.id });

    if (getUserInfo) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(getUserInfo)),
      };
    } else {
      return {
        sucess: false,
        message: "Something went wrong! Please Try again.",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something is went wrong.",
    };
  }
};
export async function logOutAction() {
  const getCookies = cookies();
  getCookies.set("token", "");
}
export default registerUserAction;
