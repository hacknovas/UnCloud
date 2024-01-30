import { useEffect, useState } from "react";
import UnCloud from "../EthereumF/UnCloud.json";
import { useNavigate } from "react-router-dom";
import File from "../components/File";

function FileList() {
  const ethers = require("ethers");
  const navigator = useNavigate();

  const [myFiles, setmyFiles] = useState([]);

  const getMyFiles = async (Signer) => {
    try {
      const contractInstance = new ethers.Contract(
        UnCloud.contractAddress,
        UnCloud.abi,
        Signer
      );

      const result = await contractInstance.getMyData();

      setmyFiles(result);

      console.log(Array.from(result));
    } catch (error) {
      console.log("error while fetching data");
    }
  };

  useEffect(() => {
    (async () => {
      if (localStorage.getItem("MetamaskCredientials")) {
        const Provider = new ethers.BrowserProvider(window.ethereum);
        const Signer = await Provider.getSigner();
        getMyFiles(Signer);
      } else {
        alert("Connect To metamask");
        navigator("/");
      }
    })();
  }, []);

  return (
    <div className="container m-3">
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-4/5">
        <div className="flex justify-around mb-3 text-start bg-gray-50 p-3">
          <div>File</div>
          <div>ID</div>
          <div>Name</div>
          <div>Edit</div>
        </div>
        {myFiles.map((file, i) => {
          return <File key={i} file={file} />;
        })}
      </div>
    </div>
  );
}

export default FileList;
