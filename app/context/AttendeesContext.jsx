import React, { useState, useEffect, createContext } from 'react';
import { nanoid } from 'nanoid';

    const id = nanoid();
    
    const initialValues = {
        id: id,
        firstName: "",
        lastName: "",
        email: ""
    }
    
    const getLocalStorage = () => {
        let attendees = localStorage.getItem("attendees");
        if(attendees){
            return (attendees = JSON.parse(localStorage.getItem("attendees")));
        }else{
            return [initialValues];
        }
    }
    
    const AttendeesContext = createContext({});
    
    export const AttendeesProvider = ({ children }) => {
      
        const [formData, setFormData] = useState(initialValues);
        const [attendees, setAttendees] = useState(getLocalStorage())
        const [isEditing, setIsEditing] = useState(false)
        const [editID, setEditId] = useState(null);
    
        useEffect(()=>{
            localStorage.setItem("attendees", JSON.stringify(attendees))
        },[attendees])
    
        const handleChangeInput = (e) => {
            const { name, value } = e.target
            setFormData(prev => ({
                ...prev,
                [name]: value
            }))
        }
    
        const handleSubmit = (e) => {
            e.preventDefault();
            let isValid = true;
            for (const key in formData) {
                // Skip the validation for the 'id' key
                if (key === 'id') {
                    continue;
                }
    
                if (formData[key] === "") {
                    isValid = false;
                    break;
                }
            }
            if (isValid) {
                if (isEditing) {
                    updateAttendees() // save edit
                    setFormData(initialValues); //clears the form
                    setIsEditing(false);
    
                } else {
                    addAttendees();
                    setFormData(initialValues);
                }
            } else {
                alert("please enter a value")
            }
        }
    
        const handleEdit = (id) => {
            const attendeeToEdit = attendees.find((attendee) => attendee.id === id)
            setFormData(attendeeToEdit);
            setIsEditing(true);
        }
    
        const addAttendees = () => {
            setAttendees(prevAttendees => [formData, ...prevAttendees]) //new entry
        }
    
        const updateAttendees = () => {
            setAttendees((prevAttendees) => {
                return prevAttendees.map(attendee => {
                    if (attendee.id === formData.id) {
                        return {
                            ...attendee,
                            firstName: formData.firstName,
                            lastName: formData.lastName,
                            email: formData.email
                        }
                    }
                    return attendee;
                })
            });
        }
    
        const handleDelete = (id) => {
            const remainingAttendees = attendees.filter((item) => item.id !== id);
            setAttendees(remainingAttendees);
        }
    
        return (
            <AttendeesContext.Provider value={{
                handleChangeInput, handleDelete, handleSubmit, handleEdit,
                attendees, formData, isEditing
            }}>
                {children}
            </AttendeesContext.Provider>
        )
    }

export default AttendeesContext