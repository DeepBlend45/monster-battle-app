import React, { useEffect, useState } from 'react';
import {
   TextField, Button, Typography, Paper
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function MonsterEdit() {
  const { id } = useParams();
  const [monster, setMonster] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("モンスター取得開始 ID:", id);
    axios.get(`http://localhost:8080/api/monsters/${id}`)
      .then((res) => setMonster(res.data))
      .catch((err) => console.error('取得に失敗しました', err));
  }, [id]);

  const handleChange = (e) => {
    setMonster({ ...monster, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/monsters/${id}`, {
        ...monster,
        skillPower: parseInt(monster.skillPower, 10),
        skillAccuracy: parseInt(monster.skillAccuracy, 10)
      });
      navigate('/');
    } catch (err) {
      console.error('更新に失敗しました', err);
    }
  };

  if (!monster) {
    return <Typography>読み込み中...</Typography>;
  }

  return (
    <Paper sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>モンスター編集</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth name="name" label="名前"
          value={monster.name} onChange={handleChange}
          margin="normal" required
        />
        <TextField
          fullWidth name="skillName" label="技名"
          value={monster.skillName} onChange={handleChange}
          margin="normal" required
        />
        <TextField
          fullWidth name="skillPower" label="威力"
          type="number" value={monster.skillPower}
          onChange={handleChange} margin="normal" required
        />
        <TextField
          fullWidth name="skillAccuracy" label="命中率"
          type="number" value={monster.skillAccuracy}
          onChange={handleChange} margin="normal" required
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }} fullWidth>
          更新する
        </Button>
      </form>
    </Paper>
  );
}

export default MonsterEdit;
