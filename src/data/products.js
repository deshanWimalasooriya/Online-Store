export const categories = ['Processors','Graphics Cards','Cooling Systems','Accessories']

export const products = [
  {
    id: 'cpu-quantum-x9',
    name: 'Quantum X9 Processor',
    price: 599.99,
    category: 'Processors',
    theme: 'ice',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=60',
    description: '9-core next‑gen CPU with AI acceleration and ultra‑low temps.',
    specs: {
      cores: '9 Performance + 4 Efficiency',
      baseClock: '4.2 GHz',
      boostClock: '5.6 GHz',
      tdp: '95W',
    }
  },
  {
    id: 'gpu-inferno-rtx',
    name: 'Inferno RTX Blaze',
    price: 1199.00,
    category: 'Graphics Cards',
    theme: 'fire',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=60',
    description: 'Ray‑traced fury with liquid flames. Built for 8K domination.',
    specs: {
      vram: '24GB GDDR6X',
      cores: '16384 CUDA',
      boostClock: '2.7 GHz',
      tdp: '350W',
    }
  },
  {
    id: 'cool-cryoflux-360',
    name: 'CryoFlux 360 AIO',
    price: 179.99,
    category: 'Cooling Systems',
    theme: 'ice',
    rating: 4.6,
    image: '/assets/cool-cryoflux-360.png',
    description: 'Triple‑fan liquid cooling with nanofin cold plate for extreme stability.',
    specs: {
      radiator: '360mm',
      fans: '3x 120mm PWM',
      noise: '18 dBA',
    }
  },
  {
    id: 'acc-firepower-psu',
    name: 'FirePower 850W PSU',
    price: 139.50,
    category: 'Accessories',
    theme: 'fire',
    rating: 4.5,
    image: '/assets/acc-firepower-psu.png',
    description: '80+ Gold, fully modular PSU with flame‑proof protections.',
    specs: {
      certification: '80+ Gold',
      modular: 'Fully Modular',
      protections: 'OVP/UVP/OPP/SCP',
    }
  },
  {
    id: 'gpu-glacier-xt',
    name: 'Glacier XT 16G',
    price: 749.00,
    category: 'Graphics Cards',
    theme: 'ice',
    rating: 4.7,
    image: '/assets/gpu-glacier-xt.png',
    description: 'Silent, sub‑zero graphics with crystal‑clear performance.',
    specs: {
      vram: '16GB GDDR6',
      cores: '9216',
      boostClock: '2.4 GHz',
    }
  },
  {
    id: 'cpu-dragonfire-z7',
    name: 'DragonFire Z7',
    price: 429.99,
    category: 'Processors',
    theme: 'fire',
    rating: 4.4,
    image: '/assets/cpu-dragonfire-z7.png',
    description: 'Blazing performance tuned for creators and competitive gamers.',
    specs: {
      cores: '8 Performance + 4 Efficiency',
      baseClock: '4.0 GHz',
      boostClock: '5.1 GHz',
      tdp: '105W',
    }
  }
]
