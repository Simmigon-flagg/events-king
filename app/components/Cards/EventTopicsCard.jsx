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

const EventTopicsCard = ({
  title,
  speaker,
  date,
  time,
  handleDeleteTopic,
  topicId,
}) => {
  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        width: 800,
        height: 70,
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

      <CardContent>
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
          onClick={() => handleDeleteTopic(topicId)}
        >
          {/* <FaTrash color="red"/> */} X
        </Button>
      </CardOverflow>
    </Card>
  );
};

export default EventTopicsCard;
