import { useEffect, useState } from "react";
import FileUpload from "../components/FileUpload";
import FileList from "../components/FileList";
import ShareModal from "../components/ShareModal";
import { uploadFiles, getFiles } from "../api/files";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [shareFile, setShareFile] = useState(null);
  const { user, logout } = useAuth();

  const loadFiles = async () => {
    const data = await getFiles(user);
    setFiles(data.files);
  };

  const handleUpload = async (formData) => {
    await uploadFiles(formData, user);
    loadFiles();
  };

  useEffect(() => {
    loadFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-4">
        <p>Hi, I'm {user.username}</p>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Log Out
        </button>
      </div>
      <FileUpload onUpload={handleUpload} />
      <FileList files={files} onShare={(file) => setShareFile(file)} />
      <ShareModal file={shareFile} onClose={() => setShareFile(null)} />
    </div>
  );
};

export default Dashboard;
