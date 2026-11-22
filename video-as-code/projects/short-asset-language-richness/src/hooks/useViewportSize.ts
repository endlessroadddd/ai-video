import { useEffect, useState } from "react";

type ViewportSize = {
  height: number;
  width: number;
};

function readViewportSize(): ViewportSize {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

export function useViewportSize(): ViewportSize {
  const [size, setSize] = useState<ViewportSize>(() => readViewportSize());

  useEffect(() => {
    const handleResize = () => {
      setSize(readViewportSize());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return size;
}
