import User from "../models/user";
import bcrypt from "bcrypt";
import * as token from "../helpers/token";

interface UserParams {
  email: string;
  password: string;
}

export const register = async (params: UserParams): Promise<any> => {
  const result = await User.find({ email: params.email });

  if (!result.length) {
    const newUser = new User({
      email: params.email,
      password: bcrypt.hashSync(params.password, 10),
    });

    return newUser.save().then((_user: any, err: any) => (err ? false : true));
  } else {
    return { error: "User already exists." };
  }
};

export const auth = async (params: UserParams): Promise<any> => {
  const user = await User.findOne({ email: params.email });

  switch (true) {
    case !user: {
      return false;
    }
    case user && !bcrypt.compareSync(params.password, user.password): {
      return false;
    }
    default: {
      return { accessToken: token.create(user) };
    }
  }
};
