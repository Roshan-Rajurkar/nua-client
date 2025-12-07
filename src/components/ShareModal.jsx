import { useEffect, useState } from "react";
import Select from "react-select";
import { useAuth } from "../context/AuthContext";
import { shareFileAPI } from "../api/files";
import { fetchAllUsers } from "../api/auth";

const ShareModal = ({ file, onClose }) => {
  const { user } = useAuth();
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [shareLink, setShareLink] = useState("");

  const fetchUsers = async () => {
    const data = await fetchAllUsers(user);
    setAllUsers(data.users || []);
  };

  useEffect(() => {
    if (!file) return;
    setShareLink(`${window.location.origin}/file/${file._id}/shared`);
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const handleShare = async () => {
    const userIds = selectedUsers.map((u) => u.value);
    const res = await shareFileAPI(file._id, userIds, user);

    if (res?.success) {
      alert("Shared successfully");
    }

    handleClose();
  };

  const handleClose = () => {
    setSelectedUsers([]);
    setShareLink("");
    onClose();
  };

  if (!file) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-semibold mb-3">Share File</h2>

        <label className="font-semibold">Shareable Link</label>
        <input
          className="w-full p-2 border rounded mb-4"
          value={shareLink}
          readOnly
          onClick={(e) => e.target.select()}
        />

        <label className="font-semibold">Share With</label>
        <Select
          options={allUsers}
          isMulti
          onChange={setSelectedUsers}
          value={selectedUsers}
          className="mb-4"
          placeholder="Select users to share with..."
        />

        <button
          onClick={handleShare}
          className="w-full bg-blue-600 text-white py-2 rounded"
          disabled={selectedUsers.length === 0}
        >
          Share
        </button>

        <button
          onClick={handleClose}
          className="w-full mt-2 bg-gray-400 text-white py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ShareModal;
