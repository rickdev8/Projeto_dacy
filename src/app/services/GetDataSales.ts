import axios from "axios";

export const GetDataSales = async () => {
  const response = await axios.get(
    `https://projeto-back-dacy.onrender.com/homepage/GetDataSales`
  );
  return response;
};
