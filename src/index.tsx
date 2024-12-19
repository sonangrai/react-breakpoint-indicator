import React, { useEffect, useState } from "react";
import useDragging from "./hooks/useDragging";

type BreakpointIndicatorProps = {
  moreStyle?: React.CSSProperties;
};

/**
 * A component that shows the current breakpoint in the bottom left corner of the screen.
 * It is only visible in development mode.
 */
function BreakpointIndicator({ moreStyle }: BreakpointIndicatorProps) {
  const [width, setWidth] = useState<number>(0);
  const [draggingRef, x, y, isDragging] = useDragging();

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (process.env.NODE_ENV === "production") return null;

  function renderString(width: number) {
    let result = "";
    switch (true) {
      case width <= 640:
        result = "sm";
        break;

      case width <= 768:
        result = "md";
        break;

      case width <= 1024:
        result = "lg";
        break;

      case width <= 1280:
        result = "xl";
        break;

      default:
        result = "2xl";
        break;
    }

    return result;
  }

  return (
    <div
      ref={draggingRef as React.RefObject<HTMLDivElement>}
      style={{
        ...mainStyle,
        ...moreStyle,
        left: `${x}px`,
        top: `${y}px`,
        opacity: isDragging ? "0.5" : "1",
      }}
      draggable
    >
      {renderString(width)}
    </div>
  );
}

export default BreakpointIndicator;

const mainStyle: React.CSSProperties = {
  position: "fixed",
  backgroundColor: "#d81d1d",
  color: "#fff",
  padding: "10px",
  borderRadius: "5px",
  fontSize: "12px",
  zIndex: 999,
  cursor: "move",
};
