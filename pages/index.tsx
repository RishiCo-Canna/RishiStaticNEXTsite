import Head from 'next/head'

export default function Home() {
  return (
    <div className="min-h-screen gradient-bg">
      <Head>
        <title>Your Ground Game Elevated</title>
        <meta name="description" content="Specialized cannabis industry solutions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="py-6 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-2xl">Logo</div>
          <div className="flex space-x-10">
            <a href="#" className="nav-link">Home</a>
            <a href="#" className="nav-link">Services</a>
            <a href="#" className="nav-link">About</a>
            <a href="#" className="nav-link">Contact Us</a>
            <a href="#" className="nav-link">Resources</a>
          </div>
        </div>
      </nav>

      <main className="pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center pt-20 pb-24">
            <h1 className="hero-title">Your Ground Game Elevated</h1>
            <p className="hero-description">
              Transform your cannabis business operations through our specialized<br />
              marketing and operational solutions. We specialize in retail, wholesale,<br />
              manufacturing, and vertical growth strategies.
            </p>
            <button className="primary-button">
              EXPLORE OUR SERVICES
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-10 mb-24">
            {/* For Brands */}
            <div className="service-card">
              <div className="service-icon">
                <span className="text-brand-purple text-2xl font-bold">B</span>
              </div>
              <h3 className="service-title">For Brands</h3>
              <p className="service-description">
                Strategic planning, product development, and innovative solutions.
              </p>
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
              <p className="service-description">
                Light setting, market tracking, and merchandising guidance.
              </p>
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
              <p className="service-description">
                Supporting services and partnerships for cannabis industry success.
              </p>
              <button className="service-button">
                EXPLORE SUPPORT SERVICES →
              </button>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-12">Trusted By Industry Leaders</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="partner-card">
                  <div className="partner-logo-placeholder">
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