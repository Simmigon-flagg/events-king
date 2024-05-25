import { createContext, useState, useEffect } from "react";
import { nanoid } from 'nanoid';

const BASEURL = 'http://localhost:4000'
const fetchEvents = async () => {

    try {
        const response = await fetch(`${BASEURL}/events`);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export const EventsContext = createContext([])

export const EventsContextProvider = ({ children }) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const eventsData = await fetchEvents();
            setEvents(eventsData);
        };

        fetchData();
    }, []);

    const createEvent = async (newEvent) => {

        try {
            const addEvent = {
                id: nanoid(), // Generate unique ID using nanoid
                ...newEvent
            };
            const res = await fetch(`${BASEURL}/events`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(addEvent)
            });
            if (res.ok) {
                const addedNewEvents = await res.json();
                setEvents([addedNewEvents, ...events]);
                console.log("Events successfully added.");
            } else {
                throw new Error("Failed to add Events.");
            }
        } catch (error) {
            console.error("Error adding Events:", error);
        }
    };

    const updateEvent = async (id, edit) => {

        try {
            const res = await fetch(`${BASEURL}/events/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(edit)
            });
            if (res.ok) {
                const updatedEvent = await res.json();
                const updatedEvents = events.map((event) =>
                    event.id === id ? updatedEvent : event
                );
                setEvents(updatedEvents);
                console.log("Event successfully updated.");
            } else {
                throw new Error("Failed to update Event.");
            }
        } catch (error) {
            console.error("Error updating Event:", error);
        }
    };

    const deleteEvent = async (id) => {

        try {
            const res = await fetch(`${BASEURL}/events/${id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                setEvents(events.filter((employee) => employee.id !== id));
                console.log("Event successfully deleted.");
            } else {
                throw new Error("Failed to delete Event.");
            }
        } catch (error) {
            console.error("Error deleting Event:", error);
        }
    };

    const contextValue = { events, setEvents, createEvent, updateEvent, deleteEvent };
    return (<EmployeesContext.Provider value={contextValue}>
        {children}
    </EmployeesContext.Provider>)
}

export default EventsContextProvider;
