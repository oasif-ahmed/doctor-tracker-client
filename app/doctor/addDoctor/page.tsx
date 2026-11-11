import React from 'react'
import DoctorPageClient from './DoctorClient'
import { Suspense } from 'react'

const AddDoctorPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DoctorPageClient />
    </Suspense>
  )
}

export default AddDoctorPage