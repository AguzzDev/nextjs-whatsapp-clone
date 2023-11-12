import { useState, useEffect } from "react";

export const usePreload = () => {
  const [percent, setPercent] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 130) {
          setLoading(false);
          return prev;
        }
        return prev + 5.5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return { percent, loading };
};
