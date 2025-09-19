import axios from "axios";

export const GetSales = async (
  page: number,
  limit: number,
  filter: string,
  order: string,
  search: string
) => {
  const response = await axios.get(
    `https://projeto-back-dacy-1.onrender.com/homepage/GetSales/${page}/${limit}/${filter}/${order}`,
    {
      params: {
        search: search,
      },
    }
  );
  return response;
};
