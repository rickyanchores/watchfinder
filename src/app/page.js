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
    <main className="min-h-screen grid items-center justify-between p-12">
      <div>
        <h1 className="text-4xl font-bold">WatchUFinder</h1>
        <Finder searchItem={fetchItem} />
      </div>
      <div className="productBox grid grid-cols-1 md:grid-cols-2 p-4 rounded-xl m-2">
        {productData && productData.products && productData.products.length > 0 ? (
          <>
            <img className="w-[560px] bg-zinc-700 rounded-md p-2 m-auto" src={productData.products[0].product_photo} alt="Product" />
            <h1 className="bg-zinc-700 rounded-md p-2 m-2">{productData.products[0].product_title}</h1>
            <h1 className="bg-zinc-900 rounded-md p-2 m-2 font-extrabold text-2xl">Price: £ {productData.products[0].product_price}</h1>
            <button className="bg-orange-600 rounded-lg p-2">
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
