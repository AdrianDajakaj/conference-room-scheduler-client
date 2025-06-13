import { useEffect, useState } from "react";

export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    function checkTouch() {
      setIsTouch(
        "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          // @ts-expect-error err
          navigator.msMaxTouchPoints > 0
      );
    }
    checkTouch();
  }, []);
  return isTouch;
}
