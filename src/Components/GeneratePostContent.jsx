import React, { useState } from "react";
import { OpenAI } from "openai";

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY
});

const GeneratePostContent = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const trends = [
    "Leicester City vs Tottenham",
    "Justice Hema Committee report Malayalam",
    "Happy Raksha Bandhan",
    // ... more trends
  ];

  const generateContent = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await openai.completions.create({
        model: "gpt-3.5-turbo",
        prompt: `Generate a blog post content based on these trending topics: ${trends.join(", ")}`,
        max_tokens: 500,
      });

      setContent(response.choices[0].text);
    } catch (err) {
      setError("Failed to generate content.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Generate Post Content</h2>
      <button onClick={generateContent} disabled={loading}>
        {loading ? "Generating..." : "Generate Content"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <h3>Generated Content:</h3>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default GeneratePostContent;
