"use client"
import React, { useState } from 'react'
import "./Products.css"
import Skeleton from "@/app/components/Skeleton/Skeleton"
const Products = () => {
  const [loading, setLoading] = useState(true);
  return (
    <div style={{}}> <h1>Products</h1>

      <div className='products'>
        <Skeleton loading={loading} setLoading={setLoading} />
  
        <Skeleton loading={loading} setLoading={setLoading} />
     
        <Skeleton loading={loading} setLoading={setLoading} />
     
        <Skeleton loading={loading} setLoading={setLoading} />
      </div>
    </div>
  )
}

export default Products