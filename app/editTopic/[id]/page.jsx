import { Button } from '@mui/joy'
import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { TopicsContext } from '@/context/TopicsContext'
import TopicsForm from '@/app/components/Forms/TopicsForm'

const EditTopic = ({params}) => {
  const { topics } = useContext(TopicsContext);
  const { id } = params;
  const { topic } = getTopicById(id);
  // const { title, description } = topic;
  const getTopicById = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
        cache: "no-store",
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch topic");
      }
  
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };
    return <TopicsForm />;
  }

export default EditTopic