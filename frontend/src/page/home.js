import { useNavigate } from "react-router-dom";
import CreateSessionModal from "../components/CreateSessionModal";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import AddFriendModal from "../components/AddFriendModal";

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
    fetch(`http://localhost:8000/user/${user.uid}`, {
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
    const result = await fetch(`http://localhost:8000/user/${user.uid}`, {
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
      <CreateSessionModal open={open} setOpen={setOpen} friends={userFriends} />
      <AddFriendModal
        open={openFriendModal}
        setOpen={setOpenFriendModal}
        onFriendAdded={refreshUserFriends}
      />
      <div className="max-w-3xl mx-auto py-20">
        <div>
          <h1 className="text-4xl font-bold text-center">Fair Bite</h1>
        </div>
        <div className="w-full flex flex-col space-y-6 py-8">
          <button
            onClick={() => setOpen(true)}
            className="bg-orange-500 h-16 w-[40%] mx-auto text-white text-lg font-semibold rounded-lg"
          >
            Start a Fair Bite Session
          </button>
          <button
            className="bg-orange-500 h-16 w-[40%] mx-auto text-white text-lg font-semibold rounded-lg"
            onClick={() => setOpenFriendModal(true)}
          >
            Add Friends
          </button>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    </>
  );
}