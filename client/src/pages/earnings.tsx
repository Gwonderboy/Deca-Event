import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const EarningHistory = () => {
  const user: any = localStorage.getItem("user");
  const mainUser = JSON.parse(user);

  return (
    <>
      <div className="fixed left-0 z-30">
        <Sidebar />
      </div>
      <div className="pl-20 fixed top-0 w-full z-10">
          <Navbar
            name={mainUser.first_name}
            image={
              mainUser.profile_picture.length === 0
                ? "/images/event1.png"
                : mainUser.profile_picture
            }
          />
        </div>
      <div className="w-full sm:w-[80%] h-auto sm:h-[678px] flex-col md:px-32 justify-start items-start gap-4 inline-flex mt-32">
        <div className="w-[1180px] justify-between items-center inline-flex">
          <div className="flex-col justify-start items-start gap-1.5 inline-flex">
            <div className="text-green-500 text-2xl font-semibold font-['Inter']">
              Earning History
            </div>
            <div className="w-[200px] h-[0px] border-2 border-green-500"></div>
          </div>
          <div className="h-10 justify-center items-center gap-5 flex">
            <div className="h-10 px-4 py-2 bg-gray-50 rounded-[5px] justify-between items-center flex">
              <input
                type="date"
                name=""
                id=""
                className="text-slate-500 text-xs font-normal font-Inter bg-gray-50"
              />
            </div>
          </div>
        </div>
        <table className="w-[1050px]" id="tickets">
          <tr className="h-10 px-5 py-3 border-b border-gray-200 justify-start items-start gap-[30px] text-gray-500 text-xs font-medium font-Inter tracking-tight">
            <th>ORDER NUMBER</th>
            <th>EVENT NAME</th>
            <th>EVENT CATEGORY</th>
            <th>ORDER DATE</th>
            <th>TICKET TYPE</th>
            <th>TICKET QUANTITY</th>
            <th>TOTAL COST</th>
            <th>AMOUNT EARNED</th>
          </tr>
          <tr className="h-11 px-5 py-3 justify-start items-start gap-2.5 text-gray-800 text-sm font-medium font-Inter leading-tight tracking-tight">
            <td>F711060151001</td>
            <td>Neon Groove</td>
            <td>Festival</td>
            <td>25-12-2023</td>
            <td>VVIP</td>
            <td>₦ 20,000</td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default EarningHistory;