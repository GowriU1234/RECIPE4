// File: App.jsx
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function App() {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);

  const generateRecipe = async () => {
    setLoading(true);
    setRecipe("");
    try {
      const response = await fetch("https://your-render-backend-url.onrender.com/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients }),
      });
      const data = await response.json();
      setRecipe(data.recipe);
    } catch (error) {
      setRecipe("Error generating recipe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-4">AI Recipe Generator</h1>
          <Input
            placeholder="Enter ingredients (e.g., tomato, onion, garlic)"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="mb-4"
          />
          <Button onClick={generateRecipe} disabled={loading} className="w-full">
            {loading ? "Generating..." : "Generate Recipe"}
          </Button>
          {recipe && (
            <div className="mt-6 whitespace-pre-wrap bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-2">Recipe:</h2>
              <p>{recipe}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
