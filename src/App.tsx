import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <svg viewBox="0 0 16 16">
      <path
        d="
      M 2,2
      A 4,4 0 0 0 14,2
      L 2,2
    "
      />
    </svg>
  );
}

export default App;
