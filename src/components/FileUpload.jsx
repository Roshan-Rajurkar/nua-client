import { useState } from "react";

const FileUpload = ({ onUpload }) => {
  const [dragging, setDragging] = useState(false);

  const handleFiles = (files) => {
    const formData = new FormData();
    const fileList = Array.from(files);
    fileList.forEach((file) => formData.append("files", file));
    onUpload(formData);
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${
        dragging ? "bg-gray-100 border-blue-500" : "border-gray-300"
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
    >
      <input
        type="file"
        multiple
        className="hidden"
        id="fileInput"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <label htmlFor="fileInput" className="cursor-pointer">
        <p className="text-lg font-medium">Click or drag files to upload</p>
        <p className="text-sm text-gray-500">
          Supports: PDF, Images, CSV, Docs, etc.
        </p>
      </label>
    </div>
  );
};

export default FileUpload;
