import axios from "axios";

export const GetDataSales = async () => {
  const response = await axios.get(
    `http://localhost:3000/homepage/GetDataSales`
  );
  return response;
};
