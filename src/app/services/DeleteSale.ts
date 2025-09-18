import axios from "axios";

export const DeleteSale = async (id: string) => {
  const response = await axios.delete(`http://localhost:3000/homepage/DeleteSale/${id}`);
  return response
};
