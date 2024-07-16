"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import "./SpeakerDetailsView.css";

const SpeakerDetailsView = ({ edit }) => {
  const {
    image,
    firstname,
    lastname,
    title,
    company,
    email,
    phone,
    topics,
    presentation,
    description,
  } = edit;

  return (
    <div className="topic-view-dialog-container">
      <div className="grid-container">
        <div className="grid-item">
          <label className="view-topic-label" htmlFor="firstname">
            First Name:
          </label>
          <div className="view-topic-info-text">{firstname}</div>
        </div>
        <div className="grid-item">
          <label className="view-topic-label" htmlFor="lastname">
            Last Name:
          </label>
          <div className="view-topic-info-text">{lastname}</div>
        </div>
      </div>

      <div className="grid-container">
        <div className="grid-item">
          <label className="view-topic-label" htmlFor="title">
            Title/Occupation/Role:
          </label>
          <div className="view-topic-info-text">{title}</div>
        </div>
        <div className="grid-item">
          <label className="view-topic-label" htmlFor="company">
            Company/Organization:
          </label>
          <div className="view-topic-info-text">{company}</div>
        </div>
      </div>

      <div className="grid-container">
        <div className="grid-item">
          <label className="view-topic-label" htmlFor="email">
            Email:
          </label>
          <div className="view-topic-info-text">{email}</div>
        </div>

        <div className="grid-item">
          <label className="view-topic-label" htmlFor="phone">
            Phone:
          </label>
          <div className="view-topic-info-text">{phone}</div>
        </div>
      </div>

      <div className="grid-container">
        <div className="grid-item">
          <label className="view-topic-label" htmlFor="description">
            Description:
          </label>
          <div className="view-topic-info-text">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default SpeakerDetailsView;
