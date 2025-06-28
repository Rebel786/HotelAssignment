import { proxyActivities } from '@temporalio/workflow';
import type * as activities from './activities';

const { fetchFromSupplierA, fetchFromSupplierB } = proxyActivities<typeof activities>({
  startToCloseTimeout: '6s', // adjust as needed
  retry: { maximumAttempts: 3 }
});

export interface SearchHotelsInput {
  city: string;
  checkIn: string;
  checkOut: string;
}

export interface Hotel {
  hotelId: string;
  name: string;
  price: number;
  supplier: string;
  rating: number;
  city: string;
  image: string; 
}

export async function searchHotelsWorkflow(input: SearchHotelsInput): Promise<Hotel[] | { error: string }> {
  let [a, b] = await Promise.allSettled([
    fetchFromSupplierA(input),
    fetchFromSupplierB(input)
  ]);

  let results: Hotel[] = [];
  if (a.status === 'fulfilled' && Array.isArray(a.value) && a.value.length) {
    results = results.concat(a.value.map((h: any) => ({ ...h, supplier: 'A' })));
  }
  if (b.status === 'fulfilled' && Array.isArray(b.value) && b.value.length) {
    results = results.concat(b.value.map((h: any) => ({ ...h, supplier: 'B' })));
  }

  if (!results.length) return { error: 'No hotels found' };

  // Return all hotels instead of just the cheapest
  return results;
}
