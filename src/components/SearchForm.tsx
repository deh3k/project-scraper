import { Box, Button, styled, TextField } from '@mui/material'
import React, { FormEvent, useState } from 'react'

const WhiteBorderTextField = styled(TextField)`
  & .css-1ptx2yq-MuiInputBase-root-MuiInput-root::after {
    border-color: rgb(144, 202, 249);
  }
  & .css-1ptx2yq-MuiInputBase-root-MuiInput-root::before {
    border-bottom: 1px solid rgba(255, 255, 255, 0.7);
  }
  &:hover .css-1ptx2yq-MuiInputBase-root-MuiInput-root::before {
    border-bottom: 2px solid rgba(255, 255, 255, 1);
  }
  `;

interface IProps {
  setKeyword: (value: string) => void
}

export default function SearchForm(props: IProps) {

  const [term, setTerm] = useState<string>('')

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    props.setKeyword(term)
    e.preventDefault()
  }

  return (
    <Box sx={{ width: '100%', backgroundColor: '#222222', p: '15px 0', mb: '30px', boxShadow: '2' }}>
      <form onSubmit={onSubmit}>
        <Box display="flex" sx={{ p: '0 15px' }}>
          <WhiteBorderTextField
            placeholder="Enter keyword"
            variant='standard'
            value={term}
            onChange={(e) => setTerm(e.currentTarget.value)}
            sx={{ 'input': { color: 'white' }, width: '100%', mr: '18px' }}
          />
          <Button type="submit" variant="contained" color="primary">Search</Button>
        </Box>
      </form>
    </Box>
  )
}
