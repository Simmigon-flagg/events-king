import React from 'react'
import TopicsList from '../components/TopicsList'
import { Button } from '@mui/joy';
import Link from 'next/link';
const Topics = () => {
    return (
        <>
            <div style={{ marginTop:30}}>
                
                <form>
                    <input type='text' placeholder='Title'/>
                    {" "}
                    <input type='text' placeholder='description'/>
                </form>
                <Button style={{ backgroundColor: "green" }}>Add Topic</Button>
            </div>
            <div style={{}}>
                <Button style={{ backgroundColor: "red", marginRight: 15 }}>Remove</Button>
               <Link  href={`/editTopic/${'123'}`}>
               <Button style={{ backgroundColor: "brown" }} >Edit</Button>
               </Link> 
            </div>
            <div>{<TopicsList />}</div>
        </>
    )
}

export default Topics;