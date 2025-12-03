import React from 'react'

const Termsandconditions = () => {
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
                        Terms & Conditions
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
                        Terms & Conditions
                    </h2>
                    <div className="space-y-4 sm:space-y-6">
                        <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-black">
                            Welcome to ForexFlow — your trusted partner in currency trading. By using our services, you agree to be bound by the following terms and conditions, which are designed to ensure a transparent, fair, and secure trading environment for all our clients. We encourage you to read these terms carefully before engaging in any trading activities on our platform.
                        </p>
                    </div>
                    <div className='h-0.5 max-w-full mt-6 bg-[#8e918f]'></div>
                </div>
            </section>

            {/* Margin Section */}
            <section className="py-2 bg-white mb-4">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-md md:text-xl font-bold mb-2 text-left" style={{ color: '#0D1C1A' }}>
                        1) Straight Through Processing (STP) Trade Execution
                    </h2>
                    <div className="space-y-4 sm:space-y-6">
                        <p className="text-sm sm:text-base lg:text-lg leading-relaxed" style={{ color: '#0D1C1A' }}>
                            At ForexFlow, we operate with a Straight Through Processing (STP) model for trade execution. This means all trades are processed directly with liquidity providers, without any dealing desk intervention. This approach promotes a more transparent and efficient trading environment, ensuring that client interests are aligned with market conditions.
                        </p>
                    </div>
                    <div className='h-0.5 max-w-full mt-6 bg-[#8e918f]'></div>
                </div>
            </section>

            {/* PIPs Section */}
            <section className="py-2 mb-4">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-md md:text-xl font-bold mb-2 text-left text-[#0D1C1A]">
                        2) Wide Range of Tradable Assets & Platforms
                    </h2>
                    <div className="space-y-4 sm:space-y-6">
                        <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-black">
                            We offer our clients access to a diverse selection of tradable financial instruments across various asset classes. In addition, ForexFlow provides a choice of today’s most popular and advanced trading platforms, enabling investors to select the tools and technology best suited to their trading style and objectives.
                        </p>
                    </div>
                    <div className='h-0.5 max-w-full mt-6 bg-[#8e918f]'></div>
                </div>
            </section>

            {/* Learning Section */}
            <section className="py-2 mb-4 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-md md:text-xl font-bold mb-2 text-left" style={{ color: '#0D1C1A' }}>
                        3) Risk Disclosure
                    </h2>
                    <div className="space-y-4 sm:space-y-6">
                        <p className="text-sm sm:text-base lg:text-lg leading-relaxed" style={{ color: '#0D1C1A' }}>
                            Trading leveraged financial products involves a high level of risk and may not be suitable for all investors. The products offered by ForexFlow carry the risk of capital loss, and clients should be aware that they do not own or have any rights to the underlying assets being traded.
                            <br /> <br />
                            It is important to note that ForexFlow does not guarantee the performance or return of capital under any circumstances. Clients should trade only with risk capital — funds they can afford to lose without impacting their financial security or lifestyle.
                        </p>
                    </div>
                    <div className='h-0.5 max-w-full mt-6 bg-[#8e918f]'></div>
                </div>
            </section>


            <section className="py-2 mb-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-md md:text-xl font-bold mb-2 text-left" style={{ color: '#0D1C1A' }}>
                        4) No Guarantee of Future Results
                    </h2>
                    <div className="space-y-4 sm:space-y-6">
                        <p className="text-sm sm:text-base lg:text-lg leading-relaxed" style={{ color: '#0D1C1A' }}>
                            Any historical performance of financial instruments, markets, or strategies referenced by ForexFlow is provided for informational purposes only. Past performance is not indicative of future results, and no guarantees can be made regarding the outcomes of any trading activity. All clients should conduct their own due diligence and consider seeking independent financial advice before participating in the forex markets.
                        </p>
                        <div className="p-6 sm:p-8 rounded-lg mt-6 sm:mt-8" style={{ backgroundColor: '#0D1C1A' }}>
                            <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-white font-medium text-center">
                                By using the services of ForexFlow, you acknowledge that you have read, understood, and agreed to these terms and conditions. It remains your responsibility to remain informed about our policies and to trade within the limits of your experience and financial capacity.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Termsandconditions;
