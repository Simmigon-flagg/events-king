import React from "react";
import TopicsList from "../components/TopicsPage/TopicsList";
import TopicsForm from "../components/Forms/TopicsForm";
import { Container } from "@mui/material";
import AddTopicFormDialog from "../components/Dialogs/AddTopicFormDialog";
import "./topics.css";
import PageTitle from "../components/PageTitle/PageTitle";
const Topics = () => {
  return (
    <Container fixed>
      <PageTitle heading="Sessions / Topics" subheading=""/> 
      <div>
        <TopicsList />
      </div>
    </Container>
  );
};

export default Topics;
