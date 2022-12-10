import { atom } from "recoil";

export const whiteboardState = atom<boolean>({
  key: "whiteboard",
  default: false,
});
