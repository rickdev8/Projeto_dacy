import axios from "axios";

export const Login = async (data: {
  email: string;
  password: string;
}) => {
  const response = await axios.post(
    `http://localhost:3000/homepage/login`,
    data
  );
  return response;
};
