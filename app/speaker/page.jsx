import React from 'react'
import SpeakersList from '../components/AllSpeakersList/AllSpeakersList'
import { Container } from '@mui/joy'

const SpeakersPage = () => {
  return (
    <Container fixed>
      Speakers Page
      <SpeakersList />
    </Container>
  )
}

export default SpeakersPage