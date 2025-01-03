import Head from 'next/head'

export default function Home() {
  return (
    <div className="min-h-screen gradient-bg">
      <Head>
        <title>Your Ground Game Elevated</title>
        <meta name="description" content="Specialized cannabis industry solutions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-xl">Logo</div>
          <div className="flex space-x-8">
            <a href="#" className="text-white hover:text-gray-200">Home</a>
            <a href="#" className="text-white hover:text-gray-200">Services</a>
            <a href="#" className="text-white hover:text-gray-200">About</a>
            <a href="#" className="text-white hover:text-gray-200">Contact Us</a>
            <a href="#" className="text-white hover:text-gray-200">Resources</a>
          </div>
        </div>
      </nav>

      <main>
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center text-white mb-20">
            <h1 className="text-6xl font-bold mb-6">Your Ground Game Elevated</h1>
            <p className="text-xl mb-10">Transform your cannabis business operations through our specialized<br />marketing and operational solutions. We specialize in retail, wholesale,<br />manufacturing, and vertical growth strategies.</p>
            <button className="bg-white text-brand-purple px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-300">
              EXPLORE OUR SERVICES
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-10 mb-20">
            {/* For Brands */}
            <div className="service-card">
              <div className="service-icon">
                <span className="text-brand-purple text-2xl font-bold">B</span>
              </div>
              <h3 className="service-title">For Brands</h3>
              <p className="service-description">Strategic planning, product development, and innovative solutions.</p>
              <button className="service-button">
                EXPLORE BRAND SERVICES →
              </button>
            </div>

            {/* For Dispensaries */}
            <div className="service-card">
              <div className="service-icon">
                <span className="text-brand-purple text-2xl font-bold">D</span>
              </div>
              <h3 className="service-title">For Dispensaries</h3>
              <p className="service-description">Light setting, market tracking, and merchandising guidance.</p>
              <button className="service-button">
                EXPLORE RETAIL SERVICES →
              </button>
            </div>

            {/* For Ancillary */}
            <div className="service-card">
              <div className="service-icon">
                <span className="text-brand-purple text-2xl font-bold">A</span>
              </div>
              <h3 className="service-title">For Ancillary</h3>
              <p className="service-description">Supporting services and partnerships for cannabis industry success.</p>
              <button className="service-button">
                EXPLORE SUPPORT SERVICES →
              </button>
            </div>
          </div>

          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-12">Trusted By Industry Leaders</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white bg-opacity-10 p-8 rounded-lg hover:bg-opacity-20 transition-all duration-300">
                  <div className="w-full h-24 flex items-center justify-center border border-white border-opacity-20 rounded-lg">
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