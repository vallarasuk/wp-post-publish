import React, { useState } from "react";
import { OpenAI } from "openai";

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY
});

const GenerateImage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateImage = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await openai.images.generate({
        prompt: "A scenic view of a sunset",
        model: "dall-e-2",
        size: "1024x1024",
      });

      setImageUrl(response.data[0].url);
    } catch (err) {
      setError("Failed to generate image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Generate Image</h2>
      <button onClick={generateImage} disabled={loading}>
        {loading ? "Generating..." : "Generate Image"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {imageUrl && <img src={imageUrl} alt="Generated" />}
    </div>
  );
};

export default GenerateImage;
