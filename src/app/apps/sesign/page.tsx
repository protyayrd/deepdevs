'use client';

import { useState, useEffect } from 'react';
import useDownloadLink from '@/hooks/useDownloadLink';
import Navbar from '@/components/Navbar';

interface SeSignContent {
  hero: {
    tag: string;
    title: string;
    subtitle: string;
    leftImage: string;
    rightImage: string;
    bottomLeftImage: string;
    bottomRightImage: string;
    happyClientsCount: string;
    happyClientsLabel: string;
  };
  featuredBrands: Array<{ logoUrl: string; name: string }>;
  about: {
    tag: string;
    title: string;
    subtitle: string;
    cards: Array<{ value: string; suffix: string; label: string }>;
  };
  features: {
    tag: string;
    title: string;
    subtitle: string;
    cards: Array<{ title: string; description: string; icon: string }>;
  };
  workAnywhere: {
    tag: string;
    title: string;
    subtitle: string;
    heroImage: string;
  };
  testimonials: {
    title: string;
    subtitle: string;
    items: Array<{ text: string; userName: string; userLocation: string; userAvatar: string }>;
  };
  integrations: {
    tag: string;
    title: string;
    subtitle: string;
    items: Array<{ name: string; icon: string }>;
  };
  downloadCta: {
    title: string;
    subtitle: string;
    appStoreUrl: string;
    playStoreUrl: string;
  };
}

export default function SeSignPage() {
  const [content, setContent] = useState<SeSignContent | null>(null);

  useEffect(() => {
    fetch('/api/sesign-content')
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch((err) => console.error('Failed to fetch SeSign content', err));
  }, []);

  const downloadLink = useDownloadLink(
    content?.downloadCta?.playStoreUrl || '#',
    content?.downloadCta?.appStoreUrl || '#'
  );

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <main
      className="min-h-screen w-full flex flex-col items-center pt-20"
      style={{
        background: 'linear-gradient(192.87deg, #D8D3FF 45.65%, #FAF9FF 76.87%)'
      }}
    >
      <Navbar />
      <div className="w-full max-w-[1440px] flex flex-col items-center gap-12 px-4 sm:px-8 lg:px-0 py-10">
        {/* Header */}
        <header className="w-full max-w-[1120px] bg-white/80 backdrop-blur-md rounded-[24px] border border-white/60 shadow-[0px_30px_80px_rgba(87,77,164,0.16)] flex items-center justify-between gap-6 px-4 sm:px-8 py-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#171A20] flex items-center justify-center">
              <span className="text-white font-semibold tracking-[0.2em] text-sm">SS</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-[700] text-[20px] leading-[26px] text-[#171A20]" style={{ fontFamily: 'Poppins' }}>SeSign</span>
              <span className="text-xs uppercase tracking-[0.2em] text-[#6652FF]">Digital signing</span>
            </div>
          </div>

          {/* Search box / Nav */}
          <nav className="hidden lg:flex items-center justify-center px-6 py-3 rounded-full bg-white shadow-[0_6px_30px_rgba(0,0,0,0.08)]">
            <ul className="flex items-center gap-10 text-[#171A20] text-sm font-medium font-inter">
              {['Home', 'Feature', 'Solution', 'About Us'].map((item) => (
                <li key={item} className="group relative cursor-pointer hover:text-[#6652FF] transition-colors">
                  {item}
                  <span className="absolute left-1/2 top-full mt-1 h-[3px] w-0 -translate-x-1/2 rounded-full bg-[#6652FF] transition-all duration-200 group-hover:w-3" />
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <a
              href={downloadLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center px-8 py-[14px] text-sm font-semibold text-white bg-[#171A20] rounded-full shadow-[0_10px_40px_rgba(23,26,32,0.25)] transition-transform hover:-translate-y-0.5"
            >
              Download App
            </a>
            <button className="inline-flex lg:hidden items-center justify-center w-11 h-11 rounded-full border border-[#E4E4EB] text-[#171A20]">
              <span className="sr-only">Toggle menu</span>
              <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1H19M1 7H15M1 13H11" stroke="#171A20" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </header>

        {/* Main stacked content wrapper */}
        <section className="w-full max-w-[1440px] flex flex-col items-center gap-14">
          {/* Top row with side images and center content */}
          <div className="w-full flex flex-col xl:flex-row items-center justify-between gap-10">
            {/* Left image placeholder */}
            <div
              className="w-full max-w-[270px] aspect-square rounded-[24px] bg-center bg-cover shadow-[0px_30px_80px_rgba(87,77,164,0.2)]"
              style={{
                backgroundImage: `url(${content?.hero?.leftImage || '/figma/sesign/young-woman-hand-uses-tablet.png'})`
              }}
            />

            {/* Center content */}
            <div className="flex flex-col items-center gap-4 text-center max-w-[680px]">
              {/* Tag */}
              <div className="box-border w-full max-w-[320px] flex flex-row justify-center items-center gap-[10px] p-[12px] rounded-[16px] border border-[#271CEB]/40 bg-white/80 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-[#6652FF]" />
                <span className="font-inter font-medium text-[15px] leading-[19px] text-[#6652FF] tracking-wide">{content?.hero?.tag}</span>
              </div>

              {/* Headline + sub */}
              <div className="flex flex-col items-center gap-5">
                <h1 className="text-center font-roboto font-bold text-[46px] leading-[1.1] md:text-[64px] md:leading-[1.1] text-[#171A20]">
                  {content?.hero?.title}
                </h1>
                <p className="text-center font-roboto text-[18px] leading-[28px] text-[#171A20]/80 max-w-[560px]">
                  {content?.hero?.subtitle}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button className="inline-flex items-center justify-center px-8 py-4 bg-[#6652FF] text-white font-semibold rounded-full shadow-[0px_20px_40px_rgba(102,82,255,0.35)]">
                  Start Free Trial
                </button>
                <button className="inline-flex items-center gap-2 text-[#171A20] font-semibold">
                  Watch Demo
                  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="34" height="34" rx="17" fill="white" />
                    <path d="M15 12L21 17L15 22V12Z" fill="#171A20" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right image placeholder */}
            <div
              className="w-full max-w-[270px] aspect-square rounded-[24px] bg-center bg-cover shadow-[0px_30px_80px_rgba(87,77,164,0.2)]"
              style={{
                backgroundImage: `url(${content?.hero?.rightImage || '/figma/sesign/designer-work-office.png'})`
              }}
            />
          </div>

          {/* Bottom row with two background images and floating card */}
          <div className="relative w-full max-w-[1140px] h-[270px]">
            <div className="absolute inset-0 flex flex-row justify-between items-center">
              {/* Bottom Left Image */}
              <div
                className="w-[270px] h-[270px] rounded-[24px] bg-center bg-cover shadow-[0px_20px_60px_rgba(32,24,95,0.2)]"
                style={{
                  backgroundImage: `url(${content?.hero?.bottomLeftImage || '/figma/sesign/document-verification.png'})`
                }}
              />
              {/* Bottom Right Image */}
              <div
                className="w-[270px] h-[270px] rounded-[24px] bg-center bg-cover shadow-[0px_20px_60px_rgba(32,24,95,0.2)]"
                style={{
                  backgroundImage: `url(${content?.hero?.bottomRightImage || '/figma/sesign/terms-use.png'})`
                }}
              />
            </div>

            {/* Floating card center */}
            <div className="absolute left-1/2 -translate-x-1/2 top-[75px] w-[260px]">
              <div className="bg-white backdrop-blur-lg rounded-[20px] shadow-[0px_25px_60px_rgba(87,77,164,0.18)] px-6 py-5">
                <div className="w-full flex justify-between items-center">
                  <span className="font-inter font-medium text-[16px] text-[#171A20]">{content?.hero?.happyClientsLabel}</span>
                  <span className="font-lato font-bold text-[16px] text-[#01544A]">{content?.hero?.happyClientsCount}</span>
                </div>
                {/* Avatars group */}
                <div className="mt-4 flex flex-row">
                  {[0, 1, 2, 3].map((idx) => (
                    <div key={idx} className={`w-[44px] h-[44px] rounded-full bg-[#FFABE1] border-2 border-white ${idx < 3 ? '-mr-2' : ''}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured logos strip */}
        <section className="w-full max-w-[1440px] bg-white/80 rounded-[32px] border border-white/60 shadow-[0px_20px_80px_rgba(87,77,164,0.12)] px-6 py-12">
          <div className="w-full flex flex-col items-center gap-10">
            <h3 className="font-roboto font-semibold text-[32px] md:text-[40px] leading-tight text-center text-[#171A20]">
              36k+ Installation And Featured On
            </h3>
            <div className="w-full flex flex-wrap justify-center items-center gap-10">
              {content?.featuredBrands?.map((brand, idx) => (
                <div key={idx} className="flex items-center justify-center w-[180px] h-[60px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={brand.logoUrl}
                    alt={brand.name}
                    className="h-[32px] w-auto object-contain opacity-80"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Metrics Section (normal flow, below hero) */}
      <section className="w-full flex justify-center bg-white mt-24">
        <div className="w-full max-w-[1440px] bg-white flex flex-col items-center justify-center px-[15px] py-[56px]">
          {/* Tag + Heading + Subtext */}
          <div className="w-full max-w-[884px] flex flex-col items-center gap-4">
            {/* Tag */}
            <div className="box-border w-[156px] h-[39px] flex flex-row justify-center items-center gap-[10px] p-[10px] rounded-[8px] border-2 border-[#6652FF]">
              <span className="font-roboto font-bold text-[16px] leading-[19px] text-[#6652FF]">{content?.about?.tag}</span>
            </div>
            {/* Title + Sub */}
            <div className="w-full flex flex-col items-center gap-[18px]">
              <h2 className="w-[884px] max-w-full font-roboto font-bold text-[40px] leading-[50px] md:text-[64px] md:leading-[75px] text-center text-[#171A20]">
                {content?.about?.title}
              </h2>
              <p className="w-[884px] max-w-full font-roboto font-normal text-[18px] leading-[28px] text-center text-[#171A20]">
                {content?.about?.subtitle}
              </p>
            </div>
          </div>

          {/* Metrics Cards (4-up) */}
          <div className="mt-10 w-full max-w-[1140px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {content?.about?.cards?.map((card, idx) => (
              <div key={idx} className="box-border w-full min-h-[180px] flex flex-col justify-center items-center gap-[10px] px-[30px] py-[40px] bg-[#F5F5FF] border-[1.5px] border-[#6652FF] rounded-[20px]">
                <div className="flex items-center justify-center">
                  <span className="font-plus-jakarta-sans font-medium text-[48px] leading-[60px] tracking-[-0.02em] text-center text-[#6652FF]">{card.value}</span>
                  {card.suffix && <span className="font-plus-jakarta-sans font-medium text-[48px] leading-[60px] tracking-[-0.02em] text-center text-[#6652FF]">{card.suffix}</span>}
                </div>
                <div className="w-full text-center text-[#171A20] font-plus-jakarta-sans text-[20px] leading-[30px]">{card.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Features Section (Figma 6628:1193) */}
      <section className="w-full flex justify-center bg-white">
        <div className="w-full max-w-[1440px] bg-white flex flex-col items-center justify-center px-4 sm:px-6 lg:px-0 py-12 sm:py-16 lg:py-20">
          {/* Tag */}
          <div className="box-border w-[156px] h-[39px] flex flex-row justify-center items-center gap-[10px] p-[10px] rounded-[8px] border-2 border-[#6652FF]">
            <span className="font-roboto font-bold text-[16px] leading-[19px] text-[#6652FF]">{content?.features?.tag}</span>
          </div>

          {/* Heading + Sub */}
          <div className="mt-4 w-full flex flex-col items-center gap-[18px] px-4">
            <h2 className="w-full max-w-[1032px] font-roboto font-bold text-2xl sm:text-[40px] sm:leading-[50px] md:text-[64px] md:leading-[75px] text-center text-[#171A20]">
              {content?.features?.title}
            </h2>
            <p className="w-full max-w-[1032px] font-roboto font-normal text-base sm:text-[18px] leading-relaxed sm:leading-[28px] text-center text-[#171A20]">
              {content?.features?.subtitle}
            </p>
          </div>

          {/* Cards grid: 2 rows x 3 cols */}
          <div className="mt-8 sm:mt-10 w-full max-w-[1120px] flex flex-col gap-6 sm:gap-8 px-4 lg:px-0">
            {/* We chunk the cards into rows of 3 if possible, but the original code had 2 rows of 3 manually. 
                 Since we have a dynamic list, we can just map and grid them properly. 
                 The simplest way to maintain the 3-col layout is using CSS grid. */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
              {content?.features?.cards?.map((card, idx) => (
                <div key={idx} className="w-full md:w-[352px] box-border flex flex-col items-center gap-6 p-6 md:px-6 md:py-[30px] bg-white border border-[#D6D6D6] rounded-[20px]">
                  {/* We try to render the SVG/Icon. Content provides a URL or svg string. 
                            If it's a URL (starts with /), img. If svg string... that's hard to dynamically render unless we use dangerouslySetInnerHTML 
                            or if the backend provides just the icon name.
                            For now, assuming it's an image URL for simplicity in dynamic content. 
                        */}
                  {card.icon.startsWith('<') ? (
                    <div className="w-[90px] h-[98px]" dangerouslySetInnerHTML={{ __html: card.icon }} />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={card.icon} alt="" className="shrink-0 w-auto h-[98px] object-contain" />
                  )}

                  <div className="flex flex-col items-center gap-4 w-full">
                    <h3 className="font-roboto font-semibold text-[24px] leading-[32px] text-center text-[#171A20]">{card.title}</h3>
                    <p className="font-plus-jakarta-sans font-normal text-[16px] leading-[24px] text-center text-[#808080]">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Work Anywhere Section (Figma 6628:1266) */}
      <section className="w-full flex justify-center" style={{
        background: 'linear-gradient(192.87deg, #D8D3FF 45.65%, #FAF9FF 76.87%)'
      }}>
        <div className="w-full max-w-[1440px] flex flex-col items-center py-12 sm:py-16 px-4 sm:px-6 lg:px-0">
          {/* Top content */}
          <div className="w-full max-w-[1120px] flex flex-col items-center gap-[16px]">
            {/* Tag */}
            <div className="box-border flex flex-row justify-center items-center gap-[10px] p-[10px] rounded-[8px] border-2 border-[#271CEB]">
              <div className="w-6 h-6" />
              <span className="font-roboto font-bold text-[16px] leading-[19px] text-[#6652FF]">{content?.workAnywhere?.tag}</span>
            </div>
            {/* Heading + Sub */}
            <div className="flex flex-col items-center gap-[18px] px-4">
              <h2 className="w-full max-w-[651px] font-roboto font-bold text-3xl sm:text-[48px] md:text-[72px] leading-tight sm:leading-[1.18] text-center text-[#171A20] whitespace-pre-line">
                {content?.workAnywhere?.title}
              </h2>
              <p className="w-full max-w-[651px] font-roboto font-normal text-base sm:text-[18px] leading-relaxed sm:leading-[28px] text-center text-[#171A20]">
                {content?.workAnywhere?.subtitle}
              </p>
            </div>
          </div>

          {/* Image panel */}
          <div className="mt-8 sm:mt-12 w-full max-w-[1120px] aspect-[1120/520] rounded-[12px] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={content?.workAnywhere?.heroImage || "/figma/sesign/work-anywhere-hero.png"} alt="Work Anywhere" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Testimonials Section (Figma 6628:1280) */}
      <section className="w-full flex justify-center bg-white">
        <div className="w-full max-w-[1440px] flex flex-col items-center gap-14 py-[100px] px-[15px]">
          {/* Header */}
          <div className="w-[1120px] max-w-full flex flex-col items-center gap-5">
            <h2 className="w-full text-center font-roboto font-bold text-[48px] leading-[56px] text-[#171A20]">
              {content?.testimonials?.title}
            </h2>
            <p className="w-[900px] max-w-full text-center font-roboto text-[18px] leading-[28px] text-[#171A20]">
              {content?.testimonials?.subtitle}
            </p>
          </div>

          {/* Cards */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {content?.testimonials?.items?.map((item, idx) => (
              <div key={idx} className="w-[352px] box-border flex flex-col gap-6 p-5 bg-white border border-[#D6D6D6] rounded-[20px]">
                <div className="w-12 h-12">
                  <svg viewBox="0 0 48 48" className="w-12 h-12" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 36h-8c-2.2 0-4-1.8-4-4V20c0-6.6 5.4-12 12-12v8c-2.2 0-4 1.8-4 4v4h4v12zm24 0h-8c-2.2 0-4-1.8-4-4V20c0-6.6 5.4-12 12-12v8c-2.2 0-4 1.8-4 4v4h4v12z" fill="#3328BF" />
                  </svg>
                </div>
                <p className="font-roboto text-[16px] leading-[26px] text-[#171A20]">
                  {item.text}
                </p>
                <div className="flex items-center gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.userAvatar} alt={item.userName} className="w-[54px] h-[54px] rounded-full object-cover" />
                  <div className="flex flex-col">
                    <span className="font-roboto font-medium text-[16px] leading-[24px] text-[#171A20]">{item.userName}</span>
                    <span className="font-roboto text-[12px] leading-[18px] text-[#808080]">{item.userLocation}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section (Figma 6628:1374) */}
      <section className="w-full flex justify-center bg-white">
        <div className="w-full max-w-[1120px] flex flex-col items-center gap-8 sm:gap-14 py-12 sm:py-[80px] px-4 sm:px-[15px]">
          {/* Tag */}
          <div className="flex items-center gap-2 px-3 sm:px-5 py-2 rounded-lg border-2 border-[#271CEB]">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#271CEB]" />
            <span className="font-inter font-medium text-base sm:text-lg md:text-[24px] leading-tight sm:leading-[29px] text-[#271CEB]">{content?.integrations?.tag}</span>
          </div>
          {/* Heading + Sub */}
          <div className="w-full flex flex-col items-center gap-4">
            <h2 className="w-full text-center font-roboto font-bold text-2xl sm:text-[36px] md:text-[48px] leading-tight sm:leading-[1.2] md:leading-[56px] text-[#171A20] whitespace-pre-line">
              {content?.integrations?.title}
            </h2>
            <p className="w-full max-w-[509px] text-center font-inter font-medium text-sm sm:text-base md:text-[18px] leading-relaxed sm:leading-[22px] text-[#171A20]">
              {content?.integrations?.subtitle}
            </p>
          </div>
          {/* Icons row */}
          <div className="w-full grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 sm:gap-6">
            {content?.integrations?.items?.map((item, idx) => (
              <div key={idx} className="w-full aspect-square max-w-[144px] mx-auto bg-white border border-[#D6D6D6] rounded-[15px] flex items-center justify-center p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.icon} alt={item.name} className="w-full h-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section (Figma 6628:1446) */}
      <section className="w-full flex justify-center" style={{
        background: 'linear-gradient(189deg, #D8D3FF 45%, #FAF9FF 82%)'
      }}>
        <div className="w-full max-w-[1140px] h-[578px] rounded-[16px] relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-15">
            <svg width="1294" height="275" viewBox="0 0 1294 275" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0">
              <path d="M0 0H1294V275H0V0Z" fill="rgba(255, 255, 255, 0.15)" />
            </svg>
          </div>
          <div className="absolute -top-[166px] -left-[205px] opacity-24">
            <svg width="1957" height="1524" viewBox="0 0 1957 1524" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0H1957V1524H0V0Z" fill="rgba(255, 255, 255, 0.24)" />
            </svg>
          </div>

          {/* Phone mockups */}
          <div className="absolute left-[44px] top-[70px] w-[167px] h-[438px]">
            <div className="relative w-full h-full">
              <div className="absolute top-0 left-0 w-[167px] h-[167px] rounded-[8px] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/figma/sesign/download-section/phone-left.png" alt="Phone mockup left" className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-[203px] left-[2px] w-[165px] h-[165px] rounded-[8px] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/figma/sesign/download-section/phone-left.png" alt="Phone mockup left bottom" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <div className="absolute right-[44px] top-[71px] w-[167px] h-[438px]">
            <div className="relative w-full h-full">
              <div className="absolute top-[202px] left-[1px] w-[167px] h-[167px] rounded-[8px] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/figma/sesign/download-section/phone-right.png" alt="Phone mockup right top" className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-0 left-0 w-[165px] h-[165px] rounded-[8px] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/figma/sesign/download-section/phone-right.png" alt="Phone mockup right bottom" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-10 w-[683px]">
            {/* Text content */}
            <div className="flex flex-col items-center gap-[17px] w-full">
              <h2 className="w-[558px] text-center font-roboto font-bold text-[48px] leading-[60px] tracking-[-0.02em] text-[#171A20]">
                {content?.downloadCta?.title}
              </h2>
              <p className="w-full text-center font-roboto font-medium text-[18px] leading-[28px] text-[#171A20]">
                {content?.downloadCta?.subtitle}
              </p>
            </div>

            {/* App store badges */}
            <div className="flex items-center gap-6">
              {/* Google Play Badge */}
              <a href={content?.downloadCta?.playStoreUrl || '#'} className="w-[182px] h-[50px] bg-black rounded-[6px] flex items-center justify-center transform hover:scale-105 transition-transform">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/figma/sesign/download-section/google-play-badge.png" alt="Get it on Google Play" className="w-[182px] h-[50px] object-contain" />
              </a>

              {/* App Store Badge */}
              <a href={content?.downloadCta?.appStoreUrl || '#'} className="w-[180px] h-[52px] transform hover:scale-105 transition-transform">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/figma/sesign/download-section/app-store-badge.png" alt="Download on the App Store" className="w-[180px] h-[52px] object-contain" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
