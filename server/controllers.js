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
`;

const MAX_INGREDIENTS = 30;
const MAX_INGREDIENT_LENGTH = 50;

const anthropic = new Anthropic();

export async function getRecipe(req, res) {
  const { ingredients, lowCalories = false } = req.body;

  const valid =
    Array.isArray(ingredients) &&
    ingredients.length > 0 &&
    ingredients.length <= MAX_INGREDIENTS &&
    ingredients.every(
      (ingredient) =>
        typeof ingredient === "string" &&
        ingredient.length > 0 &&
        ingredient.length <= MAX_INGREDIENT_LENGTH,
    );

  if (!valid) {
    return res.status(400).json({ error: "Invalid ingredients" });
  }

  const ingredientsString = ingredients.join(", ");
  const caloriePreference =
    lowCalories === true ? "Please make this a LOW CALORIE recipe." : "";

  try {
    const response = await anthropic.messages.create({
      model: "claude-haiku-5-5",
      max_tokens: 4096,
      output_config: { effort: "low" },
      system: instructions,
      messages: [
        {
          role: "user",
          content: `I have ${ingredientsString}. Please give me a recipe you think I can make with these ingredients! ${caloriePreference}`,
        },
      ],
    });
    const recipe = response.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("");
    res.json({ recipe });
  } catch (err) {
    console.error("Error fetching recipe from Claude:", err);
    const status = err instanceof Anthropic.RateLimitError ? 429 : 502;
    res.status(status).json({ error: "Recipe generation failed" });
  }
}
