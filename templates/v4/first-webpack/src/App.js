import { Link } from "react-router-dom";
import React from "react";
import BgComponent from '@/components/BgComponent';
import './style.css';

function App() {
  return (
    <div className="home-page">
      <BgComponent />
      {/*/!*导航区*!/*/}
      {/*<Link to="/test1">test1</Link>*/}
      {/*<div/>*/}
      {/*<Link to="/useEffect">useEffect</Link>*/}
      {/*<div/>*/}
      {/*<div/>*/}
      <div className="title">
        <span ></span> FIRST-WEBPACK <span></span>
      </div>
    </div>
  );
}

export default App;
