import axios from "axios";

export const EditSale = async (id: string, sale: any) => {
  await axios.put(`http://localhost:3000/homepage/EditSale/${id}`, sale);
};
