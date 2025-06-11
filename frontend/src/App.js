import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MonsterList from './components/MonsterList';
import MonsterCreate from './components/MonsterCreate';
import MonsterEdit from './components/MonsterEdit';

import MonsterBattle from './components/MonsterBattle';
import { CssBaseline, Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            モンスターバトルアプリ
          </Typography>
          <Button color="inherit" component={Link} to="/">一覧</Button>
          <Button color="inherit" component={Link} to="/create">新規作成</Button>
          <Button color="inherit" component={Link} to="/battle">バトル</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<MonsterList />} />
          <Route path="/create" element={<MonsterCreate />} />
          <Route path="/edit/:id" element={<MonsterEdit />} />
          <Route path="/battle" element={<MonsterBattle />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
