"use client"
import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Link from "@mui/joy/Link";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";
import ChipAvatar from "../Chips/ChipAvatar";
import { Button } from "@mui/joy";
import { FaTrash } from "react-icons/fa";

import "./Cards.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Popover } from "@mui/material";

const EventTopicsCard = ({
  event_id,
  eventTopic,
  title,
  speaker,
  description,
  date,
  time,
  topic_Id,
}) => {    
  const router = useRouter()
  const handleDeleteTopic  = async (topic_id) => {
      const removedTopic = await eventTopic.filter((topic) => topic._id !== topic_id)
     
      try {
  
          const response = await fetch(`/api/events/${event_id}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ topics: removedTopic }),
          });

          if (!response.ok) {
              throw new Error('Failed to update event topics');
          }

          const updatedEvent = await response.json();
          
          router.refresh()

      } catch (error) {
          console.error('Error updating event topics:', error);
      }
  }

  
  return (
   
          
    <Card
     
      variant="outlined"
      orientation="horizontal"
      sx={{
        width: 800,
        height: 70
        // boxShadow: "md",
        // "&:hover": {
        //   boxShadow: "md",
        //   borderColor: "neutral.outlinedHoverBorder",
        // },
      }}
    >
      <CardOverflow
        variant="solid"
        color="success"
        sx={{
          flex: "0 0 20px",
          //   display: 'flex',
          //   flexDirection: 'column',
          //   justifyContent: 'center',
          //   px: 'var(--Card-padding)',
        }}
      ></CardOverflow>

      <CardContent

      >
        <div className="card-one-line">
          <Typography level="title-sm" id="card-description">
            <div className="card-column-items">
              <strong>{title}</strong>
              <span className="span-one-line">
                <p text-xs>Speaker:</p>
                <ChipAvatar name={speaker} />
              </span>
            </div>
          </Typography>
          <Typography level="title-sm" id="card-description">
            <div className="card-column-items">
              <strong><p text-xs>{description.substring(0,10) + "..."}</p></strong>
            </div>
          </Typography>
          <Typography
            level="body-sm"
            aria-describedby="card-description"
            mb={1}
          >
            <div className="card-column-items">
              <span>Date: {date}</span>
              <span>Time: {time}</span>
            </div>
          </Typography>
        </div>
      </CardContent>
      <CardOverflow
        variant="plain"
        color="danger"
        sx={{
          px: 0.1,
          //   writingMode: 'vertical-rl',
          justifyContent: "center",
          fontSize: "xs",
          fontWeight: "xl",
          letterSpacing: "1px",
          textTransform: "uppercase",
          borderLeft: "1px solid",
          borderColor: "divider",
        }}
      >
        <Button
          color="neutral-light"
          onClick={() => handleDeleteTopic(topic_Id)}
        >
          {/* <FaTrash color="red"/> */} X
        </Button>
      </CardOverflow>
    </Card>
    
  );
};

export default EventTopicsCard;
