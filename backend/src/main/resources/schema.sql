CREATE TABLE monster (
  id IDENTITY PRIMARY KEY,
  name VARCHAR(50),
  hp INT,
  attack INT,
  defense INT,
  speed INT,
  skill_name VARCHAR(50),
  skill_power INT,
  skill_accuracy INT
);