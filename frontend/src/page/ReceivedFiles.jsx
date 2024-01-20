import React, { useEffect, useContext } from "react";
import { CloudContext } from "../ContextAPI/Provider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UnCloud from "../EthereumF/UnCloud.json";

function ReceivedFiles() {
  const navigator = useNavigate();
  const { signer } = useContext(CloudContext);
  const [sharedFiles, setSharedFiles] = useState([]);

  const getSharedFiles = async () => {
    const ethres = require("ethers");

    const contractInstance = new ethres.Contract(
      UnCloud.contractAddress,
      UnCloud.abi,
      signer
    );

    const result = await contractInstance.getMySharedData();

    setSharedFiles(result);

    console.log(Array.from(result));
  };

  useEffect(() => {
    if (!signer) {
      alert("Connect To metamask");
      navigator("/");
    } else {
      getSharedFiles();
    }
  }, []);

  return (
    <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-4/5">
      {sharedFiles.map((file, i) =>
        file.metaID ? (
          <ul key={i} className="list-none m-0 px-10">
            <li className="flex items-center justify-between border border-black rounded-lg px-3 py-1.5 shadow-sm shadow-white/50 duration-300 text-black mb-2">
              <div>
                <a
                  href={"https://gateway.pinata.cloud/ipfs/" + file.tokenURI}
                  target="_blank"
                >
                  Open File
                </a>
              </div>
              <div>File Name: {file.name}</div>
              <div>Owner: {file.owner}</div>
            </li>
          </ul>
        ) : null
      )}
    </div>
  );
}

export default ReceivedFiles;
