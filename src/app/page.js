'use client';

import { useState } from "react";
import Finder from "../app/components/Finder"; // Adjust the import path as necessary
import axios from "axios";

export default function Home() {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchItem = async (query) => {
    setLoading(true);

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
      setProductData(response.data.data.products || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="Home  min-h-screen grid justify-center items-center p-12">
      <div>
        <h1 className="text-4xl font-bolder font-mono">WatchFinder</h1>
        <p className="font-mono">Powered by Amazon API(real-time-amazon-data.p.rapidapi.com)</p>
        <Finder searchItem={fetchItem} />
      </div>
      <div className="productBox grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 rounded-xl m-2">
        {loading ? (
          <p>Loading...</p>
        ) : productData.length > 0 ? (
          productData.map((product, index) => (
            <div key={index} className="productItem border-2 border-zinc-800 rounded-md p-4 m-auto">
              <img className="w-full h-60 object-cover rounded-md" src={product.product_photo} alt={product.product_title} />
              <h1 className=" rounded-md mt-2 mb-2 font-mono">{product.product_title}</h1>
              <h1 className=" rounded-md font-extrabold text-2xl mt-2 mb-2 font-mono">Price: {product.product_price}</h1>
              <button className="bg-orange-600 rounded-lg p-2">
                <a className="font-mono" target="_blank" href={product.product_url}>Amazon Link</a>
              </button>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>

    </main>
  );
}
