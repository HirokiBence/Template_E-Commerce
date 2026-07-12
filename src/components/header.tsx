import Image from "next/image";

const Header = () => {
  return(
    <header className="flex justify-around items-center py-[1rem] bg-gray-200">
      <Image
        className="dark:invert"
        src="/next.svg"
        alt="account menu"
        width={100}
        height={20}
        priority
      />
      <nav className="flex">
        <button>
          <Image
            className="dark:invert"
            src="/globe.svg"
            alt="account menu"
            width={20}
            height={20}
            priority
          />
        </button>
        <ul className="hidden">
          <li>menu</li>
          <li>menu</li>
          <li>menu</li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;