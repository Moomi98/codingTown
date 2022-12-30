export const loadDesktopCapture = async (): Promise<MediaStream> => {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      audio: true,
      video: true,
    });

    return stream;
  } catch (e: any) {
    return e;
  }
};

export const getDevices = async (): Promise<MediaDeviceInfo[]> => {
  try {
    const stream = await navigator.mediaDevices.enumerateDevices();
    console.log(stream);

    return stream;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUserMedia = async (deviceId?: string): Promise<MediaStream> => {
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
