import { Container, Typography } from '@mui/material';
import React, { useState } from 'react';
import ProjectList from './components/ProjectList';
import SearchForm from './components/SearchForm';

function App() {

  const [keyword, setKeyword] = useState<string>('')

  return (
    <Container maxWidth="lg" sx={{ p: '60px 0' }}>
      <Typography variant="h3" component="h1" color="white" textAlign="center" sx={{ mb: '15px' }}>
        Search for freelance projects
      </Typography>
      <Typography variant="subtitle1" component="p" color="white" textAlign="center" sx={{ mb: '30px' }}>
        Search for freelance projects on websites: https://freelance.habr.com, https://freelance.ru
      </Typography>
      <SearchForm setKeyword={setKeyword}/>
      <ProjectList keyword={keyword}/>
    </Container>
  );
}

export default App;
