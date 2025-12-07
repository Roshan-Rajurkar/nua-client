export const uploadFiles = async (formData, user) => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/files/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
    body: formData,
  });

  return res.json();
};

export const getFiles = async (user) => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/files`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });

  return res.json();
};

export const downloadFile = async (id, user) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/files/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (res.status === 403) {
      return { success: false, message: "Access denied" };
    }

    if (res.status === 404) {
      return { success: false, message: "File not found" };
    }

    if (!res.ok) {
      return { success: false, message: "Something went wrong" };
    }

    let fileName = `${id}_download`;
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

    return { success: true, message: `${fileName} downloaded successfully` };
  } catch (error) {
    return { success: false, message: error.message || "Download failed" };
  }
};

export const shareFileAPI = async (fileId, userIds, user) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/files/share/${fileId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ userIds }),
      }
    );
    return await res.json();
  } catch (error) {
    console.error("Share file API error:", error);
    return null;
  }
};
