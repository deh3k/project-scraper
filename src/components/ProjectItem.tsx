import { Box, Typography } from '@mui/material'
import React from 'react'
import { IProject } from '../Models/model'

interface IProps {
  prj: IProject
}

export default function ProjectItem({ prj }: IProps) {
  return (
    <Box sx={{ display: {md: 'flex', sm: 'block'}, width: '100%', backgroundColor: '#222222', boxShadow: '2', p: '25px 0', mb: '25px' }}>
      <Box sx={{ flexGrow: 1, p: '0 15px' }}>
        <a href={prj.url} style={{textDecoration: 'none'}}>
          <Typography variant="h5" component="h6" color="white" sx={{ mb: '10px' }}>
            {prj.title}
          </Typography>
        </a>
        <Typography color="#c8c8c8" sx={{ mb: '10px', wordWrap: 'break-word', maxWidth: '900px' }}>
          {prj.describe}
        </Typography>
        <Box display="flex" sx={{flexWrap: 'wrap'}}>
          <Typography color="white" variant="subtitle1" sx={{ mr: '12px' }}>Опубликован: {prj.date}</Typography>
          <Typography color="white" variant="subtitle1" sx={{ mr: '12px' }}>Просмотров: {prj.views && prj.views?.split(':').slice(-1)[0]}</Typography>
          <Typography color="white" variant="subtitle1">Заказ от: 
            <a href={prj.from} style={{textDecoration: 'none'}}>
              <Typography component="span" color="primary.light" sx={{ml: '8px'}}>{prj.from}</Typography>
            </a>
          </Typography>
        </Box>
      </Box>
      <Box sx={{ minWidth: '220px', p: '0 15px', textAlign: {md: 'center', sm: 'left'} }}>
        <Typography color="primary.light" variant="h6" sx={{ fontWeight: '600', m: {md: '0 0 10px', sm: '20px 0 4px', xs: '20px 0 4px'} }}>{prj.cost}</Typography>
        <Typography color="white">Срок выполнения: {prj.term ? prj.term?.split(':').slice(-1)[0] : 'не указано'}</Typography>
      </Box>
    </Box>
  )
}
