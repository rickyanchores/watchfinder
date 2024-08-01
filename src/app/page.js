'use client';

import { useState } from "react";
import Finder from "../app/components/Finder"; // Adjust the import path as necessary
import axios from "axios";

export default function Home() {
  const [productData, setProductData] = useState(null);

  const fetchItem = async (query) => {
    const options = {
      method: 'GET',
      url: 'https://real-time-amazon-data.p.rapidapi.com/search',
      params: {
        query: query,
        page: '1',
        country: 'IT',
        sort_by: 'RELEVANCE',
        max_price: '3000',
        product_condition: 'ALL',
        // brand: 'casio,seiko'
      },
      headers: {
        'x-rapidapi-key': 'bc22f11f37mshcbe9e742a1ed8cap1c4dbcjsna5ccd20c55bc',
        'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log('Fetched Data:', response.data.data);
      setProductData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className="text-4xl font-bold">WatchFinder</h1>
        <Finder searchItem={fetchItem} />
      </div>
      <div className="productBox bg-zinc-800 p-4 rounded-xl">
        {productData && productData.products && productData.products.length > 0 ? (
          <>
            <h1>{productData.products[0].product_title}</h1>
            <img className="w-[600px] m-auto" src={productData.products[0].product_photo} alt="Product" />
            <h1>Price: £ {productData.products[0].product_price}</h1>
            <button className="bg-orange-600 p-2">
              <a className="" target="_blank" href={productData.products[0].product_url}>Link</a>
            </button>
            
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </main>
  );
}
