import React from "react";
import TopicsList from "../components/TopicsPage/TopicsList";
import { Container } from "@mui/material";
import "./topics.css";
import PageTitle from "../components/PageTitle/PageTitle";
const Topics = () => {
  return (
    <Container fixed>
      <PageTitle heading="Sessions / Topics" subheading="" />
      <div>
        <TopicsList />
      </div>
    </Container>
  );
};

export default Topics;
