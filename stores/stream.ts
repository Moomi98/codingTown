import { atom } from "recoil";

export const desktopStreamState = atom<MediaStream | null>({
  key: "desktopStream",
  default: null,
});

export const mediaStreamState = atom<MediaStream | null>({
  key: "mediaStream",
  default: null,
});
