"use client"
import { Paper } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const ImageComponent = ({ image }) => {
  const [base64String, setBase64String] = useState('');

  useEffect(() => {
    if (image && image.data && image.data.data) {
      const base64String = arrayBufferToBase64(image.data.data);
      setBase64String(`data:${image.contentType};base64,${base64String}`);
    }
  }, [image]);

  return (
    <div>
      {image !== undefined ?

        <>
          {base64String ? (
            <Paper elevation={10} style={{ width: 500 }}>
              <Image src={base64String} alt={image.filename} width={500} height={0} />

            </Paper>
          ) : (
            <p>Loading image...</p>
          )}</>
        :
        <p>No image</p>

      }

    </div>
  );
};

// Utility function to convert binary data to base64
function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export default ImageComponent;