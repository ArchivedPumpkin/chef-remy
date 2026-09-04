export default function IngredientsList({ ingredients, getRecipe, ref, lowCalorie, setLowCalorie }) {

    const ingredientElements = ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))

    return (

        <section>
            <h2>Ingredients on hand (minimum 4):</h2>
            <ul className="ingredients-list" aria-live="polite">{ingredientElements}</ul>
            {
                ingredients.length > 3 &&
                <div className="get-recipe-container">
                    <div ref={ref}>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                        <label className="low-calorie-toggle">
                            <span>Make it low calorie</span>
                            <div className="switch">
                                <input
                                    type="checkbox"
                                    checked={lowCalorie}
                                    onChange={(e) => setLowCalorie(e.target.checked)}
                                />
                                <span className="slider"></span>
                            </div>
                        </label>
                    </div>
                    <button onClick={getRecipe}>Get a recipe</button>
                </div>
            }
        </section>

    )
}