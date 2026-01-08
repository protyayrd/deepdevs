'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import useDownloadLink from '@/hooks/useDownloadLink';
import Navbar from '@/components/Navbar';

interface FAQ {
  id: string;
  page: string;
  question: string;
  answer: string;
}

interface YolerHero {
  title: string;
  appStoreUrl: string;
  playStoreUrl: string;
  heroImage: string;
  logo: string;
}

interface YolerFeatureCard {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface YolerBrand {
  id: string;
  name: string;
  logoUrl: string;
}

interface YolerTheoryTestApp {
  title: string;
  description1: string;
  description2: string;
  phoneImage: string;
}

interface YolerFeatureGridItem {
  id: string;
  title: string;
  isList: boolean;
  listItems: string[];
  icon: string;
  backgroundColor: string;
}

interface YolerInfoSection {
  id: string;
  title: string;
  description: string[];
  image: string;
  imagePosition: 'left' | 'right';
}

interface YolerDownloadCta {
  title: string;
  appStoreUrl: string;
  playStoreUrl: string;
}

interface YolerContent {
  hero: YolerHero;
  featureCards: YolerFeatureCard[];
  featuredBrands: YolerBrand[];
  theoryTestApp: YolerTheoryTestApp;
  featuresGrid: YolerFeatureGridItem[];
  infoSections: YolerInfoSection[];
  downloadCta: YolerDownloadCta;
}

export default function YolerPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [faqsLoading, setFaqsLoading] = useState(true);
  const [content, setContent] = useState<YolerContent | null>(null);

  const downloadLink = useDownloadLink(
    content?.hero?.playStoreUrl || '#',
    content?.hero?.appStoreUrl || '#'
  );

  useEffect(() => {
    fetchFAQs();
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/yoler-content');
      const data = await res.json();
      setContent(data);
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  const fetchFAQs = async () => {
    try {
      const response = await fetch('/api/faqs?page=yoler');
      const data = await response.json();
      setFaqs(data);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    } finally {
      setFaqsLoading(false);
    }
  };

  const testimonials = [
    {
      name: 'Jenny Wilson',
      location: 'United Kingdom',
      avatar: '/figma/yoler/testimonial-avatar.png',
      text: '"I called yesterday and spoke with you… You said you would take care of the case and then get back to me, but that still hasn\'t happened.\n\nI\'m still waiting to hear from you. Yet you send me a message asking how happy I am with shopping with you – well, what do you think yourselves? (Take a wild guess). Honestly, my head is messed up, and I\'ve already paid."'
    }
  ];

  if (!content) {
    return <div className="min-h-screen flex items-center justify-center bg-white"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#009661]"></div></div>;
  }

  return (
    <main className="min-h-screen w-full relative bg-white pt-[62px] sm:pt-[72px]">
      <Navbar />
      {/* Hero Section with Background Image */}
      <section className="relative w-full h-[700px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={content.hero.heroImage || "/figma/yoler/hero-background.jpg"}
            alt="Driving background"
            fill
            className="object-cover object-center"
            priority
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
              <Image
                src={content.hero.logo || "/figma/yoler/logo.png"}
                alt="YOLER Logo"
                width={120}
                height={56}
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
            <a
              href={downloadLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#009661] border-2 border-white text-white px-6 py-2 rounded-lg font-inter font-medium text-base leading-normal hover:bg-[#007a4d] transition-colors"
            >
              Download App
            </a>
          </header>

          {/* Hero Content - Centered */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[992px] px-4 text-center">
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-bold text-white font-inter leading-normal mb-8 whitespace-pre-wrap">
              {content.hero.title}
            </h1>

            {/* App Store Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              {/* Google Play Button */}
              <a
                href={content.hero.playStoreUrl}
                className="hover:opacity-90 transition-opacity"
              >
                <Image
                  src="/figma/yoler/google-play-badge-official.svg"
                  alt="Get it on Google Play"
                  width={182}
                  height={50}
                  className="h-[50px] w-auto object-contain"
                />
              </a>

              {/* App Store Button */}
              <a
                href={content.hero.appStoreUrl}
                className="hover:opacity-90 transition-opacity"
              >
                <Image
                  src="/figma/yoler/app-store-badge-official.svg"
                  alt="Download on the App Store"
                  width={180}
                  height={50}
                  className="h-[50px] w-auto object-contain"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="relative -mt-32 sm:-mt-24 md:-mt-20 lg:-mt-16 z-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[100px] pb-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-[30px]">
          {content.featureCards.map((card, index) => (
            <div key={card.id || index} className="bg-white rounded-xl p-4 sm:p-6 shadow-[0px_10px_20px_0px_rgba(41,41,42,0.07)] flex flex-col items-center text-center gap-4 sm:gap-6 hover:shadow-[0px_15px_30px_0px_rgba(41,41,42,0.12)] transition-all hover:-translate-y-1 min-w-[unset]">
              <div className="w-[50px] h-[50px] sm:w-[65px] sm:h-[65px] flex items-center justify-center shrink-0 relative bg-[#F5F5F5] rounded-full p-2">
                <Image
                  src={card.icon}
                  alt={`${card.title} icon`}
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div className="flex flex-col gap-2 sm:gap-3 w-full">
                <h3 className="text-lg sm:text-2xl font-medium text-[#171a20] font-inter leading-normal">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-lg text-[#555555] font-inter leading-[1.5] sm:leading-[28px] line-clamp-3 sm:line-clamp-none">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
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

          {/* Brand Logos - Marquee Container */}
          <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <div className="flex items-center justify-center md:justify-start [&_>_div]:mx-8 animate-scroll-left">
              {/* First Set */}
              {content.featuredBrands.map((brand, index) => (
                <div key={`brand-${brand.id || index}-1`} className="flex items-center justify-center px-0 pr-6 py-0 shrink-0 w-[234px] h-[35px]">
                  <div className="flex items-center justify-center w-[210px] h-full">
                    <img
                      src={brand.logoUrl}
                      alt={brand.name}
                      className="h-full w-auto opacity-80 max-w-[150px] object-contain"
                    />
                  </div>
                </div>
              ))}
              {/* Second Set (Duplicate for Infinite Scroll) */}
              {content.featuredBrands.map((brand, index) => (
                <div key={`brand-${brand.id || index}-2`} className="flex items-center justify-center px-0 pr-6 py-0 shrink-0 w-[234px] h-[35px]">
                  <div className="flex items-center justify-center w-[210px] h-full">
                    <img
                      src={brand.logoUrl}
                      alt={brand.name}
                      className="h-full w-auto opacity-80 max-w-[150px] object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Theory Test App Section */}
      <section className="w-full py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="relative bg-[#9e8afb] rounded-2xl overflow-hidden p-4 sm:p-6 max-w-[1240px] mx-auto">
            {/* White Content Area */}
            <div className="relative bg-[#f6f4ff] rounded-2xl w-full flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 lg:px-[95px] py-8 sm:py-10 lg:py-12 gap-8 lg:gap-0 overflow-hidden">
              {/* Left Content */}
              <div className="flex flex-col gap-6 sm:gap-8 w-full lg:w-[534px] z-10">
                {/* Heading and Description */}
                <div className="flex flex-col gap-4">
                  <h2 className="text-3xl sm:text-4xl lg:text-[56px] font-medium text-[#171a20] font-inter leading-tight lg:leading-normal">
                    {content.theoryTestApp.title}
                  </h2>
                  <div className="flex flex-col gap-2 max-w-[534px]">
                    <p className="text-base sm:text-lg text-[#555555] font-inter leading-[26px] sm:leading-[28px]">
                      {content.theoryTestApp.description1}
                    </p>
                    <p className="text-base sm:text-lg text-[#555555] font-inter leading-[26px] sm:leading-[28px]">
                      {content.theoryTestApp.description2}
                    </p>
                  </div>
                </div>

                {/* Download App Button */}
                <div>
                  <a
                    href={downloadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#009661] text-white px-6 sm:px-[35px] py-3 sm:py-[15px] rounded-lg font-inter font-bold text-sm sm:text-base leading-normal hover:bg-[#007a4d] transition-colors inline-block"
                  >
                    Download App
                  </a>
                </div>
              </div>

              {/* Right Content - Phone Mockups */}
              <div className="relative flex items-center justify-center w-full lg:w-auto lg:ml-8 xl:ml-[107px]">
                <div className="relative w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[517px] flex items-center justify-center">
                  {/* Phone Mockup */}
                  <div className="relative z-10">
                    <img
                      src={content.theoryTestApp.phoneImage}
                      alt="YOLER App on Phone"
                      className="w-full h-auto"
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
              <div className="absolute bottom-0 left-0 w-full max-w-[705px] h-[60px] sm:h-[80px] lg:h-[106px] overflow-hidden pointer-events-none hidden sm:block">
                <img
                  src="/figma/yoler/city-skyline-new.png"
                  alt="City skyline"
                  className="absolute bottom-0 left-0 w-full h-full object-contain object-bottom"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 sm:py-20 lg:py-[120px] px-4 sm:px-6 lg:px-[100px] bg-white">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex flex-col gap-10 sm:gap-14 lg:gap-[72px] items-center justify-center">
            {/* Heading */}
            <div className="flex flex-col gap-4 sm:gap-6 items-center justify-center text-center w-full">
              <h2 className="text-2xl sm:text-4xl lg:text-[56px] font-bold text-[#171a20] font-inter leading-[1.3] max-w-[872px]">
                Exploring the features of the Theory Test 5 in 1 App
              </h2>
              <p className="text-base sm:text-lg text-[#444444] font-inter leading-[1.6]">
                Experience learning on Theorypass today. Ace your theory test on the first try tomorrow.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
              {content.featuresGrid.map((feature, idx) => (
                <div key={feature.id || idx} className="rounded-2xl p-4 sm:p-8 flex flex-col gap-4 sm:gap-10 items-center justify-between min-h-[280px] sm:min-h-[400px] lg:min-h-[453px] hover:shadow-[0px_15px_30px_0px_rgba(41,41,42,0.12)] transition-all duration-300 hover:-translate-y-2 cursor-pointer" style={{ backgroundColor: feature.backgroundColor }}>
                  <div className="flex flex-col gap-3 sm:gap-6 items-start w-full z-10 relative">
                    <h3 className="text-lg sm:text-3xl lg:text-4xl font-medium text-[#333333] font-inter text-center w-full leading-normal flex items-center justify-center">
                      {feature.title}
                    </h3>
                    {feature.isList && (
                      <ul className="list-disc text-sm sm:text-lg lg:text-xl text-[#666666] font-inter leading-[1.5] space-y-1 sm:space-y-2 ml-4 sm:ml-[30px] w-full">
                        {feature.listItems?.map((item, i) => (
                          <li key={i} className={i !== (feature.listItems.length - 1) ? 'mb-0' : ''}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="w-[80px] h-[80px] sm:w-[150px] sm:h-[150px] lg:w-[188px] lg:h-[188px] relative flex items-center justify-center mt-auto">
                    <img
                      src={feature.icon}
                      alt={`${feature.title} icon`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* Example Questions & Quick Tips Wrapper */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-[100px] bg-white">
        <div className="max-w-[1240px] mx-auto flex flex-col gap-[120px]">
          {content.infoSections.map((section, idx) => (
            <div key={section.id} className={`flex flex-col ${section.imagePosition === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-14 items-center`}>
              {/* Image */}
              <div className={`relative w-full lg:w-[50%] flex ${section.imagePosition === 'right' ? 'justify-end' : 'justify-start'}`}>
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full max-w-[620px] h-auto object-contain"
                />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-8 w-full lg:w-[50%]">
                <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-medium text-[#171a20] font-inter leading-tight">
                  {section.title}
                </h2>
                <div className="flex flex-col gap-4 text-[18px] text-[#444444] font-inter leading-[1.6]">
                  {section.description.map((desc, i) => (
                    <p key={i}>{desc}</p>
                  ))}
                </div>
                <a
                  href={downloadLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#009661] text-white px-[35px] py-[15px] rounded-lg font-inter font-bold text-base leading-normal hover:bg-[#007a4d] transition-colors w-fit text-center"
                >
                  Download App
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-visible">
        <div className="max-w-[1240px] mx-auto">
          {/* Mobile Layout */}
          <div className="lg:hidden flex flex-col gap-8">
            {/* Purple Header for Mobile */}
            <div className="bg-[#9E8AFB] rounded-[16px] p-6 sm:p-8">
              <h2 className="font-inter font-semibold text-2xl sm:text-3xl leading-tight text-white text-center">
                Happy customers
              </h2>
              <p className="font-inter font-normal text-base leading-relaxed text-white text-center mt-2">
                Feedback from these happy customers helps us in reaching the heights
              </p>
            </div>

            {/* Testimonial Card for Mobile */}
            <div className="w-full bg-white rounded-[16px] p-6 sm:p-8 shadow-[8px_12px_24px_10px_rgba(0,0,0,0.04)] flex flex-col gap-6">
              {/* Quote Mark */}
              <div className="w-full flex justify-end">
                <div className="w-[60px] h-[50px] opacity-30 rotate-180">
                  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 7.55228 14.017 7V3H19.017C20.6739 3 22.017 4.34315 22.017 6V15C22.017 16.6569 20.6739 18 19.017 18H16.017V21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 7.55228 5.0166 7V3H10.0166C11.6735 3 13.0166 4.34315 13.0166 6V15C13.0166 16.6569 11.6735 18 10.0166 18H7.0166V21H5.0166Z" fill="#FF4A52" />
                  </svg>
                </div>
              </div>
              {/* Profile */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden shrink-0">
                  <img src={testimonials[currentTestimonial].avatar} alt={testimonials[currentTestimonial].name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                  <h4 className="font-inter font-normal text-lg leading-relaxed text-[#222222]">{testimonials[currentTestimonial].name}</h4>
                  <p className="font-inter font-normal text-sm leading-relaxed text-[#666666]">{testimonials[currentTestimonial].location}</p>
                </div>
              </div>
              {/* Testimonial Text */}
              <div className="font-inter font-normal text-base leading-relaxed text-[#222222]">
                &quot;{testimonials[currentTestimonial].text}&quot;
              </div>
              {/* Arrows */}
              <div className="flex justify-end gap-2">
                <button onClick={() => setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))} className="w-10 h-10 flex items-center justify-center hover:opacity-70 transition-opacity">
                  <img src="/figma/yoler/chevron-left.svg" alt="Previous" className="w-6 h-6" />
                </button>
                <button onClick={() => setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))} className="w-10 h-10 flex items-center justify-center hover:opacity-70 transition-opacity">
                  <img src="/figma/yoler/chevron-right.svg" alt="Next" className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:block relative h-[628px]">
            {/* Background Purple Block */}
            <div className="absolute top-0 left-[654px] w-[685.65px] h-[628px] bg-[#9E8AFB] rounded-[16px]">
              <div className="absolute left-[127px] top-[250px] flex flex-col gap-2 w-[432.78px]">
                <h2 className="font-inter font-semibold text-[48px] leading-[64px] text-white">
                  Happy customers
                </h2>
                <p className="font-inter font-normal text-[18px] leading-[28px] text-white">
                  Feedback from these happy customers helps us in reaching the heights
                </p>
              </div>
            </div>

            {/* Testimonial Card */}
            <div className="w-[617.57px] h-[536px] bg-white rounded-[16px] p-[40px] shadow-[8px_12px_24px_10px_rgba(0,0,0,0.04)] absolute top-[46px] left-[100px] flex flex-col gap-[24px] z-10">

              {/* Quote Mark (Top Right) */}
              <div className="w-full flex justify-end">
                <div className="w-[80px] h-[68px] opacity-30 rotate-180">
                  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 7.55228 14.017 7V3H19.017C20.6739 3 22.017 4.34315 22.017 6V15C22.017 16.6569 20.6739 18 19.017 18H16.017V21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 7.55228 5.0166 7V3H10.0166C11.6735 3 13.0166 4.34315 13.0166 6V15C13.0166 16.6569 11.6735 18 10.0166 18H7.0166V21H5.0166Z" fill="#FF4A52" />
                  </svg>
                </div>
              </div>

              {/* Content Wrapper */}
              <div className="flex flex-col gap-[20px] w-full">

                {/* Profile & Text */}
                <div className="flex flex-col gap-[24px]">
                  {/* Profile */}
                  <div className="flex items-center gap-[16px]">
                    <div className="w-[56px] h-[56px] rounded-full overflow-hidden shrink-0">
                      <img
                        src={testimonials[currentTestimonial].avatar}
                        alt={testimonials[currentTestimonial].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h4 className="font-inter font-normal text-[20px] leading-[30px] text-[#222222]">
                        {testimonials[currentTestimonial].name}
                      </h4>
                      <p className="font-inter font-normal text-[14px] leading-[24px] text-[#666666]">
                        {testimonials[currentTestimonial].location}
                      </p>
                    </div>
                  </div>

                  {/* Testimonial Text */}
                  <div className="font-inter font-normal text-[18px] leading-[28px] text-[#222222]">
                    &quot;{testimonials[currentTestimonial].text}&quot;
                  </div>
                </div>

                {/* Arrows */}
                <div className="flex justify-end gap-[8px]">
                  <button
                    onClick={() => setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                    className="w-[40px] h-[40px] flex items-center justify-center hover:opacity-70 transition-opacity"
                  >
                    <img src="/figma/yoler/chevron-left.svg" alt="Previous" className="w-[24px] h-[24px]" />
                  </button>
                  <button
                    onClick={() => setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                    className="w-[40px] h-[40px] flex items-center justify-center hover:opacity-70 transition-opacity"
                  >
                    <img src="/figma/yoler/chevron-right.svg" alt="Next" className="w-[24px] h-[24px]" />
                  </button>
                </div>

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
                  {faqsLoading ? (
                    <div className="text-center py-8 text-gray-500">Loading FAQs...</div>
                  ) : faqs.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">No FAQs available.</div>
                  ) : (
                    faqs.map((faq, index) => (
                      <div
                        key={faq.id}
                        className={index === 0 ? "bg-[#9e8afb] rounded-2xl p-6" : "bg-white rounded-lg p-6"}
                      >
                        <div className="flex gap-2.5 items-center justify-center w-full mb-4">
                          <div className={`flex-1 font-medium text-2xl font-inter leading-normal whitespace-pre-wrap ${index === 0 ? 'text-white' : 'text-black'
                            }`}>
                            {faq.question}
                          </div>
                          <button
                            onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                            className="w-8 h-8 shrink-0 flex items-center justify-center"
                            aria-label="Toggle FAQ"
                          >
                            <img
                              src={openFaqIndex === index ? "/figma/yoler/icon-minus.svg" : "/figma/yoler/icon-plus.svg"}
                              alt={openFaqIndex === index ? "Minus" : "Plus"}
                              className="w-full h-full"
                            />
                          </button>
                        </div>
                        {openFaqIndex === index && (
                          <div className={`text-base font-inter leading-[1.6] whitespace-pre-wrap ${index === 0 ? 'text-white' : 'text-black mt-4'
                            }`}>
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA / Download Section */}
      <section className="w-full py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-[100px] bg-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="relative bg-[#9e8afb] rounded-2xl overflow-hidden">
            {/* Content Container */}
            <div className="relative flex flex-col lg:flex-row items-stretch">
              {/* Left Side - Purple Background with Text and Buttons */}
              <div className="flex-1 bg-[#9e8afb] flex flex-col justify-center px-4 sm:px-8 lg:px-14 py-8 sm:py-12 lg:py-16 z-10">
                <div className="flex flex-col gap-4 sm:gap-6 max-w-[526px]">
                  <h2 className="text-2xl sm:text-4xl lg:text-[56px] font-bold text-white font-inter leading-tight lg:leading-normal">
                    {content.downloadCta.title}
                  </h2>

                  {/* App Store Buttons */}
                  <div className="flex flex-row gap-4 sm:gap-6 items-start flex-wrap">
                    {/* Google Play Button */}
                    <a
                      href={content.downloadCta.playStoreUrl}
                      className="hover:opacity-90 transition-opacity"
                    >
                      <img
                        src="/figma/yoler/google-play-badge-official.svg"
                        alt="Get it on Google Play"
                        className="h-[50px] w-auto object-contain"
                      />
                    </a>

                    {/* App Store Button */}
                    <a
                      href={content.downloadCta.appStoreUrl}
                      className="hover:opacity-90 transition-opacity"
                    >
                      <img
                        src="/figma/yoler/app-store-badge-official.svg"
                        alt="Download on the App Store"
                        className="h-[50px] w-auto object-contain"
                      />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Side - Image */}
              <div className="flex-1 relative min-h-[300px] lg:min-h-0">
                <img
                  src="/figma/yoler/cta-image.png"
                  alt="Driving App"
                  className="absolute inset-0 w-full h-full object-cover object-center lg:object-left"
                />
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
                © 2026 DeepDevs. All rights reserved
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
