"use client";
import { useState } from "react";
import { initialSignUpFormData, userRegistrationFormControls } from "../utils";
import { Label } from "@/components/ui/label";
import CommonFormElement from "@/components/form-element/page";
import { Button } from "@/components/ui/button";
import registerUserAction from "@/actions";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  console.log(signUpFormData);
  const router = useRouter();

  const handleSignUpBtnValid = () => {
    return Object.keys(signUpFormData).every(
      (key) => signUpFormData[key].trim() !== ""
    );
  };

  const handleSignUp = async () => {
    const result = await registerUserAction(signUpFormData);
    console.log(result);

    if (result?.data) router.push("/sign-in");
  };
  return (
    <div>
      <h1>Welcome to Sign Up Page</h1>

      <form action={handleSignUp}>
        {userRegistrationFormControls.map((controlItem) => (
          <div key={controlItem.name}>
            <Label>{controlItem.label}</Label>
            <CommonFormElement
              currentItem={controlItem}
              value={signUpFormData[controlItem.name]}
              onChange={(event) =>
                setSignUpFormData({
                  ...signUpFormData,
                  [event.target.name]: event.target.value,
                })
              }
            />
          </div>
        ))}
        <Button disabled={!handleSignUpBtnValid()} type={"submit"}>
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
