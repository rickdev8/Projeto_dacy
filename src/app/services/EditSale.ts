import axios from "axios";

export const EditSale = async (id: string, sale: any) => {
  await axios.put(`https://projeto-back-dacy.onrender.com/homepage/EditSale/${id}`, sale);
};
