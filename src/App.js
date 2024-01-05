import axios from "axios";
import { useState } from "react";
import Main from "./Component/Main";
import uncloud from "./Component/uncloud.json";

export default function App() {
  const [file, setFile] = useState("");

  const ethers = require("ethers");
  //
  const handleData = async (hash) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const Signer = await provider.getSigner();

    const instance = new ethers.Contract(uncloud.address, uncloud.abi, Signer);

    const tokenID = await instance.createNFT(hash);
    console.log("createNFT=>" + tokenID);

    const mynft = await instance.getMyNFT();
    console.log("myNFT =>" + mynft);

    // const share
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(file);
    const fileData = new FormData();
    fileData.append("file", file);

    const resp = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      fileData,
      {
        maxBodyLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data; boundary=${fileData._boundary}`,
          Authorization: `Bearer ${process.env.REACT_APP_JWT}`,
        },
      }
    );

    const hash = "https://gateway.pinata.cloud/ipfs/" + resp.data.IpfsHash;

    console.log(hash);

    handleData(resp.data.IpfsHash);
  };

  return (
    <div style={{ backgroundColor: "grey", color: "white" }}>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        ></input>
        <input type="submit"></input>
      </form>

      {/*
       */}

      <Main />
    </div>
  );
}
