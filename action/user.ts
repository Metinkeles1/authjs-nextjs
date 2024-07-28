"use server";

import { User } from "@/models/User";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";

const login = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const result = await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
  } catch (error) {
    const someError = error as CredentialsSignin;
    return someError.cause;
  }
  redirect("/");
};

const register = async (formData: FormData) => {
  const firstName = formData.get("firstName")?.toString();
  const lastName = formData.get("lastName")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!firstName || !lastName || !password || !email) {
    throw new Error("Please fill all fields");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({ firstName, lastName, email, password: hashedPassword });
  console.log(`user created successfully`);
  redirect("/login");
};

export { register, login };
