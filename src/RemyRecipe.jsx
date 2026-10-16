import React from 'react'
import ReactMarkdown from 'react-markdown'
import CookingRemy from './CookingRemy'

export default function RemyRecipe({ recipe, isLoading, ingredients }) {
    const recipeRef = React.useRef(null)

    React.useEffect(() => {
        if (recipeRef.current) {
            recipeRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [])

    console.log(recipe);
    return (
        <section ref={recipeRef} className="generated-recipe-container" aria-live="polite">
            <h2>Chef Remy Recommends:</h2>
            {isLoading ? (
                <CookingRemy ingredients={ingredients} />
            ) : (
                <ReactMarkdown>
                    {recipe}
                </ReactMarkdown>
            )}
        </section>
    )
}
