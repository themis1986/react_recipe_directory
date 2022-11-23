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
    projectFirestore
      .collection("recipes")
      .doc(id)
      .get()
      .then((doc) => {
        console.log(doc);
        if (doc.exists) {
          setRecipe({ ...doc.data(), id: doc.id });
        } else {
          throw new Error("Could not find that recipe!");
        }
        setIsPending(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  }, [id]);

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
        </>
      )}
    </div>
  );
}
