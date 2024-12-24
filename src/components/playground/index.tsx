import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import BreakpointIndicator from "../../index";
import { Button } from "../ui/button";

function PlayGround() {
  const [activePort, setActivePort] = useState<
    "SM" | "MD" | "LG" | "XL" | "2XL"
  >("SM");

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) {
        setActivePort("SM");
      } else if (window.innerWidth < 768) {
        setActivePort("MD");
      } else if (window.innerWidth < 1024) {
        setActivePort("LG");
      } else if (window.innerWidth < 1280) {
        setActivePort("XL");
      } else {
        setActivePort("2XL");
      }
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center justify-between gap-2 mx-auto">
        <h4 className="text-xs md:text-sm font-medium underline-offset-2 hover:underline">
          Various ViewPort
        </h4>
        <div className="flex gap-2 border p-2 rounded-md">
          <Button
            size="sm"
            className="w-6 h-6"
            variant={activePort === "SM" ? "default" : "outline"}
            disabled
          >
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
          </Button>

          <Button
            size="sm"
            className="w-6 h-6"
            variant={activePort === "MD" ? "default" : "outline"}
            disabled
          >
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
          </Button>

          <Button
            size="sm"
            className="w-6 h-6"
            variant={activePort === "LG" ? "default" : "outline"}
            disabled
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5" />
            </svg>
          </Button>

          <Button
            size="sm"
            className="w-6 h-6"
            variant={activePort === "XL" ? "default" : "outline"}
            disabled
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M0 4s0-2 2-2h12s2 0 2 2v6s0 2-2 2h-4q0 1 .25 1.5H11a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1h.75Q6 13 6 12H2s-2 0-2-2zm1.398-.855a.76.76 0 0 0-.254.302A1.5 1.5 0 0 0 1 4.01V10c0 .325.078.502.145.602q.105.156.302.254a1.5 1.5 0 0 0 .538.143L2.01 11H14c.325 0 .502-.078.602-.145a.76.76 0 0 0 .254-.302 1.5 1.5 0 0 0 .143-.538L15 9.99V4c0-.325-.078-.502-.145-.602a.76.76 0 0 0-.302-.254A1.5 1.5 0 0 0 13.99 3H2c-.325 0-.502.078-.602.145" />
            </svg>
          </Button>

          <Button
            size="sm"
            className="w-6 h-6"
            variant={activePort === "2XL" ? "default" : "outline"}
            onClick={() => setActivePort("2XL")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 1a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1zm1 13.5a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0m2 0a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0M9.5 1a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM9 3.5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 0-1h-5a.5.5 0 0 0-.5.5M1.5 2A1.5 1.5 0 0 0 0 3.5v7A1.5 1.5 0 0 0 1.5 12H6v2h-.5a.5.5 0 0 0 0 1H7v-4H1.5a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5H7V2z" />
            </svg>
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "relative mx-auto border rounded-sm flex items-center justify-center",
          activePort === "2XL"
            ? "w-[1200px] h-[600px]"
            : activePort === "XL"
              ? "w-[900px] h-[400px]"
              : activePort === "LG"
                ? "w-[700px] h-[300px]"
                : activePort === "MD"
                  ? "w-[400px] h-[200px]"
                  : "w-[250px] h-[500px]"
        )}
      >
        <BreakpointIndicator disableDev />
        <p className="text-sm text-gray-500 text-center">
          Open Inspect and change viewport size to preview the changes detected
          by the `BreakpointIndicator`
          <pre>cmd + option + i or Control + Shift + C</pre> .
        </p>
      </div>
    </div>
  );
}

export default PlayGround;
