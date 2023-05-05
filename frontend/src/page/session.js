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
        await fetch(`http://localhost:8000/session/${id}/expire`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        });
        setExpired(true);
        clearInterval(countdown);
      }, 15000);

      return () => {
        clearInterval(countdown);
      };
    });

    socket.on("session-expired", (sessionId) => {
      console.log("Session expired:", sessionId);
      // Redirect to the results page
      setExpired(true);
      navigate("/results");
    });

    return () => {
      socket.off("user-joined");
      socket.off("all-users-joined");
      socket.off("session-expired");
    };
  }, []);

  useEffect(() => {
    let location;
    let cuisines;
    //get location from session
    fetch(`http://localhost:8000/session/${id}`, {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      const data = await res.json();
      location = data.location;
      console.log("location: ", location);
      //get cuisine preferences from user
      fetch(`http://localhost:8000/user/${user?.uid}`, {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (res) => {
        const data = await res.json();
        cuisines = data.preferences;
        console.log("cuisine: ", cuisines);
        const cuisine = cuisines.join(',');
        fetch(`http://localhost:8000/restaurant?location=${location}&cuisine=${cuisine}`)
      .then(async (res) => {
        const data = await res.json();
        console.log(data.businesses)
        setRestaurants(data.businesses);
      });
      });
    });
  }, []);

  return (
    <div className="max-w-xl mx-auto px4">
      {message && <div>{message}</div>}
      {expired && <p>Session Expired Loading Results</p>}
      {restaurants.length > 0 && allUsersJoined && !expired ? (
        <>
          <p>{elapsedTime} seconds</p>
          <RestaurantSwiper restaurants={restaurants} />
        </>
      ) : (
        <p>Loading...{message && <div>{message}</div>}</p>
      )}
    </div>
  );
};

export default Session;
