import React, { useContext, useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import { IoCloudUploadOutline } from "react-icons/io5";
import axios from "axios";
import { CloudContext } from "../ContextAPI/Provider";
import UnCloud from "../EthereumF/UnCloud.json";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const navigator = useNavigate();

  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("Upload And Wait");
  const { address, signer } = useContext(CloudContext);

  const handleUploadClick = () => {
    // Trigger the file input click event

    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    // Handle the selected files
    const files = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...files]);
    // console.log(process.env.REACT_APP_API_Key);
  };

  const removeFile = (index) => {
    // Remove the file from the selectedFiles array
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  //Upload to IPFS
  const UploadToIpfs = async () => {
    setUploadStatus("Uploading to IPFS...");

    const formData = new FormData();

    formData.append("file", selectedFiles[0]);

    // const pinataMetadata = JSON.stringify({
    //   name: "temp_del",
    // });

    // formData.append("pinataMetadata", pinataMetadata);

    try {
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          maxBodyLength: "Infinity",
          headers: {
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            pinata_api_key: process.env.REACT_APP_API_Key,
            pinata_secret_api_key: process.env.REACT_APP_API_Secret,
          },
        }
      );

      //https://gateway.pinata.cloud/ipfs/ + res.data.IpfsHash
      console.log("Hash Value from IPFS: ", res.data.IpfsHash);

      uploadToBlockchain(res.data.IpfsHash, "FileName");
    } catch (error) {
      console.log(error);
    }
  };

  const uploadToBlockchain = async (hashVal, name) => {
    setUploadStatus("Uploading to Blockchain");
    const ethres = require("ethers");

    const contractInstance = new ethres.Contract(
      UnCloud.contractAddress,
      UnCloud.abi,
      signer
    );

    await contractInstance.storeMetaData(hashVal, name);

    alert("Uploaded Successfully");
    setUploadStatus("Upload and Wait")
  };

  useEffect(() => {
    if (!signer) {
      alert("Connect To metamask");
      navigator("/");
    }
  }, []);

  return (
    <div className="absolute right-0 top-0 w-4/5 flex items-center justify-center h-screen">
      <div className="flex flex-col items-center space-y-4">
        {/* Display selected files */}
        {selectedFiles.length > 0 ? (
          <div className="flex items-center space-x-4">
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="text-gray-700">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700 focus:outline-none my-4"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        ) : (
          // Display the circle for the file upload symbol when no files are selected
          <label
            htmlFor="fileInput"
            className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer"
          >
            {/* You can add an icon or any content inside the circle */}
            <span className="text-white" onClick={handleUploadClick}>
              <IoCloudUploadOutline />
            </span>
          </label>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          id="fileInput"
          className="hidden"
          onChange={handleFileChange}
          multiple
        />

        {/* Button to trigger file upload */}
        <Button
          type="button"
          onClick={handleUploadClick}
          className="text-white rounded-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Select File
        </Button>

        <div className="">
          <button
            type="button"
            className="text-white rounded-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={UploadToIpfs}
          >
            {uploadStatus}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Upload;
