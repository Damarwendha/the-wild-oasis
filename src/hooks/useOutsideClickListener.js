import { useEffect, useRef } from "react";

function useOutsideClickListener(action = () => {}, listenCapturing = true) {
  const insideRef = useRef();

  useEffect(
    function () {
      const handleClick = (e) => {
        if (insideRef.current && !insideRef.current.contains(e.target)) {
          action();
        }
      };

      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [action, listenCapturing]
  );

  return { insideRef };
}

export { useOutsideClickListener };
