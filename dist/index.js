"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
/**
 * A component that shows the current breakpoint in the bottom left corner of the screen.
 * It is only visible in development mode.
 */
function BreakpointPeek({ moreStyle }) {
    const [width, setWidth] = (0, react_1.useState)(0);
    if (process.env.NODE_ENV === "production")
        return null;
    (0, react_1.useEffect)(() => {
        function handleResize() {
            setWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    function renderString(width) {
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
    return ((0, jsx_runtime_1.jsx)("div", { style: Object.assign(Object.assign({}, mainStyle), moreStyle), children: renderString(width) }));
}
exports.default = BreakpointPeek;
const mainStyle = {
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
