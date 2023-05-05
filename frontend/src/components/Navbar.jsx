import useAuth from "../hooks/useAuth"

export default function Navbar() {
    const {user, logout} = useAuth()
    return (
        <header aria-label="Site Header" className="bg-white py-4">
  <div
    className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8"
  >
    <a className="block text-teal-600" href="/">
      <span className="sr-only">Home</span>
      <div className="h-16 w-16">
            <img src="/fairbite-logo.png" className="rounded-full" />
          </div>
    </a>

    <div className="flex flex-1 items-center justify-end md:justify-between">
      <nav aria-label="Site Nav" className="hidden md:block">
      </nav>

      <div className="flex items-center gap-4">
        {user ? (
            <div className="sm:flex sm:gap-4">
            <button
              className="block rounded-md bg-[#2BC7D8] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#26BECF]"
              href="/"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        ) : (
            <div className="sm:flex sm:gap-4">
          <a
            className="block rounded-md bg-[#2BC7D8] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#26BECF]"
            href="/sign-in"
          >
            Login
          </a>

          <a
            className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-[#2BC7D8] transition hover:text-[#26BECF] sm:block"
            href="/register"
          >
            Register
          </a>
        </div>
        )}

        <button
          className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
        >
          <span className="sr-only">Toggle menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</header>

    )
}