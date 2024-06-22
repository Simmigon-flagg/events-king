import React from 'react'
import Typography from '@mui/joy/Typography';

const PageTitle = ({heading, subheading}) => {
  return (
    <>
        <Typography level="h1" color="neutral" variant="plain">{heading}</Typography>
        <Typography level="h4" color="neutral" variant="plain">{subheading}</Typography>
    </>
  )
}

export default PageTitle