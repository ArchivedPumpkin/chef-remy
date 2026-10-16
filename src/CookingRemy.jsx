import React from 'react'
import remy from './assets/remy.webp'

const MESSAGES = [
    "Sniffing out the best flavours…",
    "Stirring the pot…",
    "Tasting the sauce… needs more garlic!",
    "Hiding from the health inspector…",
    "Adding a pinch of magic…",
    "Chopping at rat speed…",
    "Plating it up…",
]

const MAX_FLYING_INGREDIENTS = 6
const FLY_DURATION = 3.6 // seconds, keep in sync with .flying-ingredient in index.css

export default function CookingRemy({ ingredients = [] }) {
    const [messageIndex, setMessageIndex] = React.useState(0)

    React.useEffect(() => {
        const id = setInterval(() => {
            setMessageIndex(i => (i + 1) % MESSAGES.length)
        }, 2500)
        return () => clearInterval(id)
    }, [])

    const flying = ingredients.slice(0, MAX_FLYING_INGREDIENTS)
    const stagger = flying.length > 0 ? FLY_DURATION / flying.length : 0

    return (
        <div className="cooking-remy" role="status">
            <span className="sr-only">Chef Remy is cooking up your recipe…</span>

            <div className="cooking-scene" aria-hidden="true">
                <img className="cooking-remy-chef" src={remy} alt="" />

                {flying.map((ingredient, i) => (
                    <span
                        key={`${ingredient}-${i}`}
                        className="flying-ingredient"
                        style={{
                            '--side': i % 2 === 0 ? -1 : 1,
                            animationDelay: `${i * stagger}s`,
                        }}
                    >
                        {ingredient}
                    </span>
                ))}

                <svg className="cooking-pot" viewBox="0 -40 200 170">
                    {/* Steam */}
                    <path className="steam steam-1" d="M118 22 q-8 -10 0 -20 t0 -20" />
                    <path className="steam steam-2" d="M142 22 q-8 -10 0 -20 t0 -20" />

                    {/* Wooden spoon */}
                    <g className="spoon">
                        <line x1="150" y1="34" x2="182" y2="-28" />
                    </g>

                    {/* Soup */}
                    <ellipse className="soup" cx="100" cy="34" rx="70" ry="6" />
                    <circle className="bubble bubble-1" cx="70" cy="33" r="3" />
                    <circle className="bubble bubble-2" cx="104" cy="32" r="2.5" />
                    <circle className="bubble bubble-3" cx="130" cy="34" r="2" />

                    {/* Pot */}
                    <rect className="pot-handle" x="4" y="50" width="26" height="10" rx="5" />
                    <rect className="pot-handle" x="170" y="50" width="26" height="10" rx="5" />
                    <path className="pot-body" d="M28 40 H172 V92 Q172 112 152 112 H48 Q28 112 28 92 Z" />
                    <rect className="pot-rim" x="20" y="32" width="160" height="12" rx="6" />
                    <rect className="pot-shine" x="44" y="54" width="8" height="34" rx="4" />

                    {/* Flames */}
                    <path className="flame flame-1" d="M72 128 q-9 -9 0 -18 q9 9 0 18 Z" />
                    <path className="flame flame-2" d="M100 128 q-11 -11 0 -22 q11 11 0 22 Z" />
                    <path className="flame flame-3" d="M128 128 q-9 -9 0 -18 q9 9 0 18 Z" />
                </svg>
            </div>

            <p key={messageIndex} className="cooking-message" aria-hidden="true">
                {MESSAGES[messageIndex]}
            </p>
        </div>
    )
}
