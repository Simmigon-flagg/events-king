import { useRouter } from 'next/navigation';
import React from 'react'
import Border from "@/public/image/graphics/orangeblue.jpg"
import Image from "next/image";


const ViewSpeakerDetailDialog = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [edit, setEdit] = useState(topic);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
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
  
   
  return (
    <div>
    <div className="btn-dialog">
      <h4 onClick={handleClickOpen}>{text}</h4>

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
     <Image src={Border} alt="oranglebluebackground" className="border-image"/>
      
        <DialogTitle>Speaker </DialogTitle>
        <DialogContent>
          <DialogContentText>Speaker</DialogContentText>
         
        </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        {isEditing ? (
          <Button onClick={handleSubmit}>SAVE</Button>
        ) : (
          <Button onClick={() => setIsEditing(true)}>EDIT</Button>
        )}
      </DialogActions>
    </Dialog>
  </div>
  )
}

export default ViewSpeakerDetailDialog