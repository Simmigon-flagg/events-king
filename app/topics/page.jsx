import React from "react";
import TopicsList from "../components/TopicsPage/TopicsList";
import TopicsForm from "../components/Forms/TopicsForm";
import { Container } from "@mui/material";
import TopicFormDialog from "../components/Dialogs/TopicFormDialog";
import "./topics.css";
const Topics = () => {
  return (
    <Container fixed>
      <h3>SESSION TOPICS</h3>
      <TopicFormDialog />
      <div>
        <TopicsList />
      </div>
    </Container>
  );
};

export default Topics;
