import React, { useRef, useState } from 'react';
import Button from './Button';
import { IoCloudUploadOutline } from 'react-icons/io5';

const Upload = () => {
    const fileInputRef = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleUploadClick = () => {
        // Trigger the file input click event
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        // Handle the selected files
        const files = Array.from(e.target.files);
        setSelectedFiles((prev) => [...prev, ...files]);
    };

    const removeFile = (index) => {
        // Remove the file from the selectedFiles array
        const newFiles = [...selectedFiles];
        newFiles.splice(index, 1);
        setSelectedFiles(newFiles);
    };

    return (
        <div className="flex items-center justify-center h-screen">
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
                    Upload File
                </Button>
            </div>
        </div>
    );
};

export default Upload;
