import axios from "axios";

export const BASE_URL = "http://3.37.145.241/";

const urls = {
  create: "/room/",
};

interface createRoomPayload {
  roomName: string;
  nickName: string;
  password: string;
}

export const createRoomAPI = async (payload: createRoomPayload) => {
  try {
    const response = await axios.post(BASE_URL + urls.create, payload);

    return response.data;
  } catch (e: any) {
    throw new Error(e);
  }
};
