import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Results() {
  const { id } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/session/${id}/results`).then(async (res) => {
      const data = await res.json();
      console.log("results: ", data);
      fetch(`http://localhost:8000/restaurant/${data.result}`).then(
        async (res) => {
          const restaurantData = await res.json();
          setResult(restaurantData);
          console.log("restaurant: ", restaurantData);
        }
      );
    });
  }, []);

  return (
    <div className="max-w-xl mx-auto px-4">
      {result && (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <img
            className="w-full h-64 object-cover rounded-t-lg"
            src={result.image_url}
            alt={result.name}
          />
          <div className="mt-4 h-auto">
            <h3 className="text-xl font-semibold">{result.name}</h3>
            <p className="text-gray-600">
              {result.location.display_address.join(", ")}
            </p>
            <p className="text-gray-600">{result.display_phone}</p>
            <p className="text-gray-600">
              {result.rating} / 5 ({result.review_count} reviews)
            </p>
            {result.hours && result.hours[0].is_open_now ? (
              <p className="text-gray-600">Open now</p>
            ) : (
              <p className="text-gray-600">Closed</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}