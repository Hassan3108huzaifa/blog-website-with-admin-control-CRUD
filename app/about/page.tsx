import { Cpu, Users, Globe, Zap } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-gray-900">About Premium AI Blog</h1>
        
        <div className="max-w-3xl mx-auto mb-16">
          <p className="text-lg text-gray-700 mb-6">
            Welcome to Premium AI Blog, your go-to source for cutting-edge insights into the world of Artificial Intelligence. Our mission is to demystify AI, explore its potential, and discuss its impact on various aspects of our lives and industries.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            Founded by a team of AI enthusiasts, researchers, and industry experts, we strive to bring you the most accurate, up-to-date, and thought-provoking content about AI and its related fields.
          </p>
          <p className="text-lg text-gray-700">
            Whether you&apos;re a seasoned AI professional, a curious student, or simply someone interested in the future of technology, our blog offers valuable insights, practical guides, and engaging discussions to expand your understanding of AI.
          </p>
        </div>

        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">What We Offer</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <Cpu className="w-12 h-12 text-gray-700 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900">In-depth Analysis</h3>
            <p className="text-gray-700">We dive deep into AI technologies, providing comprehensive analyses of the latest advancements and their potential applications.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <Users className="w-12 h-12 text-gray-700 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Expert Insights</h3>
            <p className="text-gray-700">Our team of experts shares their knowledge and experiences, offering unique perspectives on the AI landscape.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <Globe className="w-12 h-12 text-gray-700 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Industry Impact</h3>
            <p className="text-gray-700">We explore how AI is transforming various industries, from healthcare and finance to education and entertainment.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <Zap className="w-12 h-12 text-gray-700 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Future Trends</h3>
            <p className="text-gray-700">Stay ahead of the curve with our predictions and analysis of emerging trends in the world of AI.</p>
          </div>
        </div>

        <div className="bg-gray-900 text-white p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-4 text-center">Join Our Community</h2>
          <p className="text-lg mb-6 text-center">
            Be part of our growing community of AI enthusiasts. Subscribe to our newsletter for the latest updates, exclusive content, and special offers.
          </p>
          <form className="max-w-md mx-auto">
            <div className="flex flex-col md:flex-row">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow mb-2 md:mb-0 md:mr-2 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
              <button 
                type="submit" 
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}