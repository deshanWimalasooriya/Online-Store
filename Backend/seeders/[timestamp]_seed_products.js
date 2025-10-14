exports.seed = async function(knex) {
  // Clear existing data
  await knex('products').del();

  // Insert seed data
  await knex('products').insert([
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
        tdp: '350W'
      },
      availability: 'Out of Stock'
    }
  ]);
};
