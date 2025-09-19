import axios from "axios";

export const DeleteSale = async (id: string) => {
  const response = await axios.delete(`https://projeto-back-dacy-1.onrender.com/homepage/DeleteSale/${id}`);
  return response
};
