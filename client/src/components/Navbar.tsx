import { Button } from "./ui/button"
import { IoMoon } from "react-icons/io5"
import { LuSun } from "react-icons/lu"
import { useTheme } from "next-themes"

export default function Navbar() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <div className="max-w-[900px] mx-auto px-4">
      <div className="bg-secondary my-4 px-4 rounded-md">
        <div className="h-16 flex items-center justify-between">
          {/* LEFT SIDE */}
          <div className="hidden sm:flex justify-center items-center gap-3">
            <img src="/react.png" alt="logo" width={50} height={50} />
            <span className="text-4xl">+</span>
            <img src="/go.png" alt="logo" width={40} height={40} />
            <span className="text-4xl">=</span>
            <img src="/explode.png" alt="logo" width={50} height={50} />
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">
            <span className="text-lg font-medium">
              Daily Tasks
            </span>
            {/* Toggle Theme */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleTheme}
            >
              {theme === "light" ? <IoMoon /> : <LuSun size={20} />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}