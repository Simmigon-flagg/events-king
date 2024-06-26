"use client";

import Input from "@mui/joy/Input";
import FormLabel from "@mui/joy/FormLabel";
import Textarea from "@mui/joy/Textarea";
import './Form.css';

const EditTopicForm = ({ edit, handleChange }) => {
  return (
    
        <div className="edit-topic-form-container">
          <div className="input-field">
            <FormLabel>Session Title</FormLabel>
            <Input
              type="text"
              onChange={handleChange}
              value={edit?.title}
              name="title"
            />
          </div>

          <div className="input-field">
            <FormLabel>Speaker</FormLabel>
            <Input
              type="text"
              onChange={handleChange}
              value={edit?.speaker}
              name="speaker"
            />
          </div>

          <div className="input-field">
            <FormLabel>Date</FormLabel>
            <Input
              type="text"
              onChange={handleChange}
              value={edit?.date}
              name="date"
            />
          </div>

          <div className="input-field">
            <FormLabel>Time</FormLabel>
            <Input
              type="text"
              onChange={handleChange}
              value={edit?.time}
              name="time"
            />
          </div>

          <div className="input-field">
            <FormLabel>Location</FormLabel>
            <Input
              type="text"
              onChange={handleChange}
              value={edit?.location}
              name="location"
            />
          </div>
          <div className="input-field">
            <FormLabel>Description</FormLabel>
            <Textarea
              minRows={4}
              maxRows={5}
              type="text"
              onChange={handleChange}
              value={edit?.description}
              name="description"
            />
          </div>
        </div>
  
  );
};

export default EditTopicForm;
