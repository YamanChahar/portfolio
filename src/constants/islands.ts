export const ISLAND_COORDINATES = [
  { id: 'landing', x: 400, y: 3600, zoom: 0.7, name: 'Home' },
  { id: 'about', x: 1200, y: 3200, zoom: 0.7, name: 'About' },
  { id: 'skills', x: 2200, y: 2800, zoom: 0.7, name: 'Skills' },
  { id: 'projects', x: 1400, y: 1800, zoom: 0.7, name: 'Projects' },
  { id: 'experience', x: 2800, y: 1400, zoom: 0.7, name: 'Experience' },
  { id: 'contact', x: 2000, y: 400, zoom: 0.7, name: 'Contact' },
]

export const MAP_SIZE = { width: 4000, height: 4000 }

// Calculate safe water positions away from island centers
export const getDockPos = (index: number) => {
  const angle = index * 2.5 
  return {
    x: ISLAND_COORDINATES[index].x + Math.cos(angle) * 400,
    y: ISLAND_COORDINATES[index].y + Math.sin(angle) * 400,
  }
}
