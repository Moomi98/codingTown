import { atom } from "recoil";

export const whiteboardState = atom<boolean>({
  key: "whiteboard",
  default: false,
});

export const languageState = atom<string>({
  key: "whiteboard_language",
  default: "c_cpp",
});

export const codeState = atom<string>({
  key: "whiteboard_code",
  default: "",
});
