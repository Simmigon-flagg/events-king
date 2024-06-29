import React, { useState } from 'react'
const Clock = () => {
    const eventDateTime = new Date();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    }

    
    
    let time = new Date().toLocaleTimeString();
    const [currentTime, setCurrentTime] = useState(time);
    
    
    const updateTime = () => {
        setCurrentTime(time)
    }

    setInterval(updateTime, 1000);
    return (
        <div>{eventDateTime.toLocaleString('en-US', options)}</div>
    )
}
export default Clock