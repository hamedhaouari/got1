import { useState } from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleScrape = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/got-scrape');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-6">Game of Thrones House Scraper</h1>
      
      <button
        onClick={handleScrape}
        disabled={loading}
        className="bg-red-700 hover:bg-red-600 text-white px-6 py-3 rounded-lg disabled:bg-gray-600 transition-colors"
      >
        {loading ? 'Gathering House Information...' : 'Fetch House Data'}
      </button>

      {error && (
        <div className="mt-6 p-4 bg-red-900/50 text-red-200 rounded-lg">
          Error: {error}
        </div>
      )}

      {data && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Houses of Westeros:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.data.map((house, index) => (
              <div 
                key={index} 
                className="bg-gray-800 p-4 rounded-lg shadow-lg"
              >
                <h3 className="text-xl font-bold text-red-500">{house.name}</h3>
                <p className="text-gray-300">Region: {house.region}</p>
                {house.words && <p className="text-gray-300">Words: {house.words}</p>}
                {house.seat && <p className="text-gray-300">Seat: {house.seat}</p>}
                {house.wikiUrl && (
                  <a 
                    href={house.wikiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-sm mt-2 block"
                  >
                    Read More
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}