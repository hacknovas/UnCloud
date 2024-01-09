// Sidebar.js

import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="fixed h-full left-0 top-0 w-1/5 bg-gray-800 p-4">
            <p className="text-3xl text-white mb-4">(UserName)</p>

            <ul className='my-14'>
                <li className="mb-2">
                    <Link to="#" className="text-white block bg-gray-700 py-2 px-4 rounded-md">Upload file</Link>
                </li>
                <li className="mb-2">
                    <Link to="#" className="text-white block bg-gray-700 py-2 px-4 rounded-md">Uploaded files</Link>
                </li>
                <li className="mb-2">
                    <Link to="#" className="text-white block bg-gray-700 py-2 px-4 rounded-md">Received file</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
