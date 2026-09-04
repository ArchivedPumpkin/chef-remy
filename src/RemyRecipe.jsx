import React from 'react'
import ReactMarkdown from 'react-markdown'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function RemyRecipe({ recipe, isLoading }) {
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
                <Skeleton count={5.5} />
            ) : (
                <ReactMarkdown>
                    {recipe}
                </ReactMarkdown>
            )}
        </section>
    )
}