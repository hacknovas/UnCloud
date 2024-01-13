import React, { useEffect, useContext } from "react";
import { CloudContext } from "../ContextAPI/Provider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UnCloud from "../EthereumF/UnCloud.json";

function ReceivedFiles() {
  const navigator = useNavigate();
  const { signer } = useContext(CloudContext);
  const [sharedFiles, setSharedFiles] = useState([]);

  const todos = [
    { id: 1, todo: "Todo msg" },
    { id: 2, todo: "Todo msg2" },
    { id: 3, todo: "Todo msg3" },
    { id: 4, todo: "Todo msg4" },
  ];

  // const [todoMsg, setTodoMsg] = useState(todo.todo);
  // const { deleteTodo, updateTodo, toggleTodo } = useTodo();

  const editTodo = () => {
    // updateTodo(todo.id, { ...todo, todo: todo.todoMsg })
    // setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    // toggleTodo(todo.id)
  };

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
      {sharedFiles.map((file, i) => (
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
      ))}
    </div>
  );
}

export default ReceivedFiles;
