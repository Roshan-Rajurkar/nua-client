export const registerUser = async (form) => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
  return res.json();
};

export const loginUser = async (form) => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
  return res.json();
};

export const fetchAllUsers = async (user) => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/users`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });

  return res.json();
};
