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

const SpeakersForm = ({
  formData,
  handleChange,
  handleMultiChange
}) => {
  return (
    <div className="form-container">
      <div className="form-box">
        <TextField
          id="topics-form-input"
          label="First Name"
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          sx={{ marginBottom: '10px' }}
        />

        <div className="wrapper-inline">
          <TextField
            id="topics-form-input"
            label="Last Name"
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            sx={{ width: '230px' }}
          />

          <TextField
            id="topics-form-input"
            label="Title /  Occupation / Role"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            sx={{ width: '230px' }}
          />
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

export default SpeakersForm;
