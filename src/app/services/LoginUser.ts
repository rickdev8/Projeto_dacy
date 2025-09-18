import axios from "axios";

export const Login = async (data: { email: string; password: string }) => {
  const response = await axios.post(
    `https://projeto-back-dacy.onrender.com/homepage/login`,
    data
  );
  return response;
};
