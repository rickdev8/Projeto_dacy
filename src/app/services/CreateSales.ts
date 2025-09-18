import axios from "axios";

export const CreateSales = async (sale: any) => {
  const res = await axios.post(
    "http://localhost:3000/homepage/CreateSale",
    sale
  );
  return res.data;
};
