import instance from "../utils/axios";

export const getInformasi = async () => {
  try {
    const response = await instance.get("/informasis");
    const res = response.data;
    return res;
  } catch (error) {
    throw new Error("Failed to get informasi");
  }
};

export const getInformasiById = async (id: string) => {
  try {
    const response = await instance.get(`/informasis/${id}`);
    const res = response.data;
    return res;
  } catch (error) {
    throw new Error("Failed to get informasi");
  }
};
