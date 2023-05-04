import { Combobox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { HiCheck, HiChevronUpDown } from "react-icons/hi2";
import useSession from "../hooks/useSession";

export default function ComboBox({ friends }) {
    const {selectedUsers, setSelectedUsers} = useSession();
    const [query, setQuery] = useState("");
  
    const filteredfriends =
      query === ""
        ? friends
        : friends.filter((friends) =>
            friends.email
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(query.toLowerCase().replace(/\s+/g, ""))
          );
  
    return (
      <div className="w-full">
        <Combobox multiple value={selectedUsers} onChange={setSelectedUsers}>
          <div className="relative mt-1">
            <div className="relative w-full cursor-default overflow-hidden rounded-lg border border-gray-300 bg-white text-left sm:text-sm">
              <Combobox.Input
                className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 focus:outline-orange-300"
                displayValue={(selectedUsers) =>
                  selectedUsers?.map((user) => user.email).join(', ')
                }
                onChange={(event) => setQuery(event.target.value)}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <HiChevronUpDown
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg focus:outline-none sm:text-sm">
                {filteredfriends.length === 0 && query !== "" ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  filteredfriends.map((friends) => (
                    <Combobox.Option
                      key={friends._id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-orange-600 text-white" : "text-gray-900"
                        }`
                      }
                      value={friends}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {friends.email}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-orange-600"
                              }`}
                            >
                              <HiCheck className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
    );
  }