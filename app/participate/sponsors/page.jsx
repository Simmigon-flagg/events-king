import React from 'react'
import { Container } from '@mui/joy'
import PageTitle from '../../components/PageTitle/PageTitle'
import SponsorsList from '../../components/SponsorsList/SponsorsList'

const SponsorsPage = () => {
  return (
    <Container fixed>
        <PageTitle heading="Sponsors"/>
        <SponsorsList />
    </Container >

)}

export default SponsorsPage