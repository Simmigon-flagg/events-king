import React from 'react'
import TopicsList from '../components/TopicsList'
import { Button } from '@mui/joy';

import TopicsForm from '../components/Forms/TopicsForm';
const Topics = () => {
    return (
        <>
            <div style={{ marginTop:30}}> 
                <Button style={{ backgroundColor: "green" }}>Add Topic</Button>
            </div>
            <TopicsForm />
               <hr />
            <div>{<TopicsList />}</div>
        </>
    )
}

export default Topics;