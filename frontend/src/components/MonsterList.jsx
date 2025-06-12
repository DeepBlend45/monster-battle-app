import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Button
} from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

function MonsterList() {
  const [monsters, setMonsters] = useState([]);

  useEffect(() => {
    fetchMonsters();
  }, []);

  const fetchMonsters = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/monsters');
      setMonsters(response.data);
    } catch (error) {
      console.error('モンスター一覧の取得に失敗しました', error);
    }
  };

  const deleteMonster = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/monsters/${id}`);
      setMonsters(monsters.filter(monster => monster.id !== id));
    } catch (error) {
      console.error('削除に失敗しました', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>モンスター一覧</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>名前</TableCell>
              <TableCell>体力</TableCell>
              <TableCell>攻撃力</TableCell>
              <TableCell>防御力</TableCell>
              <TableCell>素早さ</TableCell>
              <TableCell>技</TableCell>
              <TableCell>威力</TableCell>
              <TableCell>命中率</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {monsters.map((monster) => (
              <TableRow key={monster.id}>
                <TableCell>{monster.name}</TableCell>
                <TableCell>{monster.hp}</TableCell>
                <TableCell>{monster.attack}</TableCell>
                <TableCell>{monster.defense}</TableCell>
                <TableCell>{monster.speed}</TableCell>
                <TableCell>{monster.skillName}</TableCell>
                <TableCell>{monster.skillPower}</TableCell>
                <TableCell>{monster.skillAccuracy}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    component={Link}
                    to={`/edit/${monster.id}`}
                    sx={{ mr: 1 }}
                  >
                    編集
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    color="error"
                    onClick={() => deleteMonster(monster.id)}
                  >
                    削除
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {monsters.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  モンスターが登録されていません
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default MonsterList;
