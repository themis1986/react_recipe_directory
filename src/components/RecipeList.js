import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { projectFirestore } from "../firebase/config";
import trashcan from "../assets/trashcan.svg";
// *styles
import "./RecipeList.css";

export default function RecipeList({ recipes }) {
  const { mode } = useTheme();

  const handleClick = (id) => {
    projectFirestore.collection("recipes").doc(id).delete();
  };

  if (recipes.length === 0) {
    return <div className="error">No recipies to load...</div>;
  }

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className={`card ${mode}`}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>Cook this</Link>
          <img
            src={trashcan}
            alt="delete"
            className="delete"
            onClick={() => {
              handleClick(recipe.id);
            }}
          />
        </div>
      ))}
    </div>
  );
}
