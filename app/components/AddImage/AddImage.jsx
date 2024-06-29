"use client"
import React, { useState } from 'react'
import Button from '@mui/joy/Button';
import SvgIcon from '@mui/joy/SvgIcon';
import { styled } from '@mui/joy';
import { useRouter } from 'next/navigation';

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

const AddImage = ({ event }) => {
    const [image, setImage] = useState(event);
    const router = useRouter()
    const handleFileChange = (e) => {
        setImage((prev) => ({
            ...prev,
            image: e.target.files[0],
        }));
    };
    const handleSubmitImage = async (e) => {
        e.preventDefault();

        const data = new FormData();
        Object.keys(image).forEach(key => {
            if (key === "topics") {
                image[key].forEach(topic => data.append(key, topic));
            } else {
                data.append(key, image[key]);
            }
        });

        try {
            const response = await fetch(`/api/events/${event?._id}/image`, {
                method: "PUT",
                body: data,
            });

            if (!response.ok) {
                throw new Error("Failed to create a event");
            }
        } catch (error) {
            console.log(error);
        }
        router.refresh();
    };
    return (
        <div>
            <Button
                onChange={handleFileChange}
                name="image"
                component="label"
                role={undefined}
                tabIndex={-1}       
                color="neutral"
                startDecorator={
                    <SvgIcon>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                            />
                        </svg>
                    </SvgIcon>
                }
            >
                Upload an Image
                <VisuallyHiddenInput type="file" />
            </Button>
            <div><h3>{image?.image?.name}</h3>
                <Button
                    onClick={handleSubmitImage}
                    startDecorator={
                        <SvgIcon>
                            {/* If images are needed */}
                        </SvgIcon>
                    }
                >
                    Save

                </Button>  </div>
        </div>
    )
}

export default AddImage