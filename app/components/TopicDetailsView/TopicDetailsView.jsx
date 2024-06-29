import React from "react";
import "./TopicDetailsView.css";
import DateTimeZone from "../DateTimeZone/DateTimeZone";
import DateTime from "@/lib/DateAndTime";

const TopicDetailsView = ({ topic }) => {
  const { title, date, time, location, speaker, description } = topic;

  return (
    <div className="topic-view-dialog-container">
      <label className="view-topic-label" htmlFor="title">
        Title:
      </label>
      <div className="view-topic-info-text">{title}</div>

      <div className="grid-container">
        <div className="grid-item">
          <label className="view-topic-label" htmlFor="speaker">
            Speaker:
          </label>
          <div className="view-topic-info-text">{speaker}</div>
        </div>
        <div className="grid-item">
          <label className="view-topic-label" htmlFor="location">
            Location:
          </label>
          <div className="view-topic-info-text">{location}</div>
        </div>
        <div className="grid-item">
          <label className="view-topic-label" htmlFor="date">
            Date:
          </label>
          <div className="view-topic-info-text">
            
            
            {DateTime(date, time).split("at")[0]}
            </div>
        </div>
        <div className="grid-item">
          <label className="view-topic-label" htmlFor="time">
            Time:
          </label>
          <div className="view-topic-info-text">
            
            {DateTime(date, time).split("at")[1]}
            
            </div>
        </div>
      </div>

      <label className="view-topic-label" htmlFor="description">
        Description:
      </label>
      <div className="view-topic-info-text">{description}</div>
    </div>
  );
};

export default TopicDetailsView;
