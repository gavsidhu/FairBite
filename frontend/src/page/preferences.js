import { CUISINE_TYPES } from "../constants";
import React, { useState } from "react";

function Preferences() {

    const[query, setQuery] = useState("");
    const [imageURL, setImageURL] = useState(null);

    const filteredCuisines = Object.values(CUISINE_TYPES).filter((cuisine) =>
    cuisine.toLowerCase().startsWith(query.toLowerCase()));

    const REACT_APP_PIXABAY_API_KEY="35999918-2bb0aa9d0088e12e2a728fd1a"

    return(
        <div>
            <h1 className="mb-10 mt-10 ml-10 text-5xl font-bold">Welcome Team6</h1> {/* Welcome {username} */}
            <div className="flex flex-col items-center justify-center">
                <h2>What do you want to eat?</h2>
                <h2>Choose up to 5 cuisines to personalize your FairBite experience</h2>
                <div className="flex flex-row items-center space-x-4">
                    <input className="mb-5 mt-5 px-4 py-2 border border-gray-300 rounded-lg w-80" placeholder="" onChange={event => setQuery(event.target.value)} />
                    <img src="https://cdn-icons-png.flaticon.com/512/149/149852.png" alt="Search icon" class="w-6 h-6"></img>
                </div>
                <ul>
                    {query.length > 0 && filteredCuisines.map((cuisine) => (
                        <div className="flex flex-row items-center space-x-4">
                            <input type="checkbox" />
                            <li>{cuisine}</li>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Preferences;