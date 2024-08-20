import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Alert } from "react-bootstrap";

const PublishPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://blog.vallarasuk.com/wp-json/wp/v2/posts",
        {
          title,
          content,
          status: "publish",
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_JWT_TOKEN}`,
          },
        }
      );

      setMessage("Post published successfully!");
      setIsSuccess(true);
    } catch (error) {
      console.log(
        "Error:",
        error.response ? error.response.data : error.message
      );
      setMessage("Error publishing post. Please try again.");
      setIsSuccess(false);
    }
  };

  return (
    <Container>
      <h2>Publish a New Post</h2>
      {message && (
        <Alert variant={isSuccess ? "success" : "danger"}>{message}</Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formContent">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Enter post content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit">Publish</Button>
      </Form>
    </Container>
  );
};

export default PublishPost;
