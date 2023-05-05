import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

function validateResultFormat(data) {
  // Check if the data object has a 'result' property, and it is a non-empty string
  return data && typeof data.result === "string" && data.result.length > 0;
}

const renderRating = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = Math.floor(5 - rating);

  return (
    <>
      {Array(fullStars)
        .fill()
        .map((_, index) => (
          <BsStarFill key={index} className="text-yellow-400" />
        ))}
      {halfStar && <BsStarHalf className="text-yellow-400" />}
      {Array(emptyStars)
        .fill()
        .map((_, index) => (
          <BsStar key={index} className="text-yellow-400" />
        ))}
    </>
  );
};


export default function Results() {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/session/${id}/results`)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch results: ${res.statusText}`);
        }
        const data = await res.json();
        console.log("results: ", data);

        // Validate the result format
        if (validateResultFormat(data)) {
          return data.result;
        } else {
          throw new Error("Invalid result format");
        }
      })
      .then((result) => {
        return fetch(`${process.env.REACT_APP_BACKEND_URL}/restaurant/${result}`);
      })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch restaurant: ${res.statusText}`);
        }
        const restaurantData = await res.json();
        setResult(restaurantData);
        console.log("restaurant: ", restaurantData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="max-w-xl mx-auto px-4">
      <div className="py-16 text-center">
        <h1 className="font-display text-5xl font-bold">
          Your FairBite Result
        </h1>
      </div>
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
              <span className="flex items-center">
                {renderRating(result.rating)}
                <span className="ml-1">{result.rating}</span>
              </span>{" "}
              / 5 ({result.review_count} reviews)
            </p>
            {result.hours && result.hours[0].is_open_now ? (
              <p className="text-gray-600">Open now</p>
            ) : (
              <p className="text-gray-600">Closed</p>
            )}
          </div>
        </div>
      )}
      <div className="py-6 text-center">
        <button
          className="bg-[#F8972A] h-16 w-[40%] mx-auto text-white text-lg font-semibold rounded-lg"
          onClick={() => navigate("/")}
        >
          Home
        </button>
      </div>
    </div>
  );
}
