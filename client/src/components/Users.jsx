import React from "react";
import Header from "../layout/Header";

const Users = () => {
  const formDate = (timeStamp) => {
    const date = new Date(timeStamp);
    const formattedDate = `${String(data.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()}`;

    const formattedTime = `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
    return `${formattedDate} ${formattedTime}`;
  };
  return <>
  <main className="relative flex-1 p-6 pt-28">
    <Header />
  </main>
  </>;
};

export default Users;
