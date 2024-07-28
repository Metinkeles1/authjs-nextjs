import { register } from "@/action/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSession } from "@/lib/getSession";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const Register = async () => {
  const session = await getSession();
  const user = session?.user;
  if (user) redirect("/");

  return (
    <div className="mt-10 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white border border-[#121212]  dark:bg-black">
      <h2>Welcome</h2>

      <form action={register}>
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" placeholder="FirstName" type="text" name="firstName" />
        </div>
        <div>
          <Label htmlFor="lastName">last Name</Label>
          <Input id="lastName" placeholder="lastName" type="text" name="lastName" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="johm@gmail.com" type="email" name="email" />
        </div>
        <div>
          <Label htmlFor="password">password</Label>
          <Input id="password" placeholder="password" type="password" name="password" />
        </div>
        <Button className="mt-4 w-full">Sign Up</Button>
        <p className="mt-2">
          already have an account? <Link href="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
