"use client";

const { logOutAction } = require("@/actions");
const { Button } = require("../ui/button");

const Logout = () => {
  const handleLogOut = async () => {
    await logOutAction();
  };
  return <Button onClick={handleLogOut}>LogOut</Button>;
};

export default Logout;
