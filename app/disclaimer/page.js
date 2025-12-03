import React from 'react';

const DisclaimerPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner Section */}
      <div 
        className="relative h-64 sm:h-80 md:h-[32rem] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(13, 28, 26, 0.7), rgba(13, 28, 26, 0.7)), url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
          Disclaimer
          </h1>
          <div 
            className="w-20 sm:w-26 md:w-32 h-1 mx-auto"
            style={{ backgroundColor: '#43B852' }}
          ></div>
        </div>
      </div>
      

      {/* Leverage Section */}
      <section className="py-4 sm:py-6 lg:py-8 mt-10 mb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-left  text-[#0D1C1A]">
          Disclaimer
          </h2>
          <div className="space-y-4 sm:space-y-6">
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-black">
            ForexFlow is an international trading platform specializing in currency exchange and financial market services. It is important to recognize that trading in foreign exchange and related financial instruments carries a high level of risk and may not be suitable for all investors. Engaging in such trading activities involves the potential for substantial financial loss, including the complete loss of your invested capital.
            </p>
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-black">
            Before participating in any trading activity on ForexFlow, you must carefully consider your financial circumstances, investment goals, and risk tolerance. We strongly advise that you never invest funds you cannot afford to lose. Leveraged trading, in particular, magnifies both potential profits and potential losses and should be approached with a clear understanding of its inherent risks.
            </p>
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-black">
            ForexFlow encourages all clients to fully educate themselves about the risks associated with currency trading and leveraged products. If necessary, you should seek independent financial advice from a qualified professional before making any trading decisions. It remains your sole responsibility to determine whether the services provided by ForexFlow are permissible under the laws and regulations applicable in your country or region of residence.
            </p>
            <div className="p-4 sm:p-6 rounded-lg mt-6 sm:mt-8" style={{ backgroundColor: '#0D1C1A' }}>
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-white font-medium">
              By using our services, you acknowledge and agree that ForexFlow is not liable for any legal or financial consequences arising from your use of our platform in jurisdictions where such services may be restricted or prohibited. It is the client's responsibility to comply with local laws and regulations and to verify the legality of accessing ForexFlow’s offerings in their country of residence.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default DisclaimerPage;