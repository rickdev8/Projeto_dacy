import axios from "axios";

export const FindSale = async (id: string) => {
  const res = await axios.get(`https://projeto-back-dacy-1.onrender.com/homepage/FindSale/${id}`);
  return res.data;
};
