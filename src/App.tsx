import PlayGround from "./components/playground/index.tsx";

function App() {
  return (
    <main className="py-12">
      <div className="container mx-auto">
        <div className="flex flex-col">
          <div className="text-center mb-2">
            <h1 className="text-2xl font-bold text-gray-600">
              {">_"} React Breakpoint Indicator
            </h1>

            <p className="text-sm text-gray-500 max-w-[600px] mx-auto">
              <pre className="inline-block">{`<BreakpointIndicator />`}</pre> is
              a component that displays the current breakpoint of the screen. It
              is a simple and easy way to display the current breakpoint of the
              screen which can be helpful for{" "}
              <a href="https://react.dev/" target="_blank">
                React
              </a>{" "}
              Developer.{" "}
              <em>
                Note: It's useful for development only & it follows{" "}
                <a href="https://tailwindcss.com/" target="_blank">
                  Tailwind
                </a>{" "}
                CSS breakpoints.
              </em>
            </p>
          </div>
          <div className="flex justify-center">
            <PlayGround />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
