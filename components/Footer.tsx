import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Blogafay</h3>
            <p className="text-gray-400">Exploring the frontiers of artificial intelligence and its impact on our world.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors duration-200">Home</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors duration-200">Blogs</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-200">About</Link></li>
              <li><Link href="/search" className="text-gray-400 hover:text-white transition-colors duration-200">Search</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-gray-400">Email: <a href="mailto:huzaifa3108hassan@gmail.com">huzaifa3108hassan</a></p>
            <p className="text-gray-400">Phone: +92 3161097202</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=100067756576220" target='_blank' className="text-gray-400 hover:text-white transition-colors duration-200">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://x.com/huzaifaBhai3108" target='_blank' className="text-gray-400 hover:text-white transition-colors duration-200">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com/mr.hassanbhai/" target='_blank' className="text-gray-400 hover:text-white transition-colors duration-200">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/hassan-rj-148220295/" target='_blank' className="text-gray-400 hover:text-white transition-colors duration-200">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2024 Bolgafay made with 💖 by HassanRJ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
