import React from 'react'



const DateTimeZone = ({ date, time }) => {


    let eventDateTime = null // Example date and time
    let options = {
     
    };
    if (date && time) {
        options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',    
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
        }
        eventDateTime = new Date(date + "T" + time);
    } else if (!time) {
        options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',             
        }
        // time
        eventDateTime = new Date(date + "T" + time);
        
    } else {
        // date

    }

    // Define options for date and time


    // Use toLocaleString to format the date and time
    const formattedDateTime = eventDateTime.toLocaleString('en-US', options);

    console.log(formattedDateTime); // Outputs: June 5, 2024, 2:30:00 PM

    return (

        <h1>{formattedDateTime}</h1>

    )
}

export default DateTimeZone