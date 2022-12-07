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

export const getDevices = async () => {
  try {
    const stream = await navigator.mediaDevices.enumerateDevices();

    return stream;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUserMedia = async (deviceId: string) => {
  const constraint = deviceId ? { deviceId } : true;
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: constraint,
    });

    return stream;
  } catch (error: any) {
    throw new Error(error);
  }
};
