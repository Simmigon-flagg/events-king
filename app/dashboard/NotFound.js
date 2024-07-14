import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function Content() {
  const [formData, setFormData] = React.useState({
    title: "",
    host: "",
    date: "",
    time: "",
    location: "",
    description: "",
    topics: [],
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === "topics") {
        formData[key].forEach(topic => data.append(key, topic));
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        setFormData({
          title: "",
          host: "",
          date: "",
          time: "",
          location: "",
          description: "",
          topics: [],
          image: null
        });
      } else {
        throw new Error("Failed to create an event");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
      Not Found
    </Paper>




  );
}