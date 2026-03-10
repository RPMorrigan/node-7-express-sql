CREATE TABLE animals (
  id SERIAL PRIMARY KEY,      
  name TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  can_fly BOOLEAN NOT NULL,
  lives_in TEXT NOT NULL
);

INSERT INTO animals (name, category, can_fly, lives_in) VALUES
('Lion', 'mammal', false, 'land'),
('Eagle', 'bird', true, 'air'),
('Dolphin', 'mammal', false, 'water'),
('Bat', 'mammal', true, 'air'),
('Frog', 'amphibian', false, 'land'),
('Shark', 'fish', false, 'water'),
('Elephant', 'mammal', false, 'land'),
('Butterfly', 'insect', true, 'air'),
('Penguin', 'bird', false, 'land'),
('Crocodile', 'reptile', false, 'water');