import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { downloadFile } from "../api/files";

const SharedFile = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [message, setMessage] = useState("Preparing your file...");

  useEffect(() => {
    const download = async () => {
      if (!user || !user.token) {
        setMessage("User not authenticated");
        return;
      }

      const result = await downloadFile(id, user);
      setMessage(result.message);
    };

    download();
  }, [id, user]);

  return <div>{message}</div>;
};

export default SharedFile;
