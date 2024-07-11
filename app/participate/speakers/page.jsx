import React from 'react'
import SpeakersList from '../../components/SpeakersList/SpeakersList'
import { Container } from '@mui/joy'
import PageTitle from '../../components/PageTitle/PageTitle'

const SpeakersPage = () => {
  return (
    <Container fixed>
        <PageTitle heading="Speakers"/>
        <SpeakersList />
    </Container >

)}

export default SpeakersPage