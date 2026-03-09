// POST form processor (Q2-style, divisibility)
app.post('/q2a-process', (req, res) => {
  const { num1, num2, num3, divisor } = req.body;
  const isDivisible = (num, div) => Number(num) % Number(div) === 0;
  let results = [
    isDivisible(num1, divisor) ? `${num1} yes` : `${num1} no`,
    // repeat for num2/3
  ];
  res.send(`
    <h1>Results</h1>
    <ul>${results.map(r => `<li>${r}</li>`).join('')}</ul>
  `);
});

// EJS Render (Q3A)
app.post('/q3a-display', (req, res) => {
  const selections = req.body.fruits || []; // array if checkboxes
  if (selections.length === 0) {
    return res.render('q3a-display', { selections: [] });
  }
  res.render('q3a-display', { selections });
});

// Self-POST (Q3B GET/POST)
app.get('/q3b-one', (req, res) => res.render('q3b-one', { options: fruitOptions, selections: [] }));
app.post('/q3b-one', (req, res) => {
  const selections = req.body.transports || [];
  const count = selections.length;
  res.render('q3b-one', { options: transportOptions, selections, count });
});





// Anagram check
function anagram(str1, str2) {
  const clean1 = str1.toLowerCase().replace(/\s/g, '');
  const clean2 = str2.toLowerCase().replace(/\s/g, '');
  if (clean1.length !== clean2.length) return false;
  const sort1 = clean1.split('').sort().join('');
  const sort2 = clean2.split('').sort().join('');
  return sort1 === sort2;
}

// Grid neighbors
function findNextCoolerStops(grid, row, col) {
  const dirs = [[0,1],[0,-1],[1,0],[-1,0]];
  const curr = grid[row][col];
  return dirs
    .map(([dr,dc]) => {
      const nr = row + dr, nc = col + dc;
      return (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length && grid[nr][nc] < curr) ? [nr, nc] : null;
    })
    .filter(Boolean)
    .flat();
}
