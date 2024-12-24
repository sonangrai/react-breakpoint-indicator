# React Breakpoint Indicator

A react component widget that shows current width information for frontend developers. The initial position is top-left, but it can be dragged and it will reposition to either top-right, bottom-left, or bottom-right.

![react-breakpoint-indicator](https://github.com/sonangrai/react-breakpoint-indicator/blob/main/public/info.png)

The default breakpoints are:

- SM: <= 640px
- MD: <= 768px
- LG: <= 1024px
- XL: <= 1280px
- 2XL: > 1280px

## Installation

```bash
npm install -D react-breakpoint-indicator
```

or

```bash
yarn add -D react-breakpoint-indicator
```

## Usage

Import the component in your project root.

```tsx
import BreakpointIndicator from "react-breakpoint-indicator";

const App = () => {
  return <BreakpointIndicator />;
};

export default App;
```

## Props

- `moreStyle`: Custom CSS styles for the component.
- `disableDev`: Disable the component in development mode check. Enabling this will make component work on production as well.
