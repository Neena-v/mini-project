import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

const RecipeGenerator = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFallback, setIsFallback] = useState(false);

  const generateRecipe = async (e) => {
    e.preventDefault();
    if (!ingredients.trim()) return;

    setLoading(true);
    setRecipe('');
    setIsFallback(false);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Create a step-by-step recipe using these ingredients: ${ingredients}. Give recipe name, ingredient list, and simple instructions.`,
      });

      setRecipe(response.text);
    } catch (err) {
      console.error(err);
      
      setIsFallback(true);
      setRecipe(`🍳 Quick Recipe (Server Busy Backup Mode):

1. Heat 1-2 tbsp oil in a pan.
2. Add your available ingredients (${ingredients}) and sauté for 5 minutes.
3. Add salt, pepper, and your favorite spices to taste.
4. Cook until tender and serve hot!

Note: High demand on AI server. Showing a quick fallback recipe!`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '650px',
      margin: '30px auto',
      padding: '30px',
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#1f2937', margin: '0 0 8px 0' }}>
          🍳 AI Recipe Generator
        </h2>
        <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
          Enter the ingredients you have, and let AI cook up a recipe for you!
        </p>
      </div>

      <form onSubmit={generateRecipe} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <textarea
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '12px',
            border: '2px solid #e5e7eb',
            fontSize: '15px',
            minHeight: '110px',
            boxSizing: 'border-box',
            outline: 'none',
            transition: 'border-color 0.2s',
            resize: 'vertical'
          }}
          placeholder="e.g., Rice, Egg, Onion, Tomato..."
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: loading ? '#9ca3af' : '#6366f1',
            color: '#ffffff',
            fontWeight: '600',
            padding: '14px 20px',
            borderRadius: '12px',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            boxShadow: loading ? 'none' : '0 4px 12px rgba(99, 102, 241, 0.3)',
            transition: 'all 0.2s ease-in-out'
          }}
        >
          {loading ? 'Generating Recipe...' : 'Generate Recipe ✨'}
        </button>
      </form>

      {recipe && (
        <div style={{
          marginTop: '28px',
          padding: '24px',
          backgroundColor: isFallback ? '#fffbe6' : '#f8fafc',
          border: isFallback ? '1px solid #ffe58f' : '1px solid #e2e8f0',
          borderRadius: '14px',
          whiteSpace: 'pre-line',
          color: '#334155',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h3 style={{ fontWeight: '700', fontSize: '18px', color: '#0f172a', margin: 0 }}>
              📖 {isFallback ? 'Quick Fallback Recipe' : 'Your Recipe'}
            </h3>
            {isFallback && (
              <span style={{ fontSize: '12px', backgroundColor: '#faad14', color: '#fff', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>
                Offline Mode
              </span>
            )}
          </div>
          <div style={{ lineHeight: '1.7', fontSize: '15px' }}>
            {recipe}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeGenerator;