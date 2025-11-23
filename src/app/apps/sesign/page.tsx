'use client';

export default function SeSignPage() {
  return (
    <main
      className="min-h-screen w-full flex flex-col items-center"
      style={{
        background: 'linear-gradient(192.87deg, #D8D3FF 45.65%, #FAF9FF 76.87%)'
      }}
    >
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
            <button className="hidden sm:inline-flex items-center justify-center px-8 py-[14px] text-sm font-semibold text-white bg-[#171A20] rounded-full shadow-[0_10px_40px_rgba(23,26,32,0.25)] transition-transform hover:-translate-y-0.5">
              Download App
            </button>
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
                backgroundImage: 'url(/figma/sesign/young-woman-hand-uses-tablet.png)'
              }}
            />

            {/* Center content */}
            <div className="flex flex-col items-center gap-4 text-center max-w-[680px]">
              {/* Tag */}
              <div className="box-border w-full max-w-[320px] flex flex-row justify-center items-center gap-[10px] p-[12px] rounded-[16px] border border-[#271CEB]/40 bg-white/80 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-[#6652FF]" />
                <span className="font-inter font-medium text-[15px] leading-[19px] text-[#6652FF] tracking-wide">Signature · Document · Share</span>
              </div>

              {/* Headline + sub */}
              <div className="flex flex-col items-center gap-5">
                <h1 className="text-center font-roboto font-bold text-[46px] leading-[1.1] md:text-[64px] md:leading-[1.1] text-[#171A20]">
                  Simplify Documents, Sign, Collaborate Anywhere
                </h1>
                <p className="text-center font-roboto text-[18px] leading-[28px] text-[#171A20]/80 max-w-[560px]">
                  Manage, share, and sign your documents securely in one platform — integrated, automated, and built for teams that move fast and work remotely.
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
                backgroundImage: 'url(/figma/sesign/designer-work-office.png)'
              }}
            />
          </div>

          {/* Bottom row with two background images and floating card */}
          <div className="relative w-full max-w-[1140px] h-[270px]">
            <div className="absolute inset-0 flex flex-row justify-between items-center">
              <div
                className="w-[270px] h-[270px] rounded-[24px] bg-center bg-cover shadow-[0px_20px_60px_rgba(32,24,95,0.2)]"
                style={{
                  backgroundImage: 'url(/figma/sesign/document-verification.png)'
                }}
              />
              <div
                className="w-[270px] h-[270px] rounded-[24px] bg-center bg-cover shadow-[0px_20px_60px_rgba(32,24,95,0.2)]"
                style={{
                  backgroundImage: 'url(/figma/sesign/terms-use.png)'
                }}
              />
            </div>

            {/* Floating card center */}
            <div className="absolute left-1/2 -translate-x-1/2 top-[75px] w-[260px]">
              <div className="bg-white backdrop-blur-lg rounded-[20px] shadow-[0px_25px_60px_rgba(87,77,164,0.18)] px-6 py-5">
                <div className="w-full flex justify-between items-center">
                  <span className="font-inter font-medium text-[16px] text-[#171A20]">Happy Clients</span>
                  <span className="font-lato font-bold text-[16px] text-[#01544A]">25k+</span>
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
              {['brand_3_1.png', 'brand_3_2.png', 'brand_3_3.png', 'brand_3_4.png'].map((brand, idx) => (
                <div key={brand} className="flex items-center justify-center w-[180px] h-[60px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/figma/sesign/${brand}`}
                    alt={`brand ${idx + 1}`}
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
              <span className="font-roboto font-bold text-[16px] leading-[19px] text-[#6652FF]">About Us</span>
            </div>
            {/* Title + Sub */}
            <div className="w-full flex flex-col items-center gap-[18px]">
              <h2 className="w-[884px] max-w-full font-roboto font-bold text-[40px] leading-[50px] md:text-[64px] md:leading-[75px] text-center text-[#171A20]">
                Empowering Paperless Progress with Secure Digital Solutions
              </h2>
              <p className="w-[884px] max-w-full font-roboto font-normal text-[18px] leading-[28px] text-center text-[#171A20]">
                We empower businesses to go fully paperless by providing secure, smart, and scalable digital solutions that streamline document management, signing, and collaboration
              </p>
            </div>
          </div>

          {/* Metrics Cards (4-up) */}
          <div className="mt-10 w-full max-w-[1140px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Card 1 */}
            <div className="box-border w-full min-h-[180px] flex flex-col justify-center items-center gap-[10px] px-[30px] py-[40px] bg-[#F5F5FF] border-[1.5px] border-[#6652FF] rounded-[20px]">
              <div className="flex items-center justify-center">
                <span className="font-plus-jakarta-sans font-medium text-[48px] leading-[60px] tracking-[-0.02em] text-center text-[#6652FF]">15</span>
                <span className="font-plus-jakarta-sans font-medium text-[48px] leading-[60px] tracking-[-0.02em] text-center text-[#6652FF]">+</span>
              </div>
              <div className="w-full text-center text-[#171A20] font-plus-jakarta-sans text-[20px] leading-[30px]">Experience</div>
            </div>
            {/* Card 2 */}
            <div className="box-border w-full min-h-[180px] flex flex-col justify-center items-center gap-[10px] px-[30px] py-[40px] bg-[#F5F5FF] border-[1.5px] border-[#6652FF] rounded-[20px]">
              <div className="flex items-center justify-center">
                <span className="font-plus-jakarta-sans font-medium text-[48px] leading-[60px] tracking-[-0.02em] text-center text-[#6652FF]">40</span>
              </div>
              <div className="w-full text-center text-[#171A20] font-roboto text-[20px] leading-[30px]">System Uptime</div>
            </div>
            {/* Card 3 */}
            <div className="box-border w-full min-h-[180px] flex flex-col justify-center items-center gap-[10px] px-[30px] py-[40px] bg-[#F5F5FF] border-[1.5px] border-[#6652FF] rounded-[20px]">
              <div className="flex items-center justify-center">
                <span className="font-plus-jakarta-sans font-medium text-[48px] leading-[60px] tracking-[-0.02em] text-center text-[#6652FF]">15</span>
                <span className="font-plus-jakarta-sans font-medium text-[48px] leading-[60px] tracking-[-0.02em] text-center text-[#6652FF]">K</span>
              </div>
              <div className="w-full text-center text-[#171A20] font-roboto text-[20px] leading-[30px]">Signed Monthly</div>
            </div>
            {/* Card 4 */}
            <div className="box-border w-full min-h-[180px] flex flex-col justify-center items-center gap-[10px] px-[30px] py-[40px] bg-[#F5F5FF] border-[1.5px] border-[#6652FF] rounded-[20px]">
              <div className="flex items-center justify-center">
                <span className="font-plus-jakarta-sans font-medium text-[48px] leading-[60px] tracking-[-0.02em] text-center text-[#6652FF]">3k</span>
                <span className="font-plus-jakarta-sans font-medium text-[48px] leading-[60px] tracking-[-0.02em] text-center text-[#6652FF]">+</span>
              </div>
              <div className="w-full text-center text-[#171A20] font-roboto text-[20px] leading-[30px]">Clients Worldwide</div>
            </div>
          </div>
        </div>
      </section>
      
      
      {/* Features Section (Figma 6628:1193) */}
      <section className="w-full flex justify-center bg-white">
        <div className="w-full max-w-[1440px] h-[975px] bg-white flex flex-col items-center justify-center px-0">
          {/* Tag */}
          <div className="box-border w-[156px] h-[39px] flex flex-row justify-center items-center gap-[10px] p-[10px] rounded-[8px] border-2 border-[#6652FF]">
            <span className="font-roboto font-bold text-[16px] leading-[19px] text-[#6652FF]">Feature</span>
          </div>

          {/* Heading + Sub */}
          <div className="mt-4 w-full flex flex-col items-center gap-[18px]">
            <h2 className="w-[1032px] max-w-full font-roboto font-bold text-[40px] leading-[50px] md:text-[64px] md:leading-[75px] text-center text-[#171A20]">
              Smarter Features for Faster Safer Signing Workflow
            </h2>
            <p className="w-[1032px] max-w-full font-roboto font-normal text-[18px] leading-[28px] text-center text-[#171A20]">
              Explore powerful features designed to help you upload, organize, share, and sign documents
            </p>
          </div>

          {/* Cards grid: 2 rows x 3 cols */}
          <div className="mt-10 w-[1120px] max-w-full flex flex-col gap-8">
            <div className="w-full flex flex-col md:flex-row gap-8 justify-center">
              {/* Card: Create document with AI */}
              <div className="w-full md:w-[352px] box-border flex flex-col items-center gap-6 p-6 md:px-6 md:py-[30px] bg-white border border-[#D6D6D6] rounded-[20px]">
              <svg width="98" height="98" viewBox="0 0 90 98" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 50.8148H8.838C7.43409 50.7723 6.10184 50.18 5.12392 49.1636C4.146 48.1471 3.59937 46.7865 3.6 45.3704C3.5995 43.9512 4.14862 42.588 5.13038 41.571C6.11214 40.554 7.44894 39.9638 8.856 39.9259H18M19.656 21.9593L18.216 26.3148H21.078L19.692 21.9593H19.656ZM37.8 14.5185H5.4C3.96783 14.5185 2.59432 15.0921 1.58162 16.1132C0.568927 17.1342 0 18.519 0 19.963V43.5556C0 41.6303 0.758569 39.7839 2.10883 38.4225C3.45909 37.0611 5.29044 36.2963 7.2 36.2963H37.8C39.2322 36.2963 40.6057 35.7227 41.6184 34.7017C42.6311 33.6806 43.2 32.2958 43.2 30.8519V19.963C43.2 18.519 42.6311 17.1342 41.6184 16.1132C40.6057 15.0921 39.2322 14.5185 37.8 14.5185ZM23.4 30.5252C23.1667 30.5514 22.9315 30.4976 22.7323 30.3725C22.5331 30.2474 22.3815 30.0582 22.302 29.8356L21.672 28.0207H17.676L17.028 29.8356C16.9611 30.0627 16.8148 30.2578 16.6163 30.3846C16.4177 30.5114 16.1803 30.5613 15.948 30.5252C15.8004 30.5382 15.6518 30.5193 15.512 30.47C15.3723 30.4206 15.2445 30.3418 15.1372 30.2388C15.03 30.1358 14.9457 30.011 14.89 29.8726C14.8342 29.7343 14.8083 29.5855 14.814 29.4363C14.8448 29.1117 14.9237 28.7936 15.048 28.4926L18.216 19.963C18.2943 19.717 18.4568 19.5072 18.6744 19.3709C18.892 19.2346 19.1506 19.1807 19.404 19.2189H19.998C20.2866 19.1825 20.5784 19.2524 20.8199 19.4158C21.0614 19.5792 21.2361 19.8251 21.312 20.1081L24.264 28.42C24.3883 28.721 24.4672 29.0391 24.498 29.3637C24.5028 29.513 24.4781 29.6617 24.4253 29.8013C24.3725 29.9408 24.2926 30.0683 24.1904 30.1764C24.0882 30.2846 23.9657 30.3711 23.83 30.4309C23.6943 30.4908 23.5481 30.5229 23.4 30.5252ZM27.864 29.4181C27.8839 29.5742 27.8707 29.7327 27.8251 29.8832C27.7794 30.0336 27.7026 30.1725 27.5995 30.2907C27.4965 30.4088 27.3696 30.5034 27.2275 30.5683C27.0853 30.6331 26.931 30.6666 26.775 30.6666C26.619 30.6666 26.4647 30.6331 26.3225 30.5683C26.1804 30.5034 26.0535 30.4088 25.9505 30.2907C25.8474 30.1725 25.7705 30.0336 25.7249 29.8832C25.6793 29.7327 25.6661 29.5742 25.686 29.4181V23.3567C25.6661 23.2006 25.6793 23.0421 25.7249 22.8917C25.7705 22.7412 25.8474 22.6023 25.9505 22.4841C26.0535 22.366 26.1804 22.2714 26.3225 22.2065C26.4647 22.1417 26.619 22.1082 26.775 22.1082C26.931 22.1082 27.0853 22.1417 27.2275 22.2065C27.3696 22.2714 27.4965 22.366 27.5995 22.4841C27.7026 22.6023 27.7794 22.7412 27.8251 22.8917C27.8707 23.0421 27.8839 23.2006 27.864 23.3567V29.4181ZM26.766 21.5056C26.4652 21.5056 26.1768 21.3851 25.9641 21.1707C25.7515 20.9563 25.632 20.6655 25.632 20.3622C25.6284 20.131 25.6934 19.904 25.8186 19.7102C25.9438 19.5164 26.1236 19.3648 26.3348 19.2746C26.546 19.1845 26.7791 19.1599 27.0042 19.2042C27.2294 19.2484 27.4363 19.3594 27.5984 19.5229C27.7606 19.6864 27.8707 19.8951 27.9146 20.122C27.9585 20.349 27.9341 20.584 27.8447 20.797C27.7553 21.01 27.6049 21.1912 27.4127 21.3174C27.2205 21.4436 26.9953 21.5091 26.766 21.5056ZM88.992 15.2626L74.862 1.07074C74.5592 0.760184 74.1982 0.513424 73.8 0.344815V14.5185C73.8 14.9998 73.9896 15.4614 74.3272 15.8018C74.6648 16.1421 75.1226 16.3333 75.6 16.3333H79.2C79.6774 16.3333 80.1352 16.5245 80.4728 16.8649C80.8104 17.2052 81 17.6668 81 18.1481C81 18.6295 80.8104 19.0911 80.4728 19.4314C80.1352 19.7718 79.6774 19.963 79.2 19.963H75.6C74.1678 19.963 72.7943 19.3894 71.7816 18.3683C70.7689 17.3473 70.2 15.9625 70.2 14.5185V0H28.8C26.8904 0 25.0591 0.764812 23.7088 2.12619C22.3586 3.48756 21.6 5.33398 21.6 7.25926V10.8889H37.8C40.1869 10.8889 42.4761 11.8449 44.164 13.5466C45.8518 15.2483 46.8 17.5564 46.8 19.963V30.8519C46.8 33.2584 45.8518 35.5665 44.164 37.2682C42.4761 38.9699 40.1869 39.9259 37.8 39.9259H21.6V90.7407C21.6 92.666 22.3586 94.5124 23.7088 95.8738C25.0591 97.2352 26.8904 98 28.8 98H82.8C84.7096 98 86.5409 97.2352 87.8912 95.8738C89.2414 94.5124 90 92.666 90 90.7407V17.8396C90.0004 17.3607 89.9067 16.8864 89.7245 16.4441C89.5422 16.0018 89.2749 15.6003 88.938 15.2626H88.992ZM52.2 18.1481H64.8C65.2774 18.1481 65.7352 18.3394 66.0728 18.6797C66.4104 19.02 66.6 19.4816 66.6 19.963C66.6 20.4443 66.4104 20.9059 66.0728 21.2462C65.7352 21.5866 65.2774 21.7778 64.8 21.7778H52.2C51.7226 21.7778 51.2648 21.5866 50.9272 21.2462C50.5896 20.9059 50.4 20.4443 50.4 19.963C50.4 19.4816 50.5896 19.02 50.9272 18.6797C51.2648 18.3394 51.7226 18.1481 52.2 18.1481ZM52.2 29.037H73.8C74.2774 29.037 74.7352 29.2282 75.0728 29.5686C75.4104 29.9089 75.6 30.3705 75.6 30.8519C75.6 31.3332 75.4104 31.7948 75.0728 32.1351C74.7352 32.4755 74.2774 32.6667 73.8 32.6667H52.2C51.7226 32.6667 51.2648 32.4755 50.9272 32.1351C50.5896 31.7948 50.4 31.3332 50.4 30.8519C50.4 30.3705 50.5896 29.9089 50.9272 29.5686C51.2648 29.2282 51.7226 29.037 52.2 29.037ZM77.4 58.0741C76.7717 58.0703 76.1554 57.9007 75.6123 57.5824C75.0692 57.264 74.6181 56.8078 74.304 56.2593H66.888C69.2046 57.9521 71.1132 60.1495 72.4718 62.6881C73.8305 65.2267 74.6044 68.0414 74.736 70.923C75.4925 71.1365 76.159 71.5936 76.6338 72.2247C77.1085 72.8557 77.3655 73.6261 77.3656 74.4181C77.3656 75.2102 77.1086 75.9805 76.6339 76.6116C76.1592 77.2427 75.4927 77.6999 74.7362 77.9134C73.9797 78.127 73.1747 78.0852 72.444 77.7944C71.7132 77.5037 71.0969 76.9799 70.6889 76.303C70.281 75.626 70.1039 74.8332 70.1846 74.0453C70.2653 73.2574 70.5995 72.5178 71.136 71.9393C71.136 71.9393 71.136 71.8304 71.136 71.7759C71.1236 68.621 70.162 65.544 68.3783 62.9518C66.5946 60.3595 64.0727 58.3739 61.146 57.2574V58.0741C61.146 58.5554 60.9564 59.017 60.6188 59.3573C60.2812 59.6977 59.8234 59.8889 59.346 59.8889H52.2C51.7226 59.8889 51.2648 59.6977 50.9272 59.3573C50.5896 59.017 50.4 58.5554 50.4 58.0741V57.2574C47.4733 58.3739 44.9514 60.3595 43.1677 62.9518C41.384 65.544 40.4224 68.621 40.41 71.7759C40.41 71.7759 40.41 71.8848 40.41 71.9393C41.0382 72.6059 41.392 73.488 41.4 74.4074C41.4038 75.0855 41.219 75.7511 40.8668 76.3288C40.5145 76.9065 40.0087 77.3731 39.4068 77.6758C38.805 77.9785 38.131 78.1051 37.4614 78.0413C36.7918 77.9775 36.1533 77.7259 35.6183 77.3149C35.0833 76.9039 34.6732 76.35 34.4345 75.7161C34.1957 75.0821 34.1379 74.3933 34.2676 73.7279C34.3973 73.0625 34.7093 72.4471 35.1682 71.9513C35.6271 71.4555 36.2145 71.0993 36.864 70.923C36.9956 68.0414 37.7695 65.2267 39.1282 62.6881C40.4868 60.1495 42.3954 57.9521 44.712 56.2593H37.296C36.9819 56.8078 36.5308 57.264 35.9877 57.5824C35.4446 57.9007 34.8283 58.0703 34.2 58.0741C33.2452 58.0741 32.3295 57.6917 31.6544 57.011C30.9793 56.3303 30.6 55.4071 30.6 54.4444C30.6 53.4818 30.9793 52.5586 31.6544 51.8779C32.3295 51.1972 33.2452 50.8148 34.2 50.8148C34.8283 50.8186 35.4446 50.9882 35.9877 51.3065C36.5308 51.6249 36.9819 52.0811 37.296 52.6296H50.4V50.8148C50.4 50.3335 50.5896 49.8719 50.9272 49.5315C51.2648 49.1912 51.7226 49 52.2 49H59.4C59.8774 49 60.3352 49.1912 60.6728 49.5315C61.0104 49.8719 61.2 50.3335 61.2 50.8148V52.6296H74.304C74.6181 52.0811 75.0692 51.6249 75.6123 51.3065C76.1554 50.9882 76.7717 50.8186 77.4 50.8148C78.3548 50.8148 79.2705 51.1972 79.9456 51.8779C80.6207 52.5586 81 53.4818 81 54.4444C81 55.4071 80.6207 56.3303 79.9456 57.011C79.2705 57.6917 78.3548 58.0741 77.4 58.0741Z" fill="#5B9BB5"/>
</svg>

                <div className="flex flex-col items-center gap-4 w-full">
                  <h3 className="font-roboto font-semibold text-[24px] leading-[32px] text-center text-[#171A20]">Create document with AI</h3>
                  <p className="font-plus-jakarta-sans font-normal text-[16px] leading-[24px] text-center text-[#808080]">
                    Create documents effortlessly with AI. From reports and articles to presentations and contracts
                  </p>
                </div>
              </div>
              {/* Card: Create E-Signature */}
              <div className="w-full md:w-[352px] box-border flex flex-col items-center gap-6 p-6 md:px-6 md:py-[30px] bg-white border border-[#D6D6D6] rounded-[20px]">
              <svg width="98" height="98" viewBox="0 0 112 98" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_6628_1208)">
<path d="M13.125 16C6.36836 16 0.875 21.4934 0.875 28.25V101.75C0.875 108.507 6.36836 114 13.125 114H62.125C68.8816 114 74.375 108.507 74.375 101.75V98.0559C73.8582 98.2664 73.3414 98.4387 72.8054 98.5727L61.3019 101.444C60.7277 101.578 60.1535 101.673 59.5793 101.712C59.407 101.731 59.2347 101.75 59.0625 101.75H46.8125C45.6449 101.75 44.5922 101.099 44.0754 100.066L42.391 96.6777C42.0656 96.027 41.4148 95.625 40.7066 95.625C39.9984 95.625 39.3285 96.027 39.0223 96.6777L37.3379 100.066C36.7828 101.195 35.5769 101.865 34.3328 101.75C33.0887 101.635 32.0168 100.774 31.6723 99.5871L28.4375 88.9258L26.5617 95.2039C25.3941 99.0894 21.8148 101.75 17.757 101.75H16.1875C14.5031 101.75 13.125 100.372 13.125 98.6875C13.125 97.0031 14.5031 95.625 16.1875 95.625H17.757C19.116 95.625 20.3027 94.7445 20.6855 93.443L23.5375 83.9684C24.1883 81.8055 26.1789 80.3125 28.4375 80.3125C30.6961 80.3125 32.6867 81.8055 33.3375 83.9684L35.5578 91.3566C36.9742 90.1699 38.7734 89.5 40.6875 89.5C43.7308 89.5 46.5062 91.2227 47.8652 93.9406L48.7074 95.625H50.4109C49.8176 93.9406 49.7027 92.1031 50.143 90.3039L53.014 78.8004C53.55 76.6375 54.6601 74.6852 56.2297 73.1156L74.375 54.9703V46.625H49.875C46.4871 46.625 43.75 43.8879 43.75 40.5V16H13.125ZM49.875 16V40.5H74.375L49.875 16ZM106.11 42.7395C103.124 39.7535 98.2816 39.7535 95.2765 42.7395L89.6492 48.3668L103.239 61.9566L108.866 56.3293C111.852 53.3434 111.852 48.5008 108.866 45.4957L106.11 42.7395ZM60.5746 77.4414C59.7898 78.2262 59.2347 79.2023 58.9668 80.2934L56.0957 91.7969C55.8277 92.8496 56.134 93.9406 56.8996 94.7063C57.6652 95.4719 58.7562 95.7781 59.809 95.5102L71.3125 92.6391C72.3844 92.3711 73.3797 91.816 74.1644 91.0312L98.8941 66.2824L85.3043 52.6926L60.5746 77.4414Z" fill="#5B9BB5"/>
</g>
<defs>
<clipPath id="clip0_6628_1208">
<rect width="110.25" height="98" fill="white" transform="translate(0.875)"/>
</clipPath>
</defs>
</svg>
                <div className="flex flex-col items-center gap-4 w-full">
                  <h3 className="font-roboto font-semibold text-[24px] leading-[32px] text-center text-[#171A20]">Create E-Signature</h3>
                  <p className="font-plus-jakarta-sans font-normal text-[16px] leading-[24px] text-center text-[#808080]">
                    Create e-signatures quickly and securely with AI. Sign documents online, streamline approvals
                  </p>
                </div>
              </div>
              {/* Card: Ask with AI */}
              <div className="w-full md:w-[352px] box-border flex flex-col items-center gap-6 p-6 md:px-6 md:py-[30px] bg-white border border-[#D6D6D6] rounded-[20px]">
              <svg width="98" height="98" viewBox="0 0 98 98" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_6628_1216)">
<path d="M55.2227 69.0833L63.6997 63.3666H89.833C93.4427 63.3666 96.3664 60.443 96.3664 56.8333V24.1666C96.3664 20.557 93.4427 17.6333 89.833 17.6333H44.0997C40.4901 17.6333 37.5664 20.557 37.5664 24.1666V56.8333C37.5664 60.443 40.4901 63.3666 44.0997 63.3666H47.3664L48.2157 68.528L55.2227 69.0833Z" fill="#5B9BB5"/>
<path d="M55.2557 94.6941L69.335 80.9577L74.7904 75.6167L76.146 74.2937C76.9464 73.5424 77.9754 73.1667 79.0044 73.1667C80.0334 73.1667 81.0624 73.5424 81.8954 74.3101C83.5124 75.7964 83.7737 78.2791 82.4834 80.0431L76.8974 87.8177L75.9174 89.358L55.5954 96.5332L55.2557 94.6941Z" fill="#5B9BB5"/>
<path d="M52.3973 68.2749L29.253 69.7433C27.2032 69.8658 25.2138 70.4913 23.453 71.5661L12.8217 78.0586C10.8437 79.2656 8.58152 79.9042 6.27362 79.9042H4.89835C3.09352 79.9042 1.63168 81.3922 1.63168 83.2297V97.2388C1.63168 98.7741 2.66395 100.109 4.12905 100.47L50.8538 111.999C53.869 112.744 57.0491 112.35 59.8012 110.893L93.7664 92.494C95.9649 91.3294 96.94 88.6589 96.0188 86.3167C95.0894 83.95 92.5332 82.7021 90.1371 83.4437L56.3435 94.6157C55.8159 94.779 55.2524 94.7643 54.7346 94.5716L39.6181 88.9774C38.4372 88.5397 37.748 87.2918 37.993 86.0374L38.8619 81.6111C39.0644 80.5788 39.8615 79.7752 40.8758 79.5776L53.6354 77.3285C56.0266 76.7878 57.5554 74.3999 57.0752 71.9548C56.6342 69.7122 54.6366 68.1426 52.3941 68.2782L52.3973 68.2749Z" fill="#5B9BB5"/>
<path d="M53.7837 26.8274C53.5354 26.2067 52.9344 25.8 52.2663 25.8C51.5983 25.8 50.9989 26.2067 50.749 26.8274L44.2156 43.1607C43.8808 43.9986 44.2891 44.9492 45.127 45.2841C45.9584 45.6173 46.9155 45.2122 47.2504 44.3727L49.4521 38.8667H55.0806L57.2823 44.3727C57.5371 45.0129 58.1512 45.4 58.7997 45.4C59.0022 45.4 59.208 45.3641 59.4056 45.2841C60.2435 44.9492 60.6519 43.9986 60.317 43.1607L53.7837 26.8274ZM50.7588 35.6L52.2663 31.8303L53.7739 35.6H50.7588Z" fill="white"/>
<path d="M65.3326 24.1667C64.4293 24.1667 63.6992 24.8968 63.6992 25.8001V37.2334C63.6992 38.1366 64.4293 38.8667 65.3326 38.8667C66.2358 38.8667 66.9659 38.1366 66.9659 37.2334V25.8001C66.9659 24.8968 66.2358 24.1667 65.3326 24.1667Z" fill="white"/>
<path d="M65.3326 42.1221C64.4293 42.1221 63.6992 42.8636 63.6992 43.7668C63.6992 44.6701 64.4293 45.4002 65.3326 45.4002C66.2358 45.4002 66.9659 44.6701 66.9659 43.7668V43.7423C66.9659 42.8391 66.2358 42.1221 65.3326 42.1221Z" fill="white"/>
<path d="M88.1996 53.5667H45.7329C44.8297 53.5667 44.0996 52.8366 44.0996 51.9334C44.0996 51.0301 44.8297 50.3 45.7329 50.3H88.1996C89.1029 50.3 89.833 51.0301 89.833 51.9334C89.833 52.8366 89.1029 53.5667 88.1996 53.5667Z" fill="white"/>
<path d="M88.1995 45.4H73.4995C72.5963 45.4 71.8662 44.6699 71.8662 43.7666C71.8662 42.8634 72.5963 42.1333 73.4995 42.1333H88.1995C89.1028 42.1333 89.8329 42.8634 89.8329 43.7666C89.8329 44.6699 89.1028 45.4 88.1995 45.4Z" fill="white"/>
<path d="M88.1995 37.2332H73.4995C72.5963 37.2332 71.8662 36.5031 71.8662 35.5999C71.8662 34.6967 72.5963 33.9666 73.4995 33.9666H88.1995C89.1028 33.9666 89.8329 34.6967 89.8329 35.5999C89.8329 36.5031 89.1028 37.2332 88.1995 37.2332Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_6628_1216">
<rect width="98" height="98" fill="white"/>
</clipPath>
</defs>
</svg>
                <div className="flex flex-col items-center gap-4 w-full">
                  <h3 className="font-roboto font-semibold text-[24px] leading-[32px] text-center text-[#171A20]">Ask with AI</h3>
                  <p className="font-plus-jakarta-sans font-normal text-[16px] leading-[24px] text-center text-[#808080]">
                    Ask with AI and get instant, intelligent answers to your questions. From research and problem
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col md:flex-row gap-8 justify-center">
              {/* Card: Scanner */}
              <div className="w-full md:w-[352px] box-border flex flex-col items-center gap-6 p-6 md:px-6 md:py-[30px] bg-white border border-[#D6D6D6] rounded-[20px]">
              <svg width="98" height="98" viewBox="0 0 98 98" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_6628_1233)">
<path fillRule="evenodd" clipRule="evenodd" d="M88.8125 114H70.8203C70.0547 114 69.4805 113.426 69.4805 112.66C69.4805 111.703 70.0547 111.129 70.8203 111.129H87.2812V94.8594C87.2812 94.0938 87.8555 93.5195 88.8125 93.5195C89.5781 93.5195 90.1523 94.0938 90.1523 94.8594V112.66C90.1523 113.426 89.5781 114 88.8125 114ZM27.1797 114H9.1875C8.42188 114 7.84766 113.426 7.84766 112.66V94.8594C7.84766 94.0938 8.42188 93.5195 9.1875 93.5195C10.1445 93.5195 10.7188 94.0938 10.7188 94.8594V111.32H27.1797C27.9453 111.32 28.5195 111.895 28.5195 112.66C28.5195 113.617 27.9453 114 27.1797 114ZM88.8125 36.6719C87.8555 36.6719 87.2812 36.0977 87.2812 35.332V18.8711H70.8203C70.0547 18.8711 69.4805 18.2969 69.4805 17.3398C69.4805 16.5742 70.0547 16 70.8203 16H88.8125C89.5781 16 90.1523 16.5742 90.1523 17.3398V35.332C90.1523 36.0977 89.5781 36.6719 88.8125 36.6719ZM9.1875 36.6719C8.42188 36.6719 7.84766 36.0977 7.84766 35.332V17.5312C7.84766 16.7656 8.42188 16.1914 9.1875 16.1914H27.1797C27.9453 16.1914 28.5195 16.7656 28.5195 17.5312C28.5195 18.2969 27.9453 19.0625 27.1797 19.0625H10.7188V35.332C10.7188 36.0977 10.1445 36.6719 9.1875 36.6719Z" fill="#5B9BB5"/>
<path d="M20.4805 65.957V64.2344C19.7148 64.2344 19.1406 63.4688 19.1406 62.8945V31.8867C19.1406 29.5898 21.0547 27.8672 23.3516 27.8672H63.1641C63.5469 27.8672 63.9297 27.8672 64.1211 28.25L78.2852 42.2227C78.668 42.6055 78.8594 42.9883 78.8594 43.1797V62.8945C78.8594 63.6602 78.2852 64.2344 77.5195 64.2344V65.957C78.2852 65.957 79.0508 66.5312 79.0508 67.2969V98.3047C78.8594 100.602 76.9453 102.516 74.6484 102.516H23.3516C21.0547 102.516 19.332 100.602 19.332 98.3047V67.2969C19.332 66.5312 19.9062 65.957 20.4805 65.957Z" fill="#5B9BB5"/>
<path d="M61.8242 27.8672H63.1641C63.5469 27.8672 63.9297 27.8672 64.1211 28.25L64.6953 28.6328L77.9023 41.8398L78.2852 42.2227C78.668 42.6055 78.8594 42.9883 78.8594 43.1797V44.7109H66.418C63.9297 44.7109 61.8242 42.6055 61.8242 40.1172V27.8672Z" fill="#5B9BB5"/>
<path fillRule="evenodd" clipRule="evenodd" d="M54.3594 57.3438H28.9023C28.1367 57.3438 27.5625 56.7695 27.5625 56.0039C27.5625 55.2383 28.1367 54.4727 28.9023 54.4727H54.3594C55.125 54.4727 55.6992 55.2383 55.6992 56.0039C55.6992 56.7695 55.125 57.3438 54.3594 57.3438Z" fill="#5B9BB5"/>
<path fillRule="evenodd" clipRule="evenodd" d="M68.332 57.3438H60.6758C59.9102 57.3438 59.1445 56.7695 59.1445 56.0039C59.1445 55.2383 59.9102 54.4727 60.6758 54.4727H68.332C69.0977 54.4727 69.6719 55.2383 69.6719 56.0039C69.6719 56.7695 69.0977 57.3438 68.332 57.3438Z" fill="#5B9BB5"/>
<path fillRule="evenodd" clipRule="evenodd" d="M54.3594 48.3477H28.9023C28.1367 48.3477 27.5625 47.7734 27.5625 47.0078C27.5625 46.2422 28.1367 45.4766 28.9023 45.4766H54.3594C55.125 45.4766 55.6992 46.2422 55.6992 47.0078C55.6992 47.7734 55.125 48.3477 54.3594 48.3477Z" fill="#5B9BB5"/>
<path fillRule="evenodd" clipRule="evenodd" d="M54.3594 39.1602H28.9023C28.1367 39.1602 27.5625 38.5859 27.5625 37.8203C27.5625 37.0547 28.1367 36.2891 28.9023 36.2891H54.3594C55.125 36.2891 55.6992 37.0547 55.6992 37.8203C55.6992 38.5859 55.125 39.1602 54.3594 39.1602Z" fill="#5B9BB5"/>
<path fillRule="evenodd" clipRule="evenodd" d="M54.3594 75.5273H28.9023C28.1367 75.5273 27.5625 74.9531 27.5625 74.1875C27.5625 73.2305 28.1367 72.6562 28.9023 72.6562H54.3594C55.125 72.6562 55.6992 73.2305 55.6992 74.1875C55.6992 74.9531 55.125 75.5273 54.3594 75.5273Z" fill="#5B9BB5"/>
<path fillRule="evenodd" clipRule="evenodd" d="M68.332 75.5273H60.6758C59.9102 75.5273 59.1445 74.9531 59.1445 74.1875C59.1445 73.2305 59.9102 72.6562 60.6758 72.6562H68.332C69.0977 72.6562 69.6719 73.2305 69.6719 74.1875C69.6719 74.9531 69.0977 75.5273 68.332 75.5273Z" fill="#5B9BB5"/>
<path fillRule="evenodd" clipRule="evenodd" d="M54.3594 84.7148H28.9023C28.1367 84.7148 27.5625 84.1406 27.5625 83.1836C27.5625 82.418 28.1367 81.8438 28.9023 81.8438H54.3594C55.125 81.8438 55.6992 82.418 55.6992 83.1836C55.6992 84.1406 55.125 84.7148 54.3594 84.7148Z" fill="#5B9BB5"/>
<path fillRule="evenodd" clipRule="evenodd" d="M68.332 84.7148H60.6758C59.9102 84.7148 59.1445 84.1406 59.1445 83.1836C59.1445 82.418 59.9102 81.8438 60.6758 81.8438H68.332C69.0977 81.8438 69.6719 82.418 69.6719 83.1836C69.6719 84.1406 69.0977 84.7148 68.332 84.7148Z" fill="#5B9BB5"/>
<path fillRule="evenodd" clipRule="evenodd" d="M54.3594 93.7109H28.9023C28.1367 93.7109 27.5625 93.1367 27.5625 92.3711C27.5625 91.6055 28.1367 90.8398 28.9023 90.8398H54.3594C55.125 90.8398 55.6992 91.6055 55.6992 92.3711C55.6992 93.1367 55.125 93.7109 54.3594 93.7109Z" fill="#5B9BB5"/>
<path fillRule="evenodd" clipRule="evenodd" d="M68.332 93.7109H60.6758C59.9102 93.7109 59.1445 93.1367 59.1445 92.3711C59.1445 91.6055 59.9102 90.8398 60.6758 90.8398H68.332C69.0977 90.8398 69.6719 91.6055 69.6719 92.3711C69.6719 93.1367 69.0977 93.7109 68.332 93.7109Z" fill="#5B9BB5"/>
<g filter="url(#filter0_f_6628_1233)">
<path fillRule="evenodd" clipRule="evenodd" d="M88.8125 68.6367H9.1875C8.42188 68.6367 7.84766 68.0625 7.84766 67.2969V62.7031C7.84766 61.9375 8.42188 61.3633 9.1875 61.3633H88.6211C89.3867 61.3633 90.1523 61.9375 90.1523 62.7031V67.2969C90.1523 68.0625 89.5781 68.6367 88.8125 68.6367Z" fill="#104F8C"/>
</g>
</g>
<defs>
<filter id="filter0_f_6628_1233" x="3.84766" y="57.3633" width="90.3047" height="15.2734" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_6628_1233"/>
</filter>
<clipPath id="clip0_6628_1233">
<rect width="98" height="98" fill="white"/>
</clipPath>
</defs>
</svg>
                <div className="flex flex-col items-center gap-4 w-full">
                  <h3 className="font-roboto font-semibold text-[24px] leading-[32px] text-center text-[#171A20]">Scanner</h3>
                  <p className="font-plus-jakarta-sans font-normal text-[16px] leading-[24px] text-center text-[#808080]">
                    Scan documents, receipts, and IDs with ease. A digital scanner lets you capture clear, high-quality images
                  </p>
                </div>
              </div>
              {/* Card: Photo */}
              <div className="w-full md:w-[352px] box-border flex flex-col items-center gap-6 p-6 md:px-6 md:py-[30px] bg-white border border-[#D6D6D6] rounded-[20px]">
              <svg width="98" height="98" viewBox="0 0 94 98" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M44.6931 57.9666L44.2562 58.3532L8.07833 95.3789C10.6646 97.0411 13.711 98 16.9722 98L77.0278 98C80.289 98 83.3354 97.0411 85.9217 95.3789L49.7438 58.3532L49.2559 57.9284C47.8902 56.923 46.0467 56.9357 44.6931 57.9666ZM94 17.6944C94 7.92207 86.4013 0 77.0278 0L16.9722 0C7.59872 0 0 7.92207 0 17.6944L0 80.3056C0 83.7195 0.927368 86.9076 2.5338 89.6111L38.7687 52.5253L39.476 51.8572C43.8361 48.0599 50.2114 48.0705 54.5603 51.8889L55.2313 52.5253L91.4662 89.6111C93.0726 86.9076 94 83.7195 94 80.3056L94 17.6944ZM63.9722 42.1944C58.2039 42.1944 53.5278 37.3193 53.5278 31.3056C53.5278 25.2918 58.2039 20.4167 63.9722 20.4167C69.7405 20.4167 74.4167 25.2918 74.4167 31.3056C74.4167 37.3193 69.7405 42.1944 63.9722 42.1944Z" fill="#5B9BB5"/>
</svg>

                <div className="flex flex-col items-center gap-4 w-full">
                  <h3 className="font-roboto font-semibold text-[24px] leading-[32px] text-center text-[#171A20]">Photo</h3>
                  <p className="font-plus-jakarta-sans font-normal text-[16px] leading-[24px] text-center text-[#808080]">
                    Capture, edit, and organize your photos with ease. Turn moments into lasting memories, enhance image quality
                  </p>
                </div>
              </div>
              {/* Card: Template */}
              <div className="w-full md:w-[352px] box-border flex flex-col items-center gap-6 p-6 md:px-6 md:py-[30px] bg-white border border-[#D6D6D6] rounded-[20px]">
              <svg width="94" height="98" viewBox="0 0 94 98" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.9722 0C7.59872 0 0 7.92207 0 17.6944L0 44.9167L94 44.9167L94 17.6944C94 7.92207 86.4013 0 77.0278 0L16.9722 0ZM94 53.0833L50.9167 53.0833L50.9167 98H77.0278C86.4013 98 94 90.0779 94 80.3056V53.0833ZM43.0833 53.0833L0 53.0833L0 80.3056C0 90.0779 7.59872 98 16.9722 98L43.0833 98L43.0833 53.0833Z" fill="#5B9BB5"/>
</svg>

                <div className="flex flex-col items-center gap-4 w-full">
                  <h3 className="font-roboto font-semibold text-[24px] leading-[32px] text-center text-[#171A20]">Template</h3>
                  <p className="font-plus-jakarta-sans font-normal text-[16px] leading-[24px] text-center text-[#808080]">
                    Use ready-made templates to create professional documents in minutes. Customize designs for resumes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      {/* Work Anywhere Section (Figma 6628:1266) */}
      <section className="w-full flex justify-center" style={{
        background: 'linear-gradient(192.87deg, #D8D3FF 45.65%, #FAF9FF 76.87%)'
      }}>
        <div className="w-full max-w-[1440px] flex flex-col items-center py-16">
          {/* Top content */}
          <div className="w-[1120px] flex flex-col items-center gap-[16px]">
            {/* Tag */}
            <div className="box-border flex flex-row justify-center items-center gap-[10px] p-[10px] rounded-[8px] border-2 border-[#271CEB]">
              <div className="w-6 h-6" />
              <span className="font-roboto font-bold text-[16px] leading-[19px] text-[#6652FF]">Work Anywhere</span>
            </div>
            {/* Heading + Sub */}
            <div className="flex flex-col items-center gap-[18px]">
              <h2 className="w-[651px] max-w-full font-roboto font-bold text-[48px] md:text-[72px] leading-[1.18] text-center text-[#171A20]">
                Simplify
                <br />Documents, Sign,
                <br />Collaborate
                <br />Anywhere
              </h2>
              <p className="w-[651px] max-w-full font-roboto font-normal text-[18px] leading-[28px] text-center text-[#171A20]">
                Manage, share, and sign your documents securely in one platform - integrated,
                automated, and built for teams that move fast and work remotely.
              </p>
            </div>
          </div>

          {/* Image panel */}
          <div className="mt-12 w-[1120px] h-[520px] rounded-[12px] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/sesign/work-anywhere-hero.png" alt="Work Anywhere" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Testimonials Section (Figma 6628:1280) */}
      <section className="w-full flex justify-center bg-white">
        <div className="w-full max-w-[1440px] flex flex-col items-center gap-14 py-[100px] px-[15px]">
          {/* Header */}
          <div className="w-[1120px] max-w-full flex flex-col items-center gap-5">
            <h2 className="w-full text-center font-roboto font-bold text-[48px] leading-[56px] text-[#171A20]">
              Experiences Shared by Our Clients
            </h2>
            <p className="w-[900px] max-w-full text-center font-roboto text-[18px] leading-[28px] text-[#171A20]">
              The team at WDK AI ToolKit provided unparalleled support throughout our project. Their expertise and dedication were evident from day one, helping us navigate complex challenges.
            </p>
          </div>

          {/* Cards */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {/* Card 1 */}
            <div className="w-[352px] box-border flex flex-col gap-6 p-5 bg-white border border-[#D6D6D6] rounded-[20px]">
              <div className="w-12 h-12">
                <svg viewBox="0 0 48 48" className="w-12 h-12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 36h-8c-2.2 0-4-1.8-4-4V20c0-6.6 5.4-12 12-12v8c-2.2 0-4 1.8-4 4v4h4v12zm24 0h-8c-2.2 0-4-1.8-4-4V20c0-6.6 5.4-12 12-12v8c-2.2 0-4 1.8-4 4v4h4v12z" fill="#3328BF"/>
                </svg>
              </div>
              <p className="font-roboto text-[16px] leading-[26px] text-[#171A20]">
                The SeSign  offers a smooth, efficient, and secure platform for signing documents digitally.
              </p>
              <div className="flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/figma/sesign/testimonials/avatar-uk.png" alt="Artemisia Udinese" className="w-[54px] h-[54px] rounded-full object-cover" />
                <div className="flex flex-col">
                  <span className="font-roboto font-medium text-[16px] leading-[24px] text-[#171A20]">Artemisia Udinese</span>
                  <span className="font-roboto text-[12px] leading-[18px] text-[#808080]">United Kingdom</span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="w-[352px] box-border flex flex-col gap-6 p-5 bg-white border border-[#D6D6D6] rounded-[20px]">
              <div className="w-12 h-12">
                <svg viewBox="0 0 48 48" className="w-12 h-12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 36h-8c-2.2 0-4-1.8-4-4V20c0-6.6 5.4-12 12-12v8c-2.2 0-4 1.8-4 4v4h4v12zm24 0h-8c-2.2 0-4-1.8-4-4V20c0-6.6 5.4-12 12-12v8c-2.2 0-4 1.8-4 4v4h4v12z" fill="#3328BF"/>
                </svg>
              </div>
              <p className="font-roboto text-[16px] leading-[26px] text-[#171A20]">
                Process of uploading a document, applying signatures, and sending it off is seamless and efficient, saving both time
              </p>
              <div className="flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/figma/sesign/testimonials/avatar-us.png" alt="Artemisia Udinese" className="w-[54px] h-[54px] rounded-full object-cover" />
                <div className="flex flex-col">
                  <span className="font-roboto font-medium text-[16px] leading-[24px] text-[#171A20]">Artemisia Udinese</span>
                  <span className="font-roboto text-[12px] leading-[18px] text-[#808080]">United State</span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="w-[352px] box-border flex flex-col gap-6 p-5 bg-white border border-[#D6D6D6] rounded-[20px]">
              <div className="w-12 h-12">
                <svg viewBox="0 0 48 48" className="w-12 h-12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 36h-8c-2.2 0-4-1.8-4-4V20c0-6.6 5.4-12 12-12v8c-2.2 0-4 1.8-4 4v4h4v12zm24 0h-8c-2.2 0-4-1.8-4-4V20c0-6.6 5.4-12 12-12v8c-2.2 0-4 1.8-4 4v4h4v12z" fill="#3328BF"/>
                </svg>
              </div>
              <p className="font-roboto text-[16px] leading-[26px] text-[#171A20]">
                Overall, if you need a reliable, secure, and easy-to-use e-signature solution, this website offers great value
              </p>
              <div className="flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/figma/sesign/testimonials/avatar-ca.png" alt="Artemisia Udinese" className="w-[54px] h-[54px] rounded-full object-cover" />
                <div className="flex flex-col">
                  <span className="font-roboto font-medium text-[16px] leading-[24px] text-[#171A20]">Artemisia Udinese</span>
                  <span className="font-roboto text-[12px] leading-[18px] text-[#808080]">Canada</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Section (Figma 6628:1374) */}
      <section className="w-full flex justify-center bg-white">
        <div className="w-full max-w-[1120px] flex flex-col items-center gap-14 py-[80px] px-[15px]">
          {/* Tag */}
          <div className="flex items-center gap-2 px-5 py-2 rounded-lg border-2 border-[#271CEB]">
            <div className="w-4 h-4 rounded-full bg-[#271CEB]" />
            <span className="font-inter font-medium text-[24px] leading-[29px] text-[#271CEB]">Popular Integrations</span>
          </div>
          {/* Heading + Sub */}
          <div className="w-full flex flex-col items-center gap-4">
            <h2 className="w-full text-center font-roboto font-bold text-[48px] leading-[56px] text-[#171A20]">
              Connect Seamlessly
              <br />With Tools You Already
              <br />Trust
            </h2>
            <p className="w-[509px] max-w-full text-center font-inter font-medium text-[18px] leading-[22px] text-[#171A20]">
              Enhance your workflow by integrating with leading platforms your team uses every day.
            </p>
          </div>
          {/* Icons row */}
          <div className="w-full flex flex-row justify-between items-end gap-[30px]">
            {/* Shield */}
            <div className="w-[144px] h-[144px] bg-white border border-[#D6D6D6] rounded-[15px] flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/sesign/integrations/icon-shield.png" alt="shield" className="w-20 h-22 object-contain" />
            </div>
            {/* Excel "X" */}
            <div className="w-[144px] h-[144px] bg-white border border-[#D6D6D6] rounded-[15px] flex items-center justify-center px-[29px] py-[32px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/sesign/integrations/icon-excel.png" alt="Excel" className="w-[86px] h-[79px] object-contain" />
            </div>
            {/* Notes */}
            <div className="w-[144px] h-[144px] bg-white border border-[#D6D6D6] rounded-[15px] flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/sesign/integrations/icon-notes.png" alt="Notes" className="w-[86px] h-[79px] object-contain" />
            </div>
            {/* Outlook */}
            <div className="w-[144px] h-[144px] bg-white border border-[#D6D6D6] rounded-[15px] flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/sesign/integrations/icon-outlook.png" alt="Outlook" className="w-[94px] h-[68px] object-contain" />
            </div>
            {/* OneDrive */}
            <div className="w-[144px] h-[144px] bg-white border border-[#D6D6D6] rounded-[15px] flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/sesign/integrations/icon-onedrive.png" alt="OneDrive" className="w-[86px] h-[68px] object-contain" />
            </div>
            {/* eSign */}
            <div className="w-[144px] h-[144px] bg-white border border-[#D6D6D6] rounded-[15px] flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/sesign/integrations/icon-esign.png" alt="eSign" className="w-[94px] h-[68px] object-contain" />
            </div>
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
              <path d="M0 0H1294V275H0V0Z" fill="rgba(255, 255, 255, 0.15)"/>
            </svg>
          </div>
          <div className="absolute -top-[166px] -left-[205px] opacity-24">
            <svg width="1957" height="1524" viewBox="0 0 1957 1524" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0H1957V1524H0V0Z" fill="rgba(255, 255, 255, 0.24)"/>
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
                Secure, Sign, Store - All In One Platform
              </h2>
              <p className="w-full text-center font-roboto font-medium text-[18px] leading-[28px] text-[#171A20]">
                Join thousands of teams who trust us to simplify their document workflows with secure e-signatures and powerful automation tools.
              </p>
            </div>

            {/* App store badges */}
            <div className="flex items-center gap-6">
              {/* Google Play Badge */}
              <div className="w-[182px] h-[50px] bg-black rounded-[6px] flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/figma/sesign/download-section/google-play-badge.png" alt="Get it on Google Play" className="w-[182px] h-[50px] object-contain" />
              </div>

              {/* App Store Badge */}
              <div className="w-[180px] h-[52px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/figma/sesign/download-section/app-store-badge.png" alt="Download on the App Store" className="w-[180px] h-[52px] object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


