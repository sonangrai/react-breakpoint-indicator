import React, { useCallback, useEffect, useRef, useState } from "react";
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

  if (process.env.NODE_ENV === "production") return null;

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
      {renderString(width)}
    </div>
  );
}

export default BreakpointIndicator;

const mainStyle: React.CSSProperties = {
  position: "fixed",
  backgroundColor: "rgb(179 21 116)",
  color: "#fff",
  padding: "10px",
  borderRadius: "5px",
  fontSize: "12px",
  zIndex: 999,
  cursor: "move",
  transition: "all 0.2s ease",
};
