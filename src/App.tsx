import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <svg className="head" viewBox="0 0 16 16">
      <circle className="face" cx="8" cy="8" r="7" />
      <ellipse className="eye" cx="5" cy="6.5" rx="1.5" ry="2.5" />
      <ellipse className="pupil" cx="5" cy="7.5" rx="0.375" ry="0.625" />
      <ellipse className="eye" cx="11" cy="6.5" rx="1.5" ry="2.5" />
      <ellipse className="pupil" cx="11" cy="7.5" rx="0.375" ry="0.625" />
      <path
        className="mouth"
        d="
          M 4,10
          A 3,2 0 0 0 12,10
          L 4,10
        "
      />
      {/* top teeth */}
      <line className="tooth" x1="5.1" y1="10.3" x2="5.1" y2="10.8" />
      <line className="tooth" x1="6.3" y1="10.3" x2="6.3" y2="11" />
      <line className="tooth" x1="7.4" y1="10.3" x2="7.4" y2="11.2" />
      <line className="tooth" x1="8.6" y1="10.3" x2="8.6" y2="11.2" />
      <line className="tooth" x1="9.7" y1="10.3" x2="9.7" y2="11" />
      <line className="tooth" x1="10.9" y1="10.3" x2="10.9" y2="10.8" />

      {/* bottom teeth */}
      <line className="tooth" x1="5.1" y1="11.1" x2="5.1" y2="11.9" />
      <line className="tooth" x1="6.3" y1="11.3" x2="6.3" y2="12.1" />
      <line className="tooth" x1="7.4" y1="11.5" y2="12.3" x2="7.4" />
      <line className="tooth" x1="8.6" y1="11.5" x2="8.6" y2="12.7" />
      <line className="tooth" x1="9.7" y1="11.3" x2="9.7" y2="12.7" />
      <line className="tooth" x1="10.9" y1="11.1" x2="10.9" y2="12.1" />
      <path
        className="lips"
        d="
          M 4,10
          A 3,2 0 0 0 12,10
          L 4,10
        "
      />
    </svg>
  );
}

export default App;
