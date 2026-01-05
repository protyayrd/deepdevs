'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import useDownloadLink from '@/hooks/useDownloadLink';

interface FAQ {
  id: string;
  page: string;
  question: string;
  answer: string;
}

interface ZtaxHero {
  title: string;
  subtitle: string;
  appStoreUrl: string;
  playStoreUrl: string;
  heroImage: string;
  logo: string;
}

interface ZtaxStat {
  id: string;
  number: string;
  text: string;
  backgroundColor: string;
}

interface ZtaxFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface ZtaxPowerfulFeatures {
  title: string;
  subtitle: string;
  phoneImage: string;
  steps: {
    id: string;
    title: string;
    description: string;
  }[];
}

interface ZtaxTestimonial {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string;
  avatar: string;
}

interface ZtaxPricing {
  title: string;
  subtitle: string;
  description: string;
  plans: {
    id: string;
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
  }[];
}

interface ZtaxContentData {
  hero: ZtaxHero;
  stats: ZtaxStat[];
  features: ZtaxFeature[];
  powerfulFeatures: ZtaxPowerfulFeatures;
  testimonials: ZtaxTestimonial[];
  pricing: ZtaxPricing;
}

const DEFAULT_CONTENT: ZtaxContentData = {
  hero: {
    title: "Simplify Your Tax Management with Z Tax",
    subtitle: "Track income, expenses, and invoices all in one place",
    appStoreUrl: "#",
    playStoreUrl: "#",
    heroImage: "/figma/ztax/Group1000004452.png",
    logo: "/figma/ztax/ztax-logo.png"
  },
  stats: [
    { id: '1', number: "5", text: "Trusted by users for over 5 years", backgroundColor: "#92C9E6" },
    { id: '2', number: "4.8", text: "Reviewed by 6,000+ Our users", backgroundColor: "#21C293" },
    { id: '3', number: "10k", text: "Installed over 10k times worldwide", backgroundColor: "#92C9E6" },
    { id: '4', number: "12", text: "12 languages supported", backgroundColor: "#23C294" }
  ],
  features: [
    { id: '1', title: "Income", description: "Track your income and keep it organized for tax filing", icon: "/figma/ztax/features/income-icon.png" },
    { id: '2', title: "Profit & Loss", description: "Get real-time insights into your financial performance", icon: "/figma/ztax/features/profit-loss-icon.png" },
    { id: '3', title: "Expenses", description: "Record and categorize your business expenses effortlessly", icon: "/figma/ztax/features/expenses-icon.png" },
    { id: '4', title: "Tax", description: "It makes e-commerce operations easier for sellers and buyers", icon: "/figma/ztax/features/tax-icon.png" },
    { id: '5', title: "Deposit", description: "Easily record incoming funds, track deposits, and manage cash flow in real-time.", icon: "/figma/ztax/features/deposit-icon.png" },
    { id: '6', title: "Invoice", description: "Create professional invoices, send them instantly, and keep track of payments", icon: "/figma/ztax/features/invoice-icon.png" }
  ],
  powerfulFeatures: {
    title: "Powerful Features to Simplify Your Tax Management",
    subtitle: "Track your income, manage expenses, generate reports, and file taxes—all from one app",
    phoneImage: "/figma/ztax/phone-mockup.png",
    steps: [
      { id: '1', title: "Add Your Transactions", description: "Start by adding your income, expenses, deposits, and other financial transactions into the app" },
      { id: '2', title: "Organize Expenses and Income", description: "Monitor your business's income and expenses in real-time to keep a clear picture of your finances" },
      { id: '3', title: "Generate Reports", description: "Use the data you've entered to generate detailed financial reports with just a few clicks" },
      { id: '4', title: "File Your Taxes", description: "Once your financial data is organized, use the app's tax calculation tools to file your taxes quickly and accurately" }
    ]
  },
  testimonials: [
    {
      id: '1',
      quote: "As a small business owner, keeping track of my expenses, income, and taxes was always a headache. But since I started using Z Tax, it's been smooth sailing. The app is super intuitive, and I love how easy it is to generate reports and file taxes I can add transactions in just a few clicks, and the real-time tracking of my cash",
      authorName: "Artemisia Udinese",
      authorRole: "Customer",
      avatar: "/figma/ztax/testimonial-image.png"
    }
  ],
  pricing: {
    title: "Our Range of Service Level Options",
    subtitle: "Pricing Table",
    description: "Ideal for individuals and small businesses, our Basic Service Level offers essential support and features at an affordable price. Enjoy reliable access to our core services.",
    plans: [
      {
        id: '1',
        name: "Free Plan",
        price: "0",
        period: "/ month",
        description: "Access to basic features without any subscription fee.",
        features: ["Limited Features", "Basic Support", "Trial for Premium Features", "Community Access", "No Commitment"]
      },
      {
        id: '2',
        name: "Exclusive Plan",
        price: "20",
        period: "/ month",
        description: "Access to basic features without any subscription fee.",
        features: ["Premium Features", "Custom Integrations", "Personalised Onboarding", "Dedicated Account Manager", "Higher API Limits"]
      }
    ]
  }
};

export default function ZTaxPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(1); // Default second FAQ open
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [faqsLoading, setFaqsLoading] = useState(true);
  const [content, setContent] = useState<ZtaxContentData | null>(null);

  useEffect(() => {
    fetchFAQs();
    fetchContent();
  }, []);

  const fetchFAQs = async () => {
    try {
      const response = await fetch('/api/faqs?page=ztax');
      const data = await response.json();
      setFaqs(data);
      // Set default open index to 1 if we have at least 2 FAQs
      if (data.length >= 2) {
        setOpenFaqIndex(1);
      } else if (data.length > 0) {
        setOpenFaqIndex(0);
      }
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    } finally {
      setFaqsLoading(false);
    }
  };

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/ztax-content');
      if (res.ok) {
        const data = await res.json();
        setContent(data);
      }
    } catch (error) {
      console.error('Error fetching Ztax content:', error);
    }
  };

  const displayContent: ZtaxContentData = {
    hero: content?.hero || DEFAULT_CONTENT.hero,
    stats: content?.stats || DEFAULT_CONTENT.stats,
    features: content?.features || DEFAULT_CONTENT.features,
    powerfulFeatures: content?.powerfulFeatures || DEFAULT_CONTENT.powerfulFeatures,
    testimonials: content?.testimonials || DEFAULT_CONTENT.testimonials,
    pricing: content?.pricing || DEFAULT_CONTENT.pricing,
  };
  const downloadLink = useDownloadLink(displayContent.hero.playStoreUrl, displayContent.hero.appStoreUrl);

  return (
    <main className="min-h-screen w-full relative bg-white">
      {/* Global Header from Homepage */}
      <Navbar />

      {/* Hero Section - Full Width Background */}
      <section
        className="relative w-full pt-20 sm:pt-24 md:pt-28 lg:pt-[96px] pb-24 sm:pb-32 md:pb-40 lg:pb-[244px]"
        style={{
          background: 'linear-gradient(0deg, #F1F0FF, #F1F0FF)'
        }}
      >
        {/* Main Container */}
        <div className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Navigation */}
          <header className="relative w-full max-w-[1120px] mx-auto mb-6 sm:mb-8 md:mb-10 lg:mb-12">
            <div className="flex flex-row justify-between items-center gap-4 sm:gap-6 lg:gap-[141px]">
              {/* Logo */}
              <div className="flex flex-row items-center gap-2 sm:gap-[10px] flex-shrink-0">
                <Image
                  src="/figma/ztax/ztax-logo.png"
                  alt="Z Tax Logo"
                  width={120}
                  height={50}
                  className="h-8 w-auto sm:h-10 md:h-12 lg:h-[41.51px] object-contain"
                />
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex flex-row items-center">
                <ul className="flex flex-row items-center gap-0">
                  {['Home', 'Features', 'Testimonials', 'Pricing'].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="px-4 sm:px-6 py-2 sm:py-4 text-sm sm:text-base md:text-[18px] leading-[76px] text-[#24222E] font-montserrat font-medium hover:opacity-70 transition-opacity"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden flex flex-col items-center justify-center w-10 h-10 gap-1.5"
                aria-label="Toggle menu"
              >
                <span
                  className={`block w-6 h-0.5 bg-[#24222E] transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''
                    }`}
                />
                <span
                  className={`block w-6 h-0.5 bg-[#24222E] transition-all ${isMenuOpen ? 'opacity-0' : ''
                    }`}
                />
                <span
                  className={`block w-6 h-0.5 bg-[#24222E] transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                    }`}
                />
              </button>

              {/* Desktop Download App Button */}
              <div className="hidden lg:flex flex-row items-center">
                <a
                  href={downloadLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="box-border flex items-center justify-center px-6 sm:px-[27px] py-3 sm:py-[17.2px] border-2 border-[#24222E] rounded-[10px] hover:bg-[#24222E] hover:text-white transition-colors"
                >
                  <span className="text-sm sm:text-base md:text-[18px] leading-[18px] text-[#24222E] font-roboto font-medium group-hover:text-white">
                    Download App
                  </span>
                </a>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="lg:hidden mt-4 bg-white rounded-lg shadow-lg p-4 border border-gray-200">
                <nav className="flex flex-col gap-2">
                  {['Home', 'Features', 'Testimonials', 'Pricing'].map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="px-4 py-3 text-base text-[#24222E] font-montserrat font-medium hover:bg-gray-50 rounded transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </a>
                  ))}
                  <a
                    href={downloadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 px-4 py-3 text-base text-[#24222E] font-roboto font-medium border-2 border-[#24222E] rounded-[10px] text-center hover:bg-[#24222E] hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Download App
                  </a>
                </nav>
              </div>
            )}
          </header>

          {/* Decorative Ellipse - Hidden on mobile, visible on larger screens */}
          <div className="hidden xl:block absolute w-[10px] h-[10px] right-[10%] top-[102px] bg-white rounded-full" />

          {/* Hero Content */}
          <div className="relative w-full max-w-[1120px] mx-auto">
            <div className="flex flex-col lg:flex-row items-center lg:items-center gap-8 sm:gap-10 lg:gap-[33px]">
              {/* Left Content */}
              <div className="flex flex-col items-start gap-6 sm:gap-8 md:gap-[40px] w-full lg:w-[632px] flex-shrink-0">
                <div className="flex flex-col items-start gap-4 sm:gap-6 md:gap-[16px] w-full">
                  {/* Main Heading */}
                  <h1 className="w-full text-3xl sm:text-4xl md:text-5xl lg:text-[62px] leading-tight sm:leading-[1.2] lg:leading-[75px] text-[#24222E] font-inter font-bold">
                    {displayContent.hero.title}
                  </h1>

                  {/* Subtitle */}
                  <p className="w-full max-w-[409px] text-base sm:text-lg md:text-[18px] leading-6 sm:leading-7 md:leading-[22px] text-[#24222E] font-inter">
                    {displayContent.hero.subtitle}
                  </p>
                </div>

                {/* App Store Badges */}
                <div className="flex flex-row items-center gap-4 sm:gap-6 md:gap-[24px] w-full max-w-[386px]">
                  {/* Google Play Badge */}
                  <a
                    href={displayContent.hero.playStoreUrl}
                    className="relative w-[140px] sm:w-[160px] md:w-[182px] h-[40px] sm:h-[46px] md:h-[52px] bg-black rounded-[8px] flex items-center justify-center overflow-hidden hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src="/figma/shared/google-play-badge.png"
                      alt="Get it on Google Play"
                      fill
                      className="object-contain"
                    />
                  </a>

                  {/* App Store Badge */}
                  <a
                    href={displayContent.hero.appStoreUrl}
                    className="relative w-[140px] sm:w-[160px] md:w-[180px] h-[40px] sm:h-[46px] md:h-[52px] flex items-center justify-center hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src="/figma/shared/appstore-badge.png"
                      alt="Download on the App Store"
                      fill
                      className="object-contain"
                    />
                  </a>
                </div>
              </div>

              {/* Right Image */}
              <div className="relative w-full lg:w-[455px] h-[300px] sm:h-[350px] md:h-[400px] lg:h-[426px] flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={displayContent.hero.heroImage}
                  alt="Z Tax App Mockups"
                  className="w-full h-full object-contain"
                  style={{
                    filter: 'drop-shadow(0px 0px 250px rgba(241, 240, 255, 0.2))'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container for other sections */}
      <div className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Section - Floating 50% under hero */}
        <section className="relative w-full max-w-[952px] mx-auto -mt-4 sm:-mt-6 md:-mt-8 lg:-mt-[100px] mb-4 sm:mb-6 md:mb-8 px-4 sm:px-6 lg:px-0">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-[24px]">
            {displayContent.stats.map((stat) => (
              <div key={stat.id} className="relative w-full h-[150px] sm:h-[170px] md:h-[188px] rounded-[20px] sm:rounded-[24px] flex flex-col justify-center items-center gap-3 sm:gap-4 md:gap-[16px] p-4 sm:p-6" style={{ backgroundColor: stat.backgroundColor }}>
                {/* Star Icon with Number */}
                <div className="w-[60px] sm:w-[75px] md:w-[92.98px] h-[55px] sm:h-[70px] md:h-[84px] flex items-center justify-center relative">
                  <svg width="100%" height="100%" viewBox="0 0 93 84" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
                    <path d="M56.1101 0.31161C59.7576 0.186271 63.5206 1.43765 66.2111 3.9417C67.4029 5.0508 68.0614 6.12696 68.5934 7.652C65.8363 5.52514 62.793 3.91943 59.7011 2.3508L59.6369 2.49272C61.5928 3.4683 63.4063 4.83388 65.2459 6.01157C66.9828 7.12351 68.799 8.12267 70.4397 9.37641C75.366 13.1408 79.342 18.942 81.4633 24.7346C82.1518 26.6147 82.5299 28.4809 82.8445 30.4523C83.9896 37.6274 83.2732 44.9437 80.2002 51.5761C77.6445 57.1082 73.9055 62.0118 69.2474 65.9408C68.5084 66.5581 67.6666 67.0672 66.8931 67.6429C64.5684 69.3733 62.0401 70.9872 59.3092 71.9903C61.3434 72.8743 70.9393 73.0159 73.3583 72.6509C72.1555 72.4777 70.8952 72.4922 69.6796 72.4441C67.6007 72.3769 65.5231 72.2691 63.4481 72.1209C62.5543 72.0518 61.6014 72.0262 60.725 71.8314C63.0433 70.6524 64.4819 69.5368 67.1835 69.1138C70.8586 68.5384 76.6432 69.5745 79.6823 71.777C78.4912 73.1503 76.2652 74.2297 74.5615 74.8301C70.7398 76.1769 66.1909 76.0641 62.5382 74.2357C61.3466 73.6393 60.3019 72.7654 59.104 72.2033L59.0206 72.1647C57.9881 72.4823 56.9666 72.9066 55.9574 73.2953C53.2589 74.3346 50.4658 75.4426 48.0382 77.0316C49.6747 78.1078 52.1226 80.3128 52.8034 82.1454C52.95 82.5399 53.2022 83.2134 52.9762 83.604C52.8726 83.783 52.6373 83.9266 52.4354 83.9635C52.301 83.9882 52.1131 83.987 51.9945 83.9083C51.733 83.7348 51.2584 82.1119 50.9466 81.642C50.0158 80.2397 48.0736 78.7296 46.7019 77.728C45.1678 78.6023 43.1686 80.3652 42.2705 81.8529C41.88 82.4999 41.6598 83.2107 41.2924 83.8614C41.1454 83.9477 41.0286 84.0158 40.8484 83.9968C40.5101 83.9613 40.3252 83.6993 40.1506 83.4398C40.458 80.7205 43.2422 78.562 45.2364 76.9665C44.3725 76.5782 43.5657 76.0646 42.7006 75.6705C40.1675 74.5165 37.5644 73.4868 34.9696 72.4784C33.8553 72.9017 32.8095 73.4829 31.7213 73.9657C29.4479 74.9501 27.0152 75.5155 24.5407 75.6344C21.3717 75.7719 18.4186 75.0029 15.6243 73.5429C14.8863 73.1572 14.1021 72.733 13.4855 72.1686C14.7479 71.163 16.3899 70.366 17.9225 69.875C21.4257 68.7527 25.4843 68.8069 28.9454 70.0324C30.3751 70.5386 31.7201 71.2473 33.0642 71.9437C30.4964 72.0819 27.9353 72.2297 25.3647 72.3093C23.8375 72.3566 22.2099 72.2216 20.7042 72.4802C22.2807 72.55 23.8564 72.7117 25.4349 72.7847C27.4248 72.8755 29.4184 72.8443 31.4044 72.6911C32.4112 72.6153 33.5536 72.5413 34.5105 72.215C32.7416 71.354 30.9375 70.4437 29.2534 69.427C22.8978 65.5899 17.7173 60.3463 14.1346 53.8391C9.67166 45.8846 8.57583 36.4758 11.091 27.7087C12.982 21.2279 15.995 15.3829 21.1754 10.9285C23.331 9.07491 25.6866 7.5263 28.0758 5.9983C30.0917 4.70878 31.9982 3.35493 34.104 2.20022L34.0136 2.10367C31.4709 3.41274 28.9904 4.69196 26.6445 6.34032C26.0568 6.75318 25.434 7.16083 24.9073 7.65093C25.4891 5.39341 27.3798 3.45409 29.3361 2.29441C31.5826 0.962709 34.3952 0.133553 37.0209 0.363973C34.6517 3.90047 32.0909 7.06072 27.6867 7.94307C26.8422 8.11236 25.939 8.23012 25.0776 8.25405C23.9329 9.0325 22.8737 10.0003 21.8659 10.9464C16.1655 16.2977 12.7099 23.2566 11.253 30.8981C10.0346 37.2884 10.9806 44.4078 13.5684 50.354C14.5213 52.5435 15.7925 54.7004 17.1358 56.6728C18.3524 58.4592 19.7834 60.0483 21.3045 61.5788C24.5508 64.8448 27.8985 67.4868 32.0085 69.592C32.7881 69.9912 33.5757 70.4074 34.3876 70.7377C31.1889 68.4314 28.7998 65.5952 28.1388 61.595C27.6782 58.8074 28.139 55.067 29.8505 52.7378C29.8882 52.6866 29.9287 52.6374 29.9688 52.588C34.1469 56.864 36.3523 63.0389 36.282 68.9858C36.2721 69.8252 36.1684 70.6219 36.0175 71.4454C38.5086 72.3799 40.9994 73.2845 43.4043 74.4305C44.4985 74.9519 45.5313 75.5876 46.6079 76.1417C48.4469 75.111 50.3357 74.1267 52.268 73.2828C53.8714 72.5824 55.5075 71.98 57.1286 71.3251C57.1036 64.8921 56.7136 62.5606 59.898 56.5908C60.6254 55.2273 61.6745 53.4478 62.7461 52.3555C62.8138 52.2857 62.8835 52.2178 62.9552 52.1522C64.9369 55.0865 65.687 58.6818 65.0439 62.1637C64.4014 65.501 62.325 68.2445 59.9159 70.5382C60.9101 69.9404 61.9489 69.4344 62.9457 68.8455C64.4725 67.9232 65.9498 66.9216 67.3717 65.8445C74.2918 60.5379 79.2333 53.0645 81.4058 44.6189C83.233 37.3227 82.1357 28.2585 79.0743 21.4255C78.3851 19.8876 77.4497 18.4178 76.5825 16.974C74.4126 13.3611 71.5321 10.6648 68.2142 8.11805C65.2285 8.3307 62.5332 7.25785 60.2792 5.31214C59.0417 4.24379 58.0385 2.88568 57.052 1.59035C56.7364 1.17595 56.3724 0.758826 56.1101 0.31161Z" fill="white" fillOpacity="0.2" />
                  </svg>
                  <span className="absolute text-xl sm:text-2xl md:text-[32px] font-bold text-white font-inter">{stat.number}</span>
                </div>
                {/* Text */}
                <p className="text-xs sm:text-sm md:text-[16px] leading-[15px] sm:leading-[17px] md:leading-[19px] font-inter font-semibold text-white text-center max-w-[174px]">
                  {stat.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="relative w-full max-w-[1440px] mx-auto py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-[100px]">
          <div className="flex flex-col items-center gap-8 sm:gap-12 md:gap-[48px] w-full">
            {/* Title */}
            <h2 className="w-full max-w-[1240px] text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-tight sm:leading-[1.2] lg:leading-[68px] font-inter font-medium text-[#171A20] text-center">
              Discover <span className="text-[#21C293]">Z-Tax</span> App Feature
            </h2>

            {/* Features Grid */}
            <div className="w-full max-w-[1240px] grid grid-cols-2 md:grid-cols-2 gap-3 sm:gap-8 md:gap-[31px]">
              {displayContent.features.map((feature) => (
                <div key={feature.id} className="box-border flex flex-col md:flex-row justify-center md:justify-start items-center p-3 sm:p-4 gap-3 sm:gap-4 bg-white border border-[#F2EEEE] rounded-xl hover:shadow-xl hover:border-[#21C293] hover:-translate-y-1 transition-all duration-300 group cursor-pointer h-full">
                  {/* Icon Container */}
                  <div className="relative flex-shrink-0 w-[60px] h-[60px] sm:w-[90px] sm:h-[90px] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <div className="absolute inset-0 bg-[#E9F2F3] rounded-full" />
                    <div className="relative z-10 w-[24px] h-[24px] sm:w-[44px] sm:h-[44px] flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={feature.icon}
                        alt={feature.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  {/* Content */}
                  <div className="flex flex-col items-center md:items-start gap-1 sm:gap-2 flex-1 min-w-0">
                    <h3 className="w-full text-sm sm:text-2xl md:text-[32px] leading-[140%] font-inter font-medium text-black text-center md:text-left">
                      {feature.title}
                    </h3>
                    <p className="w-full text-xs sm:text-base md:text-[16px] leading-[130%] font-nunito text-[#404040] text-center md:text-left line-clamp-2 md:line-clamp-none">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Powerful Features Section */}
        <section className="relative w-full max-w-[1140px] mx-auto py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-0">
          <div className="flex flex-col gap-12 sm:gap-14 md:gap-16 lg:gap-[56px]">
            {/* Header */}
            <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-[16px] w-full">
              <div className="w-full max-w-[1120px] flex flex-col items-center gap-4 sm:gap-6 md:gap-[16px] pb-6 sm:pb-8 border-b border-[#D6D6D6]">
                <h2 className="w-full text-3xl sm:text-4xl md:text-5xl lg:text-[64px] leading-tight sm:leading-[1.2] lg:leading-[74px] text-center text-[#0D0D0D] font-open-sans font-semibold">
                  {displayContent.powerfulFeatures.title}
                </h2>
                <p className="w-full max-w-[674px] text-base sm:text-lg leading-6 sm:leading-[24px] text-center text-[#393C41] font-open-sans">
                  {displayContent.powerfulFeatures.subtitle}
                </p>
              </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col lg:flex-row items-start justify-between gap-8 sm:gap-12 lg:gap-[151px] w-full">
              {/* Left Side - Timeline and Features */}
              <div className="flex flex-row gap-6 sm:gap-8 lg:gap-8 w-full lg:w-auto">
                {/* Timeline SVG */}
                <div className="flex-shrink-0 w-[46px] h-auto">
                  <svg width="46" height="580" viewBox="0 0 46 580" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Vertical lines connecting steps */}
                    <line x1="23" y1="46" x2="23" y2="194" stroke="#000000" strokeWidth="2" />
                    <line x1="22" y1="212" x2="22" y2="364" stroke="#000000" strokeWidth="1" />
                    <line x1="23" y1="410" x2="23" y2="534" stroke="#000000" strokeWidth="2" />

                    {displayContent.powerfulFeatures.steps.map((step, index) => (
                      <g key={step.id + '-circle'}>
                        <circle cx="23" cy={23 + (index * 167)} r="23" fill="#E3F5F8" />
                        <circle cx="23" cy={23 + (index * 167)} r="13" fill="#1B4DFF" />
                        <circle cx="23" cy={23 + (index * 167)} r="6" fill="#FFFFFF" />
                      </g>
                    ))}
                  </svg>
                </div>

                {/* Feature Cards */}
                <div className="flex flex-col gap-10 sm:gap-12 md:gap-14 lg:gap-[54px] flex-1 max-w-[305px]">
                  {displayContent.powerfulFeatures.steps.map((step) => (
                    <div key={step.id} className="flex flex-col gap-3 sm:gap-4 md:gap-[12px]">
                      <h3 className="text-xl sm:text-2xl md:text-[24px] leading-tight sm:leading-[1.3] md:leading-[32px] text-[#171A20] font-open-sans font-semibold">
                        {step.title}
                      </h3>
                      <p className="text-sm sm:text-base md:text-[16px] leading-5 sm:leading-6 md:leading-[24px] text-[#393C41] font-open-sans">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side - Phone Mockup */}
              <div className="relative flex-shrink-0 w-full lg:w-auto flex items-center justify-center lg:justify-end">
                {/* Decorative Ellipse */}
                <div className="hidden lg:block absolute -right-[200px] -top-[20px] w-[655px] h-[655px] bg-[#F2F1FF] rounded-full -z-10" />

                {/* Phone Image */}
                <div className="relative w-full max-w-[336px] h-auto lg:w-[336px] lg:h-[672px]">
                  <Image
                    src={displayContent.powerfulFeatures.phoneImage}
                    alt="Z Tax App Phone Mockup"
                    width={336}
                    height={672}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Testimonials Section */}
        <section className="relative w-full max-w-[1440px] mx-auto py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-[160px]">
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 md:gap-16 lg:gap-[100px] w-full">
            {/* Left Side - Title */}
            <div className="flex-shrink-0 w-full lg:w-auto">
              <h2 className="text-4xl sm:text-5xl md:text-[56px] leading-tight sm:leading-[1.2] md:leading-[66px] text-[#2E2222] font-open-sans font-semibold text-left">
                What Our<br />Client Says
              </h2>
            </div>

            {/* Right Side - Testimonial Card */}
            <div className="flex flex-col lg:flex-row items-start gap-6 sm:gap-8 lg:gap-8 w-full lg:w-auto flex-1">
              {displayContent.testimonials.length > 0 && (
                <>
                  {/* Testimonial Image */}
                  <div className="flex-shrink-0 w-full max-w-[367px] h-[365px] relative bg-[#F2F1FF] rounded-lg overflow-hidden">
                    <Image
                      src={displayContent.testimonials[0].avatar}
                      alt="Testimonial"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Testimonial Content */}
                  <div className="flex flex-col justify-center gap-4 sm:gap-6 w-full max-w-[312px]">
                    {/* Quote and Text */}
                    <div className="flex flex-col justify-center gap-6 sm:gap-8 w-full">
                      {/* Quotation Marks */}
                      <div className="flex justify-end w-full h-[37px]">
                        <span className="text-[132px] leading-[142px] tracking-[-0.17em] text-[#E3F5F8] font-plus-jakarta-sans font-extrabold text-right" style={{ lineHeight: '142px' }}>
                          ,,
                        </span>
                      </div>

                      {/* Testimonial Text */}
                      <p className="w-full text-sm sm:text-base md:text-[16px] leading-5 sm:leading-6 md:leading-[24px] text-[#393C41] font-open-sans">
                        {displayContent.testimonials[0].quote}
                      </p>
                    </div>

                    {/* Author Info */}
                    <div className="flex flex-row items-center gap-4 sm:gap-5 w-full">
                      {/* Avatar */}
                      <div className="flex-shrink-0 w-16 h-16 sm:w-[81px] sm:h-[81px] rounded-full overflow-hidden bg-[#F2F1FF] relative">
                        <Image
                          src={displayContent.testimonials[0].avatar}
                          alt={displayContent.testimonials[0].authorName}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Author Details */}
                      <div className="flex flex-col gap-2 w-[138px]">
                        <p className="text-xs sm:text-sm md:text-[12px] leading-4 sm:leading-5 md:leading-[18px] text-[#21C293] font-open-sans">
                          {displayContent.testimonials[0].authorRole}
                        </p>
                        <p className="text-sm sm:text-base md:text-[16px] leading-5 sm:leading-6 md:leading-[24px] text-[#0D0D0D] font-open-sans">
                          {displayContent.testimonials[0].authorName}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
        {/* Pricing Table Section */}
        <section className="relative w-full max-w-[1440px] mx-auto py-8 sm:py-10 md:py-12 lg:py-14 px-4 sm:px-6 lg:px-[15px]">
          <div className="flex flex-col items-center gap-8 sm:gap-12 md:gap-16 lg:gap-[50px] w-full">
            {/* Header Container */}
            <div className="flex flex-col items-center gap-4 sm:gap-5 md:gap-[20px] w-full max-w-[1120px]">
              {/* Title Container */}
              <div className="flex flex-col items-center gap-1 sm:gap-2 md:gap-1 w-full">
                <h3 className="text-sm sm:text-base md:text-[14px] leading-5 sm:leading-6 md:leading-[20px] text-[#3328BF] font-plus-jakarta-sans font-medium">
                  {displayContent.pricing.subtitle}
                </h3>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] leading-tight sm:leading-[1.2] md:leading-[60px] tracking-[-0.02em] text-[#0D0D0D] font-plus-jakarta-sans font-medium text-center">
                  {displayContent.pricing.title}
                </h2>
              </div>

              {/* Description */}
              <p className="w-full max-w-[742px] text-sm sm:text-base md:text-[16px] leading-5 sm:leading-6 md:leading-[24px] text-center text-[#808080] font-plus-jakarta-sans">
                {displayContent.pricing.description}
              </p>
            </div>

            {/* Plans Container */}
            <div className="flex flex-row overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none items-stretch lg:items-center lg:justify-center gap-4 sm:gap-8 md:gap-[32px] w-full max-w-[1120px] pb-6 lg:pb-0 px-4 sm:px-0 scrollbar-hide">
              {displayContent.pricing.plans.map((plan) => (
                <div key={plan.id} className={`w-[85vw] sm:w-[450px] lg:w-[576px] flex-shrink-0 snap-center flex flex-col gap-6 sm:gap-8 p-6 sm:p-8 rounded-[20px] ${plan.price === '0' ? 'bg-[#F9F9FB]' : 'bg-white border border-[#D6D6D6]'}`}>
                  {/* Plan Header */}
                  <div className="flex flex-row justify-between items-center gap-2 sm:gap-[10px] pb-6 sm:pb-8 border-b border-[#D6D6D6]">
                    {/* Plan Info */}
                    <div className="flex flex-col gap-2 sm:gap-3 md:gap-2 flex-1">
                      <h3 className="text-xl sm:text-2xl md:text-[24px] leading-tight sm:leading-[1.3] md:leading-[32px] text-[#0D0D0D] font-plus-jakarta-sans font-medium">
                        {plan.name}
                      </h3>
                      <p className="text-xs sm:text-sm md:text-[14px] leading-4 sm:leading-5 md:leading-[20px] text-[#808080] font-plus-jakarta-sans max-w-[282px]">
                        {plan.description}
                      </p>
                    </div>

                    {/* Price Container */}
                    <div className="flex flex-row items-end gap-1 sm:gap-2">
                      <span className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] leading-tight sm:leading-[1.2] md:leading-[60px] text-[#0D0D0D] font-plus-jakarta-sans font-medium">
                        ${plan.price}
                      </span>
                      <span className="text-sm sm:text-base md:text-[16px] leading-5 sm:leading-6 md:leading-[24px] text-[#0D0D0D] font-plus-jakarta-sans pb-1 sm:pb-2">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  {/* Features Container */}
                  <div className="flex flex-col gap-3 sm:gap-4 md:gap-4 w-full">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex flex-row items-center gap-3 sm:gap-4 md:gap-[15px] w-full">
                        {/* Check Icon */}
                        <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 6L9 17L4 12" stroke="#0D0D0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <p className="text-sm sm:text-base md:text-[16px] leading-5 sm:leading-6 md:leading-[24px] text-[#0D0D0D] font-plus-jakarta-sans font-medium">
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Get Started Button */}
                  <button className="w-full flex items-center justify-center gap-2 sm:gap-[10px] px-4 sm:px-5 md:px-[22px] py-3 sm:py-4 md:py-4 bg-[#3328BF] text-[#FCFCFC] rounded-[8px] hover:opacity-90 transition-opacity shadow-sm">
                    <span className="text-base sm:text-lg md:text-[18px] leading-6 sm:leading-7 md:leading-[28px] font-plus-jakarta-sans font-semibold">
                      Get Started
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Our Blog Section */}
        <section className="relative w-full max-w-[1440px] mx-auto py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-0">
          <div className="flex flex-col items-center gap-12 sm:gap-14 md:gap-16 lg:gap-[64px] w-full">
            {/* Section Title */}
            <h2 className="text-4xl sm:text-5xl md:text-[56px] leading-tight sm:leading-[1.2] md:leading-[66px] text-center text-[#2E2222] font-open-sans font-semibold h-[58px]">
              Our Blog
            </h2>

            {/* Blog Cards Container */}
            <div className="flex flex-row overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none items-center lg:justify-center gap-4 sm:gap-8 lg:gap-8 w-full max-w-[1120px] pb-6 lg:pb-0 px-4 sm:px-0 scrollbar-hide">
              {/* Blog Card 1 */}
              <div className="relative flex-shrink-0 w-[85vw] sm:w-[352px] h-[432px] snap-center rounded-[20px] overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                {/* Image Background */}
                <div className="absolute inset-0 w-full h-[248px]">
                  <Image
                    src="/figma/ztax/blog-1.png"
                    alt="Revolutionize Your Study Routine"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Content Card */}
                <div className="absolute left-5 right-5 bottom-5 sm:left-6 sm:right-6 sm:bottom-6 w-auto max-w-[312px] bg-white rounded-[20px] shadow-[0px_0px_6px_rgba(0,0,0,0.25)] p-4 sm:p-6 flex flex-col gap-4 sm:gap-5">
                  {/* Title and Description */}
                  <div className="flex flex-col gap-3 sm:gap-4 w-full">
                    <h3 className="text-lg sm:text-xl md:text-[24px] leading-tight sm:leading-[1.3] md:leading-[33px] text-black font-open-sans font-semibold max-w-[258px]">
                      Revolutionize Your Study Routine
                    </h3>
                    <p className="text-sm sm:text-base md:text-[16px] leading-5 sm:leading-6 md:leading-[24px] text-[#393C41] font-open-sans">
                      In today&apos;s fast-paced world, staying organized and efficient...
                    </p>
                  </div>

                  {/* Read More Link */}
                  <div className="flex flex-row items-center justify-between gap-2 w-[110px]">
                    <a href="#" className="text-sm sm:text-base md:text-[16px] leading-5 sm:leading-6 md:leading-[21px] text-[#2181F6] font-inter font-medium hover:opacity-80 transition-opacity">
                      Read More
                    </a>
                    {/* Arrow Icon */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 12H20M20 12L15 7M20 12L15 17" stroke="#2181F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Blog Card 2 */}
              <div className="relative flex-shrink-0 w-[85vw] sm:w-[352px] h-[432px] snap-center rounded-[20px] overflow-hidden group cursor-pointer">
                {/* Image Background */}
                <div className="absolute inset-0 w-full h-[248px]">
                  <Image
                    src="/figma/ztax/blog-2.png"
                    alt="How AI is Changing Manage Study"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Content Card */}
                <div className="absolute left-5 right-5 bottom-5 sm:left-6 sm:right-6 sm:bottom-6 w-auto max-w-[312px] bg-white rounded-[20px] shadow-[0px_0px_6px_rgba(0,0,0,0.25)] p-4 sm:p-6 flex flex-col gap-4 sm:gap-5">
                  {/* Title and Description */}
                  <div className="flex flex-col gap-3 sm:gap-4 w-full max-w-[252px]">
                    <h3 className="text-lg sm:text-xl md:text-[24px] leading-tight sm:leading-[1.3] md:leading-[33px] text-black font-open-sans font-semibold">
                      How AI is Changing Manage Study
                    </h3>
                    <p className="text-sm sm:text-base md:text-[16px] leading-5 sm:leading-6 md:leading-[24px] text-[#393C41] font-open-sans">
                      Gone are the days of sifting through piles of notes...
                    </p>
                  </div>

                  {/* Read More Link */}
                  <div className="flex flex-row items-center justify-between gap-2 w-[110px]">
                    <a href="#" className="text-sm sm:text-base md:text-[16px] leading-5 sm:leading-6 md:leading-[21px] text-[#2181F6] font-inter font-medium hover:opacity-80 transition-opacity">
                      Read More
                    </a>
                    {/* Arrow Icon */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 12H20M20 12L15 7M20 12L15 17" stroke="#2181F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Blog Card 3 */}
              <div className="relative flex-shrink-0 w-[85vw] sm:w-[352px] h-[432px] snap-center rounded-[20px] overflow-hidden group cursor-pointer">
                {/* Image Background */}
                <div className="absolute inset-0 w-full h-[248px]">
                  <Image
                    src="/figma/ztax/blog-3.png"
                    alt="Maximize Your Productivity"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Content Card */}
                <div className="absolute left-5 right-5 bottom-5 sm:left-6 sm:right-6 sm:bottom-6 w-auto max-w-[312px] bg-white rounded-[20px] shadow-[0px_0px_6px_rgba(0,0,0,0.25)] p-4 sm:p-6 flex flex-col gap-4 sm:gap-5">
                  {/* Title and Description */}
                  <div className="flex flex-col gap-3 sm:gap-4 w-full max-w-[261px]">
                    <h3 className="text-lg sm:text-xl md:text-[24px] leading-tight sm:leading-[1.3] md:leading-[33px] text-black font-open-sans font-semibold">
                      Maximize Your Productivity
                    </h3>
                    <p className="text-sm sm:text-base md:text-[16px] leading-5 sm:leading-6 md:leading-[24px] text-[#393C41] font-open-sans">
                      As students and professionals, we&apos;re constantly looking...
                    </p>
                  </div>

                  {/* Read More Link */}
                  <div className="flex flex-row items-center justify-between gap-2 w-[110px]">
                    <a href="#" className="text-sm sm:text-base md:text-[16px] leading-5 sm:leading-6 md:leading-[21px] text-[#2181F6] font-inter font-medium hover:opacity-80 transition-opacity">
                      Read More
                    </a>
                    {/* Arrow Icon */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 12H20M20 12L15 7M20 12L15 17" stroke="#2181F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="relative w-full max-w-[1440px] mx-auto py-8 sm:py-10 md:py-12 lg:pt-16 lg:pb-0 px-4 sm:px-6 lg:px-[15px]">
          <div className="flex flex-col items-center gap-8 sm:gap-12 md:gap-16 lg:gap-[50px] w-full">
            {/* Header Container */}
            <div className="flex flex-col items-center gap-4 sm:gap-5 md:gap-[20px] w-full max-w-[1120px]">
              {/* Title */}
              <h2 className="text-4xl sm:text-5xl md:text-[56px] leading-tight sm:leading-[1.2] md:leading-[66px] text-center text-[#2E2222] font-open-sans font-semibold">
                Frequently Asked Questions
              </h2>

              {/* Subtitle */}
              <p className="w-full max-w-[563px] text-sm sm:text-base md:text-[16px] leading-5 sm:leading-6 md:leading-[24px] text-center text-[#393C41] font-open-sans">
                We hope this FAQ section has addressed some of your common questions. If you have any further queries, please don&apos;t hesitate to reach out to us.
              </p>
            </div>

            {/* Content Container */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-6 w-full max-w-[1120px]">
              {/* Left Side - Image */}
              <div className="flex-shrink-0 w-full max-w-[500px] h-[300px] sm:h-[350px] md:h-[400px] lg:h-[457px] rounded-2xl overflow-hidden bg-[#F9F9FB]">
                <img
                  src="/figma/ztax/faq-image.png"
                  alt="FAQ"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right Side - FAQ Items */}
              <div className="flex flex-col gap-4 sm:gap-6 lg:gap-6 w-full max-w-[596px]">
                {faqsLoading ? (
                  <div className="text-center py-8 text-gray-500">Loading FAQs...</div>
                ) : faqs.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">No FAQs available.</div>
                ) : (
                  faqs.map((faq, index) => (
                    <div key={faq.id} className="w-full bg-white border border-[#D6D6D6] rounded-[10px] overflow-hidden">
                      <button
                        onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                        className="w-full flex flex-row justify-between items-center gap-4 sm:gap-8 md:gap-[68px] px-6 sm:px-8 md:px-[30px] py-6 sm:py-7 md:py-[26px] hover:bg-gray-50 transition-colors"
                      >
                        <h3 className="text-lg sm:text-xl md:text-[24px] leading-tight sm:leading-[1.3] md:leading-[33px] text-black font-open-sans font-semibold text-left flex-1">
                          {index + 1}. {faq.question}
                        </h3>
                        {/* Plus/Minus Icon */}
                        <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8">
                          {openFaqIndex === index ? (
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect x="6" y="15" width="20" height="2" fill="#0D0D0D" />
                            </svg>
                          ) : (
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect x="15" y="6" width="2" height="20" fill="#0D0D0D" />
                              <rect x="6" y="15" width="20" height="2" fill="#0D0D0D" />
                            </svg>
                          )}
                        </div>
                      </button>
                      {openFaqIndex === index && (
                        <div className="px-6 sm:px-8 md:px-[30px] pb-6 sm:pb-7 md:pb-[26px]">
                          <p className="text-sm sm:text-base md:text-[16px] leading-5 sm:leading-6 md:leading-[24px] text-[#393C41] font-open-sans">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* CTA Section */}
      <section className="relative w-full bg-white pt-16 sm:pt-20 md:pt-24 lg:pt-[120px] pb-8 sm:pb-10 md:pb-[32px] px-4 sm:px-6 lg:px-8">
        <div className="relative w-full max-w-[1440px] mx-auto">
          {/* Container */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-8 w-full">
            {/* Text Container */}
            <div className="flex flex-col items-start gap-8 sm:gap-10 lg:gap-10 w-full max-w-[544px]">
              {/* Text Group */}
              <div className="flex flex-col gap-5 w-full">
                {/* Heading */}
                <h2 className="w-full font-open-sans font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-tight sm:leading-[1.18] text-[#2E2222]">
                  Simplify Your Tax Management – Get the App Today!
                </h2>
                {/* Subheading */}
                <p className="w-full max-w-[457px] font-open-sans font-normal text-sm sm:text-base text-[16px] leading-6 text-[#393C41]">
                  Your tax journey starts here. Track income, manage expenses, and file taxes all in one place.
                </p>
              </div>

              {/* App Store Badges */}
              {/* Google Play Badge */}
              <a
                href={displayContent.hero.playStoreUrl}
                className="relative w-[140px] sm:w-[160px] md:w-[182px] h-[40px] sm:h-[46px] md:h-[52px] bg-black rounded-[8px] flex items-center justify-center overflow-hidden hover:opacity-90 transition-opacity"
              >
                <Image
                  src="/figma/shared/google-play-badge.png"
                  alt="Get it on Google Play"
                  fill
                  className="object-contain"
                />
              </a>

              {/* App Store Badge */}
              <a
                href={displayContent.hero.appStoreUrl}
                className="relative w-[140px] sm:w-[160px] md:w-[180px] h-[40px] sm:h-[46px] md:h-[52px] flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <Image
                  src="/figma/shared/appstore-badge.png"
                  alt="Download on the App Store"
                  fill
                  className="object-contain"
                />
              </a>
            </div>

            {/* Image Container */}
            <div className="relative w-full max-w-[544px] h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] flex-shrink-0 bg-[#E3F5F8] rounded-lg overflow-hidden flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/figma/ztax/cta/phone-mockups.png"
                alt="Z Tax App Phone Mockups"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="w-full bg-[#F1F1F1] py-12 sm:py-16 px-4 sm:px-6 lg:px-[100px]">
        <div className="w-full max-w-[1440px] mx-auto flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-9">
          {/* Column 1: Brand & Contact */}
          <div className="flex flex-col items-start gap-6 max-w-[300px]">
            {/* Logo */}
            <div className="flex flex-row items-center gap-2">
              <Image
                src={displayContent.hero.logo}
                alt="Z Tax Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <span className="text-2xl font-semibold text-[#0D0D0D] font-plus-jakarta-sans">Z Tax</span>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-2 text-sm sm:text-base text-[#0D0D0D] font-open-sans">
              <p>T: + (44) 9055 0269</p>
              <p>E: example@example.com</p>
            </div>

            <p className="text-sm sm:text-base text-[#0D0D0D] font-open-sans">
              50 London Place, West Portal,<br />
              Western London, uk.
            </p>

            {/* Social Icons */}
            <div className="flex flex-row gap-3">
              <a href="#" className="w-8 h-8 relative hover:opacity-80 transition-opacity">
                <Image src="/facebook-icon.svg" alt="Facebook" fill className="object-contain" />
              </a>
              <a href="#" className="w-8 h-8 relative hover:opacity-80 transition-opacity">
                <Image src="/figma/instagram-image.svg" alt="Instagram" fill className="object-contain" />
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="flex flex-col gap-4 sm:gap-6">
            <h3 className="text-lg sm:text-[20px] font-semibold text-[#0D0D0D] font-plus-jakarta-sans">Services</h3>
            <div className="flex flex-col gap-3 sm:gap-4">
              {['Create with AI', 'Customize', 'Blog', 'Gallery'].map((item) => (
                <a key={item} href="#" className="text-sm sm:text-base text-[#0D0D0D] font-open-sans hover:text-[#21C293] transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Information */}
          <div className="flex flex-col gap-4 sm:gap-6">
            <h3 className="text-lg sm:text-[20px] font-semibold text-[#0D0D0D] font-plus-jakarta-sans">Information</h3>
            <div className="flex flex-col gap-3 sm:gap-4">
              {['About Us', 'Privacy Policy', 'Returns Policy', 'Terms and Conditions'].map((item) => (
                <a key={item} href="#" className="text-sm sm:text-base text-[#0D0D0D] font-open-sans hover:text-[#21C293] transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Column 4: Quick links */}
          <div className="flex flex-col gap-4 sm:gap-6">
            <h3 className="text-lg sm:text-[20px] font-semibold text-[#0D0D0D] font-plus-jakarta-sans">Quick links</h3>
            <div className="flex flex-col gap-3 sm:gap-4">
              {['My account', 'My Work', 'Inform.'].map((item) => (
                <a key={item} href="#" className="text-sm sm:text-base text-[#0D0D0D] font-open-sans hover:text-[#21C293] transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

