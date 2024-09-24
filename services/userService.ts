import instance from "../utils/axios";

export const getUser = async () => {
  try {
    const response = await instance.get("/users");
    const res = response.data;
    return res;
  } catch (error) {
    throw new Error("Failed to get user");
  }
};

export const getUserById = async (id: string) => {
  try {
    const response = await instance.get(`/users/${id}`);
    const res = response.data;
    return res;
  } catch (error) {
    throw new Error("Failed to get user");
  }
};
