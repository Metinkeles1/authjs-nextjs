import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { getSession } from "@/lib/getSession";
import { signOut } from "@/auth";

const Navbar = async () => {
  const session = await getSession();
  const user = session?.user;

  return (
    <nav className="flex justify-around items-center py-4 bg-primary text-white">
      <Link href="/">Home</Link>

      <ul className="flex items-center space-x-2">
        {!user ? (
          <>
            <li>
              <Link href="/login" className="hover:text-gray-400">
                Login
              </Link>
            </li>
            <li>
              <Link href="/register" className="hover:text-gray-400">
                register
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/private/dashboard" className="hover:text-gray-400">
                Dashboard
              </Link>
            </li>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <Button type="submit" variant={"ghost"}>
                Logout
              </Button>
            </form>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
