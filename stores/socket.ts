import { atom } from "recoil";

const socketState = atom({
  key: "socket",
  default: null,
});
