import React from 'react'
import TopicsList from '../components/TopicsList'
import { Button } from '@mui/joy';

import TopicsForm from '../components/Forms/TopicsForm';
import { Container } from '@mui/material';
const Topics = () => {
    return (
        <Container fixed>
            <>Topics</>
            <TopicsForm />
            <hr />
            <div>{<TopicsList />}</div>
        </Container>

    )
}

export default Topics;