import { NextResponse } from "next/server";
import connect from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

const ObjectId = require("mongoose").Types.ObjectId;

export const GET = async () => {
  try {
    await connect();
    const users = await User.find();
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new NextResponse("Error in fetching users" + error, { status: 500 });
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    await connect();
    const newUser = new User(body);
    await newUser.save();

    return new NextResponse(
      JSON.stringify({ message: "User is created", user: newUser }),
      { status: 201 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: "Error in creating user",
        error,
      }),
      {
        status: 500,
      }
    );
  }
};

// export const POST = async (request: Request) => {
//   try {
//     const body = await request.json();

//     const hashedPassword = await bcrypt.hash(body.password, 10);

//     await connect();
//     const newUser = new User({
//       firstName: body.firstName,
//       lastName: body.lastName,
//       email: body.email,
//       password: hashedPassword,
//     });

//     await newUser.save();

//     return new NextResponse(
//       JSON.stringify({ message: "User is created", user: newUser }),
//       { status: 201 }
//     );
//   } catch (error: any) {
//     console.error("Error in creating user:", error);

//     return new NextResponse(
//       JSON.stringify({
//         message: "Error in creating user",
//         error: error.message,
//       }),
//       {
//         status: 500,
//       }
//     );
//   }
// };
