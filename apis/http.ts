import axios from "axios";

export const BASE_URL = "http://3.35.95.201/";

const urls = {
  roomDoors: "/lobby/",
  create: "/room/",
  join: "/join/",
};

interface createRoomPayload {
  roomName: string;
  nickName: string;
  password: string;
  tags: Array<string>;
}

interface enterRoomPayload {
  nickName: string;
  password: string;
}

export const getRoomDoorsAPI = async () => {
  try {
    const response = await axios.get(BASE_URL + urls.roomDoors);
    return response.data;
  } catch (e: any) {
    throw new Error(e);
  }
};

export const createRoomAPI = async (payload: createRoomPayload) => {
  try {
    const response = await axios.post(BASE_URL + urls.create, payload);

    return response.data;
  } catch (e: any) {
    throw new Error(e);
  }
};

export const enterRoomAPI = async (payload: enterRoomPayload) => {
  try {
    const response = await axios.post(BASE_URL + urls.join, payload);
    return response.data;
  } catch (e: any) {
    throw new Error(e);
  }
};
