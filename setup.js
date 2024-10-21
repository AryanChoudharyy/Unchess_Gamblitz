
const directories = [
  'src/components',
  'src/lib',
  'src/contexts'
];

const files = [
  'src/components/Board.tsx',
  'src/components/Square.tsx',
  'src/components/Piece.tsx',
  'src/components/GameInfo.tsx',
  'src/components/MoveInput.tsx',
  'src/lib/types.ts',
  'src/lib/constants.ts',
  'src/lib/gameLogic.ts',
  'src/contexts/GameContext.tsx'
];

// Create directories
directories.forEach(dir => {
  fs.mkdirSync(path.join(__dirname, dir), { recursive: true });
  console.log(`Created directory: ${dir}`);
});

// Create files
files.forEach(file => {
  fs.writeFileSync(path.join(__dirname, file), '');
  console.log(`Created file: ${file}`);
});

console.log('Setup complete!');
