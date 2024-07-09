"use client";
import React from "react";
import TextField from "@mui/material/TextField";
import { FormLabel, Input, Textarea } from "@mui/joy";
import "./Form.css";

const NewSpeakerForm = ({ formData, handleChange, handleMultiChange }) => {
  return (
    <div className="form-container">
      <div className="form-box">
        <div className="wrapper-inline">
          <div className="input-field">
            <FormLabel>First Name</FormLabel>
            <Input
              type="text"
              onChange={handleChange}
              value={formData.firstname}
              name="firstname"
              sx={{ width: "230px" }}
            />
          </div>

          <div className="input-field">
            <FormLabel>Last Name</FormLabel>
            <Input
              type="text"
              onChange={handleChange}
              value={formData.lastname}
              name="lastname"
              sx={{ width: "230px" }}
            />
          </div>
        </div>

        <div className="wrapper-inline">
          <div className="input-field">
            <FormLabel>Title/Occupation/Role</FormLabel>
            <Input
              type="text"
              onChange={handleChange}
              value={formData.title}
              name="title"
              sx={{ width: "230px" }}
            />
          </div>

          <div className="input-field">
            <FormLabel>Company</FormLabel>
            <Input
              type="text"
              onChange={handleChange}
              value={formData.company}
              name="company"
              sx={{ width: "230px" }}
            />
          </div>
        </div>
        <div className="wrapper-inline">
          <div className="input-field">
            <FormLabel>Email</FormLabel>
            <Input
              type="text"
              onChange={handleChange}
              value={formData.email}
              name="email"
              sx={{ width: "230px" }}
            />
          </div>

          <div className="input-field">
            <FormLabel>Phone</FormLabel>
            <Input
              type="text"
              onChange={handleChange}
              value={formData.phone}
              name="phone"
              sx={{ width: "230px" }}
            />
          </div>
        </div>

        <div className="input-field">
          <FormLabel>Description</FormLabel>
          <Textarea
            minRows={4}
            maxRows={5}
            type="text"
            onChange={handleChange}
            value={formData.description}
            name="description"
          />
        </div>
      </div>
    </div>
  );
};

export default NewSpeakerForm;
