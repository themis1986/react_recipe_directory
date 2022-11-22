import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
// *components
import Searchbar from "./Searchbar";
// *styles
import "./Navbar.css";

import React from "react";

export default function Navbar() {
  const { color, changeColor } = useTheme();

  return (
    <div className="navbar" style={{ background: color }}>
      <nav onClick={() => changeColor("pink")}>
        <Link to="/" className="brand">
          <h1>Cooking Ninja</h1>
        </Link>
        <Searchbar />
        <Link to="/create">Create Recipe</Link>
      </nav>
    </div>
  );
}
