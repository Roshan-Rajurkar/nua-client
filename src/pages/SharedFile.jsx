import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SharedFile = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [message, setMessage] = useState("Preparing your file...");

  useEffect(() => {
    const downloadFile = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/files/${id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (res.status === 403) {
          setMessage("Access denied!");
          return;
        }

        if (res.status === 404) {
          setMessage("File not found!");
          return;
        }

        if (!res.ok) {
          setMessage("Something went wrong.");
          return;
        }

        let fileName = `${id}_file`;
        const dispo = res.headers.get("Content-Disposition");

        if (dispo && dispo.includes("filename=")) {
          fileName = dispo.split("filename=")[1].replace(/"/g, "");
        }

        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.click();

        window.URL.revokeObjectURL(url);

        setMessage(
          `${fileName} downloaded successfully! Check your Downloads folder.`
        );
      } catch (err) {
        setMessage("Error downloading file: " + err.message);
      }
    };

    downloadFile();
  }, [id, user.token]);

  return <div>{message}</div>;
};

export default SharedFile;
