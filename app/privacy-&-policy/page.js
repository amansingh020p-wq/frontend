import React from 'react'

const PrivacyPolicyPage = () => {
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
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4  text-white">
                        Privacy & Policy
                    </h1>
                    <div
                        className="w-20 sm:w-30 md:w-60 h-1 mx-auto"
                        style={{ backgroundColor: '#43B852' }}
                    ></div>
                </div>
            </div>


            <section className="py-4 sm:py-6 lg:py-8 mt-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-left text-[#0D1C1A]">
                        Privacy Policy
                    </h2>
                    <div className="space-y-4 sm:space-y-6">
                        <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-black">
                            At ForexFlow, we prioritize the safety, transparency, and trust of our clients. As a leading international platform in the currency trading market, we are committed to providing a secure, efficient, and customer-focused environment for all our users. Below are the key principles that guide our operations and your experience with us:
                        </p>
                    </div>
                    <div className='h-0.5 max-w-full mt-6 bg-[#8e918f]'></div>
                </div>
            </section>

            {/* Margin Section */}
            <section className="py-2 bg-white mb-4">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-md md:text-xl font-bold mb-2 text-left" style={{ color: '#0D1C1A' }}>
                        1) Regulated Provider
                    </h2>
                    <div className="space-y-4 sm:space-y-6">
                        <p className="text-sm sm:text-base lg:text-lg leading-relaxed" style={{ color: '#0D1C1A' }}>
                            ForexFlow operates as a trusted international platform specializing in the global currency markets. We are dedicated to maintaining a trading environment built on reliability, integrity, and compliance with industry standards, ensuring our clients can trade with complete peace of mind.
                        </p>
                    </div>
            <div className='h-0.5 max-w-full mt-6 bg-[#8e918f]'></div>
                </div>
            </section>
            {/* PIPs Section */}
            <section className="py-2 mb-4">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-md md:text-xl font-bold mb-2 text-left text-[#0D1C1A]">
                        2) Award-Winning Customer Service
                    </h2>
                    <div className="space-y-4 sm:space-y-6">
                        <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-black">
                            Our professional and friendly customer support team is available 24 hours a day, 7 days a week to assist you with any inquiries, technical issues, or trading-related needs. At ForexFlow, providing a seamless and supportive client experience is one of our top priorities.
                        </p>
                    </div>
                    <div className='h-0.5 max-w-full mt-6 bg-[#8e918f] '></div>
                </div>
            </section>

            {/* Learning Section */}
            <section className="py-2 mb-4 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-md md:text-xl font-bold mb-2 text-left" style={{ color: '#0D1C1A' }}>
                        3) Fast & Reliable Trade Execution
                    </h2>
                    <div className="space-y-4 sm:space-y-6">
                        <p className="text-sm sm:text-base lg:text-lg leading-relaxed" style={{ color: '#0D1C1A' }}>
                            To deliver the fastest possible trade execution speeds, our servers are strategically located in Equinix LD4 data centres. This ultra-low latency environment ensures your trades are executed quickly, accurately, and without delays — giving you a competitive edge in the fast-moving forex market.
                        </p>
                    </div>
                    <div className='h-0.5 max-w-full mt-6 bg-[#8e918f] '></div>
                </div>
            </section>


            <section className="py-2 mb-4 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-md md:text-xl font-bold mb-2 text-left" style={{ color: '#0D1C1A' }}>
                        4) Segregated Client Funds
                    </h2>
                    <div className="space-y-4 sm:space-y-6">
                        <p className="text-sm sm:text-base lg:text-lg leading-relaxed" style={{ color: '#0D1C1A' }}>
                            For your financial security, all client funds are maintained in fully segregated trust accounts at top-tier, AA-rated banks. This ensures that your capital remains completely separate from the operational funds of ForexFlow, offering enhanced protection and transparency.
                        </p>
                    </div>
                    <div className='h-0.5 max-w-full mt-6 bg-[#8e918f]'></div>
                </div>
            </section>


            <section className="py-2 mb-4 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-md md:text-xl font-bold mb-2 text-left" style={{ color: '#0D1C1A' }}>
                        5) Secure Transactions
                    </h2>
                    <div className="space-y-4 sm:space-y-6">
                        <p className="text-sm sm:text-base lg:text-lg leading-relaxed" style={{ color: '#0D1C1A' }}>
                            We provide a safe and efficient way for you to fund your trading account through advanced payment security measures. Our platform supports 3D Secure authentication technology, adding an additional layer of protection for all your online transactions and safeguarding your financial data.
                        </p>
                    </div>
                    <div className='h-0.5 max-w-full mt-6 bg-[#8e918f]'></div>
                </div>
            </section>


            <section className="py-2 mb-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-md md:text-xl font-bold mb-2 text-left" style={{ color: '#0D1C1A' }}>
                        6) Access to Smart Trading Tools
                    </h2>
                    <div className="space-y-4 sm:space-y-6">
                        <p className="text-sm sm:text-base lg:text-lg leading-relaxed" style={{ color: '#0D1C1A' }}>
                            ForexFlow equips you with a suite of intelligent trading tools designed to help you navigate the complexities of the global financial markets. From advanced charting features to real-time market insights and risk management solutions, our platform is built to support both new and experienced traders alike.
                        </p>
                    </div>
                    {/* <div className='h-0.5 max-w-full mt-6 bg-[#8e918f]'></div> */}
                </div>
            </section>

        </div>
    )
}

export default PrivacyPolicyPage
