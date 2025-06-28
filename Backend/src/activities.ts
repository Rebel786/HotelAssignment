import axios from 'axios';

export async function fetchFromSupplierA(params: any) {
   const res = await axios.get('http://localhost:3000/supplierA/hotels', {
    params: { city: params.city }
  });
  return res.data;
}

export async function fetchFromSupplierB(params: any) {
   const res = await axios.get('http://localhost:3000/supplierB/hotels', {
    params: { city: params.city }
  });
  return res.data;
}
