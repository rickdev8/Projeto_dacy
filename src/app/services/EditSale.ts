import axios from "axios";

export const EditSale = async (id: string, sale: any) => {
  await axios.put(`https://projeto-back-dacy-1.onrender.com/homepage/EditSale/${id}`, sale);
};
