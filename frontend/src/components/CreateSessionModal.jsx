import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ComboBox from "./ComboBox";
import useSession from "../hooks/useSession";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function CreateSessionModal({open, setOpen, friends}) {
  const[location, setLocation] = useState("")
  const [sessionUrl, setSessionUrl] = useState("")
  const {user} = useAuth()
  const {selectedUsers} = useSession();
  const navigate = useNavigate()

  const startSession = async () => {
    if (!location) {
      alert("Please enter a location")
    }
    const users = [
      {
        _id: user.uid,
        email: user.email
      },
      ...selectedUsers
    ]
    console.log(users)

    const res = await fetch(`http://localhost:8000/session`, {
      method: "POST",
      body: JSON.stringify({
        users,
        location: location
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json()
    setSessionUrl(`http://localhost:3000/session/${data._id}`)
    //navigate(`/session/${data._id}`)
  }
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-semibold leading-6 text-gray-900"
                    >
                      Start a dining session
                    </Dialog.Title>
                    <div className="mt-2 text-left space-y-3">
                      <ComboBox friends={friends}  />
                      <div>
                        <label
                          htmlFor="location"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Enter your location
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="location"
                            id="location"
                            className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-orange-300 sm:text-sm sm:leading-6"
                            placeholder="Los angeles"
                            onChange={(e) => setLocation(e.currentTarget.value)}
                          />
                        </div>
                        
                      </div>
                      <div className="w-full overflow-x-auto">
                      <a className="whitespace-pre-line text-blue-500 hover:text-blue-600" href={sessionUrl}>{sessionUrl? sessionUrl: null}</a>
                    </div>
                    </div>
                    
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 flex flex-row justify-between items-center space-x-3">
                <button
                    className="inline-flex w-full justify-center rounded-md bg-transparent border border-gray-300 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    onClick={startSession}
                  >
                    Start
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
