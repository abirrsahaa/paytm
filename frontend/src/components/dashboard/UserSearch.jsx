import React, { useEffect, useState } from "react";
import Input from "../card/Input";

const UserSearch = () => {
  const [users, setUsers] = useState([]);

  // i will run this only once
  useEffect(() => {
    const fetching = async () => {
      const response = await fetch("http://localhost:3000/api/v1/user/getting");
      const flattening = await response.json();
      console.log("the response after flattening is --> ", flattening);
      setUsers(flattening.users);
    };

    fetching();
  }, []);

  return (
    <>
      <div className="p-4 m-2 mt-3 ">
        <Input
          label="Users"
          type="search"
          placeholder="Search User"
          labelclass={"text-2xl font-bold m-2 "}
        />
      </div>
      <div className="w-[90%]  m-2 flex flex-col justify-center items-center">
        {users.length > 0 &&
          users.map((user) => (
            <>
              <div className="shadow-lg w-[97%] p-1  m-2 h-[4.2vw] rounded-lg flex justify-between items-between">
                <div className="p-1 w-[12vw]  gap-2  flex  items-center justify-between">
                  <div className="bg-gray-200 h-[3vw] w-[3vw] rounded-full text-black flex justify-center items-center font-semibold text-xl">
                    U1
                  </div>
                  <span className="text-3xl  font-bold tracking-tighter">
                    {user.firstname}
                  </span>
                </div>
                <button className="w-[8vw] h-[3vw] p-1 flex justify-center items-center tracking-tighter font-semibold border-black border-2 border-solid rounded-lg bg-black text-white">
                  Send Money
                </button>
              </div>
            </>
          ))}
      </div>
    </>
  );
};

export default UserSearch;
