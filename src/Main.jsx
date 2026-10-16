import React from "react";
import RemyRecipe from "./RemyRecipe";
import IngredientsList from "./IngredientsList";

export default function Main() {
  const [ingredients, setIngredients] = React.useState([]);
  const [showRecipe, setShowRecipe] = React.useState("");
  const recipeSection = React.useRef(null);
  const ingredientsSection = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [lowCalorie, setLowCalorie] = React.useState(false);

  React.useEffect(() => {
    if (showRecipe && recipeSection.current !== null) {
      recipeSection.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showRecipe]);

  React.useEffect(() => {
    if (ingredients.length > 0 && ingredientsSection.current !== null) {
      ingredientsSection.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [ingredients.length]);

  function handleSubmit(formData) {
    const newIngredient = formData.get("ingredient");
    if (newIngredient.trim()) {
      const ingredientsArr = newIngredient
        .split(",")
        .map((ingredient) => ingredient.trim())
        .filter((ingredient) => ingredient.length > 0);

      setIngredients((prevIngredients) => [
        ...prevIngredients,
        ...ingredientsArr,
      ]);
    }
  }

  function startOver() {
    setIngredients([]);
    setShowRecipe("");
    setLowCalorie(false);
  }

  async function getRecipe() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients, lowCalories: lowCalorie }),
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch recipe with status: ${res.status}`);
      }
      const data = await res.json();
      setShowRecipe(data.recipe);
    } catch (error) {
      console.error("Error fetching recipe from Chef Remy:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main>
      <form
        action={showRecipe ? startOver : handleSubmit}
        className="add-ingredient-form"
      >
        <input
          type="text"
          placeholder="e.g. tomatoes, basil, garlic..."
          aria-label="Add ingredient"
          name="ingredient"
          required={!showRecipe}
        />
        <button>{showRecipe ? "Start Over" : "Add Ingredient"}</button>
      </form>
      {ingredients.length > 0 && (
        <IngredientsList
          ref={ingredientsSection}
          ingredients={ingredients}
          getRecipe={getRecipe}
          lowCalorie={lowCalorie}
          setLowCalorie={setLowCalorie}
        />
      )}
      {(showRecipe || isLoading) && (
        <RemyRecipe
          ref={recipeSection}
          recipe={showRecipe}
          isLoading={isLoading}
        />
      )}
    </main>
  );
}
