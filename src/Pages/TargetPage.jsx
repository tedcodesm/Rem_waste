import React, { useEffect, useState } from "react";

const TargetPage = () => {
  const [skips, setSkips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSkip, setSelectedSkip] = useState(null);

  useEffect(() => {
    fetch(
      "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
    )
      .then((res) => res.json())
      .then((data) => {
        setSkips(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch skips:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-black text-white w-full min-h-screen px-4 relative">
      <div className="py-4">
        <h1 className="text-4xl font-bold text-center font-serif mt-10">
          Choose Your Skip Size
        </h1>
        <p className="text-gray-500 text-center">
          Select the skip size that best suits your needs
        </p>
      </div>

      {loading ? (
        <div className="flex flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce"></div>
          <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-.5s]"></div>
        </div>
      ) : (
        <div className="flex flex-wrap mx-auto justify-center gap-8 w-full max-w-7xl">
          {skips.map((skip) => (
            <div
              key={skip.id}
              className="w-full sm:w-80 group px-6 py-5 bg-white/10 rounded-lg flex flex-col items-center justify-center gap-2 relative after:absolute after:h-full after:bg-lime-400 z-20 shadow-lg after:-z-20 after:w-full after:inset-0 after:rounded-lg transition-all duration-500 hover:after:translate-y-0 after:-translate-y-full overflow-hidden cursor-pointer"
            >
              <img
                src="/skip.jpg"
                className="w-full h-40 transition-transform duration-500 ease-in-out hover:scale-110 object-cover rounded"
                alt="skip"
              />

              <p className="font-semibold text-gray-200 font-mono tracking-wider group-hover:text-gray-700 text-xl">
                {skip.size} yards
              </p>
              <p className="font-semibold text-gray-600 text-sm  text-center">
                {skip.hire_period_days} days hire period
              </p>
              <div className="flex flex-row justify-between items-center w-full mt-3">
                <p className="text-lime-400 font-semibold font-serif group-hover:text-gray-800">
                  £{skip.price_before_vat}
                </p>
                <button
                  onClick={() => setSelectedSkip(skip)}
                  className="bg-lime-400 group-hover:bg-white/10 shadow-lg cursor-pointer py-2 px-4 text-sm font-semibold rounded-full text-black"
                >
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedSkip && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-lime-400 text-black rounded-lg p-6 w-80 sm:w-96 shadow-xl animate-fadeIn">
            <h2 className="text-2xl font-bold font-serif mb-4">
              Confirm Your Selection
            </h2>
            <p className="mb-2 font-serif">
              <strong>Size:</strong> {selectedSkip.size} yards
            </p>
            <p className="mb-2 font-serif">
              <strong>Price:</strong> £{selectedSkip.price_before_vat}
            </p>
            <p className="mb-4 font-serif">
              <strong>Hire Period:</strong> {selectedSkip.hire_period_days} days
            </p>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setSelectedSkip(null)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 font-semibold"
              >
                Go Back
              </button>
              <button
                onClick={() => alert("Proceeding with order...")}
                className="px-4 py-2 rounded bg-black text-lime-400 hover:bg-gray-800 font-semibold"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TargetPage;
