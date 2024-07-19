"use client";

import { FormControlLabel, FormLabel, Input, Radio, RadioGroup } from "@mui/material";
import "./Form.css";

const EditSpeakerForm = ({
  edit,
  handleChange,
  handleAdmin
}) => {
  return (
    <div className="form-container">
      <div className="input-field">
        <FormLabel>First Name</FormLabel>
        <Input
          type="text"
          onChange={handleChange}
          value={edit?.firstname}
          name="firstname"
        />
      </div>
      <div className="input-field">
        <FormLabel>Last Name</FormLabel>
        <Input
          type="text"
          onChange={handleChange}
          value={edit?.lastname}
          name="lastname"
        />
      </div>

      <div className="wrapper-inline">
        <div className="input-field">
          <FormLabel>Title / Occupation / Role</FormLabel>
          <Input
            type="text"
            onChange={handleChange}
            value={edit?.title}
            name="title"
            sx={{ width: '230px' }}
          />
        </div>

        <div className="input-field">
          <FormLabel>Company</FormLabel>
          <Input
            type="text"
            onChange={handleChange}
            value={edit?.company}
            name="company"
            sx={{ width: '230px' }}
          />
        </div>
      </div>
      <div className="wrapper-inline">
        <div className="input-field">
          <FormLabel>Email</FormLabel>
          <Input
            type="text"
            onChange={handleChange}
            value={edit?.email}
            name="email"
            sx={{ width: '230px' }}
          />
        </div>

        <div className="input-field">
          <FormLabel>Phone</FormLabel>
          <Input
            type="text"
            onChange={handleChange}
            value={edit?.phone}
            name="phone"
            sx={{ width: '230px' }}
          />
        </div>
      </div>


      <div className="input-field">
        <FormLabel>Role</FormLabel>
        <select name="role" onChange={handleChange} value={edit?.role}>
          <option value="speaker">Speaker</option>
          <option value="sponsor">Sponsor</option>
          <option value="attendee">Attendee</option>
        </select>
      </div>
      <div className="input-admin">
        <FormLabel>Admin</FormLabel>
        <RadioGroup name="admin" value={edit.admin} onChange={handleChange}>
          <FormControlLabel value="true" control={<Radio />} label="Set to Admin" />
          <FormControlLabel value="false" control={<Radio />} label="Remove Admin" />
        </RadioGroup>
      </div>

      <div className="input-field">
        <FormLabel>About me</FormLabel>
        <textarea
          // minRows={4}
          // maxRows={5}
          type="text"
          onChange={handleChange}
          value={edit?.aboutme}
          name="aboutme"
        />
      </div>
      <div className="input-field">
        <FormLabel>Description</FormLabel>
        <textarea
          // minRows={4}
          // maxRows={5}
          type="text"
          onChange={handleChange}
          value={edit?.description}
          name="description"
        />
      </div>
    </div>
  );
};

export default EditSpeakerForm;
