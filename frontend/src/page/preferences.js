import { cuisineArray } from "../constants";
import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth"
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Preferences() {

    const { user } = useAuth();
    const navigate = useNavigate();
  
    // Return to register page if not registered
    useEffect(() => {
      if (!user) {
        return navigate("/register");
      }
    }, [navigate, user]);
  
    const location = useLocation();
    const email = user?.email;
  
    const [page, setPage] = useState(1);
    const [selectedCuisineIndexes, setSelectedCuisineIndexes] = useState([]);
    const itemsPerPage = 40;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const cuisinesOnPage = cuisineArray.slice(startIndex, endIndex);
  
    const handleCheckboxChange = (index) => {
      setSelectedCuisineIndexes((prevSelectedCuisineIndexes) => {
        if (prevSelectedCuisineIndexes.includes(index)) {
          return prevSelectedCuisineIndexes.filter((i) => i !== index);
        } else if (prevSelectedCuisineIndexes.length < 5) {
          return [...prevSelectedCuisineIndexes, index];
        } else {
          return prevSelectedCuisineIndexes;
        }
      });
    };
  
    const submitPreferences = async (email, selectedCuisineIndexes) => {
      const preferences = selectedCuisineIndexes.map(
        (index) => cuisineArray[index].alias
      );
      console.log(preferences)
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/add-preferences`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, preferences }),
      });
      navigate("/");
    };
      

    return(
        <div className="flex flex-col items-center justify-center mb-10">
      <h1 className="mb-10 mt-10 ml-10 text-5xl font-bold">Welcome {email}</h1>
      <h2 className="text-2xl">What do you want to eat?</h2>
      <h2 className="mb-5">
        Choose 3 to 5 cuisines to personalize your FairBite experience
      </h2>
      <h2 className="text-2xl font-bold text-green-600">
        {selectedCuisineIndexes.length < 3 && (
          <span className="text-red-600">
            {selectedCuisineIndexes.length} / 5 selected
          </span>
        )}
        {selectedCuisineIndexes.length >= 3 && (
          <span className="text-green-600">
            {selectedCuisineIndexes.length} / 5 selected
          </span>
        )}
      </h2>
      <div className="w-4/5">
        <ul className="grid grid-cols-4 gap-4 mt-4 mb-10">
          {cuisinesOnPage.map((cuisineObj, index) => (
            <li className="flex items-center space-x-2" key={index}>
              <input
                id={`cuisine-${startIndex + index}`}
                type="checkbox"
                style={{ cursor: "pointer" }}
                className="w-5 h-5"
                checked={selectedCuisineIndexes.includes(
                  cuisineArray.indexOf(cuisineObj)
                )}
                onChange={() =>
                  handleCheckboxChange(cuisineArray.indexOf(cuisineObj))
                }
              />
              <label
                htmlFor={`cuisine-${startIndex + index}`}
                style={{ cursor: "pointer", userSelect: "none" }}
                className="text-2xl"
              >
                {cuisineObj.cuisine}
              </label>
            </li>
          ))}
        </ul>
        <div></div>
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center justify-center mb-8">
            <button
              className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
              onClick={() => submitPreferences(email, selectedCuisineIndexes)}
            >
              Submit
            </button>
          </div>
          <div className="flex flex-row items-center justify-center space-x-4">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 mr-2"
            >
              Previous
            </button>
            <p className="font-bold text-lg">
              {page}/{Math.ceil(cuisineArray.length / itemsPerPage)}
            </p>
            <button
              disabled={endIndex >= cuisineArray.length}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
    );
}

export default Preferences;