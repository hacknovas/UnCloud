import { useContext, useEffect, useState } from "react";
import UnCloud from "../EthereumF/UnCloud.json";
import { CloudContext } from "../ContextAPI/Provider";
import { useNavigate } from "react-router-dom";
import File from "../components/File";

function FileList() {
  const navigator = useNavigate();

  const { signer } = useContext(CloudContext);

  // File Has options
  // [] of { metaID:-/-, tokenURI(HashValue):"-/-", name:"-/-", owner:address }
  const [myFiles, setmyFiles] = useState([]);

  const getMyFiles = async () => {
    const ethres = require("ethers");

    console.log(signer);

    const contractInstance = new ethres.Contract(
      UnCloud.contractAddress,
      UnCloud.abi,
      signer
    );

    const result = await contractInstance.getMyData();

    setmyFiles(result);

    console.log(Array.from(result));
  };

  useEffect(() => {
    if (!signer) {
      alert("Connect To metamask");
      navigator("/");
    } else {
      getMyFiles();
    }
  }, []);

  return (
    <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-4/5">
      {myFiles.map((file, i) => {
        return <File key={i} file={file} />;
      })}
    </div>
  );
}

export default FileList;
