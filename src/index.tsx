import React, { useCallback, useEffect, useRef, useState } from "react";
import useDragging from "./hooks/useDragging";

type BreakpointIndicatorProps = {
  moreStyle?: React.CSSProperties;
  disableDev?: boolean;
};

/**
 * A component that shows the current breakpoint in the bottom left corner of the screen.
 * It is only visible in development mode.
 */
function BreakpointIndicator({
  moreStyle,
  disableDev = false,
}: BreakpointIndicatorProps) {
  const [width, setWidth] = useState<number>(0);
  const draggingRef = useRef<HTMLDivElement>(null);
  const { pos, isDragging } = useDragging(draggingRef);

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

  // This is to make the indicator stick to the right or bottom of the screen when not dragging
  useEffect(() => {
    let top;
    let left;

    function updatePosition() {
      const element = draggingRef.current;

      if (element && !isDragging) {
        if (pos.x < window.innerWidth / 2) {
          left = `0%`;
        } else {
          left = `calc(100% - ${element?.clientWidth}px)`;
        }

        if (pos.y < window.innerHeight / 2) {
          top = `0%`;
        } else {
          top = `calc(100% - ${element?.clientHeight}px)`;
        }

        element.style.setProperty("left", `${left}`);
        element.style.setProperty("top", `${top}`);
      }
    }

    window.addEventListener("resize", updatePosition);

    updatePosition();

    return () => {
      window.removeEventListener("resize", updatePosition);
    };
  }, [pos, isDragging]);

  const percentagePosition = useCallback((pos: { x: number; y: number }) => {
    return {
      left: `${(pos.x / window.innerWidth) * 100}%`,
      top: `${(pos.y / window.innerHeight) * 100}%`,
    };
  }, []);

  const renderString = useCallback((width: number) => {
    let result = "";
    switch (true) {
      case width <= 640:
        result = "SM";
        break;

      case width <= 768:
        result = "MD";
        break;

      case width <= 1024:
        result = "LG";
        break;

      case width <= 1280:
        result = "XL";
        break;

      default:
        result = "2XL";
        break;
    }

    return result;
  }, []);

  if (!disableDev && process.env.NODE_ENV === "production") return null;

  return (
    <div
      ref={draggingRef as React.RefObject<HTMLDivElement>}
      style={{
        ...mainStyle,
        ...moreStyle,
        left: percentagePosition(pos).left,
        top: percentagePosition(pos).top,
        opacity: isDragging ? "0.5" : "1",
      }}
      title={`${width}px`}
      draggable
    >
      {getIcons(width)}
      {renderString(width)}
    </div>
  );
}

export default BreakpointIndicator;

const mainStyle: React.CSSProperties = {
  position: "absolute",
  backgroundColor: "rgb(179 21 116)",
  color: "#fff",
  padding: "10px",
  fontSize: "12px",
  zIndex: 999,
  cursor: "move",
  transition: "all 0.2s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "5px",
};

const getIcons = (width: number) => {
  if (width <= 640)
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
        <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
      </svg>
    );
  if (width <= 768)
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
        <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
      </svg>
    );
  if (width <= 1024)
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5" />
      </svg>
    );
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M0 4s0-2 2-2h12s2 0 2 2v6s0 2-2 2h-4q0 1 .25 1.5H11a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1h.75Q6 13 6 12H2s-2 0-2-2zm1.398-.855a.76.76 0 0 0-.254.302A1.5 1.5 0 0 0 1 4.01V10c0 .325.078.502.145.602q.105.156.302.254a1.5 1.5 0 0 0 .538.143L2.01 11H14c.325 0 .502-.078.602-.145a.76.76 0 0 0 .254-.302 1.5 1.5 0 0 0 .143-.538L15 9.99V4c0-.325-.078-.502-.145-.602a.76.76 0 0 0-.302-.254A1.5 1.5 0 0 0 13.99 3H2c-.325 0-.502.078-.602.145" />
    </svg>
  );
};
