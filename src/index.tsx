import React, { useEffect, useState } from "react";

type BreakpointPeekProps = {
  moreStyle?: React.CSSProperties;
};

/**
 * A component that shows the current breakpoint in the bottom left corner of the screen.
 * It is only visible in development mode.
 */
function BreakpointPeek({ moreStyle }: BreakpointPeekProps) {
  const [width, setWidth] = useState<number>(0);
  if (process.env.NODE_ENV === "production") return null;

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
      style={{
        ...mainStyle,
        ...moreStyle,
      }}
    >
      {renderString(width)}
    </div>
  );
}

export default BreakpointPeek;

const mainStyle: React.CSSProperties = {
  position: "fixed",
  bottom: "10px",
  left: "10px",
  backgroundColor: "#d81d1d",
  color: "#fff",
  padding: "10px",
  borderRadius: "5px",
  fontSize: "12px",
  zIndex: 999,
};
