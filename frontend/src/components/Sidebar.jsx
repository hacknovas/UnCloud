// Sidebar.js

import React from 'react';
import { Link } from 'react-router-dom';
import { CiLogout } from 'react-icons/ci';
import Button from './Button';

const Sidebar = () => {
    return (
        <div className="fixed h-full left-0 top-0 w-1/5 bg-gray-800 p-4 flex flex-col justify-between">
            <div>
                <p className="text-3xl text-white mb-4">(UserName)</p>

                <ul className="my-14">
                    <li className="mb-2">
                        <Link to="upload" className="text-white block bg-gray-700 py-2 px-4 rounded-md">Upload file</Link>
                    </li>
                    <li className="mb-2">
                        <Link to="managefiles" className="text-white block bg-gray-700 py-2 px-4 rounded-md">Uploaded files</Link>
                    </li>
                    <li className="mb-2">
                        <Link to="recievedfile" className="text-white block bg-gray-700 py-2 px-4 rounded-md">Received file</Link>
                    </li>
                </ul>
            </div>

            {/* Logout Button */}
            <Link to='login'>
            <Button className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center cursor-pointer text-white text-2xl font-extrabold mt-4">
                <CiLogout />
            </Button>
            </Link>
        </div>
    );
};

export default Sidebar;
