import React, { useEffect, useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import { useParams } from "react-router-dom";
import { projectFirestore } from "../../firebase/config";
// *styles
import "./Recipe.css";

export default function Recipe() {
  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  const { mode } = useTheme();

  const { id } = useParams();

  useEffect(() => {
    setIsPending(true);
    const unsub = projectFirestore
      .collection("recipes")
      .doc(id)
      .onSnapshot(
        (doc) => {
          console.log(doc);
          if (doc.exists) {
            setRecipe({ ...doc.data() });
          } else {
            throw new Error("Could not find that recipe!");
          }
          setIsPending(false);
        },
        (err) => {
          setError(err.message);
          setIsPending(false);
        }
      );

    return () => unsub();
  }, [id]);

  const handleClick = () => {
    projectFirestore
      .collection("recipes")
      .doc(id)
      .update({
        title: `Click button for real time data update (Random number generated on every real time change: ${Math.floor(
          Math.random() * 100
        )})`,
      });
  };

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
          <button onClick={handleClick}>Update me</button>
        </>
      )}
    </div>
  );
}
