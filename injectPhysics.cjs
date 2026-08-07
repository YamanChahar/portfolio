const fs = require('fs');
const path = require('path');

const islands = [
  { name: 'IslandLanding', file: 'IslandLanding.tsx', id: 'landing', mass: 0.8 },
  { name: 'IslandAbout', file: 'IslandAbout.tsx', id: 'about', mass: 1.0 },
  { name: 'IslandSkills', file: 'IslandSkills.tsx', id: 'skills', mass: 1.1 },
  { name: 'IslandProjects', file: 'IslandProjects.tsx', id: 'projects', mass: 1.5 },
  { name: 'IslandExperience', file: 'IslandExperience.tsx', id: 'experience', mass: 1.2 },
  { name: 'IslandContact', file: 'IslandContact.tsx', id: 'contact', mass: 0.9 },
];

const dir = path.join(__dirname, 'src', 'sections');

islands.forEach(island => {
  const filePath = path.join(dir, island.file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Add imports if not there
  if (!content.includes('RippleEngine')) {
    content = content.replace("import { useState } from 'react'", "import { useState, useRef, useEffect } from 'react'");
    if (!content.includes('useRef')) {
       // Just in case it's different
       content = content.replace("import { useState", "import { useState, useRef, useEffect");
    }
    content = content.replace(/(import .* from 'react'.*\n)/, `$1import { RippleEngine } from '../components/physics/RippleEngine'\n`);
  }

  // Add ref and useEffect
  if (!content.includes('islandRef = useRef')) {
    const componentRegex = new RegExp(`export default function ${island.name}\\(\\{ x, y \\}: \\{ x: number, y: number \\}\\) \\{`);
    
    const hookCode = `
  const islandRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (islandRef.current) {
      RippleEngine.registerIsland('${island.id}', islandRef.current, x, y, 250, ${island.mass}, 1);
    }
  }, [x, y]);
`;
    content = content.replace(componentRegex, `export default function ${island.name}({ x, y }: { x: number, y: number }) {${hookCode}`);
  }

  // Add ref to main div
  if (!content.includes('ref={islandRef}')) {
    content = content.replace(/className="absolute transform -translate-x-1\/2 -translate-y-1\/2/, `ref={islandRef}\n      className="absolute transform -translate-x-1/2 -translate-y-1/2`);
  }

  fs.writeFileSync(filePath, content);
  console.log(`Updated ${island.file}`);
});
