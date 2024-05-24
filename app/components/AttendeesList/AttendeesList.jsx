'use client'
import React, { useContext } from "react";
import AttendeesContext from "@/app/context/AttendeesContext";
import { FaEdit, FaTrash } from "react-icons/fa";



const AttendeesList = () => {
  const { attendees, handleDelete, handleEdit, isEditing } =
    useContext(AttendeesContext);
  return (
    <section className="section-list-4">
      <h3>Attendees:</h3>

      {attendees.map((item, index) => {
        const { id, firstName, lastName, email } = item;
        return (
          <div className="div-4" key={item.id}>
            <div>{index + 1}.</div>
            <div>{firstName}</div>
            <div>{lastName}</div>
            <div>{email}</div>
            <div className="btn-actions">
              <FaEdit
                onClick={() => {
                  handleEdit(id);
                }}
                style={{ color: "green" }}
              />
              <FaTrash
                onClick={() => {
                  handleDelete(id);
                }}
                style={{ color: "red" }}
              />
            </div>
          </div>
        );
      })}

    </section>
  );
};

export default AttendeesList;
