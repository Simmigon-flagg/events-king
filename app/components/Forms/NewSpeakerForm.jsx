"use client";
import React from "react";
// import { FormLabel, Input, Textarea } from "@mui/joy";
import "./Form.css";
import { HiPencilAlt } from "react-icons/hi";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { FormLabel, Input } from "@mui/material";

const NewSpeakerForm = ({
  formData,
  handleChange,
  handleMultiChange,
  handleImageClick,
  handleImageChange,
  inputRef,
}) => {
  return (
    <div className="form-container">
      <div className="form-box">
        <div className="add-avatar" onClick={handleImageClick}>
          {formData.image ? (
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={<HiPencilAlt style={{ width: 16, height: 16 }} />}
              sx={{
                "& .MuiBadge-badge": {
                  transform: "translate(65%, 70%)",
                },
              }}
            >
              <Avatar
                src={URL.createObjectURL(formData.image)}
                sx={{ width: 60, height: 60 }}
              />
            </Badge>
          ) : (
            <div style={{ display: "flex" }}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <HiPencilAlt
                    style={{ width: 16, height: 16, color: "gray" }}
                  />
                }
                sx={{
                  "& .MuiBadge-badge": {
                    transform: "translate(60%, 60%)",
                  },
                }}
              >
                <Avatar sx={{ width: 60, height: 60 }} />
              </Badge>
            </div>
          )}

          <input
            type="file"
            ref={inputRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>
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
          <textarea
            // minRows={4}
            // maxRows={5}
            type="text"
            onChange={handleMultiChange}
            value={formData.description}
            name="description"
          />
        </div>
      </div>
    </div>
  );
};

export default NewSpeakerForm;
