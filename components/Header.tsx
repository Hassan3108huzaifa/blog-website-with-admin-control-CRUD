'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Search, Home, BookOpen, Info } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900">Blogafay</Link>
          <nav className="hidden md:flex space-x-8">
            <NavLink href="/" icon={<Home className="w-4 h-4" />}>Home</NavLink>
            <NavLink href="/blog" icon={<BookOpen className="w-4 h-4" />}>Blogs</NavLink>
            <NavLink href="/about" icon={<Info className="w-4 h-4" />}>About</NavLink>
            <NavLink href="/search" icon={<Search className="w-4 h-4" />}>Search</NavLink>
          </nav>
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          > 
            {isMenuOpen ? <X className="w-6 h-6 text-black" /> : <Menu className="w-6 h- text-black" />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="px-4 pt-2 pb-4 space-y-2">
            <MobileNavLink href="/" icon={<Home className="w-4 h-4" />}>Home</MobileNavLink>
            <MobileNavLink href="/blog  " icon={<BookOpen className="w-4 h-4" />}>Blogs</MobileNavLink>
            <MobileNavLink href="/about" icon={<Info className="w-4 h-4" />}>About</MobileNavLink>
            <MobileNavLink href="/search" icon={<Search className="w-4 h-4" />}>Search</MobileNavLink>
          </nav>
        </div>
      )}
    </header>
  )
}

function NavLink({ href, children, icon }: { href: string; children: React.ReactNode; icon: React.ReactNode }) {
  return (
    <Link href={href} className="flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-200">
      {icon}
      <span className="ml-2">{children}</span>
    </Link>
  )
}

function MobileNavLink({ href, children, icon }: { href: string; children: React.ReactNode; icon: React.ReactNode }) {
  return (
    <Link href={href} className="flex items-center py-2 text-gray-700 hover:text-gray-900 transition-colors duration-200">
      {icon}
      <span className="ml-2">{children}</span>
    </Link>
  )
}