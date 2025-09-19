import axios from "axios";

export const CreateSales = async (sale: any) => {
  const res = await axios.post(
    "https://projeto-back-dacy-1.onrender.com/homepage/CreateSale",
    sale
  );
  return res.data;
};
