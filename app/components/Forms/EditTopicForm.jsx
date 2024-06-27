"use client";

import { Button, FormLabel, Input, Textarea } from "@mui/joy";
import "./Form.css";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";

const EditTopicForm = ({
  edit,
  handleChange,
  handleDateChange,
  handleTimeChange,
}) => {
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

      <div className="wrapper-inline">
        <div className="input-field">
          <FormLabel>Speaker</FormLabel>
          <Input
            type="text"
            onChange={handleChange}
            value={edit?.speaker}
            name="speaker"
            sx={{width:'230px'}}
          />
        </div>

        <div className="input-field">
          <FormLabel>Location</FormLabel>
          <Input
            type="text"
            onChange={handleChange}
            value={edit?.location}
            name="location"
            sx={{width:'230px'}}
          />
        </div>
      </div>

      <div className="wrapper-inline">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              id="topics-form-input"
              value={edit?.date ? dayjs(edit?.date) : null}
              onChange={handleDateChange}
            />
          </DemoContainer>
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["TimePicker"]}>
            <TimePicker
              id="topics-form-input"
              value={edit?.time ? dayjs(edit?.time, "HH:mm") : null}
              onChange={handleTimeChange}
            />
          </DemoContainer>
        </LocalizationProvider>
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
