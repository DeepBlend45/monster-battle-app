import React, { useEffect, useState } from 'react';
import {
  Box, Button, Typography, Select, MenuItem, Paper
} from '@mui/material';
import axios from 'axios';

function MonsterBattle() {
  const [monsters, setMonsters] = useState([]);
  const [firstId, setFirstId] = useState('');
  const [secondId, setSecondId] = useState('');
  const [battleLog, setBattleLog] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/monsters')
      .then((res) => setMonsters(res.data))
      .catch((err) => console.error('モンスター取得失敗', err));
  }, []);

  const findMonster = (id) => monsters.find((m) => m.id === parseInt(id));

  const handleBattle = () => {
    const m1 = findMonster(firstId);
    const m2 = findMonster(secondId);
  
    if (!m1 || !m2 || m1.id === m2.id) {
      alert('異なる2体のモンスターを選んでください');
      return;
    }
  
    axios.post('http://localhost:8080/api/monsters/battle', null, {
      params: { id1: m1.id, id2: m2.id }
    })
    .then(res => {
      const logLines = res.data.split('\n');
      setBattleLog(logLines);
    })
    .catch(err => {
      console.error('バトルに失敗しました', err);
      alert('バトル処理に失敗しました。');
    });
  };
  

  return (
    <Paper sx={{ p: 4, maxWidth: 700, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>モンスターバトル</Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Select
          value={firstId} displayEmpty fullWidth
          onChange={(e) => setFirstId(e.target.value)}
        >
          <MenuItem value="" disabled>1体目を選択</MenuItem>
          {monsters.map((m) => (
            <MenuItem key={m.id} value={m.id}>{m.name}</MenuItem>
          ))}
        </Select>
        <Select
          value={secondId} displayEmpty fullWidth
          onChange={(e) => setSecondId(e.target.value)}
        >
          <MenuItem value="" disabled>2体目を選択</MenuItem>
          {monsters.map((m) => (
            <MenuItem key={m.id} value={m.id}>{m.name}</MenuItem>
          ))}
        </Select>
      </Box>
      <Button
        variant="contained"
        fullWidth
        onClick={handleBattle}
        disabled={!firstId || !secondId}
      >
        バトル開始！
      </Button>
      <Box sx={{ mt: 4, whiteSpace: 'pre-line', fontFamily: 'monospace' }}>
        {battleLog.map((line, i) => (
          <Typography key={i}>{line}</Typography>
        ))}
      </Box>
    </Paper>
  );
}

export default MonsterBattle;
