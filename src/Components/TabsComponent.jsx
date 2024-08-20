// TabsComponent.jsx
import React, { useState } from "react";
import { Tabs, Tab, Container } from "react-bootstrap";
import PublishPost from "./PublishPost";
import ListPosts from "./ListPosts";
import "bootstrap/dist/css/bootstrap.min.css";
import GeneratePostContent from "./GeneratePostContent";
import GenerateImage from "./GeneratePostImage";
import GenerateInstagramDescription from "./GenerateVoice";

const TabsComponent = () => {
  const [key, setKey] = useState("publish");

  return (
    <Container className="my-5">
      <h2 className="mb-4">Manage Posts</h2>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="publish" title="Publish Post">
          <PublishPost />
        </Tab>
        <Tab eventKey="list" title="List Posts">
          <ListPosts />
        </Tab>

        <Tab eventKey="Generate" title="Generate Posts">
          <GeneratePostContent />
        </Tab>

        <Tab eventKey="Image Generate" title="Generate Image">
          {/* <GenerateImage /> */}
        </Tab>

        <Tab eventKey="Voice" title="Generate Voice">
          {/* <GenerateInstagramDescription /> */}
        </Tab>
      </Tabs>
    </Container>
  );
};

export default TabsComponent;
