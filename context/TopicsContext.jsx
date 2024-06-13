'use client'
import React, { useState, useEffect, createContext } from 'react';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';

    const id = nanoid();
    
    const initialValues = {
        id: id,
        title: "",
        description: "",
        speaker: "",
        date: "",
        time: "",
        location: ""
    }
    
    const getLocalStorage = () => {
        let topics = localStorage.getItem("topics");
        if(topics){
            return (topics = JSON.parse(localStorage.getItem("topics")));
        }else{
            return [];
        }
    }
    
    const TopicsContext = createContext({});
    
    export const TopicsProvider = ({ children }) => {

        const router = useRouter();
      
        const [formData, setFormData] = useState(initialValues);
        const [topics, setTopics] = useState(getLocalStorage())
        const [isEditing, setIsEditing] = useState(false)        
    
        useEffect(()=>{
            localStorage.setItem("topics", JSON.stringify(topics))
        },[topics])
    
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
                 
                    updateTopics() // save edit
                    setFormData(initialValues); //clears the form
                    setIsEditing(false);
    
                } else {
                    addTopics();
                    setFormData(initialValues);
                }
            } else {
                alert("please enter a value")
            }
        }
    
        const handleEdit = (id) => {
            router.push(`/editTopic/${id}`);
            
            const topicToEdit = topics.find((topic) => topic.id === id)
            setFormData(topicToEdit);
            setIsEditing(true);
        }
    
        const addTopics = () => {
            setTopics(prevTopics => [formData, ...prevTopics]) //new entry
        }
    
        const updateTopics = () => {

            setTopics((prevTopics) => {
                return prevTopics.map(topic => {
                    if (topic.id === formData.id) {
                        return {
                            ...formData
                        }
                    }
                    return topic;
                })
            });
        }
    
        const handleDelete = (id) => {
            const remainingTopics = topics.filter((item) => item.id !== id);
            setTopics(remainingTopics);
        }
    
        return (
            <TopicsContext.Provider value={{
                handleChangeInput, handleDelete, handleSubmit, handleEdit,
                topics, formData, isEditing,
             
            }}>
                {children}
            </TopicsContext.Provider>
        )
    }

    export default TopicsContext