"use client";
import { Button, FormLabel, Input, Textarea } from "@mui/joy";


import './Form.css';


const EditEventForm = ({ edit, handleChange }) => {

  return (
    <div className="edit-form-container">
      <div className="input-field">
        <FormLabel>Session Title</FormLabel>
        <Input
          type="text"
          onChange={handleChange}
          value={edit?.title}
          name="title"
        />
      </div>
      {/* <input
          type="text"
          onChange={handleChange}
          value={edit.title}
          name="title"
          placeholder="title" 
        />*/}

      <div className="input-field">
        <FormLabel>Host</FormLabel>
        <Input
          type="text"
          onChange={handleChange}
          value={edit?.host}
          name="host"
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

export default EditEventForm;
