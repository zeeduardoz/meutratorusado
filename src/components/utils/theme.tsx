import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'

export function Theme() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    if (theme === 'null') setTheme('light')
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <a
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="cursor-pointer filter text-2xl hover:opacity-75 p-3 px-5 text-yellow-200 delay-100 transition lg:px-10"
    >
      {theme === 'light' ? (
        <FaSun />
      ) : theme === 'null' ? (
        <FaSun />
      ) : (
        <FaMoon />
      )}
    </a>
  )
}
