import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "@mui/joy";
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
import { Avatar } from "@mui/material";

const ViewSpeakerDetailDialog = ({ speaker, text }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [edit, setEdit] = useState(speaker);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEdit(speaker);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/speakers/${edit?._id}`,
        {
          method: "PUT",
          header: { "Content-type": "application/json" },
          body: JSON.stringify(edit),
        }
      );
      if (!response.ok) {
        throw new Error("Topic was not updated");
      }
    } catch (error) {
      console.log(error);
    }

    alert("Your changes have been saved!");
    setIsEditing(false);
    handleClose();
    router.refresh();
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

            handleClose();
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
          {isEditing ? (
            <p
              style={{
                textDecoration: "underline",
                color: "blue",
                fontSize: "12px",
              }}
            >
              Edit
            </p>
          ) : (
            <span style={{ textDecoration: "underline", fontSize: "25px" }}>
              <strong>
                {speaker?.firstname} {speaker?.lastname}
              </strong>
            </span>
          )}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Speaker Info</DialogContentText>
          {isEditing ? (
            <EditSpeakerForm edit={edit} handleChange={handleChange} />
          ) : (
            <SpeakerDetailsView speaker={speaker} />
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {isEditing ? (
            <Button onClick={handleSubmit}>Save</Button>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewSpeakerDetailDialog;
