import React from "react";
import Input from "../card/Input";

const UserSearch = () => {
  return (
    <div className="p-4 m-2 mt-3 mb-3">
      <Input
        label="Search User"
        type="search"
        placeholder="Search User"
        labelclass={"text-2xl font-bold m-2 "}
      />
    </div>
  );
};

export default UserSearch;
