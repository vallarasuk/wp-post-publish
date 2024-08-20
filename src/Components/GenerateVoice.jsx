import React, { useState } from "react";
import { OpenAI } from "openai";

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY
});

const GenerateInstagramDescription = () => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateDescription = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await openai.completions.create({
        model: "gpt-3.5-turbo",
        prompt:
          "Write an engaging Instagram post description for a new product launch.",
        max_tokens: 150,
      });

      setDescription(response.choices[0].text);
    } catch (err) {
      setError("Failed to generate description.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Generate Instagram Description</h2>
      <button onClick={generateDescription} disabled={loading}>
        {loading ? "Generating..." : "Generate Description"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <h3>Generated Description:</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default GenerateInstagramDescription;
