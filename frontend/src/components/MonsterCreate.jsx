import React, { useState } from 'react';
import {
   TextField, Button, Typography, Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MonsterCreate() {
  const [name, setName] = useState('');
  const [skillName, setSkillName] = useState('');
  const [skillPower, setSkillPower] = useState('');
  const [skillAccuracy, setSkillAccuracy] = useState('');
  const navigate = useNavigate();

  const getRandomStat = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMonster = {
      name,
      hp: getRandomStat(100, 200),
      attack: getRandomStat(40, 70),
      defense: getRandomStat(30, 60),
      speed: getRandomStat(10, 40),
      skillName,
      skillPower: parseInt(skillPower, 10),
      skillAccuracy: parseInt(skillAccuracy, 10)
    };

    try {
        console.log("送信前のJSON文字列", JSON.stringify(newMonster, null, 2));
        await axios.post('http://localhost:8080/api/monsters', newMonster);
      navigate('/');
    } catch (error) {
      console.error('作成に失敗しました', error);
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>モンスター新規作成</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth label="名前" value={name}
          onChange={(e) => setName(e.target.value)} margin="normal" required
        />
        <TextField
          fullWidth label="技名" value={skillName}
          onChange={(e) => setSkillName(e.target.value)} margin="normal" required
        />
        <TextField
          fullWidth label="技の威力" value={skillPower}
          onChange={(e) => setSkillPower(e.target.value)} type="number"
          margin="normal" required
        />
        <TextField
          fullWidth label="命中率（%）" value={skillAccuracy}
          onChange={(e) => setSkillAccuracy(e.target.value)} type="number"
          margin="normal" required
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }} fullWidth>
          モンスターを登録
        </Button>
      </form>
    </Paper>
  );
}

export default MonsterCreate;
