import axios from "axios";

export const CreateSales = async (sale: any) => {
  const res = await axios.post(
    "https://projeto-back-dacy.onrender.com/homepage/CreateSale",
    sale
  );
  return res.data;
};
