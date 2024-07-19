"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import { button, Tooltip } from "@mui/joy";
import SearchBar from "../SearchBar/SearchBar";
import Border from "@/public/image/graphics/orangeblue.jpg"
import Image from "next/image";
import { Tooltip } from "@mui/material";


const BrowseSessionDialog = ({ text, topics, event }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
  };


  const handleAdd = async (ids) => {

    router.refresh();
    setIsEditing(false);
    handleClose();
  };

  return (
    <div>
      <div className="btn-dialog">
        {
          <Tooltip
            title="Add from the list of existing topics."
            variant="solid"
            size="lg"
            placement="top-end"
          >
            <button className="btn" variant="solid" onClick={handleClickOpen}>
              {text}
            </button>
          </Tooltip>
        }
      </div>
      <Dialog
        open={open}
        maxWidth={100}
        onClose={handleClose}
        className="view-dialog-container"
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;

            handleClose();
          },
        }}
      >
        <Image src={Border} alt="oranglebluebackground" className="border-image" />
        <DialogTitle>Session Topic</DialogTitle>
        <DialogContent>
          <DialogContentText>

            <SearchBar items={topics} id={event?._id} />
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleAdd}>Add</button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BrowseSessionDialog;
