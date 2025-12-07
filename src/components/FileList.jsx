import { downloadFile } from "../api/files";
import { useAuth } from "../context/AuthContext";

const FileList = ({ files = [], onShare }) => {
  const { user } = useAuth();
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-3">Your Files</h2>

      <div className="space-y-3">
        {files?.map((file) => (
          <div
            key={file._id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div>
              <p className="font-medium">{file.originalName}</p>
              <p className="text-sm text-gray-500">{file.size} KB</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => onShare(file)}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                Share
              </button>
              <button
                onClick={() => downloadFile(file._id, user)}
                className="px-3 py-1 bg-gray-700 text-white rounded"
              >
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileList;
