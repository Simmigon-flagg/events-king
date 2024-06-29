"use client"
import React, { useState } from 'react'
import "./Products.css"
import Skeleton from "@/app/components/Skeleton/Skeleton"
import { Container } from '@mui/material'
const Products = () => {
  const [loading, setLoading] = useState(true);
  return (
    <Container fixed>

      <div style={{}}> <h1>Products</h1>

        <div className='products'>
          <Skeleton loading={loading} setLoading={setLoading} />

          <Skeleton loading={loading} setLoading={setLoading} />

          <Skeleton loading={loading} setLoading={setLoading} />

          <Skeleton loading={loading} setLoading={setLoading} />
        </div>
      </div>
    </Container>
  )
}

export default Products