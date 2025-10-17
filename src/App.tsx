import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <svg className="mouth" viewBox="0 0 16 16">
      <line className="tooth" x1="3" y1="2.5" x2="3" y2="4" />
      <line className="tooth" x1="5" y1="2" x2="5" y2="4.5" />
      <line className="tooth" x1="7" y1="2" x2="7" y2="5" />
      <line className="tooth" x1="9" y1="2" x2="9" y2="5" />
      <line className="tooth" x1="11" y1="2" x2="11" y2="4.5" />
      <line className="tooth" x1="13" y1="2.5" x2="13" y2="4" />
      <line className="tooth" x1="5" y1="5" x2="5" y2="7" />
      <line className="tooth" x1="7" y1="5.5" x2="7" y2="7.5" />
      <line className="tooth" x1="9" y1="5.5" x2="9" y2="7.5" />
      <line className="tooth" x1="11" y1="5" x2="11" y2="7" />
      <path
        className="lips"
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
