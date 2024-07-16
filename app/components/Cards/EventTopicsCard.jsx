"use client";
import * as React from "react";
// import Card from "@mui/joy/Card";
// import CardContent from "@mui/joy/CardContent";
// import CardOverflow from "@mui/joy/CardOverflow";
// import Typography from "@mui/joy/Typography";
// import { button } from "@mui/joy";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ViewTopicDetailDialog from "../Dialogs/ViewTopicDetailsDialog";
import "./Cards.css";
import Times from "@/lib/Times";
import Dates from "@/lib/Dates";

const EventTopicsCard = ({
  event_id,
  eventTopic,
  title,
  description,
  date,
  time,
  topic_Id,
  topic,
}) => {
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(true);

  const handleDialogOnClick = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handleDeleteTopic = async (topic_id) => {
    const removedTopic = await eventTopic.filter(
      (topic) => topic._id !== topic_id
    );

    try {
      const response = await fetch(`/api/events/${event_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topics: removedTopic }),
      });

      if (!response.ok) {
        throw new Error("Failed to update event topics");
      }

      await response.json();

      router.refresh();
    } catch (error) {
      console.error("Error updating event topics:", error);
    }
  };

  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        width: 800,
        height: 70
      }}
    >
      <CardOverflow
        variant="solid"
        color="success"
        sx={{
          flex: "0 0 20px"
        }}
      ></CardOverflow>

      <CardContent>
        <div className="card-one-line">
          <Typography level="title-sm" id="card-description">
            <div className="card-column-items">
              <p onClick={handleDialogOnClick}></p>
              {showDialog && (
                <ViewTopicDetailDialog
                  topic={topic}
                  text={title}
                  onClose={handleCloseDialog}
                />
              )}
            </div>
          </Typography>
          <Typography level="title-sm" id="card-description">
            <div className="card-column-items">
              <strong>
                <p text-xs>{description?.substring(0, 10) + "..."}</p>
              </strong>
            </div>
          </Typography>
          <Typography
            level="body-sm"
            aria-describedby="card-description"
            mb={1}
          >
            <div className="card-column-items">
              <span>Date: {Dates(date,time)} </span>
              <span>Time: {Times(date,time)}</span>
            </div>
          </Typography>
        </div>
      </CardContent>
      <CardOverflow
        variant="plain"
        color="danger"
        sx={{
          px: 0.1,
          justifyContent: "center",
          fontSize: "xs",
          fontWeight: "xl",
          letterSpacing: "1px",
          textTransform: "uppercase",
          borderLeft: "1px solid",
          borderColor: "divider",
        }}
      >
        <button
          color="neutral-light"
          onClick={() => handleDeleteTopic(topic_Id)}
        > X
        </button>
      </CardOverflow>
    </Card>
  );
};

export default EventTopicsCard;
