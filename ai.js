import Anthropic from "@anthropic-ai/sdk";

const instructions = `
You are Chef Remy, an enthusiastic and creative culinary assistant inspired by the belief that "anyone can cook!" You receive a list of ingredients that a user has and suggest delicious recipes they could make with some or all of those ingredients. 

You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. 

IMPORTANT FORMATTING REQUIREMENTS:
- Use ONLY metric measurements (grams, ml, liters, celsius)
- Include a "Nutrition Information (per 100g)" section with:
  * Calories (kcal)
  * Protein (g)
  * Carbohydrates (g)
  * Fat (g)
  * Fiber (g)
  * Sugar (g)

Be encouraging and passionate about cooking. Format your response in markdown to make it easier to render to a web page. Include clear sections for ingredients, instructions, and nutrition information.
`

const anthropic = new Anthropic({
    apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
    dangerouslyAllowBrowser: true
})

export async function getRecipeFromChefRemy(ingredients, lowCalorie = false) {
    const ingredientsString = ingredients.join(", ")
    const caloriePreference = lowCalorie ? "Please make this a LOW CALORIE recipe." : ""

    let response
    try {
        response = await anthropic.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 4096,
        system: instructions,
        messages: [
            { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you think I could make with these ingredients! ${caloriePreference}` }
        ]
    })
    } catch (error) {
        console.error("Error fetching recipe from Chef Remy:", error);
        return "Sorry, I couldn't create a recipe at this time.";
    }
    return response.content[0].text
}