// import React, { useState } from "react";
import ManageAccess from "../components/ManageAccess";
import React, { useContext, useEffect, useState } from "react";
import UnCloud from "../EthereumF/UnCloud.json";
import { CloudContext } from "../ContextAPI/Provider";
import Input from "./Input"

export default function File({ file }) {
  const [allowedAddress, setAllowedAddress] = useState([]);
  const [shareAddress, setShareAddress] = useState("");
  const { signer } = useContext(CloudContext);

  const manageAccess = async () => {
    // get All Adreess associated with each file
    const ethres = require("ethers");

    const contractInstance = new ethres.Contract(
      UnCloud.contractAddress,
      UnCloud.abi,
      signer
    );

    const result = await contractInstance.getAllAddress(file.metaID);

    setAllowedAddress(result);
    console.log(Array.from(result));
  };

  const handleShare = async () => {
    // share file with other address
    const ethres = require("ethers");

    console.log(signer);

    const contractInstance = new ethres.Contract(
      UnCloud.contractAddress,
      UnCloud.abi,
      signer
    );

    await contractInstance.shareDataWith(shareAddress, file.metaID);

    setAllowedAddress([...allowedAddress, ...shareAddress]);
    console.log("Sharing Done...Wait some time to reflect.");
  };

  const editAccess = async (address) => {
    const ethres = require("ethers");

    const contractInstance = new ethres.Contract(
      UnCloud.contractAddress,
      UnCloud.abi,
      signer
    );

    await contractInstance.editAddressPermissions(address, file.metaID);

    console.log("access modified ...Wait some time to reflect.");
  };

  useEffect(() => {
    manageAccess();
  }, []);
  const [openManageAccess, setopenManageAccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <div>
      <ul className="list-none m-0 px-10">
        <li className="flex items-center justify-between border border-black rounded-lg px-3 py-1.5 shadow-sm shadow-white/50 duration-300 text-black mb-2">
          <div>
            <a
              href={"https://gateway.pinata.cloud/ipfs/" + file.tokenURI}
              target="_blank"
            >
              Open File
            </a>
          </div>
          <div>ID: {file.metaID.toString()}</div>
          <div>File Name: {file.name}</div>
          <div>Owner: {file.owner}</div>

          <button
            className="w-20 h-10 rounded-lg text-sm text-rose-600 border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
            onClick={() => {
              setShowModal(true)
              // manageAccess(file.metaID.toString());
              openManageAccess
                ? setopenManageAccess(false)
                : setopenManageAccess(true);
            }}
          >
            Manage access
          </button>
        </li>
        {/* {openManageAccess ? <ManageAccess file={file} /> : null} */}
      </ul>
    </div>
      {
        showModal ? (
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      Access Members:
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <ul>
                      {allowedAddress.map((addr, i) => {
                        return (
                          <li key={i}>
                            {addr.account}
                            <button
                              onClick={() => {
                                editAccess(addr.account);
                              }}
                            >
                              &rarr;
                              {addr.access ? <b>Remove Access</b> : <b>Give Access</b>}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                    <Input type="text"
                      className="bg-slate-300"
                      placeholder="Enter Address"
                      onChange={(e) => {
                        setShareAddress(e.target.value);
                        console.log(shareAddress);
                      }} />
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        handleShare();
                      }}
                    >
                      Share File
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null
      }
    </>
    
  );
}









