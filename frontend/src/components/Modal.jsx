import React, { useContext, useEffect, useState } from "react";
import UnCloud from "../EthereumF/UnCloud.json";
import { CloudContext } from "../ContextAPI/Provider";

export default function Modal() {
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

  return (
    <div className="my-3">
      <div>
        Access Members:
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
