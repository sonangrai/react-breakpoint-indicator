import { useEffect, useRef, useState } from "react";

function useDragging() {
  const [isDragging, setIsDragging] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  function onMouseMove(e: MouseEvent) {
    if (!isDragging) return;
    if (ref.current)
      setPos({
        x: e.x - (ref.current as HTMLElement).offsetWidth / 2,
        y: e.y - (ref.current as HTMLElement).offsetHeight / 2,
      });
    e.stopPropagation();
    e.preventDefault();
  }

  function onMouseUp(e: MouseEvent) {
    setIsDragging(false);
    e.stopPropagation();
    e.preventDefault();
  }

  function onMouseDown(e: MouseEvent) {
    if (e.button !== 0) return;
    setIsDragging(true);
    if (ref.current)
      setPos({
        x: e.x - (ref.current as HTMLElement).offsetWidth / 2,
        y: e.y - (ref.current as HTMLElement).offsetHeight / 2,
      });

    e.stopPropagation();
    e.preventDefault();
  }

  // When the element mounts, attach an mousedown listener
  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current as HTMLElement;
    if (element) element.addEventListener("mousedown", onMouseDown);

    return () => {
      element.removeEventListener("mousedown", onMouseDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]);

  // Every time the isDragging state changes, assign or remove
  // the corresponding mousemove and mouseup handlers
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mouseup", onMouseUp);
      document.addEventListener("mousemove", onMouseMove);
    } else {
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousemove", onMouseMove);
    }
    return () => {
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousemove", onMouseMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);

  return [ref, pos.x, pos.y, isDragging];
}

export default useDragging;
