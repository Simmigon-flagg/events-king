import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import './Chip.css';

const ChipAvatar = ({ name }) => {
  return (
    <Chip
      color="primary"
      size="small"
      avatar={<Avatar size="sm" alt={name} src="/broken-image.jpg" />}
      label={name}
      variant="outlined"

    />
  );
};

export default ChipAvatar;
