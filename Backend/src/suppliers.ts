// import express, { Request, Response } from 'express';
// import { RequestHandler } from 'express';

// export const suppliersRouter = express.Router();

// function randomDelay() {
//   return new Promise((res) => setTimeout(res, Math.random() * 5000));
// }

// function randomError() {
//   const rand = Math.random();
//   if (rand < 0.2) throw new Error('Supplier server error');
//   if (rand < 0.3) return []; // Empty result
// }



// const hotelDataA = [
//   { 
//     hotelId: '1', 
//     name: 'Hotel Alpha', 
//     price: 100, 
//     rating: 4.5, 
//     city: 'London',
//     image: './images/image1.png' // Placeholder image URL
//   },
//   { 
//     hotelId: '2', 
//     name: 'Hotel Beta', 
//     price: 120, 
//     rating: 4.0, 
//     city: 'London',
//     image: './images/image2.png'
//   },
//   { 
//     hotelId: '3', 
//     name: 'Hotel Gamma', 
//     price: 90, 
//     rating: 3.5, 
//     city: 'Paris',
//     image: './images/image3.png'
//   },
//   { 
//     hotelId: '4', 
//     name: 'Hotel Delta', 
//     price: 80, 
//     rating: 4.2, 
//     city: 'Paris',
//     image: './images/image4.png'
//   },
//   // { 
//   //   hotelId: '5', 
//   //   name: 'Hotel Epsilon', 
//   //   price: 200, 
//   //   rating: 5.0, 
//   //   city: 'Berlin',
//   //   image: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&auto=format'
//   // }
// ];

// const hotelDataB = [
//   { 
//     hotelId: '6', 
//     name: 'Hotel Omega', 
//     price: 110, 
//     rating: 4.1, 
//     city: 'London',
//     image: './images/image5.png'
//   },
//   { 
//     hotelId: '7', 
//     name: 'Hotel Zeta', 
//     price: 95, 
//     rating: 3.9, 
//     city: 'London',
//     image: './images/image6.png'
//   },
//   { 
//     hotelId: '8', 
//     name: 'Hotel Eta', 
//     price: 85, 
//     rating: 4.6, 
//     city: 'Paris',
//     image: './images/image7.png'
//   },
//   { 
//     hotelId: '9', 
//     name: 'Hotel Theta', 
//     price: 125, 
//     rating: 4.3, 
//     city: 'Berlin',
//     image: './images/image8.png'
//   },
//   // { 
//   //   hotelId: '10', 
//   //   name: 'Hotel Iota', 
//   //   price: 150, 
//   //   rating: 4.7, 
//   //   city: 'Berlin',
//   //   image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&auto=format'
//   // }
// ];


// suppliersRouter.get('/supplierA/hotels', async function (req, res) {
//   try {
//     await randomDelay();
//     const city = req.query.city;
//     const hotels = city
//       ? hotelDataA.filter(h => h.city.toLowerCase() === String(city).toLowerCase())
//       : hotelDataA;
//     const result = randomError();
//     if (Array.isArray(result)) return res.json([]);
//     res.json(hotels);
//   } catch {
//     res.status(500).json({ error: 'SupplierA failed' });
//   }
// });

// suppliersRouter.get('/supplierB/hotels', async function (req, res) {
//   try {
//     await randomDelay();
//      const city = req.query.city;
//     const hotels = city
//       ? hotelDataB.filter(h => h.city.toLowerCase() === String(city).toLowerCase())
//       : hotelDataB;
//     const result = randomError();
//     if (Array.isArray(result)) return res.json([]);
//     res.json(hotels);
//   } catch {
//     res.status(500).json({ error: 'SupplierB failed' });
//   }
// });







import express, { Request, Response } from 'express';
import { RequestHandler } from 'express';
import path from 'path';

export const suppliersRouter = express.Router();

// Serve static images from the backend
suppliersRouter.use('/images', express.static(path.join(__dirname, '../images')));

function randomDelay() {
  return new Promise((res) => setTimeout(res, Math.random() * 5000));
}

function randomError() {
  const rand = Math.random();
  if (rand < 0.2) throw new Error('Supplier server error');
  if (rand < 0.3) return []; // Empty result
}

const hotelDataA = [
  { 
    hotelId: '1', 
    name: 'Hotel Alpha', 
    price: 100, 
    rating: 4.5, 
    city: 'London',
    image: '/images/image1.png' // Changed to absolute path
  },
  { 
    hotelId: '2', 
    name: 'Hotel Beta', 
    price: 120, 
    rating: 4.0, 
    city: 'London',
    image: '/images/image2.png'
  },
  { 
    hotelId: '3', 
    name: 'Hotel Gamma', 
    price: 90, 
    rating: 3.5, 
    city: 'Paris',
    image: '/images/image3.png'
  },
  { 
    hotelId: '4', 
    name: 'Hotel Delta', 
    price: 80, 
    rating: 4.2, 
    city: 'Paris',
    image: '/images/image4.png'
  }
];

const hotelDataB = [
  { 
    hotelId: '6', 
    name: 'Hotel Omega', 
    price: 110, 
    rating: 4.1, 
    city: 'London',
    image: '/images/image5.png'
  },
  { 
    hotelId: '7', 
    name: 'Hotel Zeta', 
    price: 95, 
    rating: 3.9, 
    city: 'London',
    image: '/images/image6.png'
  },
  { 
    hotelId: '8', 
    name: 'Hotel Eta', 
    price: 85, 
    rating: 4.6, 
    city: 'Paris',
    image: '/images/image7.png'
  },
  { 
    hotelId: '9', 
    name: 'Hotel Theta', 
    price: 125, 
    rating: 4.3, 
    city: 'Berlin',
    image: '/images/image8.png'
  }
];

suppliersRouter.get('/supplierA/hotels', async function (req, res) {
  try {
    await randomDelay();
    const city = req.query.city;
    const hotels = city
      ? hotelDataA.filter(h => h.city.toLowerCase() === String(city).toLowerCase())
      : hotelDataA;
    const result = randomError();
    if (Array.isArray(result)) return res.json([]);
    res.json(hotels);
  } catch {
    res.status(500).json({ error: 'SupplierA failed' });
  }
});

suppliersRouter.get('/supplierB/hotels', async function (req, res) {
  try {
    await randomDelay();
    const city = req.query.city;
    const hotels = city
      ? hotelDataB.filter(h => h.city.toLowerCase() === String(city).toLowerCase())
      : hotelDataB;
    const result = randomError();
    if (Array.isArray(result)) return res.json([]);
    res.json(hotels);
  } catch {
    res.status(500).json({ error: 'SupplierB failed' });
  }
});