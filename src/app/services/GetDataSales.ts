import axios from "axios";

export const GetDataSales = async () => {
  const response = await axios.get(
    `https://projeto-back-dacy-1.onrender.com/homepage/GetDataSales`
  );
  return response;
};
