export const loadDesktopCapture = async (): Promise<MediaStream> => {
  //   navigator.mediaDevices
  //     .getUserMedia({
  //       audio: true,
  //     })
  //     .then(function (audioStream) {
  //       //오디오 스트림을 얻어냄

  //       navigator.mediaDevices
  //         .getDisplayMedia({
  //           audio: true,
  //           video: true,
  //         })
  //         .then(function (screenStream) {
  //           //스크린 공유 스트림을 얻어내고 여기에 오디오 스트림을 결합함
  //           screenStream.addTrack(audioStream.getAudioTracks()[0]);
  //         })
  //         .catch(function (e) {
  //           //error;
  //         });

  //     })
  //     .catch(function (e) {
  //       //error;
  //     });
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
