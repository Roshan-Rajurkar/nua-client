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

export const downloadFile = async (file, user) => {
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/files/${file._id}`,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  );

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = file.originalName;
  a.click();
  window.URL.revokeObjectURL(url);
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
