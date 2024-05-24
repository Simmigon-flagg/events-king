'use client'
import React, { useContext } from "react";
import AttendeesContext from "@/context/AttendeesContext";

const Form = () => {
  const { handleChangeInput, formData, handleSubmit, isEditing } =
    useContext(AttendeesContext);
  const { firstName, lastName, email } = formData;
  return (
    <section className="form-section-4">
      <form className="form-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Jane"
          className="form-input"
          name="firstName"
          onChange={handleChangeInput}
          value={firstName}
        />
        <input
          type="text"
          placeholder="Doe"
          className="form-input"
          name="lastName"
          onChange={handleChangeInput}
          value={lastName}
        />
        <input
          type="text"
          placeholder="JaneDoe@mail.com"
          className="form-input"
          name="email"
          onChange={handleChangeInput}
          value={email}
        />
        <button className="button-68" onClick={handleSubmit}>
          {isEditing ? "Save" : "Submit"}
        </button>
      </form>
    </section>
  );
};

export default Form;
