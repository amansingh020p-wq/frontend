import React from 'react';

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner Section */}
      <div 
        className="relative h-80 sm:h-96 md:h-[32rem] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(13, 28, 26, 0.7), rgba(13, 28, 26, 0.7)), url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
            About Us
          </h1>
          <div 
            className="w-16 sm:w-20 md:w-24 h-1 mx-auto"
            style={{ backgroundColor: '#43B852' }}
          ></div>
        </div>
      </div>

      {/* Who We Are Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content - Left Side */}
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6" style={{ color: '#0D1C1A' }}>
                WHO WE ARE & WHAT WE DO
              </h2>
              <div className="space-y-4 sm:space-y-6">
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed" style={{ color: '#0D1C1A' }}>
                  At ForexFlow, we provide a powerful gateway for traders to access the global currency markets. Success in the dynamic forex arena demands a trading platform that can keep up with the speed and challenges of live market conditions — and that's exactly what we deliver.
                </p>
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed" style={{ color: '#0D1C1A' }}>
                  Our suite of cutting-edge trading solutions caters to every trading style, offering a range of tools tailored for technical analysis, seamless trade execution, and enhanced market accessibility.
                </p>
                {/* <p className="text-sm sm:text-base lg:text-lg leading-relaxed" style={{ color: '#0D1C1A' }}>
                  Our flagship trading platform, Trading Station, is designed to meet the highest standards of reliability and performance. Alongside it, we offer compatibility with popular industry tools such as MetaTrader 4 (MT4), NinjaTrader, and social trading platforms like Zulutrade.
                </p>
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed font-medium" style={{ color: '#43B852' }}>
                  No matter your strategy or experience level, ForexFlow ensures you have the technology and resources necessary to navigate the forex markets with confidence.
                </p> */}
              </div>
            </div>
            
            {/* Image - Right Side */}
            <div className="order-1 lg:order-2">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1926&q=80" 
                  alt="Trading Platform"
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
                />
                <div 
                  className="absolute -bottom-3 -right-3 w-full h-full rounded-lg -z-10"
                  style={{ backgroundColor: '#43B852' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leverage Section */}
      <section className="py-4 sm:py-6 lg:py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-center text-[#0D1C1A]">
            WHAT IS LEVERAGE IN FOREX?
          </h2>
          <div className="space-y-4 sm:space-y-6">
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-black">
              In a market where price movements are measured in mere hundredths of a cent, you might wonder how significant profits are made. The answer lies in leverage — an essential feature of forex trading that amplifies your market exposure while optimising capital efficiency.
            </p>
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-black">
              When trading in the forex market, you're essentially borrowing one currency to buy or sell another. Thanks to the immense liquidity of the global currency markets — with a daily turnover exceeding US$5 trillion — major liquidity providers (primarily global banks) enable traders to access leverage.
            </p>
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-black">
              Leverage allows you to control a larger position size with a relatively small capital outlay, by setting aside what's known as a margin. For example, with 200:1 leverage, you could open a £2,000 position by committing just £10 of your own funds. Similarly, with 50:1 leverage, a trade of the same size would require a margin of approximately £40.
            </p>
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-black">
              This feature empowers traders by offering more significant market exposure while keeping upfront investments low. However, it's important to understand that while leverage can magnify potential profits, it also increases the risk of losses.
            </p>
            <div className="p-4 sm:p-6 rounded-lg mt-6 sm:mt-8" style={{ backgroundColor: '#0D1C1A' }}>
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-white font-medium">
                For those new to forex trading, it's advisable to start with lower leverage ratios to preserve capital and gain experience. Over time, as your market knowledge and trading skills improve, you can gradually adjust your leverage to match your confidence and trading strategy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Margin Section */}
      <section className="py-4 sm:py-6 lg:py-8 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-center" style={{ color: '#0D1C1A' }}>
            WHAT IS MARGIN IN FOREX?
          </h2>
          <div className="space-y-4 sm:space-y-6">
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed" style={{ color: '#0D1C1A' }}>
              In forex trading, margin represents a good-faith deposit a trader places with their broker to open and maintain a position. It's essentially the portion of your funds set aside as collateral while the rest of the position is leveraged. Margin plays a critical role in forex trading, enabling traders to manage positions much larger than the funds they physically hold.
            </p>
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed" style={{ color: '#0D1C1A' }}>
              Margin requirements vary based on currency pairs and prevailing market conditions. During periods of heightened volatility, margin levels typically increase to safeguard both traders and brokers from severe market swings and unforeseen losses.
            </p>
            <div className="p-4 sm:p-6 rounded-lg mt-6 sm:mt-8" style={{ backgroundColor: '#0D1C1A' }}>
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-white font-medium">
                At ForexFlow, we offer competitive, low-margin requirements with a variety of position sizing options. For major currency pairs, a leverage cap of 30:1 applies, while non-major pairs are subject to a 20:1 leverage limit — all designed to help our clients manage risk effectively while maximising trading opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PIPs Section */}
      <section className="py-4 sm:py-6 lg:py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-center text-[#0D1C1A]">
            WHAT ARE PIPS IN FOREX TRADING?
          </h2>
          <div className="space-y-4 sm:space-y-6">
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-black">
              A pip, short for "point in percentage," represents the smallest incremental price move in a currency pair's exchange rate. It's a standard unit of measurement in forex trading, helping traders gauge price fluctuations efficiently.
            </p>
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-black">
              Most currency pairs are quoted to four decimal places, meaning a pip is equivalent to 0.0001. For example, if the EUR/USD moves from 1.1000 to 1.1001, that's a one-pip movement.
            </p>
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-black">
              The value of a pip depends on the size of your trade and the currency pair involved. For instance, in pairs involving the USD as the quote currency, one pip typically equals US$0.10 for a micro lot, US$1.00 for a mini lot, and US$10.00 for a standard lot.
            </p>
            <div className="p-4 sm:p-6 rounded-lg mt-6 sm:mt-8" style={{ backgroundColor: '#0D1C1A' }}>
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-white font-medium">
                Since pip values can vary based on changing market prices, position sizes, and margin requirements, ForexFlow provides intuitive pip calculators and other trading tools to help you stay in control of your trade risks and profit calculations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Section */}
      <section className="py-4 sm:py-6 lg:py-8 mb-10 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-center" style={{ color: '#0D1C1A' }}>
            HOW TO LEARN FOREX
          </h2>
          <div className="space-y-4 sm:space-y-6">
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed" style={{ color: '#0D1C1A' }}>
              In an industry as fast-paced and dynamic as forex trading, ongoing education is vital. Whether you're an experienced trader or a newcomer to the currency markets, continually refining your skills is key to consistent, long-term success.
            </p>
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed" style={{ color: '#0D1C1A' }}>
              The market evolves constantly, which is why your learning journey should never stop. At ForexFlow, we encourage traders to build strong trading habits, participate in expert-led webinars, and immerse themselves in educational resources designed to enhance both theoretical knowledge and practical market experience.
            </p>
            <div className="p-6 sm:p-8 rounded-lg mt-6 sm:mt-8" style={{ backgroundColor: '#0D1C1A' }}>
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-white font-medium text-center">
                To increase your chances of success in the forex markets, it's essential to embrace a mindset of continuous improvement. While perfection may be unattainable in trading, preparation and discipline can position you to capitalise on market opportunities. The more you invest in your trading education, the better equipped you'll be to navigate the ever-changing forex landscape with skill and confidence.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;