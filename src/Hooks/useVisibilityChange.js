import { useEffect, useState } from "react";

const useVisibilityChange = () => {
  const [isForeground, setIsForeground] = useState(true);
  const [counter, setCounter] = useState(0);
  useEffect(() => {

    const handleVisibilityChange = () => {
      setIsForeground(document.visibilityState === "visible");
      console.log("checking for foreground", counter);
      setCounter(counter + 1);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
  return isForeground;
};
export default useVisibilityChange;
