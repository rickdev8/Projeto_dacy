import axios from "axios";

export const Login = async (data: { email: string; password: string }) => {
  const response = await axios.post(
    `https://projeto-back-dacy-1.onrender.com/homepage/login`,
    data
  );
  return response;
};
