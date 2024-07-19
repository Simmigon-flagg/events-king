import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

import Border from "@/public/image/graphics/orangeblue.jpg";
import Image from "next/image";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SpeakerDetailsView from "../Speaker/SpeakerDetailsView";
import EditSpeakerForm from "../Forms/EditSpeakerForm";
import SpeakersForm from "../Forms/SpeakersForm";
import { Avatar, Button } from "@mui/material";
import { UsersContext } from "@/context/UsersContext";

const ViewSpeakerDetailDialog = ({ speaker, text }) => {
  const { updateUser, reloadUsers } = useContext(UsersContext)
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [edit, setEdit] = useState(speaker);
  useEffect(() => {
    const fetchData = async () => {
      if (open) {
        await reloadUsers();
      }
    };
    fetchData();
  }, [open]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEdit(edit);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name,value)
    setEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdmin = (e) => {
    const { name, value } = e.target;

    setEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  const handleSubmit = async () => {
    handleClose();
    setIsEditing(false);
    await updateUser(edit)
    
    console.log(edit)
    console.log("Your changes have been saved!");

  };

  return (
    <div>
      <div className="btn-dialog">
        <h3 onClick={handleClickOpen}>{text}</h3>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        className="view-dialog-container"
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;

            // handleClose();

          },
        }}
      >
        <Image
          src={Border}
          alt="oranglebluebackground"
          className="border-image"
        />

        <DialogTitle
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Avatar variant="solid" sx={{ width: 56, height: 56 }} />
          <span style={{ textDecoration: "underline", fontSize: "25px" }}>
            <strong>
              {edit?.firstname} {edit?.lastname}
            </strong>
          </span>

        </DialogTitle>
        <DialogContent>
          <DialogContentText>Speaker Info</DialogContentText>
          {isEditing ? (
            <EditSpeakerForm edit={edit} handleChange={handleChange}  />
          ) : (
            <SpeakerDetailsView edit={edit} />
          )}
        </DialogContent>

        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          {isEditing ? (
            <button onClick={() => handleSubmit()}>Save</button>
          ) : (
            <button onClick={() => setIsEditing(true)}>Edit</button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewSpeakerDetailDialog;
