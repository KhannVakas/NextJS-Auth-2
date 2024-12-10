"use client";
import { Label } from "@/components/ui/label";
import { initialLoginFormData, userLoginFormControls } from "../utils";
import CommonFormElement from "@/components/form-element/page";
import { useState } from "react";
import { loginUserAction } from "@/actions";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const SignIn = () => {
  const [signInFormData, setSignInFormData] = useState(initialLoginFormData);
  console.log(signInFormData);
  const router = useRouter();

  const handleSignIn = async () => {
    const result = await loginUserAction(signInFormData);
    console.log(result);
    if (result?.success) router.push("/");
  };
  return (
    <div>
      <h1>Sign In</h1>
      <form action={handleSignIn}>
        {userLoginFormControls.map((controlItem) => (
          <div key={controlItem.name}>
            <Label>{controlItem.label}</Label>
            <CommonFormElement
              currentItem={controlItem}
              value={signInFormData[controlItem.name]}
              onChange={(event) =>
                setSignInFormData({
                  ...signInFormData,
                  [event.target.name]: event.target.value,
                })
              }
            />
          </div>
        ))}
        <Button type={"submit"}>SignIn</Button>
      </form>
    </div>
  );
};
export default SignIn;
