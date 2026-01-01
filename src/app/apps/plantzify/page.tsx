'use client';

import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/components/Logo';

export default function PlantzifyPage() {
  return (
    <>
      {/* Fixed Header with Liquid Glass Effect */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-morphism border-b border-white/20 shadow-lg">
        <div className="w-[85%] mx-auto px-6 md:px-10 lg:px-16 py-[1.2rem]">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Logo />
            </div>
            <nav className="hidden md:flex items-center gap-8 text-sm text-gray-700">
              <a className="hover:text-gray-900 transition-colors" href="#plugins">Our Plugins</a>
              <Link className="text-indigo-600 font-medium" href="/apps">Our Apps</Link>
              <a className="hover:text-gray-900 transition-colors" href="#support">Support</a>
              <a className="hover:text-gray-900 transition-colors" href="#contact">Contact Us</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="pt-20 relative z-10 min-h-screen bg-gray-100">
        {/* Hero Section */}
        <div className="relative w-[95%] sm:w-[90%] lg:w-[85%] max-w-[1380px] mx-auto mt-4 sm:mt-6 lg:mt-[32px] mb-8 sm:mb-12 lg:mb-16">
          {/* Main Container with Gradient Background */}
          <div className="w-full rounded-2xl sm:rounded-[30px] overflow-hidden"
            style={{
              background: 'linear-gradient(274.49deg, #F9F4EF -25.85%, #FFFFFF -25.85%, #354E33 76.27%)'
            }}>

            {/* Inner Content Container */}
            <div className="flex flex-col px-4 sm:px-6 lg:px-8 py-6 sm:py-8 gap-6 sm:gap-8">

              {/* Header */}
              <div className="w-full bg-[#FAFAFA] rounded-xl sm:rounded-[12px] flex flex-row justify-between items-center px-3 sm:px-4 lg:px-[30px] py-3 sm:py-4 gap-3 sm:gap-4">

                {/* Logo Section */}
                <div className="flex flex-row items-center gap-2 sm:gap-4">
                  {/* Logo Icon */}
                  <Image
                    src="/figma/app-icon-1-56586a.png"
                    alt="Plantzify Logo"
                    width={36}
                    height={38}
                    className="w-7 h-8 sm:w-9 sm:h-[38px] object-contain"
                  />

                  {/* Logo Text */}
                  <div className="flex flex-col">
                    <span className="font-poppins font-bold text-sm sm:text-base lg:text-[20px] leading-tight text-[#1C1C1E]">
                      PLZ Plantzify
                    </span>
                  </div>
                </div>

                {/* Navigation - Hidden on mobile */}
                <div className="hidden lg:flex flex-col justify-center items-center gap-[10px] w-[571px] h-[60px] bg-[#FEFEFF] shadow-[0px_0px_1px_rgba(0,0,0,0.25)] rounded-[40px] px-[18px]">
                  <div className="flex flex-row justify-center items-center gap-[36px] w-full h-[19px]">
                    <span className="font-inter font-medium text-[16px] leading-[19px] text-[#171A20]">Home</span>
                    <span className="font-inter font-medium text-[16px] leading-[19px] text-[#171A20]">Identify Plants</span>
                    <span className="font-inter font-medium text-[16px] leading-[19px] text-[#171A20]">Blog</span>
                    <span className="font-inter font-medium text-[16px] leading-[19px] text-[#171A20]">About Us</span>
                  </div>
                </div>

                {/* Download App Button */}
                <div className="flex flex-row justify-center items-center">
                  <div className="flex flex-row justify-center items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 lg:px-[35px] lg:py-[15px] bg-[#171A20] rounded-full lg:rounded-[40px]">
                    <span className="font-inter font-bold text-xs sm:text-sm lg:text-[16px] leading-tight text-white whitespace-nowrap">Download App</span>
                  </div>
                </div>
              </div>

              {/* Hero Content */}
              <div className="flex flex-col lg:flex-row justify-between items-center gap-6 sm:gap-8 pb-4 sm:pb-8">

                {/* Left Content */}
                <div className="flex flex-col items-start gap-4 sm:gap-6 w-full lg:w-[632px]">
                  <div className="flex flex-col gap-4 sm:gap-6 w-full">
                    <div className="flex flex-col gap-2 w-full">
                      {/* Welcome Text */}
                      <div className="w-full">
                        <span className="font-inter font-medium text-sm sm:text-[16px] leading-[19px] text-white">
                          Welcome to ATT Plantzify
                        </span>
                      </div>

                      {/* Main Title */}
                      <div className="w-full">
                        <span className="font-inter font-bold text-2xl sm:text-[32px] md:text-[48px] lg:text-[64px] leading-[1.2] text-white">
                          Plant Detective Identify & Protect Your Greenery
                        </span>
                      </div>
                    </div>

                    {/* Subtitle */}
                    <div className="w-full">
                      <span className="font-inter font-normal text-sm sm:text-[16px] md:text-[18px] leading-[1.4] text-white">
                        Your will have everything nearby supermarket, buses, station, the carmen neighborhood, etc
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side - Plant Image */}
                <div className="w-full max-w-[280px] sm:max-w-[350px] lg:max-w-[456px] h-[250px] sm:h-[300px] lg:h-[400px] flex-shrink-0">
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
        </div>

        {/* Features Section */}
        <div className="w-full bg-[#F9F4EF] py-16 sm:py-20 lg:pt-[120px] lg:pb-[120px]">
          <div className="w-[90%] sm:w-[85%] max-w-[1240px] mx-auto">
            {/* Header */}
            <div className="flex flex-col justify-center items-center gap-[10px] mb-8 sm:mb-14">
              <h2 className="w-full font-inter font-medium text-2xl sm:text-4xl lg:text-[56px] leading-tight lg:leading-[68px] text-center text-[#171A20]">
                Discover Plantzify App Features Easily
              </h2>
              <p className="w-full font-inter font-normal text-sm sm:text-base lg:text-[18px] leading-relaxed lg:leading-[22px] text-center text-[#171A20]">
                Your simple way to explore, recognize, and learn about plants in just a few steps
              </p>
            </div>

            {/* Features Grid */}
            <div className="flex flex-col gap-6">
              {/* First Row */}
              <div className="flex flex-col md:flex-row justify-center items-center gap-4 sm:gap-6">
                {/* Plant Finder */}
                <div className="flex flex-col items-center p-6 sm:p-10 gap-4 sm:gap-6 w-full md:w-[397.33px] bg-white border-2 border-[#F3F0F0] rounded-[16px]">
                  <div className="flex flex-col items-center gap-4 sm:gap-6 w-full max-w-[226px]">
                    <Image
                      src="/figma/plant-finder-icon-6528e5.png"
                      alt="Plant Finder"
                      width={64}
                      height={74}
                      className="w-12 h-14 sm:w-16 sm:h-[74px] object-contain"
                    />
                    <div className="flex flex-col items-center gap-2 sm:gap-3 w-full">
                      <h3 className="w-full font-inter font-medium text-lg sm:text-xl lg:text-[24px] leading-tight lg:leading-[29px] text-center text-[#171A20]">
                        Plant Finder
                      </h3>
                      <p className="w-full font-inter font-normal text-sm sm:text-base lg:text-[16px] leading-relaxed lg:leading-[160%] text-center text-[#555555]">
                        Identify plants instantly with just a photo your smart guide to nature&apos;s world
                      </p>
                    </div>
                  </div>
                </div>

                {/* Water Calculator */}
                <div className="flex flex-col items-center p-6 sm:p-10 gap-4 sm:gap-6 w-full md:w-[397.33px] bg-white border-2 border-[#F3F0F0] rounded-[16px]">
                  <div className="flex flex-col items-center gap-4 sm:gap-6 w-full max-w-[226px]">
                    <Image
                      src="/figma/water-calculator-icon-4a66fb.png"
                      alt="Water Calculator"
                      width={73}
                      height={64}
                      className="w-14 h-12 sm:w-[73px] sm:h-16 object-contain"
                    />
                    <div className="flex flex-col items-center gap-2 sm:gap-3 w-full">
                      <h3 className="w-full font-inter font-medium text-lg sm:text-xl lg:text-[24px] leading-tight lg:leading-[29px] text-center text-[#171A20]">
                        Water Calculator
                      </h3>
                      <p className="w-full font-inter font-normal text-sm sm:text-base lg:text-[16px] leading-relaxed lg:leading-[160%] text-center text-[#555555]">
                        From workouts to daily routines, discover how much water you really need
                      </p>
                    </div>
                  </div>
                </div>

                {/* Light Meter */}
                <div className="flex flex-col items-center p-6 sm:p-10 gap-4 sm:gap-6 w-full md:w-[397.33px] bg-white border-2 border-[#F3F0F0] rounded-[16px]">
                  <div className="flex flex-col items-center gap-4 sm:gap-6 w-full max-w-[226px]">
                    <Image
                      src="/figma/light-meter-icon-6fd182.png"
                      alt="Light Meter"
                      width={64}
                      height={64}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                    />
                    <div className="flex flex-col items-center gap-2 sm:gap-3 w-full">
                      <h3 className="w-full font-inter font-medium text-lg sm:text-xl lg:text-[24px] leading-tight lg:leading-[29px] text-center text-[#171A20]">
                        Light Meter
                      </h3>
                      <p className="w-full font-inter font-normal text-sm sm:text-base lg:text-[16px] leading-relaxed lg:leading-[160%] text-center text-[#555555]">
                        Measure light levels instantly and accurately — anytime, anywhere
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Second Row */}
              <div className="flex flex-col md:flex-row justify-center items-center gap-4 sm:gap-6">
                {/* Diagnose */}
                <div className="flex flex-col items-center p-6 sm:p-10 gap-4 sm:gap-6 w-full md:w-[397.33px] bg-white border-2 border-[#F3F0F0] rounded-[16px]">
                  <div className="flex flex-col items-center gap-4 sm:gap-6 w-full max-w-[226px]">
                    <Image
                      src="/figma/diagnose-icon-69e405.png"
                      alt="Diagnose"
                      width={64}
                      height={55}
                      className="w-12 h-10 sm:w-16 sm:h-[55px] object-contain"
                    />
                    <div className="flex flex-col items-center gap-2 sm:gap-3 w-full">
                      <h3 className="w-full font-inter font-medium text-lg sm:text-xl lg:text-[24px] leading-tight lg:leading-[29px] text-center text-[#171A20]">
                        Diagnose
                      </h3>
                      <p className="w-full font-inter font-normal text-sm sm:text-base lg:text-[16px] leading-relaxed lg:leading-[160%] text-center text-[#555555]">
                        Your smart tool for accurate diagnosis and better decision-making
                      </p>
                    </div>
                  </div>
                </div>

                {/* Checker */}
                <div className="flex flex-col items-center p-6 sm:p-10 gap-4 sm:gap-6 w-full md:w-[397.33px] bg-white border-2 border-[#F3F0F0] rounded-[16px]">
                  <div className="flex flex-col items-center gap-4 sm:gap-6 w-full max-w-[226px]">
                    <Image
                      src="/figma/checker-icon-6eff61.png"
                      alt="Checker"
                      width={64}
                      height={60}
                      className="w-12 h-11 sm:w-16 sm:h-[60px] object-contain"
                    />
                    <div className="flex flex-col items-center gap-2 sm:gap-3 w-full">
                      <h3 className="w-full font-inter font-medium text-lg sm:text-xl lg:text-[24px] leading-tight lg:leading-[29px] text-center text-[#171A20]">
                        Checker
                      </h3>
                      <p className="w-full font-inter font-normal text-sm sm:text-base lg:text-[16px] leading-relaxed lg:leading-[160%] text-center text-[#555555]">
                        Reliable checking made simple — fast, clear, and effective
                      </p>
                    </div>
                  </div>
                </div>

                {/* Plant Advisor */}
                <div className="flex flex-col items-center p-6 sm:p-10 gap-4 sm:gap-6 w-full md:w-[397.33px] bg-white border-2 border-[#F3F0F0] rounded-[16px]">
                  <div className="flex flex-col items-center gap-4 sm:gap-6 w-full max-w-[226px]">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#006730] rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full opacity-80"></div>
                    </div>
                    <div className="flex flex-col items-center gap-2 sm:gap-3 w-full">
                      <h3 className="w-full font-inter font-medium text-lg sm:text-xl lg:text-[24px] leading-tight lg:leading-[29px] text-center text-[#171A20]">
                        Plant Advisor
                      </h3>
                      <p className="w-full font-inter font-normal text-sm sm:text-base lg:text-[16px] leading-relaxed lg:leading-[160%] text-center text-[#555555]">
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
                        you can spot issues early and take action before it&apos;s too late. Whether it&apos;s pests, diseases, or improper care, quick identification means healthier, stronger plants that thrive. By understanding what your plants need and responding to their problems in time, you can keep your garden green, vibrant, and full of life.
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
                        A thriving garden is more than just plants — it&apos;s a source of joy, peace, and accomplishment. When your plants grow strong and vibrant, they reward you with beauty, fresh air, and even food. By giving them the right care and attention, you not only nurture nature but also create a healthier, happier space for yourself. After all, when gardens flourish, so do the people who care for them
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
                      &quot; Very happy with flacio; plants arrived in excellent condition, were healthy looking with lots of new growth and are thriving! &quot;
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
        <div className="w-full bg-white py-12 sm:py-16 lg:py-[100px] px-4 sm:px-6 lg:px-[15px]">
          <div className="w-full max-w-[1120px] mx-auto">
            <div className="flex flex-col items-center gap-8 sm:gap-10 lg:gap-[50px]">
              {/* Header Container */}
              <div className="flex flex-col items-center gap-1">
                {/* Section Title */}
                <div>
                  <span className="font-plus-jakarta-sans font-bold text-[14px] leading-[20px] text-[#3328BF]">
                    Gallery
                  </span>
                </div>

                {/* Section Subtitle and Description */}
                <div className="flex flex-col items-center gap-3 sm:gap-4">
                  {/* Section Subtitle */}
                  <div className="w-full">
                    <h2 className="font-inter font-medium text-3xl sm:text-4xl lg:text-[56px] leading-tight lg:leading-[68px] text-center text-[#171A20]">
                      Plant Gallery
                    </h2>
                  </div>

                  {/* Description */}
                  <div className="w-full max-w-[534px] px-4 sm:px-0">
                    <p className="font-inter font-normal text-sm sm:text-base lg:text-[18px] leading-relaxed lg:leading-[22px] text-center text-[#171A20]">
                      A thriving garden is more than just plants — it&apos;s a source of joy, peace, and accomplishment
                    </p>
                  </div>
                </div>
              </div>

              {/* Gallery Container - Using CSS Grid for proper responsive layout */}
              <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:gap-8 w-full">
                {/* Gallery Image 1 */}
                <div className="aspect-[4/3] sm:aspect-[544/352] rounded-lg sm:rounded-xl lg:rounded-[20px] overflow-hidden">
                  <Image
                    src="/figma/gallery-image-1.png"
                    alt="Hand woman photographing outdoors"
                    width={544}
                    height={352}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Gallery Image 2 */}
                <div className="aspect-[4/3] sm:aspect-[544/352] rounded-lg sm:rounded-xl lg:rounded-[20px] overflow-hidden">
                  <Image
                    src="/figma/gallery-image-2.png"
                    alt="Hand photographing plants with mobile phone park"
                    width={544}
                    height={352}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Gallery Image 3 */}
                <div className="aspect-[4/3] sm:aspect-[544/352] rounded-lg sm:rounded-xl lg:rounded-[20px] overflow-hidden">
                  <Image
                    src="/figma/gallery-image-3.png"
                    alt="She was using his phone take pictures plants check integrity before posting sale social media"
                    width={544}
                    height={352}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Gallery Image 4 */}
                <div className="aspect-[4/3] sm:aspect-[544/352] rounded-lg sm:rounded-xl lg:rounded-[20px] overflow-hidden">
                  <Image
                    src="/figma/gallery-image-4.png"
                    alt="Person takes smartphone photo potted green plant home interior hand holds device captures"
                    width={544}
                    height={352}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Gallery Image 5 */}
                <div className="aspect-[4/3] sm:aspect-[544/352] rounded-lg sm:rounded-xl lg:rounded-[20px] overflow-hidden">
                  <Image
                    src="/figma/gallery-image-5.png"
                    alt="Hand photographing plants with mobile phone park"
                    width={544}
                    height={352}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Gallery Image 6 */}
                <div className="aspect-[4/3] sm:aspect-[544/352] rounded-lg sm:rounded-xl lg:rounded-[20px] overflow-hidden">
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

        {/* Deep Reads Blog Section */}
        <div className="w-full bg-white py-8 sm:py-12 lg:py-[50px] px-4 sm:px-6 lg:px-[15px]">
          <div className="w-full max-w-[1120px] mx-auto">
            <div className="flex flex-col items-center gap-8 sm:gap-10 lg:gap-[50px]">
              {/* Blog Header */}
              <div className="flex flex-col items-center gap-1">
                {/* Blog Title */}
                <div>
                  <span className="font-plus-jakarta-sans font-normal text-base sm:text-lg lg:text-[20px] leading-[30px] text-[#3328BF]">
                    Our Blog
                  </span>
                </div>

                {/* Blog Subtitle */}
                <div className="w-full">
                  <h2 className="font-inter font-medium text-3xl sm:text-4xl lg:text-[56px] leading-tight lg:leading-[68px] text-center text-[#171A20]">
                    Deep Reads
                  </h2>
                </div>
              </div>

              {/* Blog Content - Horizontally scrollable on mobile */}
              <div className="w-full overflow-x-auto scrollbar-hide pb-4 -mb-4">
                <div className="flex gap-4 sm:gap-6 lg:gap-8 snap-x snap-mandatory overflow-x-auto lg:overflow-visible lg:justify-center min-w-max lg:min-w-0">
                  {/* Blog Post 1 - Toxic Plants */}
                  <div className="w-[280px] sm:w-[320px] lg:w-[352px] flex-shrink-0 snap-start border border-[#D6D6D6] rounded-xl lg:rounded-[20px] overflow-hidden bg-white">
                    {/* Blog Image */}
                    <div className="relative w-full aspect-[352/250]">
                      <Image
                        src="/figma/blog-image-1.png"
                        alt="Smart agriculture IoT with hand planting tree background"
                        width={352}
                        height={250}
                        className="w-full h-full object-cover"
                      />
                      {/* Date Container */}
                      <div className="absolute bottom-0 right-0 w-[100px] sm:w-[126px] h-10 sm:h-[48px] bg-[#395137] flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3">
                        <span className="font-plus-jakarta-sans font-normal text-sm sm:text-[16px] leading-[24px] text-white text-center">
                          22 Jun
                        </span>
                      </div>
                    </div>

                    {/* Blog Details */}
                    <div className="p-4 sm:p-5 flex flex-col gap-2 sm:gap-3">
                      {/* Blog Meta */}
                      <div className="flex items-center gap-2 sm:gap-[10px] text-xs sm:text-sm">
                        <span className="font-plus-jakarta-sans font-normal text-[#808080]">
                          9 min read
                        </span>
                        <span className="w-px h-4 bg-[#D6D6D6]"></span>
                        <span className="font-plus-jakarta-sans font-normal text-[#808080]">
                          Comment(0)
                        </span>
                      </div>

                      {/* Blog Post Title */}
                      <h3 className="font-inter font-medium text-lg sm:text-xl lg:text-[24px] leading-tight text-[#171A20]">
                        Toxic Plants
                      </h3>

                      {/* Blog Post Description */}
                      <p className="font-inter font-normal text-sm sm:text-[16px] leading-relaxed text-[#555555]">
                        Stay safe by recognizing and avoiding harmful plants.
                      </p>

                      {/* Learn More Button */}
                      <button className="flex items-center gap-1 py-2 bg-white w-fit">
                        <span className="font-plus-jakarta-sans font-semibold text-sm text-[#354E33]">
                          Learn More
                        </span>
                        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
                          <circle cx="10" cy="10" r="8" stroke="#354E33" strokeWidth="2" />
                          <path d="M8 6l4 4-4 4" stroke="#354E33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Blog Post 2 - Allergenic Plants */}
                  <div className="w-[280px] sm:w-[320px] lg:w-[352px] flex-shrink-0 snap-start border border-[#D6D6D6] rounded-xl lg:rounded-[20px] overflow-hidden bg-white">
                    {/* Blog Image */}
                    <div className="relative w-full aspect-[352/250]">
                      <Image
                        src="/figma/blog-image-2-31a3cb.png"
                        alt="Dangers bloodsucking ticks animals hand with magnifying glass shows tick magnified"
                        width={352}
                        height={250}
                        className="w-full h-full object-cover"
                      />
                      {/* Date Container */}
                      <div className="absolute bottom-0 right-0 w-[100px] sm:w-[126px] h-10 sm:h-[48px] bg-[#395137] flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3">
                        <span className="font-plus-jakarta-sans font-normal text-sm sm:text-[16px] leading-[24px] text-white text-center">
                          22 Jun
                        </span>
                      </div>
                    </div>

                    {/* Blog Details */}
                    <div className="p-4 sm:p-5 flex flex-col gap-2 sm:gap-3">
                      {/* Blog Meta */}
                      <div className="flex items-center gap-2 sm:gap-[10px] text-xs sm:text-sm">
                        <span className="font-plus-jakarta-sans font-normal text-[#808080]">
                          9 min read
                        </span>
                        <span className="w-px h-4 bg-[#D6D6D6]"></span>
                        <span className="font-plus-jakarta-sans font-normal text-[#808080]">
                          Comment(0)
                        </span>
                      </div>

                      {/* Blog Post Title */}
                      <h3 className="font-inter font-medium text-lg sm:text-xl lg:text-[24px] leading-tight text-[#171A20]">
                        Allergenic plants
                      </h3>

                      {/* Blog Post Description */}
                      <p className="font-inter font-normal text-sm sm:text-[16px] leading-relaxed text-[#555555]">
                        Identify and address allergy-triggering plants for a healthier space.
                      </p>

                      {/* Learn More Button */}
                      <button className="flex items-center gap-1 py-2 bg-white w-fit">
                        <span className="font-plus-jakarta-sans font-semibold text-sm text-[#354E33]">
                          Learn More
                        </span>
                        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
                          <circle cx="10" cy="10" r="8" stroke="#354E33" strokeWidth="2" />
                          <path d="M8 6l4 4-4 4" stroke="#354E33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Blog Post 3 - Houseplants */}
                  <div className="w-[280px] sm:w-[320px] lg:w-[352px] flex-shrink-0 snap-start border border-[#D6D6D6] rounded-xl lg:rounded-[20px] overflow-hidden bg-white">
                    {/* Blog Image */}
                    <div className="relative w-full aspect-[352/250]">
                      <Image
                        src="/figma/blog-image-3.png"
                        alt="Person takes smartphone photo potted green plant home interior hand holds device captures"
                        width={352}
                        height={250}
                        className="w-full h-full object-cover"
                      />
                      {/* Date Container */}
                      <div className="absolute bottom-0 right-0 w-[100px] sm:w-[126px] h-10 sm:h-[48px] bg-[#395137] flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3">
                        <span className="font-plus-jakarta-sans font-normal text-sm sm:text-[16px] leading-[24px] text-white text-center">
                          22 Jun
                        </span>
                      </div>
                    </div>

                    {/* Blog Details */}
                    <div className="p-4 sm:p-5 flex flex-col gap-2 sm:gap-3">
                      {/* Blog Meta */}
                      <div className="flex items-center gap-2 sm:gap-[10px] text-xs sm:text-sm">
                        <span className="font-plus-jakarta-sans font-normal text-[#808080]">
                          9 min read
                        </span>
                        <span className="w-px h-4 bg-[#D6D6D6]"></span>
                        <span className="font-plus-jakarta-sans font-normal text-[#808080]">
                          Comment(0)
                        </span>
                      </div>

                      {/* Blog Post Title */}
                      <h3 className="font-inter font-medium text-lg sm:text-xl lg:text-[24px] leading-tight text-[#171A20]">
                        Houseplants
                      </h3>

                      {/* Blog Post Description */}
                      <p className="font-inter font-normal text-sm sm:text-[16px] leading-relaxed text-[#555555]">
                        Recognize and nurture indoor greenery with ease.
                      </p>

                      {/* Learn More Button */}
                      <button className="flex items-center gap-1 py-2 bg-white w-fit">
                        <span className="font-plus-jakarta-sans font-semibold text-sm text-[#354E33]">
                          Learn More
                        </span>
                        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
                          <circle cx="10" cy="10" r="8" stroke="#354E33" strokeWidth="2" />
                          <path d="M8 6l4 4-4 4" stroke="#354E33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* App Download Section */}
        <div className="w-full bg-[#F9F4EF] py-8 sm:py-12 lg:py-[50px] px-4 sm:px-6 lg:px-[15px] relative overflow-hidden">
          <div className="w-full max-w-[1120px] mx-auto">
            {/* Content Container */}
            <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-10 lg:gap-[47px] bg-[#F9F4EF] rounded-[20px] relative z-10">
              {/* Text and Buttons Container */}
              <div className="flex flex-col items-center lg:items-start gap-6 sm:gap-8 lg:gap-[50px] w-full lg:w-auto lg:flex-1">
                {/* Main Text */}
                <div className="w-full text-center lg:text-left">
                  <h2 className="font-inter font-medium text-2xl sm:text-3xl md:text-4xl lg:text-[56px] leading-tight lg:leading-[68px] text-[#171A20]">
                    Download and unlock nature&apos;s secrets and enjoy your greener world
                  </h2>
                </div>

                {/* App Store Buttons */}
                <div className="flex flex-row items-center gap-3 sm:gap-4 lg:gap-6 flex-wrap justify-center lg:justify-start">
                  {/* Google Play Badge */}
                  <div className="w-[140px] h-[40px] sm:w-[160px] sm:h-[45px] lg:w-[182px] lg:h-[50px] bg-black rounded-md flex items-center justify-center">
                    <Image
                      src="/figma/google-play-badge.png"
                      alt="Get it on Google Play"
                      width={182}
                      height={50}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* App Store Badge */}
                  <div className="w-[140px] h-[40px] sm:w-[160px] sm:h-[45px] lg:w-[180px] lg:h-[52px] bg-black rounded-md flex items-center justify-center">
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
              <div className="w-[180px] h-[370px] sm:w-[200px] sm:h-[410px] lg:w-[251px] lg:h-[515px] flex-shrink-0">
                <Image
                  src="/figma/download-section-phone.png"
                  alt="Plantzify App on Mobile Phone"
                  width={251}
                  height={515}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Leaf Decorations - Hidden on mobile */}
            <div className="hidden lg:block absolute w-[78px] h-[72px] left-[199px] top-[15px] bg-[#354E33] rounded-full opacity-20 z-0"></div>
            <div className="hidden lg:block absolute w-[78px] h-[72px] left-[482px] top-[380px] bg-[#354E33] rounded-full opacity-20 z-0"></div>
            <div className="hidden lg:block absolute w-[78px] h-[72px] right-[100px] top-[227px] bg-[#354E33] rounded-full opacity-20 z-0"></div>
          </div>
        </div>

        {/* Footer Section */}
        <footer className="w-full bg-[#F1F1F1] pt-12 sm:pt-16 lg:pt-[110px]">
          <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-0">
            {/* Main Footer Content */}
            <div className="flex flex-col lg:flex-row items-start gap-8 sm:gap-12 lg:gap-[95px] pb-8 sm:pb-12 lg:pb-16">

              {/* Left Section - Logo & Description */}
              <div className="flex flex-col gap-4 sm:gap-6 w-full lg:w-[463px]">
                {/* Logo */}
                <div className="flex items-center gap-2">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 4C12 4 8 8 8 12C8 16 12 20 16 20C20 20 24 16 24 12C24 8 20 4 16 4Z" fill="#354E33" />
                    <path d="M16 20V28" stroke="#354E33" strokeWidth="2" />
                    <path d="M12 24H20" stroke="#354E33" strokeWidth="2" />
                  </svg>
                  <span className="font-inter font-semibold text-xl text-[#354E33]">gardyn</span>
                </div>

                {/* Description */}
                <p className="font-inter font-medium text-sm sm:text-base leading-7 text-black/75 max-w-[453px]">
                  Transform your outdoor space with our expert garden services! From design to maintenance, we create beautiful, thriving gardens tailored to your vision. Let us bring your dream garden to life—professional, reliable, and passionate about nature.
                </p>

                {/* Social Icons */}
                <div className="flex items-center gap-3">
                  {/* Facebook */}
                  <a href="#" className="w-10 h-10 rounded-lg overflow-hidden" aria-label="Facebook">
                    <div className="w-full h-full bg-[#0C63D4] flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" />
                      </svg>
                    </div>
                  </a>
                  {/* Instagram */}
                  <a href="#" className="w-10 h-10 rounded-lg overflow-hidden" aria-label="Instagram">
                    <div className="w-full h-full bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#F77737] flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                        <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="2" fill="none" />
                        <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="2" fill="none" />
                        <circle cx="18" cy="6" r="1" fill="white" />
                      </svg>
                    </div>
                  </a>
                </div>
              </div>

              {/* Company Links */}
              <div className="flex flex-col gap-4 sm:gap-5 w-full sm:w-auto">
                <h3 className="font-inter font-semibold text-lg sm:text-xl text-black">Company</h3>
                <ul className="flex flex-col gap-1">
                  <li><a href="#" className="font-heebo font-normal text-base leading-7 text-black/75 hover:text-black transition-colors">Home</a></li>
                  <li><a href="#" className="font-inter font-normal text-base leading-[160%] text-black/75 hover:text-black transition-colors">Our Services</a></li>
                  <li><a href="#" className="font-inter font-normal text-base leading-[160%] text-black/75 hover:text-black transition-colors">Projects</a></li>
                  <li><a href="#" className="font-inter font-normal text-base leading-[160%] text-black/75 hover:text-black transition-colors">About Us</a></li>
                  <li><a href="#" className="font-inter font-normal text-base leading-[160%] text-black/75 hover:text-black transition-colors">Blog</a></li>
                  <li><a href="#" className="font-inter font-normal text-base leading-[160%] text-black/75 hover:text-black transition-colors">Contact</a></li>
                </ul>
              </div>

              {/* Our Services Links */}
              <div className="flex flex-col gap-4 sm:gap-5 w-full sm:w-auto">
                <h3 className="font-inter font-semibold text-lg sm:text-xl text-black">Our Services</h3>
                <ul className="flex flex-col gap-1">
                  <li><a href="#" className="font-inter font-normal text-base leading-[160%] text-black/75 hover:text-black transition-colors">Garden Design</a></li>
                  <li><a href="#" className="font-inter font-normal text-base leading-[160%] text-black/75 hover:text-black transition-colors">Garden Maintenance</a></li>
                  <li><a href="#" className="font-inter font-normal text-base leading-[160%] text-black/75 hover:text-black transition-colors">Planting Services</a></li>
                  <li><a href="#" className="font-inter font-normal text-base leading-[160%] text-black/75 hover:text-black transition-colors">Tree Care</a></li>
                  <li><a href="#" className="font-inter font-normal text-base leading-[160%] text-black/75 hover:text-black transition-colors">Irrigation Services</a></li>
                  <li><a href="#" className="font-inter font-normal text-base leading-[160%] text-black/75 hover:text-black transition-colors">Specialty Services</a></li>
                </ul>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col gap-4 sm:gap-5 w-full sm:w-auto">
                {/* We're Open */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6" stroke="#798D7A" strokeWidth="2" />
                      <path d="M8 5V8L10 10" stroke="#798D7A" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span className="font-inter font-bold text-base text-black">We&apos;re Open</span>
                  </div>
                  <span className="font-heebo font-normal text-base leading-7 text-black/75">Monday - Friday 08.00 - 18.00</span>
                </div>

                {/* Office Location */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 1C5.24 1 3 3.24 3 6C3 9.75 8 15 8 15S13 9.75 13 6C13 3.24 10.76 1 8 1Z" stroke="#798D7A" strokeWidth="1.5" />
                      <circle cx="8" cy="6" r="2" stroke="#798D7A" strokeWidth="1.5" />
                    </svg>
                    <span className="font-inter font-bold text-base text-black">Office Location</span>
                  </div>
                  <span className="font-inter font-normal text-base leading-[160%] text-black/75">100 S Main St, New York, NY</span>
                </div>

                {/* Send a Message */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <rect x="1" y="3" width="14" height="10" rx="1" stroke="#798D7A" strokeWidth="1.5" />
                      <path d="M1 4L8 9L15 4" stroke="#798D7A" strokeWidth="1.5" />
                    </svg>
                    <span className="font-inter font-bold text-base text-black">Send a Message</span>
                  </div>
                  <a href="mailto:contact@gardyn.com" className="font-inter font-normal text-base leading-[160%] text-black/75 hover:text-black transition-colors">contact@gardyn.com</a>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10 py-5">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                {/* Copyright */}
                <span className="font-heebo font-normal text-base leading-7 text-black/75 text-center sm:text-left">
                  Copyright 2025 - DeepDevs
                </span>

                {/* Legal Links */}
                <div className="flex items-center gap-6 sm:gap-8">
                  <a href="/terms-and-conditions" className="font-heebo font-medium text-base leading-7 text-black/75 hover:text-black transition-colors">
                    Terms & Conditions
                  </a>
                  <a href="/privacy-policy" className="font-heebo font-medium text-base leading-7 text-black/75 hover:text-black transition-colors">
                    Privacy Policy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>

      </main>
    </>
  );
}
