import React, { useState } from "react";
import ManageAccess from "../components/ManageAccess";

export default function File({ file }) {
  const [openManageAccess, setopenManageAccess] = useState(false);

  return (
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
              // manageAccess(file.metaID.toString());
              openManageAccess
                ? setopenManageAccess(false)
                : setopenManageAccess(true);
            }}
          >
            Manage access
          </button>
        </li>
        {openManageAccess ? <ManageAccess file={file} /> : <></>}
      </ul>
    </div>
  );
}
