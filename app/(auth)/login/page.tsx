import { login } from "@/action/user";
import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSession } from "@/lib/getSession";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const Login = async () => {
  const session = await getSession();
  const user = session?.user;
  if (user) redirect("/");

  return (
    <div className="mt-10 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white border border-[#121212]  dark:bg-black">
      <form action={login}>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="john@gmail.com" name="email" />

        <Label htmlFor="password">password</Label>
        <Input id="password" type="password" placeholder="*****" name="password" />

        <Button className="mt-2 w-full">Login</Button>

        <p className="mt-2">
          Don t have account? <Link href="/register">Register</Link>
        </p>
      </form>

      <section className="flex space-x-4 mt-4">
        <form
          action={async () => {
            "use server";
            await signIn("github");
          }}
          className="w-full"
        >
          <Button type="submit" className="w-full ">
            <IconBrandGithub />
            <span>Github</span>
          </Button>
        </form>
        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
          className="w-full"
        >
          <Button type="submit" className="w-full  ">
            <IconBrandGoogle />
            <span>Google</span>
          </Button>
        </form>
      </section>
    </div>
  );
};

export default Login;
