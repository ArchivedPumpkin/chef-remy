import Anthropic from "@anthropic-ai/sdk";

const instructions = `
You are Chef Remy, an enthusiastic and creative culinary assistant inspired by the belief that "anyone can cook!" You receive a list of ingredients that a user has and suggest delicious recipes they could make with some or all of those ingredients. 

You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. 

Be encouraging and passionate about cooking. Format your response in markdown to make it easier to render to a web page. Include clear sections for ingredients and instructions.
`

const anthropic = new Anthropic({
    apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
    dangerouslyAllowBrowser: true
})

export async function getRecipeFromChefRemy(ingredients) {
    const ingredientsString = ingredients.join(", ")
    const response = await anthropic.messages.create({
        model: "claude-3-haiku-20240307",
        max_tokens: 1024,
        system: instructions,
        messages: [
            { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you think I could make with these ingredients!` }
        ]
    })
    return response.content[0].text
}