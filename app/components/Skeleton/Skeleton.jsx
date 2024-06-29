import React from 'react'
import "./Skeleton.css"
import Skeleton from '@mui/joy/Skeleton';
const SkeletonImage = ({ loading, setLoading }) => {
    return (
        
        <Skeleton
            sx={{ bgcolor: 'grey.900' }}
            variant="rectangular"
            width={500}
            height={300}
        />

    )
}

export default SkeletonImage