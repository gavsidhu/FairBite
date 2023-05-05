import { useNavigate } from "react-router-dom";
import CreateSessionModal from "../components/CreateSessionModal";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import AddFriendModal from "../components/AddFriendModal";
import Navbar from "../components/Navbar";

export default function Home() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openFriendModal, setOpenFriendModal] = useState(false);
  const { user, logout } = useAuth();
  const [userFriends, setUserFriends] = useState([]);


  useEffect(() => {
    if(!user) {
      return navigate("/sign-in")
    }
    fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${user.uid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((result) => {
        result.json().then((data) => {
          setUserFriends(data.friends);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log("friends",userFriends);

  const refreshUserFriends = async () => {
    const result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${user.uid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    setUserFriends(data.friends);
  };

  return (
    <>
    <Navbar />
      <CreateSessionModal open={open} setOpen={setOpen} friends={userFriends} />
      <AddFriendModal
        open={openFriendModal}
        setOpen={setOpenFriendModal}
        onFriendAdded={refreshUserFriends}
      />
      <div className="max-w-3xl mx-auto py-20">
        <div className="space-y-5 text-center">
          <h1 className="text-6xl font-bold text-center font-display">FairBite</h1>
          <p className="font-normal text-lg">Start a FairBite session to decide where to eat with your friends.</p>
        </div>
        <div className="w-full flex flex-col space-y-6 py-8">
          <button
            onClick={() => setOpen(true)}
            className="bg-[#F8972A] font-normal h-16 w-[40%] mx-auto text-white text-lg font-semibold rounded-lg"
          >
            Start a FairBite Session
          </button>
          <button
            className="bg-[#F8972A] h-16 w-[40%] mx-auto text-white text-lg font-semibold rounded-lg"
            onClick={() => setOpenFriendModal(true)}
          >
            Add Friends
          </button>
        </div>
      </div>
    </>
  );
}