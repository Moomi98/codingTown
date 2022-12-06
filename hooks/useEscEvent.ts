import { useEffect } from "react";

const useEscEvent = (callback: Function) => {
  useEffect(() => {
    const closeModal = (event: KeyboardEvent) => {
      if (event.keyCode === 27) {
        callback();
      }
    };
    window.addEventListener("keydown", closeModal);

    return () => window.removeEventListener("keydown", closeModal);
  }, []);
};

export default useEscEvent;
