"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import "./TopicsForm.css";

const TopicsForm = ({ formData, handleChange, handleMultiChange, handleDateChange, handleTimeChange }) => {
  // const router = useRouter();
  // const [formData, setFormData] = useState({
  //   title: "",
  //   description: "",
  //   speaker: "",
  //   date: null,
  //   time: null,
  //   location: "",
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };
  // const handleMultiChange = (e) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     description: e.target.value,
  //   }));
  // };

  // const handleDateChange = (date) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     date: date ? date.format("YYYY-MM-DD") : null,
  //   }));
  // };

  // const handleTimeChange = (time) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     time: time ? time.format("HH:mm") : null,
  //   }));
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // TODO: Empty text boxes needs handling
  //   // alert(JSON.stringify(formData));
  //   try {
  //     const response = await fetch("http://localhost:3000/api/topics", {
  //       method: "POST",
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });
  //     if (response.ok) {
  //       setFormData({
  //         title: "",
  //         description: "",
  //         speaker: "",
  //         date: null,
  //         time: null,
  //         location: "",
  //       });
  //       router.refresh();
  //     } else {
  //       throw new Error("Failed to create a topic");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
          label="Speaker"
          type="text"
          name="speaker"
          value={formData.speaker}
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
          multiline
          rows={4}
          value={formData.description}
          onChange={handleMultiChange}
        />
      </div>
      {/* <div style={{ marginTop: 30 }}>
        <Button variant="contained" size="large" onClick={handleSubmit}>
          Add Topic
        </Button>
      </div> */}
    </div>
  );
};

export default TopicsForm;
