import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RestaurantSwiper from "../components/RestaurantSwiper";
import socket from "../socket";
import useAuth from "../hooks/useAuth";

const Session = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [message, setMessage] = useState("");
  const [allUsersJoined, setAllUsersJoined] = useState(false);
  const [expired, setExpired] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(15);

  useEffect(() => {
    if(!user) {
      return navigate("/sign-in")
    }
  
    // Join the session when the component is mounted
    socket.emit("join-session", id, user.uid);

    socket.on("user-joined", (sessionId, userId) => {
      console.log("User joined the session (client-side):", sessionId, userId);
      setMessage(`User ${userId} has joined`);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    });

    socket.on("all-users-joined", (sessionId) => {
      console.log("All users joined the session:", sessionId);
      // Start the swiper or redirect to the swiping page
      setAllUsersJoined(true);

      // Start the countdown timer
      const countdown = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime - 1);
      }, 1000);

      // Expire the session after 15 seconds
      const timer = setTimeout(async () => {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/session/${id}/expire`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        });
        setExpired(true);
        clearInterval(countdown);
        navigate(`/results/${id}`);
      }, 15000);

      return () => {
        clearInterval(countdown);
      };
    });

    socket.on("session-data-updated", (updatedSessionId, updatedSessionData) => {
      console.log("session data updated")
      if (updatedSessionId === id) {
        // Update the local session data with the received updatedSessionData
        // (Add your logic to update the local session data)
      }
    });

    socket.on("session-expired", (sessionId) => {
      console.log("Session expired:", sessionId);
      // Redirect to the results page
      setExpired(true);
      navigate(`/results/${id}`);
    });

    return () => {
      socket.off("user-joined");
      socket.off("all-users-joined");
      socket.off("session-expired");
      socket.off("session-data-updated");
    };
  }, []);

  useEffect(() => {
    let location;
    let cuisines;
    //get location from session
    fetch(`${process.env.REACT_APP_BACKEND_URL}/session/${id}`, {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      const data = await res.json();
      location = data.location;
      console.log("location: ", location);
      //get cuisine preferences from user
      fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${user?.uid}`, {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (res) => {
        const data = await res.json();
        cuisines = data.preferences;
        console.log("cuisine: ", cuisines);
        const cuisine = cuisines.join(",");
        fetch(
          `${process.env.REACT_APP_BACKEND_URL}/restaurant?location=${location}&cuisine=${cuisine}`
        ).then(async (res) => {
          const data = await res.json();
          console.log(data.businesses);
          setRestaurants(data.businesses);
        });
      });
    });
  }, []);

  return (
    <div className="max-w-xl mx-auto px4">
      {message && (
        <div className="text-center">
          <p className="text-lg">{message}</p>
        </div>
      )}
      {expired && (
        <div className="py-16 text-center">
          <h1 className="font-display text-5xl font-bold">
            Session expired. Loading results...
          </h1>
        </div>
      )}
      {restaurants.length > 0 && allUsersJoined && !expired && (
        <>
          <p>{elapsedTime} seconds</p>
          <RestaurantSwiper restaurants={restaurants} />
        </>
      )}
      {!restaurants.length > 0 && (
        <div className="py-16 text-center">
          <h1 className="font-display text-5xl font-bold">
            Waiting for all users to join...
          </h1>
        </div>
      )}
      {!allUsersJoined && restaurants.length > 0 && (
        <div className="py-16 text-center">
          <h1 className="font-display text-5xl font-bold">
            Waiting for all users to join...
          </h1>
        </div>
      )}
    </div>
  );
};

export default Session;
