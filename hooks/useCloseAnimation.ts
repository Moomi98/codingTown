import { useEffect, useState, SetStateAction } from "react";

type useCloseAnimationReturn = [
  boolean,
  React.Dispatch<SetStateAction<boolean>>
];

const useCloseAnimation = (callback: Function): useCloseAnimationReturn => {
  const [closeAnimation, setCloseAnimation] = useState<boolean>(false);
  useEffect(() => {
    if (closeAnimation) {
      setTimeout(() => callback(), 500);
    }
  }, [closeAnimation]);

  return [closeAnimation, setCloseAnimation];
};

export default useCloseAnimation;
