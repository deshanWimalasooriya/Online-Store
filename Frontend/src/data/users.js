export const seedUsers = [
  {
    id: 'usr-deshan',
    name: 'Deshan Wimalalsooriya',
    email: 'deshan@gmail.com',
    // hashed using simple btoa salt method used by frontend mock
    passwordHash: btoa('password123::salt'),
    address: {
      line1: '123 Developer Lane',
      city: 'Colombo',
      region: 'Western',
      postal: '10000',
      country: 'Sri Lanka'
    },
    paymentMethods: [
      { id: 'pm_1', brand: 'Visa', last4: '4242', exp: '12/26', type: 'card' }
    ],
    profilePicture: '',
    orders: [
      { id: 'ORD-1001', date: '2025-09-12', total: 1299.99, items: [{ id: 'p1', name: 'GPU X', qty: 1, price: 1299.99 }], status: 'delivered' }
    ]
  }
]
