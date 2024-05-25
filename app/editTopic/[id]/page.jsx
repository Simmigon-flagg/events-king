import { Button } from '@mui/joy'
import React from 'react'

const EditTopic = () => {
  return (
    <div style={{ marginTop:30}}>
                
    <form>
        <input type='text' placeholder='Title'/>
        {" "}
        <input type='text' placeholder='description'/>
    </form>
    <Button style={{ backgroundColor: "green" }}>Update Topic</Button>
</div>
  )
}

export default EditTopic