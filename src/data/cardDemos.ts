// Demo cards for made-up businesses, hosted at /samples/cards/<slug>/ (noindex).
// Built from the card starter. Looks are grouped into six numbered styles on the site;
// the internal style names (Steve Jobs, Jensen Huang, ...) stay off the site.
// look / lookEs = the button label for each look.
export interface CardDemo { slug: string; name: string; look: string; lookEs: string }
export const cardStyles: CardDemo[][] = [
  [ // 1 clean
    { slug: 'northline-advisory', name: 'Northline Advisory', look: 'Clean', lookEs: 'Limpio' },
    { slug: 'stillwater-spa', name: 'Stillwater Spa', look: 'Calm', lookEs: 'Sereno' },
    { slug: 'bright-smile-dental', name: 'Bright Smile Dental', look: 'Health', lookEs: 'Salud' },
  ],
  [ // 2 organized
    { slug: 'harlow-vance-cpa', name: 'Harlow & Vance, CPA', look: 'Classic', lookEs: 'Clásico' },
    { slug: 'spoke-bolt-repair', name: 'Spoke & Bolt Repair', look: 'Organized', lookEs: 'Ordenado' },
    { slug: 'riverbend-plumbing', name: 'Riverbend Plumbing', look: 'Trade', lookEs: 'Oficios' },
    { slug: 'little-oak-learning', name: 'Little Oak Learning', look: 'Learn', lookEs: 'Aprender' },
  ],
  [ // 3 warm
    { slug: 'clay-kiln', name: 'Clay & Kiln', look: 'Warm', lookEs: 'Cálido' },
    { slug: 'hollow-creek-farm', name: 'Hollow Creek Farm', look: 'Farm', lookEs: 'Granja' },
    { slug: 'common-ground-garden', name: 'Common Ground Garden', look: 'Community', lookEs: 'Comunidad' },
  ],
  [ // 4 editorial
    { slug: 'maison-vale', name: 'Maison Vale', look: 'Editorial', lookEs: 'Editorial' },
    { slug: 'ines-mora-studio', name: 'Ines Mora Studio', look: 'Studio', lookEs: 'Estudio' },
    { slug: 'elena-brooks', name: 'Elena Brooks', look: 'Realtor', lookEs: 'Inmobiliaria' },
  ],
  [ // 5 bold
    { slug: 'ironside-barbers', name: 'Ironside Barbers', look: 'Bold', lookEs: 'Audaz' },
    { slug: 'rise-bakehouse', name: 'Rise Bakehouse', look: 'Kitchen', lookEs: 'Cocina' },
    { slug: 'black-dirt-cellars', name: 'Black Dirt Cellars', look: 'Cellar', lookEs: 'Bodega' },
  ],
  [ // 6 motion
    { slug: 'night-shift-live', name: 'Night Shift Live', look: 'Motion', lookEs: 'En movimiento' },
    { slug: 'forge-fitness', name: 'Forge Fitness', look: 'Pulse', lookEs: 'Pulso' },
    { slug: 'happy-tails-grooming', name: 'Happy Tails Grooming', look: 'Pets', lookEs: 'Mascotas' },
  ],
];
export const cardDemos = cardStyles.flat();
