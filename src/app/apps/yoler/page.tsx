'use client';

import { useState } from 'react';

export default function YolerPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const testimonials = [
    {
      name: 'Jenny Wilson',
      location: 'United Kingdom',
      avatar: '/figma/yoler/testimonial-avatar.png',
      text: '"I called yesterday and spoke with you… You said you would take care of the case and then get back to me, but that still hasn\'t happened.\n\nI\'m still waiting to hear from you. Yet you send me a message asking how happy I am with shopping with you – well, what do you think yourselves? (Take a wild guess). Honestly, my head is messed up, and I\'ve already paid."'
    }
  ];

  return (
    <main className="min-h-screen w-full relative bg-white">
      {/* Hero Section with Background Image */}
      <section className="relative w-full h-[700px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/figma/yoler/hero-background.jpg"
            alt="Driving background"
            className="w-full h-full object-cover object-center"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-[#222222] opacity-60" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[100px] h-full">
          {/* Header Navigation */}
          <header className="flex items-center justify-between pt-10 pb-4">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src="/figma/yoler/logo.png"
                alt="YOLER Logo"
                className="h-14 w-auto"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-white text-base font-inter leading-[1.6] hover:opacity-80 transition-opacity">
                Home
              </a>
              <a href="#" className="text-white text-base font-inter leading-[1.6] hover:opacity-80 transition-opacity">
                Blogs
              </a>
              <a href="#" className="text-white text-base font-inter leading-[1.6] hover:opacity-80 transition-opacity">
                About us
              </a>
              <a href="#" className="text-white text-base font-inter leading-[1.6] hover:opacity-80 transition-opacity">
                Contact
              </a>
            </nav>

            {/* Download App Button */}
            <button className="bg-[#009661] border-2 border-white text-white px-6 py-2 rounded-lg font-inter font-medium text-base leading-normal hover:bg-[#007a4d] transition-colors">
              Download App
            </button>
          </header>

          {/* Hero Content - Centered */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[992px] px-4 text-center">
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-bold text-white font-inter leading-normal mb-8 whitespace-pre-wrap">
              Pass your Theory Test{'\n'}First Time
            </h1>

            {/* App Store Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              {/* Google Play Button */}
              <a
                href="#"
                className="bg-black border-[3px] border-white rounded-md h-[50px] w-[182px] flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <img
                  src="/figma/yoler/google-play-badge.png"
                  alt="Get it on Google Play"
                  className="h-full w-full object-contain"
                />
              </a>

              {/* App Store Button */}
              <a
                href="#"
                className="bg-black border-[3px] border-white rounded-md h-[50px] w-[180px] flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <img
                  src="/figma/yoler/app-store-badge.png"
                  alt="Download on the App Store"
                  className="h-full w-full object-contain"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="relative -mt-32 sm:-mt-24 md:-mt-20 lg:-mt-16 z-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[100px] pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-[30px]">
          {/* Car Card */}
          <div className="bg-white rounded-xl p-6 shadow-[0px_10px_20px_0px_rgba(41,41,42,0.07)] flex flex-col items-center text-center gap-6 hover:shadow-[0px_15px_30px_0px_rgba(41,41,42,0.12)] transition-shadow min-w-[200px]">
            <div className="w-[65px] h-[65px] flex items-center justify-center shrink-0">
              <img
                src="/figma/yoler/car-icon.png"
                alt="Car icon"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl font-medium text-[#171a20] font-inter leading-normal">
                Car
              </h3>
              <p className="text-lg text-[#555555] font-inter leading-[28px]">
                Practice 700+ clips across different environments and road conditions to prepare for your test
              </p>
            </div>
          </div>

          {/* Motorcycle Card */}
          <div className="bg-white rounded-xl p-6 shadow-[0px_10px_20px_0px_rgba(41,41,42,0.07)] flex flex-col items-center text-center gap-6 hover:shadow-[0px_15px_30px_0px_rgba(41,41,42,0.12)] transition-shadow min-w-[200px]">
            <div className="w-[65px] h-[65px] flex items-center justify-center shrink-0">
              <img
                src="/figma/yoler/motorcycle-icon.png"
                alt="Motorcycle icon"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl font-medium text-[#171a20] font-inter leading-normal">
                Motorcycle
              </h3>
              <p className="text-lg text-[#555555] font-inter leading-[28px]">
                Practice 700+ clips across different environments and road conditions to prepare for your test
              </p>
            </div>
          </div>

          {/* Lorry Card */}
          <div className="bg-white rounded-xl p-6 shadow-[0px_10px_20px_0px_rgba(41,41,42,0.07)] flex flex-col items-center text-center gap-6 hover:shadow-[0px_15px_30px_0px_rgba(41,41,42,0.12)] transition-shadow min-w-[200px]">
            <div className="w-[65px] h-[65px] flex items-center justify-center shrink-0">
              <img
                src="/figma/yoler/lorry-icon.png"
                alt="Lorry icon"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl font-medium text-[#171a20] font-inter leading-normal">
                Lorry
              </h3>
              <p className="text-lg text-[#555555] font-inter leading-[28px]">
                Includes comprehensive learning materials covering every aspect of the DVSA syllabus for the CPC test
              </p>
            </div>
          </div>

          {/* Bus Card */}
          <div className="bg-white rounded-xl p-6 shadow-[0px_10px_20px_0px_rgba(41,41,42,0.07)] flex flex-col items-center text-center gap-6 hover:shadow-[0px_15px_30px_0px_rgba(41,41,42,0.12)] transition-shadow min-w-[200px]">
            <div className="w-[65px] h-[65px] flex items-center justify-center shrink-0">
              <img
                src="/figma/yoler/bus-icon.png"
                alt="Bus icon"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl font-medium text-[#171a20] font-inter leading-normal">
                Bus
              </h3>
              <p className="text-lg text-[#555555] font-inter leading-[28px]">
                Practice 700+ bus clips in different environments and road conditions to prepare for your test
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured On Section */}
      <section className="w-full py-16 bg-white">
        <div className="max-w-[1404px] mx-auto px-3">
          {/* Heading */}
          <div className="flex flex-col items-center mb-[60px] z-[2] relative">
            <h2 className="text-3xl sm:text-4xl font-medium text-[#171a20] font-inter text-center leading-normal">
              36k+ Installation And Featured On
            </h2>
          </div>

          {/* Brand Logos - Horizontal Scroll Container */}
          <div className="overflow-x-auto pb-[61px] scrollbar-hide z-[1] relative">
            <div className="flex items-start gap-0 min-w-max">
              {/* Brand 1 - MakeLess */}
              <div className="flex items-center justify-center px-0 pr-6 py-0 shrink-0 w-[234px] h-[26.95px]">
                <div className="flex items-center justify-center w-[210px] h-full pt-[2.95px]">
                  <img
                    src="/figma/yoler/brand-1.png"
                    alt="MakeLess"
                    className="h-6 w-auto opacity-80 max-w-[140px]"
                  />
                </div>
              </div>

              {/* Brand 2 - coworks */}
              <div className="flex items-center justify-center px-0 pr-6 py-0 shrink-0 w-[234px] h-[30px]">
                <div className="flex items-center justify-center w-[210px] h-full">
                  <img
                    src="/figma/yoler/brand-2.png"
                    alt="coworks"
                    className="h-[30px] w-auto opacity-80 max-w-[148px]"
                  />
                </div>
              </div>

              {/* Brand 3 - greener */}
              <div className="flex items-center justify-center px-0 pr-6 py-0 shrink-0 w-[234px] h-[28.95px]">
                <div className="flex items-center justify-center w-[210px] h-full pt-[0.95px]">
                  <img
                    src="/figma/yoler/brand-3.png"
                    alt="greener"
                    className="h-7 w-auto opacity-80 max-w-[147px]"
                  />
                </div>
              </div>

              {/* Brand 4 - SAAS TODAY */}
              <div className="flex items-center justify-center px-0 pr-6 py-0 shrink-0 w-[234px] h-[34px]">
                <div className="flex items-center justify-center w-[210px] h-full">
                  <img
                    src="/figma/yoler/brand-4.png"
                    alt="SAAS TODAY"
                    className="h-[34px] w-auto opacity-80 max-w-[93px]"
                  />
                </div>
              </div>

              {/* Repeat brands for seamless scroll effect */}
              <div className="flex items-center justify-center px-0 pr-6 py-0 shrink-0 w-[234px] h-[34px]">
                <div className="flex items-center justify-center w-[210px] h-full">
                  <img
                    src="/figma/yoler/brand-4.png"
                    alt="SAAS TODAY"
                    className="h-[34px] w-auto opacity-80 max-w-[93px]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-center px-0 pr-6 py-0 shrink-0 w-[234px] h-[26.95px]">
                <div className="flex items-center justify-center w-[210px] h-full pt-[2.95px]">
                  <img
                    src="/figma/yoler/brand-1.png"
                    alt="MakeLess"
                    className="h-6 w-auto opacity-80 max-w-[140px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Theory Test App Section */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="relative bg-[#9e8afb] rounded-2xl overflow-hidden p-4 sm:p-6 lg:p-8">
            {/* White Content Area */}
            <div className="relative bg-[#f6f4ff] rounded-2xl mx-auto max-w-[1192px] min-h-[643px] flex flex-col lg:flex-row items-center justify-between px-6 sm:px-12 lg:px-[95px] py-12 lg:py-0">
              {/* Left Content */}
              <div className="flex flex-col gap-8 w-full lg:w-[534px] z-10 lg:mt-0">
                {/* Heading and Description */}
                <div className="flex flex-col gap-4">
                  <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-medium text-[#171a20] font-inter leading-normal">
                    Theory Test App
                  </h2>
                  <div className="flex flex-col gap-2 max-w-[534px]">
                    <p className="text-lg text-[#555555] font-inter leading-[28px]">
                      Study from a bank of 2500+ DVSA theory test revision questions, up-to-date for 2025. Take full-length tests and track your progress.
                    </p>
                    <p className="text-lg text-[#555555] font-inter leading-[28px]">
                      Practice on any of these devices at any time and as much as you like
                    </p>
                  </div>
                </div>

                {/* Download App Button */}
                <div>
                  <button className="bg-[#009661] text-white px-[35px] py-[15px] rounded-lg font-inter font-bold text-base leading-normal hover:bg-[#007a4d] transition-colors">
                    Download App
                  </button>
                </div>
              </div>

              {/* Right Content - Phone Mockups */}
              <div className="relative flex items-center justify-center w-full lg:w-auto mt-8 lg:mt-0 lg:ml-[107px]">
                <div className="relative w-full max-w-[517px] h-[399px] flex items-center justify-center">
                  {/* Phone Mockup */}
                  <div className="relative z-10">
                    <img
                      src="/figma/yoler/phone-mockup.png"
                      alt="YOLER App on Phone"
                      className="w-full h-auto max-w-[300px] lg:max-w-[400px] rounded-lg shadow-2xl"
                    />
                  </div>

                  {/* Top Arrow */}
                  <div className="absolute top-0 right-0 lg:right-[-86px] w-[86px] h-[69.8px] hidden lg:block">
                    <img
                      src="/figma/yoler/arrow-top.svg"
                      alt=""
                      className="w-full h-full"
                    />
                  </div>

                  {/* Bottom Arrow (flipped) */}
                  <div className="absolute bottom-0 right-0 lg:right-[-86px] w-[86px] h-[69.8px] hidden lg:block" style={{ transform: 'scaleY(-1)' }}>
                    <img
                      src="/figma/yoler/arrow-top.svg"
                      alt=""
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </div>

              {/* City Skyline at Bottom */}
              <div className="absolute bottom-0 left-0 w-full max-w-[705px] h-[106px] overflow-hidden pointer-events-none">
                <img
                  src="/figma/yoler/city-skyline.svg"
                  alt=""
                  className="absolute bottom-0 left-0 w-full h-full object-cover"
                />
                <img
                  src="/figma/yoler/city-skyline-bg.svg"
                  alt=""
                  className="absolute bottom-0 left-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-[120px] px-4 sm:px-6 lg:px-[100px] bg-white">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex flex-col gap-[72px] items-center justify-center">
            {/* Heading */}
            <div className="flex flex-col gap-6 items-center justify-center text-center w-full">
              <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-[#171a20] font-inter leading-[1.3] max-w-[872px]">
                Exploring the features of the Theory Test 5 in 1 App
              </h2>
              <p className="text-lg text-[#444444] font-inter leading-[1.6]">
                Experience learning on Theorypass today. Ace your theory test on the first try tomorrow.
              </p>
            </div>

            {/* Features Grid - Row 1 */}
            <div className="flex flex-col lg:flex-row gap-6 w-full">
              {/* Card 1: What do I get? */}
              <div className="bg-[#cdeafc] rounded-2xl p-8 flex flex-col gap-10 items-center justify-center relative overflow-hidden flex-1 min-h-[453px] pt-8">
                <div className="flex flex-col gap-6 items-start w-full z-10 relative">
                  <h3 className="text-4xl font-medium text-[#333333] font-inter text-center w-full leading-normal h-[80px] flex items-center justify-center">
                    What do I get?
                  </h3>
                  <ul className="list-disc text-xl text-[#666666] font-inter leading-[1.5] space-y-2 ml-[30px]">
                    <li className="mb-0">Full access to all the questions</li>
                    <li className="mb-0">Unlimited learning sessions with immediate feedback</li>
                    <li>Mock tests and test-ready indicator</li>
                  </ul>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 bottom-[20px] w-[188px] h-[188px] hidden lg:block">
                  <img
                    src="/figma/yoler/icon-gift.png"
                    alt="Gift icon"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Card 2: Hazard Perception Test */}
              <div className="bg-[#fcdede] rounded-2xl p-8 flex flex-col gap-10 items-center justify-between flex-1 min-h-[453px]">
                <div className="flex flex-col gap-6 items-start w-full">
                  <h3 className="text-4xl font-medium text-[#333333] font-inter text-center w-full leading-normal h-[78px] flex items-center justify-center whitespace-pre-wrap">
                    Hazard{'\n'}Perception Test
                  </h3>
                </div>
                <div className="w-full max-w-[331px] h-[264.8px] flex items-center justify-center">
                  <img
                    src="/figma/yoler/icon-hazard.png"
                    alt="Hazard icon"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Card 3: Highway Code */}
              <div className="bg-[#e6fcfc] rounded-2xl p-8 flex flex-col gap-10 items-center justify-center flex-1 min-h-[453px]">
                <div className="flex flex-col gap-6 items-start w-full">
                  <h3 className="text-4xl font-medium font-semibold text-[#333333] font-inter text-center w-full leading-normal h-[80px] flex items-center justify-center whitespace-pre-wrap">
                    Highway{'\n'}Code
                  </h3>
                </div>
                <div className="w-[269px] h-[269px] flex items-center justify-center">
                  <img
                    src="/figma/yoler/icon-highway-code.png"
                    alt="Highway code icon"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Features Grid - Row 2 */}
            <div className="flex flex-col lg:flex-row gap-6 w-full">
              {/* Card 4: Mock Test */}
              <div className="bg-[#cdeafc] rounded-2xl p-8 flex flex-col gap-10 items-center justify-center flex-1 min-h-[453px]">
                <div className="flex flex-col gap-6 items-start w-full">
                  <h3 className="text-4xl font-medium text-[#333333] font-inter text-center w-full leading-normal h-[80px] flex items-center justify-center whitespace-pre-wrap">
                    Mock Test
                  </h3>
                </div>
                <div className="w-[264px] h-[264px] flex items-center justify-center">
                  <img
                    src="/figma/yoler/icon-mock-test.png"
                    alt="Mock test icon"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Card 5: Practice */}
              <div className="bg-[#fcdede] rounded-2xl p-8 flex flex-col gap-10 items-center justify-center flex-1 min-h-[453px]">
                <div className="flex flex-col gap-6 items-start w-full">
                  <h3 className="text-4xl font-medium text-[#333333] font-inter text-center w-full leading-normal h-[57px] flex items-center justify-center whitespace-pre-wrap">
                    Practice
                  </h3>
                </div>
                <div className="w-[266px] h-[266px] flex items-center justify-center">
                  <img
                    src="/figma/yoler/icon-practice.png"
                    alt="Practice icon"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Card 6: Road Sign */}
              <div className="bg-[#e6fcfc] rounded-2xl p-8 flex flex-col gap-10 items-center justify-center flex-1 min-h-[453px]">
                <div className="flex flex-col gap-6 items-start w-full">
                  <h3 className="text-4xl font-medium text-[#333333] font-inter text-center w-full leading-normal h-[80px] flex items-center justify-center whitespace-pre-wrap">
                    Road Sign
                  </h3>
                </div>
                <div className="w-[264px] h-[264px] flex items-center justify-center">
                  <img
                    src="/figma/yoler/icon-road-sign.png"
                    alt="Road sign icon"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Example Questions Section */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-[100px] bg-white">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="flex flex-col gap-6 w-full lg:w-[50%]">
              <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-[#171a20] font-inter leading-tight">
                Example Of Questions On The Theory Test
              </h2>
              <div className="flex flex-col gap-4 text-lg text-[#444444] font-inter leading-[1.6]">
                <p>
                  What type of questions can one expect on the theory test? A theory test is divided into five categories. To pass the test and become a safe driver you must be knowledgeable in every category
                </p>
                <p>
                  It&apos;s impossible to say which questions you will get on your specific test, but we can give examples of typical questions from each category
                </p>
              </div>
              <button className="bg-[#009661] text-white px-8 py-3 rounded-lg font-inter font-bold text-base leading-normal hover:bg-[#007a4d] transition-colors w-fit">
                Download App
              </button>
            </div>

            {/* Right Content - Phone Illustration */}
            <div className="relative flex items-center justify-center w-full lg:w-[50%]">
              <div className="relative w-full max-w-[500px] aspect-[4/5]">
                <img
                  src="/figma/yoler/phone-checkmarks.png"
                  alt="Theory Test App Questions"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Tips Section */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-[100px] bg-white">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="flex flex-col gap-6 w-full lg:w-[50%]">
              <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-[#171a20] font-inter leading-tight">
                Quick tips to pass your theory test
              </h2>
              <div className="flex flex-col gap-4 text-lg text-[#444444] font-inter leading-[1.6]">
                <p>
                  Try to get a good night&apos;s sleep and have a steady breakfast before your test. It can also be a good idea to bring fruit or some snacks to the test
                </p>
                <p>
                  Don&apos;t stress and try to stay focused. After all - 50 minutes is a fairly long time. If a question takes too long, mark it and move on - you can always return to the question later on.
                </p>
              </div>
              <button className="bg-[#009661] text-white px-8 py-3 rounded-lg font-inter font-bold text-base leading-normal hover:bg-[#007a4d] transition-colors w-fit">
                Download App
              </button>
            </div>

            {/* Right Content - Car Illustration */}
            <div className="relative flex items-center justify-center w-full lg:w-[50%]">
              <div className="relative w-full max-w-[600px] aspect-[4/3]">
                <img
                  src="/figma/yoler/illustration-questions.png"
                  alt="Driving test tips illustration"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-[100px] bg-white">
        <div className="max-w-[1240px] mx-auto">
          <div className="relative flex flex-col lg:flex-row gap-8 items-start">
            {/* Left Side - Testimonial Card */}
            <div className="w-full lg:w-[617.569px] bg-white rounded-2xl p-10 shadow-[8px_12px_24px_10px_rgba(0,0,0,0.04)] z-10 relative">
              <div className="flex flex-col gap-6 items-end">
                {/* Quote Mark */}
                <div className="flex items-center justify-center w-[80px] h-[68px] rotate-180">
                  <img
                    src="/figma/yoler/quote-mark.svg"
                    alt="Quote mark"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Testimonial Content */}
                <div className="flex flex-col gap-5 items-end w-full">
                  <div className="flex flex-col gap-6 items-start w-full">
                    {/* Customer Info */}
                    <div className="flex gap-4 items-center w-full">
                      <div className="w-14 h-14 rounded-full overflow-hidden shrink-0">
                        <img
                          src={testimonials[currentTestimonial].avatar}
                          alt={testimonials[currentTestimonial].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col flex-1">
                        <p className="text-xl text-[#222222] font-inter leading-[1.5] font-normal">
                          {testimonials[currentTestimonial].name}
                        </p>
                        <p className="text-sm text-[#666666] font-inter leading-[1.7]">
                          {testimonials[currentTestimonial].location}
                        </p>
                      </div>
                    </div>

                    {/* Testimonial Text */}
                    <div className="text-lg text-[#222222] font-inter leading-[28px] whitespace-pre-wrap">
                      {testimonials[currentTestimonial].text}
                    </div>
                  </div>

                  {/* Navigation Arrows */}
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                      className="p-2 hover:opacity-70 transition-opacity"
                      aria-label="Previous testimonial"
                    >
                      <img
                        src="/figma/yoler/chevron-left.svg"
                        alt="Previous"
                        className="w-6 h-6"
                      />
                    </button>
                    <button
                      onClick={() => setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                      className="p-2 hover:opacity-70 transition-opacity"
                      aria-label="Next testimonial"
                    >
                      <img
                        src="/figma/yoler/chevron-right.svg"
                        alt="Next"
                        className="w-6 h-6"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Purple Background Section */}
            <div className="w-full lg:w-[685.647px] lg:absolute lg:right-0 lg:top-0 h-[628px] bg-[#9e8afb] rounded-2xl flex flex-col justify-center px-12 lg:px-16 py-12 lg:py-16">
              <div className="flex flex-col gap-2 max-w-[432.784px]">
                <h2 className="text-4xl sm:text-5xl lg:text-[48px] font-semibold text-white font-inter leading-[64px] whitespace-pre-wrap">
                  Happy customers
                </h2>
                <p className="text-lg text-white font-inter leading-[28px] whitespace-pre-wrap">
                  Feedback from these happy customers helps us in reaching the heights
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-[70px] px-4 sm:px-6 lg:px-[100px] bg-[#f6f4ff]">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col gap-[72px] items-center justify-center">
            {/* Heading */}
            <div className="flex flex-col gap-4 items-center justify-center text-center max-w-[700px]">
              <h2 className="text-4xl sm:text-5xl lg:text-[48px] font-bold text-[#213430] font-inter leading-normal whitespace-pre-wrap">
                The Answers to All Your Questions
              </h2>
              <div className="max-w-[620px]">
                <p className="text-base text-[#555555] font-inter leading-[26px] whitespace-pre-wrap">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
                </p>
              </div>
            </div>

            {/* FAQ Content - Two Columns */}
            <div className="flex flex-col lg:flex-row gap-14 items-center justify-center w-full">
              {/* Left Side - Image */}
              <div className="flex-1 w-full lg:w-auto min-h-[562px]">
                <div className="w-full h-[562px] rounded-2xl overflow-hidden">
                  <img
                    src="/figma/yoler/faq-image.jpg"
                    alt="Person in car"
                    className="w-full h-full object-cover object-center rounded-2xl"
                  />
                </div>
              </div>

              {/* Right Side - FAQ Accordion */}
              <div className="flex-1 w-full bg-white rounded-2xl overflow-hidden">
                <div className="flex flex-col gap-4 p-6 h-[562px] overflow-y-auto">
                  {/* FAQ Item 1 - Expanded by default */}
                  <div className="bg-[#9e8afb] rounded-2xl p-6">
                    <div className="flex gap-2.5 items-center justify-center w-full mb-4">
                      <p className="flex-1 font-medium text-2xl text-white font-inter leading-normal whitespace-pre-wrap">
                        How much time do I have to take the test?
                      </p>
                      <button
                        onClick={() => setOpenFaqIndex(openFaqIndex === 0 ? null : 0)}
                        className="w-8 h-8 shrink-0 flex items-center justify-center"
                        aria-label="Toggle FAQ"
                      >
                        <img
                          src="/figma/yoler/icon-minus.svg"
                          alt="Minus"
                          className="w-full h-full"
                        />
                      </button>
                    </div>
                    {openFaqIndex === 0 && (
                      <p className="text-base text-white font-inter leading-[1.6] whitespace-pre-wrap">
                        You must complete the theory test in 50 minutes. A reminder will be shown on the screen when 10 minutes remain.
                      </p>
                    )}
                  </div>

                  {/* FAQ Item 2 */}
                  <div className="bg-white rounded-lg p-6">
                    <div className="flex gap-2.5 items-center justify-center w-full">
                      <p className="flex-1 font-medium text-2xl text-black font-inter leading-normal whitespace-pre-wrap">
                        How much does it cost?
                      </p>
                      <button
                        onClick={() => setOpenFaqIndex(openFaqIndex === 1 ? null : 1)}
                        className="w-8 h-8 shrink-0 flex items-center justify-center"
                        aria-label="Toggle FAQ"
                      >
                        <img
                          src={openFaqIndex === 1 ? "/figma/yoler/icon-minus.svg" : "/figma/yoler/icon-plus.svg"}
                          alt={openFaqIndex === 1 ? "Minus" : "Plus"}
                          className="w-full h-full"
                        />
                      </button>
                    </div>
                    {openFaqIndex === 1 && (
                      <p className="text-base text-black font-inter leading-[1.6] mt-4 whitespace-pre-wrap">
                        The theory test costs vary by location. Please check the official DVSA website for current pricing in your area.
                      </p>
                    )}
                  </div>

                  {/* FAQ Item 3 */}
                  <div className="bg-white rounded-lg p-6">
                    <div className="flex gap-2.5 items-center justify-center w-full">
                      <p className="flex-1 font-medium text-2xl text-black font-inter leading-normal whitespace-pre-wrap">
                        How many questions are asked?
                      </p>
                      <button
                        onClick={() => setOpenFaqIndex(openFaqIndex === 2 ? null : 2)}
                        className="w-8 h-8 shrink-0 flex items-center justify-center"
                        aria-label="Toggle FAQ"
                      >
                        <img
                          src={openFaqIndex === 2 ? "/figma/yoler/icon-minus.svg" : "/figma/yoler/icon-plus.svg"}
                          alt={openFaqIndex === 2 ? "Minus" : "Plus"}
                          className="w-full h-full"
                        />
                      </button>
                    </div>
                    {openFaqIndex === 2 && (
                      <p className="text-base text-black font-inter leading-[1.6] mt-4 whitespace-pre-wrap">
                        The theory test consists of 50 multiple-choice questions covering various topics from the Highway Code.
                      </p>
                    )}
                  </div>

                  {/* FAQ Item 4 */}
                  <div className="bg-white rounded-lg p-6">
                    <div className="flex gap-2.5 items-center justify-center w-full">
                      <p className="flex-1 font-medium text-2xl text-black font-inter leading-normal whitespace-pre-wrap">
                        What aids can I bring to the test?
                      </p>
                      <button
                        onClick={() => setOpenFaqIndex(openFaqIndex === 3 ? null : 3)}
                        className="w-8 h-8 shrink-0 flex items-center justify-center"
                        aria-label="Toggle FAQ"
                      >
                        <img
                          src={openFaqIndex === 3 ? "/figma/yoler/icon-minus.svg" : "/figma/yoler/icon-plus.svg"}
                          alt={openFaqIndex === 3 ? "Minus" : "Plus"}
                          className="w-full h-full"
                        />
                      </button>
                    </div>
                    {openFaqIndex === 3 && (
                      <p className="text-base text-black font-inter leading-[1.6] mt-4 whitespace-pre-wrap">
                        You cannot bring any aids, books, or notes into the test. Only your identification documents are permitted.
                      </p>
                    )}
                  </div>

                  {/* FAQ Item 5 */}
                  <div className="bg-white rounded-lg p-6">
                    <div className="flex gap-2.5 items-center justify-center w-full">
                      <p className="flex-1 font-medium text-2xl text-black font-inter leading-normal whitespace-pre-wrap">
                        Can I take another language than Swedish?
                      </p>
                      <button
                        onClick={() => setOpenFaqIndex(openFaqIndex === 4 ? null : 4)}
                        className="w-8 h-8 shrink-0 flex items-center justify-center"
                        aria-label="Toggle FAQ"
                      >
                        <img
                          src={openFaqIndex === 4 ? "/figma/yoler/icon-minus.svg" : "/figma/yoler/icon-plus.svg"}
                          alt={openFaqIndex === 4 ? "Minus" : "Plus"}
                          className="w-full h-full"
                        />
                      </button>
                    </div>
                    {openFaqIndex === 4 && (
                      <p className="text-base text-black font-inter leading-[1.6] mt-4 whitespace-pre-wrap">
                        Yes, the theory test is available in multiple languages including English, Welsh, and other common languages. Please check availability at your test center.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA / Download Section */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-[100px] bg-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="relative bg-[#9e8afb] rounded-2xl overflow-hidden">
            {/* Content Container */}
            <div className="relative min-h-[510px] flex flex-col lg:flex-row items-stretch">
              {/* Left Side - Purple Background with Text and Buttons */}
              <div className="flex-1 bg-[#9e8afb] flex flex-col justify-center px-4 sm:px-8 lg:px-14 py-12 lg:py-16 z-10">
                <div className="flex flex-col gap-6 max-w-[526px]">
                  <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-white font-inter leading-normal whitespace-pre-wrap">
                    Download and unlock the road to success
                  </h2>
                  
                  {/* App Store Buttons */}
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    {/* Google Play Button */}
                    <a
                      href="#"
                      className="bg-black border-[3px] border-white rounded-md h-[50px] w-[182px] flex items-center justify-center hover:opacity-90 transition-opacity"
                    >
                      <img
                        src="/figma/yoler/google-play-badge.png"
                        alt="Get it on Google Play"
                        className="h-full w-full object-contain"
                      />
                    </a>

                    {/* App Store Button */}
                    <a
                      href="#"
                      className="bg-black border-[3px] border-white rounded-md h-[50px] w-[180px] flex items-center justify-center hover:opacity-90 transition-opacity"
                    >
                      <img
                        src="/figma/yoler/app-store-badge.png"
                        alt="Download on the App Store"
                        className="h-full w-full object-contain"
                      />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Side - Light Blue Background with Phone Mockups */}
              <div className="flex-1 bg-[#e6fcfc] relative rounded-r-2xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="relative w-full h-full max-w-[600px] rounded-2xl overflow-hidden">
                    <img
                      src="/figma/yoler/cta-phone-mockup.jpg"
                      alt="YOLER App on phones"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                </div>

                {/* Decorative Plant */}
                <div className="absolute right-4 top-[227px] w-[78px] h-[72px] hidden lg:block z-10">
                  <img
                    src="/figma/yoler/decorative-plant.png"
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[#f1f1f1]">
        {/* Main Footer Content */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[100px] py-16">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-[125px] items-start">
            {/* Column 1 - Logo and Description */}
            <div className="flex flex-col gap-4 w-full lg:w-[255px]">
              <div className="flex gap-6 items-center">
                <div className="h-14 w-[130px] relative">
                  <img
                    src="/figma/yoler/footer-logo.png"
                    alt="YOLER Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-base text-black font-inter leading-[1.6]">
                  Theory Test
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-base text-black font-inter leading-[1.6]">
                  The theory test certificate lasts for two years from the date of issue. You need to book and pass your practical driving test within these two years
                </p>
                <div className="flex gap-3 items-center">
                  <a href="#" className="w-[30px] h-[30px] hover:opacity-70 transition-opacity">
                    <img
                      src="/figma/yoler/icon-facebook.svg"
                      alt="Facebook"
                      className="w-full h-full"
                    />
                  </a>
                  <a href="#" className="w-[30px] h-[30px] hover:opacity-70 transition-opacity">
                    <img
                      src="/figma/yoler/icon-instagram.svg"
                      alt="Instagram"
                      className="w-full h-full"
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2 - Quick Links */}
            <div className="flex flex-col gap-6 w-full lg:w-[160px]">
              <h3 className="text-xl text-black font-inter leading-[1.5]">
                Quick Links
              </h3>
              <div className="flex flex-col gap-4 font-medium text-sm text-black font-inter leading-normal">
                <a href="#" className="hover:opacity-70 transition-opacity">
                  Home
                </a>
                <a href="#" className="hover:opacity-70 transition-opacity">
                  Blogs
                </a>
                <a href="#" className="hover:opacity-70 transition-opacity">
                  About
                </a>
                <a href="#" className="hover:opacity-70 transition-opacity">
                  Support
                </a>
              </div>
            </div>

            {/* Column 3 - Services */}
            <div className="flex flex-col gap-6 w-full lg:w-[160px]">
              <h3 className="text-xl text-black font-inter leading-[1.5]">
                Services
              </h3>
              <div className="flex flex-col gap-4 font-medium text-sm text-black font-inter leading-normal">
                <a href="#" className="hover:opacity-70 transition-opacity">
                  Car Theory Test
                </a>
                <a href="#" className="hover:opacity-70 transition-opacity">
                  Motorcycle Theory Test
                </a>
                <a href="#" className="hover:opacity-70 transition-opacity">
                  Bus Theory Test
                </a>
                <a href="#" className="hover:opacity-70 transition-opacity">
                  Lorry Theory Test
                </a>
                <a href="#" className="hover:opacity-70 transition-opacity">
                  ADI Theory Test
                </a>
              </div>
            </div>

            {/* Column 4 - Reach Us */}
            <div className="flex flex-col gap-6 w-full lg:w-auto">
              <h3 className="text-xl text-black font-inter leading-[1.5]">
                Reach us
              </h3>
              <div className="flex flex-col gap-6">
                {/* Email */}
                <div className="flex gap-2 items-center">
                  <div className="w-6 h-6 shrink-0">
                    <img
                      src="/figma/yoler/icon-email.svg"
                      alt="Email"
                      className="w-full h-full"
                    />
                  </div>
                  <p className="font-medium text-sm text-black font-inter leading-normal">
                    hello@DeepDevs.com
                  </p>
                </div>

                {/* Phone */}
                <div className="flex gap-2 items-center">
                  <div className="w-6 h-6 shrink-0">
                    <img
                      src="/figma/yoler/icon-phone.svg"
                      alt="Phone"
                      className="w-full h-full"
                    />
                  </div>
                  <p className="font-medium text-sm text-black font-inter leading-normal">
                    +44 123 456 7890
                  </p>
                </div>

                {/* Address */}
                <div className="flex gap-2 items-start">
                  <div className="w-6 h-6 shrink-0 mt-0.5">
                    <img
                      src="/figma/yoler/icon-location.svg"
                      alt="Location"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="font-medium text-sm text-black font-inter leading-normal">
                    <p className="mb-0">0123 Add Your Location</p>
                    <p>CityName, IN 123456</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sub Footer */}
        <div className="border-t border-gray-300 bg-[#f1f1f1]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[100px] py-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-black font-inter font-medium leading-normal">
                © 2025 DeepDevs. All rights reserved
              </p>
              <div className="flex gap-2 items-center text-sm text-black">
                <a href="#" className="font-medium font-inter leading-normal hover:opacity-70 transition-opacity">
                  Terms & Conditions
                </a>
                <span className="font-normal leading-[24px]">|</span>
                <a href="#" className="font-medium font-inter leading-normal hover:opacity-70 transition-opacity">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

