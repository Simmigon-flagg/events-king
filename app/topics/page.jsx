import React from 'react'
import TopicsList from '../components/TopicsList'
import { Button } from '@mui/joy';
import Link from 'next/link';
const getTopics = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/topics", {
            cache: "no-store"
        })
        if (!response.ok) {
            throw new Error("Failed to fetch topics")
        }
        return response.json();
    } catch (error) {
        console.log("Error loading topics: ", error);
    }
}


const Topics = async () => {
    const { topics } = await getTopics();
    return (
        <>
            <div style={{ marginTop: 30 }}>

                <form>
                    <input type='text' placeholder='Title' />
                    {" "}
                    <input type='text' placeholder='description' />
                </form>
                <Button style={{ backgroundColor: "green" }}>Add Topic</Button>
            </div>

            <>
                <div>Topics List</div>
                {topics.map(topic => {
                  return(  <>
                        <h2>{topic.title}</h2>
                        <p>{topic.desc}</p>
                        <div style={{}}>
                            <Button style={{ backgroundColor: "red", marginRight: 15 }}>Remove</Button>
                            <Link href={`/editTopic/${topic._id}`}>
                                <Button style={{ backgroundColor: "brown" }} >Edit</Button>
                            </Link>
                        </div>
                    </>)
                })}
            </>
        </>
    )
}

export default Topics;