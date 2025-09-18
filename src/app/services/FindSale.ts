import axios from "axios";

export const FindSale = async (id: string) => {
  const res = await axios.get(`http://localhost:3000/homepage/FindSale/${id}`);
  return res.data;
};
