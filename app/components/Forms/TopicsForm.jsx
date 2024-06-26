"use client";
import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import "./Form.css";

const TopicsForm = ({
  formData,
  handleChange,
  handleMultiChange,
  handleDateChange,
  handleTimeChange,
}) => {
  return (
    <div className="form-container">
      <div className="form-box">
        <TextField
          id="topics-form-input"
          label="Session Title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          sx={{ marginBottom: '10px' }}
        />

        <div className="wrapper-inline">
          <TextField
            id="topics-form-input"
            label="Speaker"
            type="text"
            name="speaker"
            value={formData.speaker}
            onChange={handleChange}
            sx={{ width: '230px' }}
          />

          <TextField
            id="topics-form-input"
            label="Location"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            sx={{ width: '230px' }}
          />
        </div>

        <div className="wrapper-inline">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                id="topics-form-input"
                label="Date"
                value={formData.date ? dayjs(formData.date) : null}
                onChange={handleDateChange}
              />
            </DemoContainer>
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["TimePicker"]}>
              <TimePicker
                id="topics-form-input"
                label="Time"
                value={formData.time ? dayjs(formData.time, "HH:mm") : null}
                onChange={handleTimeChange}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>

        <TextField
          id="topics-form-input"
          label="Description"
          multiline
          rows={4}
          value={formData.description}
          onChange={handleMultiChange}
        />
      </div>
    </div>
  );
};

export default TopicsForm;
