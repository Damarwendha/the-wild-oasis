import { useEffect } from "react";

export function useKey(keyName, callback) {
  useEffect(() => {
    const listener = (event) => {
      if (
        typeof keyName === "object" &&
        keyName.map((v) => v.toLowerCase()).includes(event.key.toLowerCase())
      )
        callback();
      else if (
        !keyName.startsWith("mod_") &&
        event.key.toLowerCase() === keyName.toLowerCase()
      ) {
        callback();
      } else if (
        keyName.startsWith("mod_") &&
        event.metaKey &&
        event.key.toLowerCase() === keyName.replace("mod_", "").toLowerCase()
      ) {
        event.preventDefault();
        callback();
      }
    };

    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [callback, keyName]);
}
