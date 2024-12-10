import { fetchUserAction } from "@/actions";
import Logout from "@/components/log-out";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const currentUser = await fetchUserAction();
  return (
    <div>
      <h1>{currentUser?.data?.userName}</h1>
      <p>{currentUser?.data?.email}</p>

      <div className="p-4 flex items-center justify-around">
        <Button>
          <Link href={"/sign-up"}>Sign Up</Link>
        </Button>
        <Button>
          <Link href={"/sign-in"}>Sign In</Link>
        </Button>

        <Logout></Logout>
      </div>
    </div>
  );
}
