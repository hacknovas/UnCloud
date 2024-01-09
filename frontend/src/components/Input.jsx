import React from "react";

function Input({ title, ...props }) {
    return (
        <div className="flex flex-col">
            <label className="mb-2" htmlFor="">
                {title}
            </label>
                <input
                    {...props}
                    className="px-2 py-3 rounded-md bg-gray-100 outline-none"
                />
            
        </div>
    );
}

export default Input;
