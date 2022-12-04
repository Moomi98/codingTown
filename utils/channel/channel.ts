export const loadDesktopCapture = async (): Promise<MediaStream> => {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      audio: true,
      video: true,
    });

    return stream;
  } catch (e: any) {
    throw new Error(e);
  }
};

export const loadMicStream = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    return stream;
  } catch (error: any) {
    throw new Error(error);
  }
};
