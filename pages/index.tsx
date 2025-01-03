import Head from 'next/head'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-teal-400">
      <Head>
        <title>Your Ground Game Elevated</title>
        <meta name="description" content="Specialized cannabis industry solutions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-xl">Logo</div>
          <div className="space-x-4">
            <a href="#" className="text-white hover:text-gray-200">Home</a>
            <a href="#" className="text-white hover:text-gray-200">Services</a>
            <a href="#" className="text-white hover:text-gray-200">About</a>
            <a href="#" className="text-white hover:text-gray-200">Contact</a>
            <a href="#" className="text-white hover:text-gray-200">Resources</a>
          </div>
        </div>
      </nav>

      <main>
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center text-white mb-16">
            <h1 className="text-5xl font-bold mb-4">Your Ground Game Elevated</h1>
            <p className="text-xl mb-8">Transform your cannabis business operations through our specialized marketing and operational solutions.</p>
            <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100">
              EXPLORE OUR SERVICES
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* For Brands */}
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-2xl">B</span>
              </div>
              <h3 className="text-xl font-bold mb-4">For Brands</h3>
              <p className="text-gray-600 mb-4">Strategic planning, product development, and innovative solutions.</p>
              <button className="text-purple-600 font-semibold hover:text-purple-700">
                EXPLORE BRAND SERVICES →
              </button>
            </div>

            {/* For Dispensaries */}
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-2xl">D</span>
              </div>
              <h3 className="text-xl font-bold mb-4">For Dispensaries</h3>
              <p className="text-gray-600 mb-4">Retail success strategies, inventory optimization, and customer engagement.</p>
              <button className="text-purple-600 font-semibold hover:text-purple-700">
                EXPLORE RETAIL SERVICES →
              </button>
            </div>

            {/* For Ancillary */}
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-2xl">A</span>
              </div>
              <h3 className="text-xl font-bold mb-4">For Ancillary</h3>
              <p className="text-gray-600 mb-4">Supporting services and solutions for the cannabis ecosystem.</p>
              <button className="text-purple-600 font-semibold hover:text-purple-700">
                EXPLORE SUPPORT SERVICES →
              </button>
            </div>
          </div>

          <div className="text-center text-white mb-16">
            <h2 className="text-3xl font-bold mb-8">Trusted By Industry Leaders</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {/* Placeholder for partner logos */}
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white bg-opacity-10 p-8 rounded-lg">
                  <div className="w-full h-24 flex items-center justify-center">
                    <span className="text-white opacity-50">Partner Logo {i}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}