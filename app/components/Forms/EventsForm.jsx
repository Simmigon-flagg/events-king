'use client'
import React, { useState } from "react";
// import Button from "@mui/material/Button";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField"
import Button from '@mui/joy/Button';
import SvgIcon from '@mui/joy/SvgIcon';
import { styled } from '@mui/joy';

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;


const EventsForm = ({ formData, handleFileChange, handleChange, handleMultiChange, handleDateChange, handleTimeChange }) => {

  return (
    <div className="container-topic-forms">
      <div className="form-box">
        {/* All MUI controlled input or text field options here: https://mui.com/material-ui/react-text-field/ */}

        <TextField
          id="topics-form-input"
          label="Session Title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <TextField
          id="topics-form-input"
          label="Host"
          type="text"
          name="host"
          value={formData.host}
          onChange={handleChange}
        />

        <TextField
          id="topics-form-input"
          label="Location"
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
 
        <Button
          onChange={handleFileChange}
          name="image"
          component="label"
          role={undefined}
          tabIndex={-1}
          variant="outlined"
          color="neutral"
          startDecorator={
            <SvgIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>
            </SvgIcon>
          }
        >
          {formData?.image?.name ? (<>{formData?.image?.name}</>) : (<>Upload a Image</>)}

          <VisuallyHiddenInput type="file" />
        </Button>


        <div className="wrapper-dateTime-picker">
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
          name="description"
          multiline
          rows={4}
          value={formData.description}
          onChange={handleMultiChange}
        />
      </div>
  
    </div>

  )
}

export default EventsForm