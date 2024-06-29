const DateTime = (date, time) => {
    const eventDateTime = new Date(date + "T" + time);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    }

    // Use toLocaleString to format the date and time
    return eventDateTime.toLocaleString('en-US', options);



}
export default DateTime;