"use client"
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import EventTopicsCard from '../Cards/EventTopicsCard'

const EventTopicsList = ({ event, eventTopic }) => {

    // Effect to update topics when event or eventTopic changes


    // const view = topics?.map((topic) => (
    //     <div key={topic?._id}>
            {/* <EventTopicsCard title={topic?.title} speaker={topic?.speaker} date={topic?.date} time={topic?.time} handleDeleteTopic={handleDeleteTopic} topicId={topic._id} /> */}
            {/* Title: {topic?.title}<br />
            Host:{topic?.speaker}<br /> */}
            {/* <button
                onClick={() => handleDeleteTopic(topic._id)}>Delete
            </button> */}
         
         
        // </div>))
    return (
        <>
            {/* {view} */}
        </>
    )
}

export default EventTopicsList