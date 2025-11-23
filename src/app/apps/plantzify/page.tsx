'use client';

import Image from 'next/image';

export default function PlantzifyPage() {
  return (
    <>
      {/* Fixed Header with Liquid Glass Effect */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-morphism border-b border-white/20 shadow-lg">
        <div className="w-[85%] mx-auto px-6 md:px-10 lg:px-16 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/logo.png" 
                alt="DeepDevs Logo" 
                className="h-6 w-auto sm:h-7 md:h-8 lg:h-9 xl:h-10 object-contain" 
              />
            </div>
            <nav className="hidden md:flex items-center gap-8 text-sm text-gray-700">
              <a className="hover:text-gray-900 transition-colors" href="#plugins">Our Plugins</a>
              <a className="text-indigo-600 font-medium" href="/apps">Our Apps</a>
              <a className="hover:text-gray-900 transition-colors" href="#support">Support</a>
              <a className="hover:text-gray-900 transition-colors" href="#contact">Contact Us</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="pt-20 relative z-10 min-h-screen bg-gray-100">
        {/* Hero Section */}
        <div className="relative w-[85%] max-w-[1380px] h-auto min-h-[800px] md:min-h-[649px] mx-auto mt-[32px] mb-16">
        {/* Main Container with Gradient Background */}
        <div className="absolute w-full h-full left-1/2 transform -translate-x-1/2 rounded-[30px]" 
             style={{
               background: 'linear-gradient(274.49deg, #F9F4EF -25.85%, #FFFFFF -25.85%, #354E33 76.27%)'
             }}>
          
          {/* Header */}
          <div className="absolute w-[95%] max-w-[1240px] h-[90px] left-1/2 transform -translate-x-1/2 top-[32px] bg-[#FAFAFA] rounded-[12px] flex flex-row justify-between items-center px-[30px] py-[17px] gap-[20px] lg:gap-[137px]">
            
            {/* Logo Section */}
            <div className="flex flex-row items-center gap-4 py-[3px] w-[226px] h-[58px]">
              {/* Logo Icon */}
              <Image
                src="/figma/app-icon-1-56586a.png"
                alt="Plantzify Logo"
                width={36}
                height={38}
                className="w-9 h-[38px] object-contain"
              />
              
              {/* Logo Text */}
              <div className="flex flex-col w-[90px] h-[52px]">
                <span className="font-poppins font-bold text-[20px] leading-[26px] text-[#1C1C1E]">
                  PLZ Plantzify
                </span>
              </div>
            </div>

            {/* Navigation */}
            <div className="hidden md:flex flex-col justify-center items-center gap-[10px] w-[571px] h-[60px] bg-[#FEFEFF] shadow-[0px_0px_1px_rgba(0,0,0,0.25)] rounded-[40px] px-[18px]">
              <div className="flex flex-row justify-center items-center gap-[36px] w-full h-[19px]">
                <span className="font-inter font-medium text-[16px] leading-[19px] text-[#171A20]">Home</span>
                <span className="font-inter font-medium text-[16px] leading-[19px] text-[#171A20]">Identify Plants</span>
                <span className="font-inter font-medium text-[16px] leading-[19px] text-[#171A20]">Blog</span>
                <span className="font-inter font-medium text-[16px] leading-[19px] text-[#171A20]">About Us</span>
              </div>
            </div>

            {/* Download App Button */}
            <div className="flex flex-row justify-center items-center gap-[30px] w-[185px] h-[56px]">
              <div className="flex flex-row justify-center items-center gap-[10px] px-[35px] py-[15px] bg-[#171A20] rounded-[40px] w-full h-full">
                <span className="font-inter font-bold text-[16px] leading-[19px] text-white">Download App</span>
              </div>
            </div>
          </div>

          {/* Hero Content */}
          <div className="absolute w-[95%] max-w-[1240px] h-[452px] left-1/2 transform -translate-x-1/2 top-[150px] flex flex-col lg:flex-row justify-between items-center gap-8">
            
            {/* Left Content */}
            <div className="flex flex-col items-start gap-6 w-full lg:w-[632px] h-auto lg:h-[326px]">
              <div className="flex flex-col gap-6 w-full">
                <div className="flex flex-col gap-2 w-full">
                  {/* Welcome Text */}
                  <div className="w-full">
                    <span className="font-inter font-medium text-[16px] leading-[19px] text-white">
                      Welcome to ATT Plantzify
                    </span>
                  </div>
                  
                  {/* Main Title */}
                  <div className="w-full">
                    <span className="font-inter font-bold text-[32px] md:text-[48px] lg:text-[64px] leading-[1.2] text-white">
                      Plant Detective Identify & Protect Your Greenery
                    </span>
                  </div>
                </div>
                
                {/* Subtitle */}
                <div className="w-full">
                  <span className="font-inter font-normal text-[16px] md:text-[18px] leading-[1.2] text-white">
                    Your will have everything nearby supermarket, buses, station, the carmen neighborhood, etc
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side - Plant Image */}
            <div className="w-full max-w-[456px] h-[300px] lg:h-[452px] flex-shrink-0">
              <Image
                src="/figma/plant-image-56586a.png"
                alt="Plant Detective"
                width={456}
                height={452}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full bg-[#F9F4EF] pt-[120px] pb-[120px]">
        <div className="w-[85%] max-w-[1240px] mx-auto">
          {/* Header */}
          <div className="flex flex-col justify-center items-center gap-[10px] mb-14">
            <h2 className="w-full font-inter font-medium text-[56px] leading-[68px] text-center text-[#171A20]">
              Discover Plantzify App Feature , Easily
            </h2>
            <p className="w-full font-inter font-normal text-[18px] leading-[22px] text-center text-[#171A20]">
              Your simple way to explore, recognize, and learn about plants in just a few steps
            </p>
          </div>

          {/* Features Grid */}
          <div className="flex flex-col gap-6">
            {/* First Row */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
              {/* Plant Finder */}
              <div className="flex flex-col items-center p-10 gap-6 w-full md:w-[397.33px] h-[312px] bg-white border-2 border-[#F3F0F0] rounded-[16px]">
                <div className="flex flex-col items-center gap-6 w-[226px] h-[217px]">
                  <Image
                    src="/figma/plant-finder-icon-6528e5.png"
                    alt="Plant Finder"
                    width={64}
                    height={74}
                    className="w-16 h-[74px] object-contain"
                  />
                  <div className="flex flex-col items-center gap-3 w-[226px] h-[119px]">
                    <h3 className="w-full font-inter font-medium text-[24px] leading-[29px] text-center text-[#171A20]">
                      Plant Finder
                    </h3>
                    <p className="w-full font-inter font-normal text-[16px] leading-[160%] text-center text-[#555555]">
                      Identify plants instantly with just a photo your smart guide to nature's world
                    </p>
                  </div>
                </div>
              </div>

              {/* Water Calculator */}
              <div className="flex flex-col items-center p-10 gap-6 w-full md:w-[397.33px] h-[312px] bg-white border-2 border-[#F3F0F0] rounded-[16px]">
                <div className="flex flex-col items-center gap-6 w-[226px] h-[119px]">
                  <Image
                    src="/figma/water-calculator-icon-4a66fb.png"
                    alt="Water Calculator"
                    width={73}
                    height={64}
                    className="w-[73px] h-16 object-contain"
                  />
                  <div className="flex flex-col items-center gap-3 w-[226px] h-[119px]">
                    <h3 className="w-full font-inter font-medium text-[24px] leading-[29px] text-center text-[#171A20]">
                      Water Calculator
                    </h3>
                    <p className="w-full font-inter font-normal text-[16px] leading-[160%] text-center text-[#555555]">
                      From workouts to daily routines, discover how much water you really need
                    </p>
                  </div>
                </div>
              </div>

              {/* Light Meter */}
              <div className="flex flex-col items-center p-10 gap-6 w-full md:w-[397.33px] h-[312px] bg-white border-2 border-[#F3F0F0] rounded-[16px]">
                <div className="flex flex-col items-center gap-6 w-[226px] h-[207px]">
                  <Image
                    src="/figma/light-meter-icon-6fd182.png"
                    alt="Light Meter"
                    width={64}
                    height={64}
                    className="w-16 h-16 object-contain"
                  />
                  <div className="flex flex-col items-center gap-3 w-[226px] h-[119px]">
                    <h3 className="w-full font-inter font-medium text-[24px] leading-[29px] text-center text-[#171A20]">
                      Light Meter
                    </h3>
                    <p className="w-full font-inter font-normal text-[16px] leading-[160%] text-center text-[#555555]">
                      Measure light levels instantly and accurately — anytime, anywhere
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Row */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
              {/* Diagnose */}
              <div className="flex flex-col items-center p-10 gap-6 w-full md:w-[397.33px] h-[312px] bg-white border-2 border-[#F3F0F0] rounded-[16px]">
                <div className="flex flex-col items-center gap-6 w-[226px] h-[119px]">
                  <Image
                    src="/figma/diagnose-icon-69e405.png"
                    alt="Diagnose"
                    width={64}
                    height={55}
                    className="w-16 h-[55px] object-contain"
                  />
                  <div className="flex flex-col items-center gap-3 w-[226px] h-[119px]">
                    <h3 className="w-full font-inter font-medium text-[24px] leading-[29px] text-center text-[#171A20]">
                      Diagnose
                    </h3>
                    <p className="w-full font-inter font-normal text-[16px] leading-[160%] text-center text-[#555555]">
                      Your smart tool for accurate diagnosis and better decision-making
                    </p>
                  </div>
                </div>
              </div>

              {/* Checker */}
              <div className="flex flex-col items-center p-10 gap-6 w-full md:w-[397.33px] h-[312px] bg-white border-2 border-[#F3F0F0] rounded-[16px]">
                <div className="flex flex-col items-center gap-6 w-[226px] h-[203px]">
                  <Image
                    src="/figma/checker-icon-6eff61.png"
                    alt="Checker"
                    width={64}
                    height={60}
                    className="w-16 h-[60px] object-contain"
                  />
                  <div className="flex flex-col items-center gap-3 w-[226px] h-[119px]">
                    <h3 className="w-full font-inter font-medium text-[24px] leading-[29px] text-center text-[#171A20]">
                      Checker
                    </h3>
                    <p className="w-full font-inter font-normal text-[16px] leading-[160%] text-center text-[#555555]">
                      Reliable checking made simple — fast, clear, and effective
                    </p>
                  </div>
                </div>
              </div>

              {/* Plant Advisor */}
              <div className="flex flex-col items-center p-10 gap-6 w-full md:w-[397.33px] h-[312px] bg-white border-2 border-[#F3F0F0] rounded-[16px]">
                <div className="flex flex-col items-center gap-6 w-[226px] h-[119px]">
                  <div className="w-16 h-16 bg-[#006730] rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-white rounded-full opacity-80"></div>
                  </div>
                  <div className="flex flex-col items-center gap-3 w-[226px] h-[119px]">
                    <h3 className="w-full font-inter font-medium text-[24px] leading-[29px] text-center text-[#171A20]">
                      Plant Advisor
                    </h3>
                    <p className="w-full font-inter font-normal text-[16px] leading-[160%] text-center text-[#555555]">
                      Get expert advice on watering, sunlight, soil, and plant health
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Third Section - Identify Problems */}
      <div className="w-full bg-gray-100 py-16">
        <div className="w-[85%] max-w-[1240px] mx-auto">
          <div className="flex flex-col gap-[120px]">
            {/* First Block - Identify Problems */}
            <div className="flex flex-col md:flex-row items-center gap-14">
              {/* Image */}
              <div className="w-full md:w-[620px] h-auto md:h-[567.39px] rounded-2xl overflow-hidden">
                <Image
                  src="/figma/identify-problems-image-5c14ec.png"
                  alt="Identify Problems, Save Your Plants"
                  width={620}
                  height={567}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text Content */}
              <div className="flex flex-col gap-8 w-full md:w-[534px]">
                <div className="flex flex-col gap-4">
                  {/* Heading */}
                  <h2 className="font-inter font-medium text-[56px] leading-[68px] text-[#171A20]">
                    Identify Problems, Save Your Plants
                  </h2>

                  {/* Description */}
                  <div className="w-full max-w-[585px]">
                    <p className="font-inter font-normal text-[18px] leading-[28px] text-[#171A20]">
                      you can spot issues early and take action before it's too late. Whether it's pests, diseases, or improper care, quick identification means healthier, stronger plants that thrive. By understanding what your plants need and responding to their problems in time, you can keep your garden green, vibrant, and full of life.
                    </p>
                  </div>
                </div>

                {/* Download Button */}
                <div className="w-[185px] h-14">
                  <button className="flex flex-row justify-center items-center px-[35px] py-[15px] w-full h-full bg-[#171A20] rounded-[40px]">
                    <span className="font-inter font-bold text-[16px] leading-[19px] text-white">
                      Download App
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Second Block - Healthy Gardens */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-14">
              {/* Image */}
              <div className="w-full md:w-[650px] h-auto md:h-[567px] rounded-2xl overflow-hidden">
                <Image
                  src="/figma/healthy-gardens-image-5c14ec.png"
                  alt="Healthy gardens, happy growers"
                  width={650}
                  height={567}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text Content */}
              <div className="flex flex-col gap-8 w-full md:w-[534px]">
                <div className="flex flex-col gap-4">
                  {/* Heading */}
                  <h2 className="font-inter font-medium text-[56px] leading-[68px] text-[#171A20]">
                    Healthy gardens, happy growers
                  </h2>

                  {/* Description */}
                  <div className="w-full max-w-[585px]">
                    <p className="font-inter font-normal text-[18px] leading-[28px] text-[#171A20]">
                      A thriving garden is more than just plants — it's a source of joy, peace, and accomplishment. When your plants grow strong and vibrant, they reward you with beauty, fresh air, and even food. By giving them the right care and attention, you not only nurture nature but also create a healthier, happier space for yourself. After all, when gardens flourish, so do the people who care for them
                    </p>
                  </div>
                </div>

                {/* Download Button */}
                <div className="w-[185px] h-14">
                  <button className="flex flex-row justify-center items-center px-[35px] py-[15px] w-full h-full bg-[#171A20] rounded-[40px]">
                    <span className="font-inter font-bold text-[16px] leading-[19px] text-white">
                      Download App
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="w-full py-[110px] relative overflow-hidden" 
           style={{
             backgroundImage: 'url(/figma/testimonials-bg-d22517.png)',
             backgroundSize: 'cover',
             backgroundPosition: 'center',
             backgroundRepeat: 'no-repeat'
           }}>
        <div className="w-[85%] max-w-[1085px] mx-auto">
          <div className="flex justify-center items-center">
            <div className="w-full max-w-[1085px]">
              {/* Testimonial Card */}
              <div className="flex flex-col items-center gap-9">
                {/* Stars Rating */}
                <div className="flex items-center gap-1">
                  {/* 4 Full Stars */}
                  <div className="flex gap-1">
                    <div className="w-[22px] h-[13px] flex">
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-[13px] h-[12.52px] bg-[#224229] rounded-sm"></div>
                      </div>
                    </div>
                    <div className="w-[22px] h-[13px] flex">
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-[13px] h-[12.52px] bg-[#224229] rounded-sm"></div>
                      </div>
                    </div>
                    <div className="w-[22px] h-[13px] flex">
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-[13px] h-[12.52px] bg-[#224229] rounded-sm"></div>
                      </div>
                    </div>
                    <div className="w-[22px] h-[13px] flex">
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-[13px] h-[12.52px] bg-[#224229] rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                  {/* Half Star */}
                  <div className="w-[11px] h-[13px] flex">
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-[11px] h-[12.52px] bg-[#224229] rounded-sm"></div>
                    </div>
                  </div>
                </div>

                {/* Testimonial Quote */}
                <div className="w-full max-w-[1055px]">
                  <p className="font-libre-baskerville font-normal italic text-[34px] leading-[58px] text-center text-[#313232]">
                    " Very happy with flacio; plants arrived in excellent condition, were healthy looking with lots of new growth and are thriving! "
                  </p>
                </div>

                {/* User Info */}
                <div className="flex flex-col items-center gap-6">
                  {/* Avatar */}
                  <div className="w-[105px] h-[105px] rounded-full overflow-hidden">
                    <Image
                      src="/figma/testimonial-avatar-56586a.png"
                      alt="Ann Smith"
                      width={105}
                      height={105}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Name */}
                  <div className="w-full">
                    <h3 className="font-poppins font-medium text-[16px] leading-[19px] text-center text-[#313232]">
                      Ann Smith
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Plant Gallery Section */}
      <div className="w-full bg-white py-[100px] px-[15px]">
        <div className="w-[85%] max-w-[1120px] mx-auto">
          <div className="flex flex-col items-center gap-[50px]">
            {/* Header Container */}
            <div className="flex flex-col items-center gap-1">
              {/* Section Title */}
              <div className="w-[49px] h-[20px]">
                <span className="font-plus-jakarta-sans font-bold text-[14px] leading-[20px] text-[#3328BF]">
                  Gallery
                </span>
              </div>

              {/* Section Subtitle and Description */}
              <div className="flex flex-col items-center gap-4">
                {/* Section Subtitle */}
                <div className="w-[822px] h-[68px]">
                  <h2 className="font-inter font-medium text-[56px] leading-[68px] text-center text-[#171A20]">
                    Plant Gallery
                  </h2>
                </div>

                {/* Description */}
                <div className="w-[534px] h-[44px]">
                  <p className="font-inter font-normal text-[18px] leading-[22px] text-center text-[#171A20]">
                    A thriving garden is more than just plants — it's a source of joy, peace, and accomplishment
                  </p>
                </div>
              </div>
            </div>

            {/* Gallery Container */}
            <div className="flex flex-col gap-8">
              {/* First Row */}
              <div className="flex gap-8">
                <div className="w-[544px] h-[352px] rounded-[20px] overflow-hidden">
                  <Image
                    src="/figma/gallery-image-1.png"
                    alt="Hand woman photographing outdoors"
                    width={544}
                    height={352}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-[544px] h-[352px] rounded-[20px] overflow-hidden">
                  <Image
                    src="/figma/gallery-image-2.png"
                    alt="Hand photographing plants with mobile phone park"
                    width={544}
                    height={352}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Second Row */}
              <div className="flex gap-8">
                <div className="w-[544px] h-[352px] rounded-[20px] overflow-hidden">
                  <Image
                    src="/figma/gallery-image-3.png"
                    alt="She was using his phone take pictures plants check integrity before posting sale social media"
                    width={544}
                    height={352}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-[544px] h-[352px] rounded-[20px] overflow-hidden">
                  <Image
                    src="/figma/gallery-image-4.png"
                    alt="Person takes smartphone photo potted green plant home interior hand holds device captures"
                    width={544}
                    height={352}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Third Row */}
              <div className="flex gap-8">
                <div className="w-[544px] h-[352px] rounded-[20px] overflow-hidden">
                  <Image
                    src="/figma/gallery-image-5.png"
                    alt="Hand photographing plants with mobile phone park"
                    width={544}
                    height={352}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-[544px] h-[352px] rounded-[20px] overflow-hidden">
                  <Image
                    src="/figma/gallery-image-6.png"
                    alt="Midsection person holding pink flowering plants"
                    width={544}
                    height={352}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deep Reads Blog Section */}
      <div className="w-full bg-white py-[50px] px-[15px]">
        <div className="w-[85%] max-w-[1120px] mx-auto">
          <div className="flex flex-col items-center gap-[50px]">
            {/* Blog Header */}
            <div className="flex flex-col items-center gap-1">
              {/* Blog Title */}
              <div className="w-[84px] h-[30px]">
                <span className="font-plus-jakarta-sans font-normal text-[20px] leading-[30px] text-[#3328BF]">
                  Our Blog
                </span>
              </div>

              {/* Blog Subtitle */}
              <div className="w-[1120px] h-[68px]">
                <h2 className="font-inter font-medium text-[56px] leading-[68px] text-center text-[#171A20]">
                  Deep Reads
                </h2>
              </div>
            </div>

            {/* Blog Content */}
            <div className="flex gap-8">
              {/* Blog Post 1 - Toxic Plants */}
              <div className="w-[352px] h-[472px] border border-[#D6D6D6] rounded-[20px] overflow-hidden">
                {/* Blog Image */}
                <div className="relative w-[352px] h-[250px]">
                  <Image
                    src="/figma/blog-image-1.png"
                    alt="Smart agriculture IoT with hand planting tree background"
                    width={352}
                    height={250}
                    className="w-full h-full object-cover"
                  />
                  {/* Date Container */}
                  <div className="absolute bottom-0 right-0 w-[126px] h-[48px] bg-[#395137] flex items-center justify-center px-6 py-3">
                    <span className="font-plus-jakarta-sans font-normal text-[16px] leading-[24px] text-white text-center">
                      22 Jun
                    </span>
                  </div>
                </div>

                {/* Blog Details */}
                <div className="p-5 flex flex-col gap-3">
                  {/* Blog Meta */}
                  <div className="flex items-center gap-[10px]">
                    {/* Read Time Container */}
                    <div className="flex items-center gap-[10px]">
                      {/* User Icon */}
                      <div className="w-4 h-4 border border-[#808080] rounded-full flex items-center justify-center">
                        <div className="w-[9.33px] h-3 border border-[#808080] rounded-full"></div>
                      </div>
                      {/* Read Time */}
                      <span className="font-plus-jakarta-sans font-normal text-[14px] leading-[20px] text-[#808080]">
                        9 min read
                      </span>
                    </div>

                    {/* Line Separator */}
                    <div className="w-0 h-[25px] border-l border-[#D6D6D6]"></div>

                    {/* Comments Container */}
                    <div className="flex items-center gap-[10px]">
                      {/* Comments Icon */}
                      <div className="w-4 h-4 border border-[#808080] rounded-full flex items-center justify-center">
                        <div className="w-3 h-[10.67px] border border-[#808080] rounded-full"></div>
                      </div>
                      {/* Comments */}
                      <span className="font-plus-jakarta-sans font-normal text-[14px] leading-[20px] text-[#808080]">
                        Comment(0)
                      </span>
                    </div>
                  </div>

                  {/* Blog Post Title */}
                  <h3 className="font-inter font-medium text-[24px] leading-[29px] text-[#171A20]">
                    Toxic Plants
                  </h3>

                  {/* Blog Post Description */}
                  <p className="font-inter font-normal text-[16px] leading-[26px] text-[#555555]">
                    Stay safe by recognizing and avoiding harmful plants.
                  </p>

                  {/* Learn More Button */}
                  <button className="flex items-center gap-1 py-[10px] px-0 bg-white rounded-lg w-fit">
                    <span className="font-plus-jakarta-sans font-semibold text-[14px] leading-[20px] text-[#354E33]">
                      Learn More
                    </span>
                    {/* Arrow Icon */}
                    <div className="w-5 h-5 border-2 border-[#354E33] rounded-full flex items-center justify-center">
                      <div className="w-[11.67px] h-[10px] border-r-2 border-b-2 border-[#354E33] transform rotate-45 -translate-x-0.5"></div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Blog Post 2 - Allergenic Plants */}
              <div className="w-[352px] h-[472px] border border-[#D6D6D6] rounded-[20px] overflow-hidden">
                {/* Blog Image */}
                <div className="relative w-[352px] h-[250px]">
                  <Image
                    src="/figma/blog-image-2-31a3cb.png"
                    alt="Dangers bloodsucking ticks animals hand with magnifying glass shows tick magnified"
                    width={352}
                    height={250}
                    className="w-full h-full object-cover"
                  />
                  {/* Date Container */}
                  <div className="absolute bottom-0 right-0 w-[126px] h-[48px] bg-[#395137] flex items-center justify-center px-6 py-3">
                    <span className="font-plus-jakarta-sans font-normal text-[16px] leading-[24px] text-white text-center">
                      22 Jun
                    </span>
                  </div>
                </div>

                {/* Blog Details */}
                <div className="p-5 flex flex-col gap-3">
                  {/* Blog Meta */}
                  <div className="flex items-center gap-[10px]">
                    {/* Read Time Container */}
                    <div className="flex items-center gap-[10px]">
                      {/* User Icon */}
                      <div className="w-4 h-4 border border-[#808080] rounded-full flex items-center justify-center">
                        <div className="w-[9.33px] h-3 border border-[#808080] rounded-full"></div>
                      </div>
                      {/* Read Time */}
                      <span className="font-plus-jakarta-sans font-normal text-[14px] leading-[20px] text-[#808080]">
                        9 min read
                      </span>
                    </div>

                    {/* Line Separator */}
                    <div className="w-0 h-[25px] border-l border-[#D6D6D6]"></div>

                    {/* Comments Container */}
                    <div className="flex items-center gap-[10px]">
                      {/* Comments Icon */}
                      <div className="w-4 h-4 border border-[#808080] rounded-full flex items-center justify-center">
                        <div className="w-3 h-[10.67px] border border-[#808080] rounded-full"></div>
                      </div>
                      {/* Comments */}
                      <span className="font-plus-jakarta-sans font-normal text-[14px] leading-[20px] text-[#808080]">
                        Comment(0)
                      </span>
                    </div>
                  </div>

                  {/* Blog Post Title */}
                  <h3 className="font-inter font-medium text-[24px] leading-[29px] text-[#171A20]">
                    Allergenic plants
                  </h3>

                  {/* Blog Post Description */}
                  <p className="font-inter font-normal text-[16px] leading-[26px] text-[#555555]">
                    Identify and address allergy-triggering plants for a healthier space.
                  </p>

                  {/* Learn More Button */}
                  <button className="flex items-center gap-1 py-[10px] px-0 bg-white rounded-lg w-fit">
                    <span className="font-plus-jakarta-sans font-semibold text-[14px] leading-[20px] text-[#354E33]">
                      Learn More
                    </span>
                    {/* Arrow Icon */}
                    <div className="w-5 h-5 border-2 border-[#354E33] rounded-full flex items-center justify-center">
                      <div className="w-[11.67px] h-[10px] border-r-2 border-b-2 border-[#354E33] transform rotate-45 -translate-x-0.5"></div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Blog Post 3 - Houseplants */}
              <div className="w-[352px] h-[472px] border border-[#D6D6D6] rounded-[20px] overflow-hidden">
                {/* Blog Image */}
                <div className="relative w-[352px] h-[250px]">
                  <Image
                    src="/figma/blog-image-3.png"
                    alt="Person takes smartphone photo potted green plant home interior hand holds device captures"
                    width={352}
                    height={250}
                    className="w-full h-full object-cover"
                  />
                  {/* Date Container */}
                  <div className="absolute bottom-0 right-0 w-[126px] h-[48px] bg-[#395137] flex items-center justify-center px-6 py-3">
                    <span className="font-plus-jakarta-sans font-normal text-[16px] leading-[24px] text-white text-center">
                      22 Jun
                    </span>
                  </div>
                </div>

                {/* Blog Details */}
                <div className="p-5 flex flex-col gap-3">
                  {/* Blog Meta */}
                  <div className="flex items-center gap-[10px]">
                    {/* Read Time Container */}
                    <div className="flex items-center gap-[10px]">
                      {/* User Icon */}
                      <div className="w-4 h-4 border border-[#808080] rounded-full flex items-center justify-center">
                        <div className="w-[9.33px] h-3 border border-[#808080] rounded-full"></div>
                      </div>
                      {/* Read Time */}
                      <span className="font-plus-jakarta-sans font-normal text-[14px] leading-[20px] text-[#808080]">
                        9 min read
                      </span>
                    </div>

                    {/* Line Separator */}
                    <div className="w-0 h-[25px] border-l border-[#D6D6D6]"></div>

                    {/* Comments Container */}
                    <div className="flex items-center gap-[10px]">
                      {/* Comments Icon */}
                      <div className="w-4 h-4 border border-[#808080] rounded-full flex items-center justify-center">
                        <div className="w-3 h-[10.67px] border border-[#808080] rounded-full"></div>
                      </div>
                      {/* Comments */}
                      <span className="font-plus-jakarta-sans font-normal text-[14px] leading-[20px] text-[#808080]">
                        Comment(0)
                      </span>
                    </div>
                  </div>

                  {/* Blog Post Title */}
                  <h3 className="font-inter font-medium text-[24px] leading-[29px] text-[#171A20]">
                    Houseplants
                  </h3>

                  {/* Blog Post Description */}
                  <p className="font-inter font-normal text-[16px] leading-[26px] text-[#555555]">
                    Recognize and nurture indoor greenery with ease.
                  </p>

                  {/* Learn More Button */}
                  <button className="flex items-center gap-1 py-[10px] px-0 bg-white rounded-lg w-fit">
                    <span className="font-plus-jakarta-sans font-semibold text-[14px] leading-[20px] text-[#354E33]">
                      Learn More
                    </span>
                    {/* Arrow Icon */}
                    <div className="w-5 h-5 border-2 border-[#354E33] rounded-full flex items-center justify-center">
                      <div className="w-[11.67px] h-[10px] border-r-2 border-b-2 border-[#354E33] transform rotate-45 -translate-x-0.5"></div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* App Download Section */}
      <div className="w-full bg-[#F9F4EF] py-[50px] px-[15px] relative overflow-hidden">
        <div className="w-[85%] max-w-[1120px] mx-auto">
          {/* Content Container */}
          <div className="flex flex-row items-center gap-[47px] pr-20 bg-[#F9F4EF] rounded-[20px] relative z-10">
            {/* Text and Buttons Container */}
            <div className="flex flex-col items-start gap-[50px] w-[683px]">
              {/* Main Text */}
              <div className="w-[683px] h-[204px] flex items-center">
                <h2 className="font-inter font-medium text-[56px] leading-[68px] text-[#171A20]">
                  Download and unlock nature's secrets and enjoy your greener world
                </h2>
              </div>

              {/* App Store Buttons */}
              <div className="flex flex-row items-center gap-6 w-[386px] h-[52px]">
                {/* Google Play Badge */}
                <div className="w-[182px] h-[50px] bg-black rounded-[6px] flex items-center justify-center">
                  <Image
                    src="/figma/google-play-badge.png"
                    alt="Get it on Google Play"
                    width={182}
                    height={50}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* App Store Badge */}
                <div className="w-[180px] h-[52px] bg-black rounded-[6px] flex items-center justify-center">
                  <Image
                    src="/figma/app-store-badge.png"
                    alt="Download on the App Store"
                    width={180}
                    height={52}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Right Side Phone Image */}
            <div className="w-[251px] h-[515px] flex-shrink-0">
              <Image
                src="/figma/download-section-phone.png"
                alt="Plantzify App on Mobile Phone"
                width={251}
                height={515}
                className="w-full h-full object-contain drop-shadow-lg"
                style={{
                  filter: 'drop-shadow(0px 0px 0px rgba(0, 0, 0, 0))'
                }}
              />
            </div>
          </div>

          {/* Leaf Decorations */}
          {/* Top Left Leaf */}
          <div className="absolute w-[78px] h-[72px] left-[199px] top-[15px] bg-[#354E33] rounded-full opacity-20 z-0"></div>
          
          {/* Bottom Left Leaf */}
          <div className="absolute w-[78px] h-[72px] left-[482px] top-[380px] bg-[#354E33] rounded-full opacity-20 z-0"></div>
          
          {/* Top Right Leaf */}
          <div className="absolute w-[78px] h-[72px] left-[1304px] top-[227px] bg-[#354E33] rounded-full opacity-20 z-0"></div>
        </div>
      </div>

      </main>
    </>
  );
}
