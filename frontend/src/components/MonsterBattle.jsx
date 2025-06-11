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
    const m1 = { ...findMonster(firstId) };
    const m2 = { ...findMonster(secondId) };
    if (!m1 || !m2 || m1.id === m2.id) {
      alert('異なる2体のモンスターを選んでください');
      return;
    }

    const logs = [];
    let attacker = m1.speed >= m2.speed ? m1 : m2;
    let defender = attacker === m1 ? m2 : m1;

    logs.push(`バトル開始！ ${m1.name} vs ${m2.name}`);

    let round = 1;
    while (m1.hp > 0 && m2.hp > 0) {
      logs.push(`--- ラウンド ${round} ---`);

      if (Math.random() * 100 <= attacker.skillAccuracy) {
        defender.hp -= attacker.skillPower;
        logs.push(`${attacker.name} の ${attacker.skillName} が命中！ ${defender.name} に ${attacker.skillPower} ダメージ！`);
      } else {
        logs.push(`${attacker.name} の攻撃は外れた！`);
      }

      if (defender.hp <= 0) {
        logs.push(`${defender.name} は倒れた！`);
        logs.push(`${attacker.name} の勝ち！`);
        break;
      }

      [attacker, defender] = [defender, attacker];
      round++;
    }

    setBattleLog(logs);
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
