import { Box, Skeleton, Typography } from '@mui/material'
import React from 'react'

export default function ProjectSkeleton() {
  return (
    <Box sx={{ display: {md: 'flex', sm: 'block'}, width: '100%', backgroundColor: '#222222', boxShadow: '2', p: '25px 0', mb: '25px' }}>
      <Box sx={{ flexGrow: 1, p: '0 15px' }}>
        <Skeleton variant="text" sx={{fontSize: '2.5rem', mb: '10px'}} />
        <Skeleton variant="rectangular" width={'100%'} height={120} />
      </Box>
      <Box sx={{ minWidth: '220px', p: '0 15px', textAlign: {md: 'center', sm: 'left'} }}>
        <Skeleton variant="text" sx={{fontSize: '2.5rem', mb: '10px'}} />
        <Skeleton variant="rectangular" width={'100%'} height={20} />
      </Box>
    </Box>
  )
}
