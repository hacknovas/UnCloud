import React, { useContext, useEffect, useState } from "react";
import UnCloud from "../EthereumF/UnCloud.json";
import { CloudContext } from "../ContextAPI/Provider";

export default function ManageAccess({ file }) {
  const [allowedAddress, setAllowedAddress] = useState([]);
  const [shareAddress, setShareAddress] = useState("");
  const { signer } = useContext(CloudContext);

  const manageAccess = async () => {
    // get All Allowed Adreess
    const ethres = require("ethers");

    console.log(signer);

    const contractInstance = new ethres.Contract(
      UnCloud.contractAddress,
      UnCloud.abi,
      signer
    );

    const result = await contractInstance.getAllAddress(file.metaID);

    setAllowedAddress(result);
    console.log(Array.from(result));

    // Giving Access to others
  };

  const handleShare = async () => {
    const ethres = require("ethers");

    console.log(signer);

    const contractInstance = new ethres.Contract(
      UnCloud.contractAddress,
      UnCloud.abi,
      signer
    );

    await contractInstance.shareDataWith(shareAddress, file.metaID);

    setAllowedAddress([...allowedAddress, ...shareAddress]);
  };

  const editAccess = async (address) => {
    const ethres = require("ethers");

    const contractInstance = new ethres.Contract(
      UnCloud.contractAddress,
      UnCloud.abi,
      signer
    );

    await contractInstance.editAddressPermissions(address, file.metaID);
  };

  useEffect(() => {
    manageAccess();
  }, []);

  return (
    <div className="my-3">
      <div>
        Access Members:
        <ul>
          {allowedAddress.map((addr, i) => {
            return (
              <li key={i}>
                {addr}
                <button
                  onClick={() => {
                    editAccess(addr);
                  }}
                >
                  <b> &rarr; Remove Access</b>{" "}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-3 ">
        {/* handleChangeAddress */}
        <input
          type="text"
          className="bg-slate-300"
          placeholder="Enter Address"
          onChange={(e) => {
            setShareAddress(e.target.value);
            console.log(shareAddress);
          }}
        />
        <button className="border " onClick={handleShare}>
          Share File
        </button>
      </div>
    </div>
  );
}
