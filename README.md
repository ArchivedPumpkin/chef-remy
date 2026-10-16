# Chef Remy 🐭👨‍🍳

> "Anyone can cook!"  
> Transform your leftover ingredients into delicious meals with AI-powered recipe suggestions.

---

## About

Chef Remy is an intelligent cooking companion designed to solve the age-old problem of staring at leftover ingredients in your fridge with no idea what to make. Simply input what you have available, and Chef Remy generates creative, practical recipes tailored to your ingredients.


---

## ✨ Features

- 🤖 **AI-Powered Recipe Generation:**  
  Leverages Claude Haiku 5.5 (Anthropic) for intelligent, creative recipe suggestions
- 🔒 **Secure API Key Handling:**  
  All AI requests go through an Express backend, so the API key never reaches the browser
- 🥗 **Low Calorie Mode:**  
  Toggle for healthier recipe alternatives
- 📊 **Detailed Nutrition Information:**  
  Complete nutritional breakdown per 100g for every recipe
- 📏 **Metric Measurements:**  
  All measurements in grams, ml, and Celsius
- 🎨 **Modern UI/UX:**  
  Smooth animations, responsive design, and skeleton loading states
- 🔢 **Flexible Input:**  
  Add ingredients individually or multiple at once (comma-separated)
- 📱 **Fully Responsive:**  
  Works seamlessly on desktop and mobile devices

---

## 🛠️ Technology Stack

### Frontend

- **React 19** – Latest version for optimal performance and modern features
- **Vite 7.1** – Lightning-fast build tool and development server
- **React Markdown 10.1** – Beautiful markdown rendering for recipes
- **React Loading Skeleton 3.5** – Elegant loading states
- **CSS3** – Custom animations and styling

### Backend

- **Node.js + Express 5** – API server that handles recipe requests
- **Netlify Functions + serverless-http** – Runs the Express app serverlessly in production
- **dotenv** – Loads the API key from a local `.env` file during development

### AI & APIs

- **Anthropic Claude API** – Claude Haiku 5.5 (`claude-haiku-5-5`) at low effort for fast, low-cost recipe generation
- **@anthropic-ai/sdk** – Official Anthropic SDK, used only on the server

---

## 🎯 How It Works

1. **Enter your available ingredients** into the input field.
2. **Add as many ingredients as you like** (minimum 4, maximum 30).
3. **Optionally toggle "Low Calorie" mode** for healthier options.
4. **Click "Get a recipe"** to generate your personalized recipe.
5. **Receive a complete recipe** with ingredients, step-by-step instructions, and nutrition info.

### Under the hood

```
React app ──POST /api/recipe──▶ Express server ──▶ Claude API
   ▲                                │
   └──────────── { recipe } ────────┘
```

The React frontend sends the ingredients to the Express server. The server validates them, calls Claude with the API key stored in its environment, and returns the recipe as markdown. The browser never sees the key.

The same Express app runs in two ways:

- **Locally**, `server/server.js` starts it as a normal server on port 3000.
- **On Netlify**, `netlify/functions/api.js` wraps it with `serverless-http` as a Netlify Function, and `netlify.toml` routes `/api/*` requests to it.

---

## 📁 Project Structure

```
chef-remy/
├── server/
│   ├── app.js           # Express app setup (shared by local server and Netlify)
│   ├── server.js        # Local development server, loads .env
│   ├── routes.js        # POST /api/recipe
│   └── controllers.js   # Input validation + Claude API call
├── netlify/
│   └── functions/
│       └── api.js       # Wraps the Express app as a Netlify Function
├── src/
│   ├── Main.jsx         # Ingredient input and recipe request
│   ├── IngredientsList.jsx
│   ├── RemyRecipe.jsx   # Renders the markdown recipe
│   └── ...
├── netlify.toml         # Build settings and /api/* redirect
├── vite.config.js       # Proxies /api to the Express server in development
└── api.env.example      # Template for your .env file
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or later
- An [Anthropic API key](https://console.anthropic.com/)

### Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Add your API key.** Copy `api.env.example` to `.env` and fill in your key:

   ```
   ANTHROPIC_API_KEY=your_api_key_here
   ```

   Do **not** prefix it with `VITE_`, as Vite would bundle it into the frontend code.

3. **Start the backend** (port 3000):

   ```bash
   npm start
   ```

4. **Start the frontend** in a second terminal (port 5173):

   ```bash
   npm run dev
   ```

5. Open http://localhost:5173. Vite forwards `/api` requests to the Express server.

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm start` | Start the Express API server |
| `npm run build` | Build the frontend for production into `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

---

## ☁️ Deployment (Netlify)

The app is deployed on Netlify. The React frontend is served as static files, and the Express backend runs as a Netlify Function.

1. **Connect the repository** to a new site in Netlify. Build settings are read from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
2. **Add the API key** under **Site configuration → Environment variables**:
   - Key: `ANTHROPIC_API_KEY`
   - Scope: must include **Functions**
3. **Push to `main`.** Netlify builds and deploys automatically.

If recipe generation fails in production, check **Logs → Functions → api** in the Netlify dashboard for the error from the Claude API.

