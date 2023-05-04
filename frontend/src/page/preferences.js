import { CUISINE_TYPES } from "../constants";
import React, { useState } from "react";

function Preferences() {

    const[query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const itemsPerPage = 40;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const filteredCuisines = Object.values(CUISINE_TYPES).filter((cuisine) =>
    cuisine.toLowerCase().startsWith(query.toLowerCase()));
    const cuisinesOnPage = filteredCuisines.slice(startIndex, endIndex);
      
    //const [imageURL, setImageURL] = useState(null);
    //const REACT_APP_PIXABAY_API_KEY="35999918-2bb0aa9d0088e12e2a728fd1a"

    return(
        <div className="flex flex-col items-center justify-center mb-10">
            <h1 className="mb-10 mt-10 ml-10 text-5xl font-bold">Welcome Team6</h1> {/* Welcome {username} */}
            <h2 className="text-2xl">What do you want to eat?</h2>
            <h2>Choose up to 5 cuisines to personalize your FairBite experience</h2>
            <div className="flex flex-row items-center space-x-4">
                <input className="mb-5 mt-5 px-4 py-2 border border-gray-300 rounded-lg w-80" placeholder="" onChange={event => setQuery(event.target.value)} />
                <img src="https://cdn-icons-png.flaticon.com/512/149/149852.png" alt="Search icon" class="w-6 h-6"></img>
            </div>
            <div className="w-4/5">
                <ul class="grid grid-cols-4 gap-4 mt-4 mb-10">
                    {cuisinesOnPage.map((cuisine) => (
                        <li class="flex items-center space-x-2">
                            <input 
                                type="checkbox" 
                            />
                            <span className="text-2xl">{cuisine}</span>
                        </li>
                    ))}
                </ul>
                <div className="flex flex-row items-center justify-center space-x-4 fixed bottom-10 left-1/2 transform -translate-x-1/2">
                    <button 
                        disabled={page === 1} 
                        onClick={() => setPage(page - 1)} 
                        className="px-4 py-2 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 mr-2">
                        Previous
                    </button>
                    <p className="font-bold text-lg">{page}/{Math.ceil(filteredCuisines.length/itemsPerPage)}</p>
                    <button 
                        disabled={endIndex >= filteredCuisines.length} 
                        onClick={() => setPage(page + 1)} 
                        className="px-4 py-2 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Preferences;