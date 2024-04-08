import React from "react";
import { userStore } from "../../features/userStore";

const Userdata = () => {
  const user = userStore((state) => state.user);

  return (
    <div className="flex justify-center items-center gap-3">
      <img className="rounded-full h-10" src={user?.picture} alt="user_pic" />
      <h2 className="font-semibold">{user?.name}</h2>
    </div>
  );
};

export default Userdata;
