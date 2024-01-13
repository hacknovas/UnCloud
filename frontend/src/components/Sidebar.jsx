// Sidebar.js

import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import Button from "./Button";
import { CloudContext } from "../ContextAPI/Provider";

const Sidebar = () => {
  // const [address, setAddress] = useState("");
  const { address, setAddress, setSigner } = useContext(CloudContext);

  const handleConnection = async () => {
    const ethers = require("ethers");

    if (window.ethereum) {
      const Provider = new ethers.BrowserProvider(window.ethereum);
      const Signer = await Provider.getSigner();

      setAddress(Signer.address);
      setSigner(Signer);
    } else {
      alert("To use UnCloul...Install Metamask Wallet");
    }
  };

  return (
    <div className="fixed h-full left-0 top-0 w-1/5 bg-gray-800 p-4 flex flex-col justify-between">
      <div>
        <p className="text-3xl text-white mb-4">(UserName)</p>
        <div className=" text-white ">
          {address == "" ? (
            <button className="bg-white text-black" onClick={handleConnection}>
              Connect to metamask
            </button>
          ) : (
            <div className="bg-white text-black text-center font-bold">
              {address.substring(0, 4) +
                "..." +
                address.substring(address.length - 5, address.length)}
            </div>
          )}
        </div>

        <ul className="my-14">
          <li className="mb-2">
            <Link
              to="upload"
              className="text-white block bg-gray-700 py-2 px-4 rounded-md"
            >
              Upload file
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="managefiles"
              className="text-white block bg-gray-700 py-2 px-4 rounded-md"
            >
              Uploaded files
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="recievedfile"
              className="text-white block bg-gray-700 py-2 px-4 rounded-md"
            >
              Received file
            </Link>
          </li>
        </ul>
      </div>

      {/* Logout Button */}
      <Link to="login">
        <Button className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center cursor-pointer text-white text-2xl font-extrabold mt-4">
          <CiLogout />
        </Button>
      </Link>
    </div>
  );
};

export default Sidebar;
