export const products = [
  {
    id: 'cpu-quantum-x9',
    name: 'Quantum X9 Processor',
    brand: 'CryoTech',
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
    brand: 'PyroCore',
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
    brand: 'ArcticFlow',
    price: 179.99,
    category: 'Cooling Systems',
    theme: 'ice',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1581091870626-3d6c15c5b7f4?auto=format&fit=crop&w=800&q=60',
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
    brand: 'VoltForge',
    price: 139.50,
    category: 'Accessories',
    theme: 'fire',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1587825140708-2a5b8e7196a0?auto=format&fit=crop&w=800&q=60',
    description: '80+ Gold, fully modular PSU with flame‑proof protections.',
    specs: {
      certification: '80+ Gold',
      modular: 'Fully Modular',
      protections: 'OVP/UVP/OPP/SCP',
      wattage: '850W'
    }
  },
  {
    id: 'gpu-glacier-xt',
    name: 'Glacier XT 16G',
    brand: 'GlacierWorks',
    price: 749.00,
    category: 'Graphics Cards',
    theme: 'ice',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1611078482719-9b2f5c4d1f39?auto=format&fit=crop&w=800&q=60',
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
    brand: 'DragonWorks',
    price: 429.99,
    category: 'Processors',
    theme: 'fire',
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1581091870624-9f0a6b5e3c9b?auto=format&fit=crop&w=800&q=60',
    description: 'Blazing performance tuned for creators and competitive gamers.',
    specs: {
      cores: '8 Performance + 4 Efficiency',
      baseClock: '4.0 GHz',
      boostClock: '5.1 GHz',
      tdp: '105W',
    }
  },

  // Additional accessories and categories
  {
    id: 'ram-venom-32gb',
    name: 'Venom 32GB DDR5',
    brand: 'HyperLux',
    price: 159.99,
    category: 'Memory',
    theme: 'ice',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1580201655930-1d1f9f5b2b6b?auto=format&fit=crop&w=800&q=60',
    description: '32GB (2x16GB) DDR5 kit, 6000MT/s, low-latency for high performance.',
    specs: {
      capacity: '32GB (2x16)',
      speed: '6000 MT/s',
      type: 'DDR5',
    }
  },
  {
    id: 'ssd-nova-1tb',
    name: 'Nova NVMe 1TB',
    brand: 'FlashCore',
    price: 129.99,
    category: 'Storage',
    theme: 'ice',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1580910051071-1bbd2d6f4b5b?auto=format&fit=crop&w=800&q=60',
    description: '1TB NVMe SSD with PCIe 4.0 speeds and heatsink.',
    specs: {
      capacity: '1TB',
      interface: 'PCIe 4.0 x4',
      read: '7000 MB/s',
      write: '5000 MB/s'
    }
  },
  {
    id: 'mouse-quantum-pro',
    name: 'Quantum Pro Gaming Mouse',
    brand: 'ClickForge',
    price: 69.99,
    category: 'Peripherals',
    theme: 'fire',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1579546928663-4f5c9e3c5b01?auto=format&fit=crop&w=800&q=60',
    description: 'High-precision sensor with customizable weights and RGB.',
    specs: {
      dpi: '200-16000',
      buttons: '8 programmable',
      connectivity: 'Wired/Wireless'
    }
  },
  {
    id: 'keyboard-arcane-tkl',
    name: 'Arcane TKL Mechanical Keyboard',
    brand: 'KeyCrafters',
    price: 119.99,
    category: 'Peripherals',
    theme: 'ice',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=800&q=60',
    description: 'Tenkeyless layout with hot-swappable switches and per-key RGB.',
    specs: {
      layout: 'TKL',
      switches: 'Hot-swappable',
      connectivity: 'Wired/Bluetooth'
    }
  },
  {
    id: 'monitor-odyssey-27',
    name: 'Odyssey 27" 144Hz',
    brand: 'VistaTech',
    price: 329.99,
    category: 'Monitors',
    theme: 'fire',
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1539883375381-6c2d4b9b0bde?auto=format&fit=crop&w=800&q=60',
    description: '27-inch 144Hz IPS display with adaptive sync and HDR support.',
    specs: {
      size: '27 inch',
      refresh: '144Hz',
      panel: 'IPS',
      resolution: '2560x1440'
    }
  },
  {
    id: 'case-argon-mid',
    name: 'Argon Mid-Tower Case',
    brand: 'ForgeCase',
    price: 99.99,
    category: 'Cases',
    theme: 'ice',
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b2b0b8?auto=format&fit=crop&w=800&q=60',
    description: 'Sleek mid-tower case with tempered glass and modular drive cages.',
    specs: {
      formFactor: 'ATX',
      fansIncluded: '2x 120mm',
      frontIO: 'USB-C, USB-A'
    }
  },
  {
    id: 'headset-vapor-7',
    name: 'Vapor 7 Surround Headset',
    brand: 'SoundPeak',
    price: 89.99,
    category: 'Audio',
    theme: 'fire',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1518445423264-3a1b5bd8b0f8?auto=format&fit=crop&w=800&q=60',
    description: '7.1 virtual surround sound headset with noise-cancelling mic.',
    specs: {
      connectivity: 'USB/3.5mm',
      mic: 'Noise-cancelling',
      drivers: '50mm'
    }
  },
  {
    id: 'fan-arctic-120',
    name: 'Arctic 120mm PWM Fan (3-pack)',
    brand: 'ArcticFlow',
    price: 39.99,
    category: 'Cooling Systems',
    theme: 'ice',
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1582719478186-24be8c1f6a0c?auto=format&fit=crop&w=800&q=60',
    description: 'Quiet PWM fans optimized for static pressure and airflow.',
    specs: {
      size: '120mm',
      noise: '18 dBA',
      rpm: '2000 RPM'
    }
  },
  {
    id: 'webcam-clarity-1080p',
    name: 'Clarity 1080p Webcam',
    brand: 'ClearCam',
    price: 59.99,
    category: 'Peripherals',
    theme: 'ice',
    rating: 4.1,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=60',
    description: '1080p webcam with wide dynamic range and low-light correction.',
    specs: {
      resolution: '1080p',
      fps: '30',
      mic: 'Built-in stereo'
    }
  }
]
