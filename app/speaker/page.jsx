import React from 'react'
import SpeakersList from '../components/SpeakersList/SpeakersList'
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