// ListPosts.jsx
import React, { useState, useEffect } from "react";
import { Container, ListGroup, Alert } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const ListPosts = () => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://blog.vallarasuk.com/wp-json/wp/v2/posts",
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_JWT_TOKEN}`,
            },
          }
        );
        setPosts(response.data);
        setIsSuccess(true);
      } catch (error) {
        setMessage("Error fetching posts. Please try again.");
        setIsSuccess(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Container className="my-5">
      <h2 className="mb-4">List of Posts</h2>
      {message && (
        <Alert variant={isSuccess ? "success" : "danger"}>{message}</Alert>
      )}
      <ListGroup>
        {posts.map((post) => (
          <ListGroup.Item key={post.id}>
            <h5>{post.title.rendered}</h5>
            <p>{post.content.rendered.substring(0, 100)}...</p>
            <a href={post.link} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default ListPosts;
