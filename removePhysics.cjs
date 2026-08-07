const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'sections');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove RippleEngine import
  content = content.replace(/import \{ RippleEngine \} from '\.\.\/components\/physics\/RippleEngine'\n?/g, '');
  
  // Try to restore original react imports if they were modified by the script, but usually it's fine to keep them.
  
  // Remove islandRef and shipRef declarations
  content = content.replace(/^[ \t]*const islandRef = useRef<HTMLDivElement>\(null\);\n/m, '');
  content = content.replace(/^[ \t]*const shipRef = useRef<HTMLDivElement>\(null\);\n/m, '');
  
  // Remove useEffect for RippleEngine
  content = content.replace(/^[ \t]*useEffect\(\(\) => \{\s+if \(islandRef\.current\) \{\s+RippleEngine\.registerIsland\([^)]+\);\s+\}(?:\s+if \(shipRef\.current\) \{\s+RippleEngine\.registerSecondary\([^)]+\);\s+\})?\s+\}, \[x, y\]\);\n/m, '');

  // Remove ref={islandRef} and ref={shipRef}
  content = content.replace(/^[ \t]*ref=\{islandRef\}\n/m, '');
  content = content.replace(/^[ \t]*ref=\{shipRef\}\n/m, '');

  fs.writeFileSync(filePath, content);
  console.log(`Reverted ${file}`);
});
