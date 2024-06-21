import React from "react";
import "./TopicDetailsView.css";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const TopicDetailsView = ({ topic }) => {
  const { title, date, time, location, speaker, description } = topic;

  return (
    <div className="topic-view-dialog-container">
      <DialogTitle>Session Info</DialogTitle>
      <DialogContent>
        <DialogContentText>Details</DialogContentText>

        <label className="view-topic-label" htmlFor="title">
          Session Title:
        </label>
        <div className="view-topic-info-text">{title}</div>

        <label className="view-topic-label" htmlFor="title">
          Session Title:
        </label>
        <div className="view-topic-info-text">{title}</div>
        <label className="view-topic-label" htmlFor="date">
          Date:
        </label>
        <div className="view-topic-info-text">{date}</div>
        <label className="view-topic-label" htmlFor="time">
          Time:
        </label>
        <div className="view-topic-info-text">{time}</div>
        <label className="view-topic-label" htmlFor="location">
          Location:
        </label>
        <div className="view-topic-info-text">{location}</div>
        <label className="view-topic-label" htmlFor="speaker">
          Speaker:
        </label>
        <div className="view-topic-info-text">{speaker}</div>
        <label className="view-topic-label" htmlFor="description">
          Description:
        </label>
        <div className="view-topic-info-text">{description}</div>
      </DialogContent>
    </div>
  );
};

export default TopicDetailsView;
