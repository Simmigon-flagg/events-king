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
        height: 80,
        "&:hover": {
          boxShadow: "md",
          borderColor: "neutral.outlinedHoverBorder",
        },
      }}
    >
      <AspectRatio ratio="1" sx={{ width: 30 }}>
        {/* <img
          src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90"
          srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"
          loading="lazy"
          alt=""
        /> */}
      </AspectRatio>
      <CardContent>
        <div className="card-one-line">
          <Typography level="title-sm" id="card-description">
            <div className="card-column-items">
             <strong>
                {title}
                </strong> 
              <span className="span-one-line">
                Speaker: <ChipAvatar name={speaker} />
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
              <span>Time {time}</span>
            </div>
          </Typography>
        </div>
      </CardContent>
      <CardOverflow
        variant="soft"
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
