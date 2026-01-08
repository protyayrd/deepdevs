import { getAppLinks, getSiteContent } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

export default async function AppsPage() {
  const allLinks = await getAppLinks();
  const siteContents = await getSiteContent('apps', 'hero');
  // Sort by order
  const validLinks = allLinks.sort((a, b) => a.order - b.order);

  const heroContent = siteContents.find(c => c.section === 'hero')?.content;

  const heroTag = heroContent?.tag || 'We Stand With Innovation';
  const heroTitle = heroContent?.title || 'We make your digital world <br class="hidden lg:block" /><span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Smarter & Secure</span>';
  const heroDesc = heroContent?.description || 'Discover our ecosystem of apps designed to enhance your productivity, creativity, and lifestyle. Secure, fast, and built for you.';
  const btn1Text = heroContent?.buttonText || 'Explore Apps';
  const btn1Link = heroContent?.buttonLink || '#apps';
  const btn2Text = heroContent?.secondaryButtonText || 'Contact Us';
  const btn2Link = heroContent?.secondaryButtonLink || '/contact-us';
  const heroImage = heroContent?.heroImage || heroContent?.backgroundImage || validLinks[0]?.mockupImage;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 font-sans text-gray-900 pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-white pt-20 pb-12 lg:pt-28 lg:pb-20">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]"></div>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium text-xs md:text-sm mb-4">
                  <span className="flex h-2 w-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
                  {heroTag}
                </div>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-4 leading-tight" dangerouslySetInnerHTML={{ __html: heroTitle }} />

                <p className="text-base md:text-xl text-gray-600 mb-6 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  {heroDesc}
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                  <a href={btn1Link} className="px-6 py-3 md:px-8 md:py-4 bg-indigo-600 text-white rounded-full font-bold shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-sm md:text-base">
                    {btn1Text}
                  </a>
                  <a href={btn2Link} className="px-6 py-3 md:px-8 md:py-4 bg-white text-gray-900 border border-gray-200 rounded-full font-bold hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 text-sm md:text-base">
                    {btn2Text}
                  </a>
                </div>
              </div>
              <div className="relative h-[400px] md:h-[500px] lg:h-[650px] flex items-center justify-center mt-8 lg:mt-0 w-full">
                {/* 6-Image Collage Logic */}
                <div className="relative w-full h-full perspective-1000">
                  {(() => {
                    // Ensure we have at least 6 items for the collage by repeating if necessary
                    const heroApps = [...validLinks];
                    while (heroApps.length < 6 && heroApps.length > 0) {
                      heroApps.push(...validLinks);
                    }
                    const collageApps = heroApps.slice(0, 6);

                    // Position styles for 6 items (Mobile / Desktop)
                    const positions = [
                      "z-20 top-[10%] left-[5%] w-[35%] -rotate-6", // 1. Top Left
                      "z-10 top-[-5%] left-[32%] w-[32%] opacity-90", // 2. Top Center (Back)
                      "z-20 top-[15%] right-[5%] w-[35%] rotate-6", // 3. Top Right
                      "z-30 bottom-[10%] left-[10%] w-[38%] rotate-3", // 4. Bottom Left (Front)
                      "z-10 bottom-[0%] left-[35%] w-[32%] -rotate-3 opacity-90", // 5. Bottom Center
                      "z-30 bottom-[15%] right-[2%] w-[38%] -rotate-6", // 6. Bottom Right
                    ];

                    return collageApps.map((app, i) => (
                      <div key={`hero-collage-${i}`} className={`absolute transition-all duration-500 hover:z-50 hover:scale-110 ${positions[i]}`}>
                        <div className="relative aspect-[9/19] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl border-[4px] md:border-[6px] border-gray-900 bg-gray-800">
                          {app.mockupImage ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={app.mockupImage} alt={app.appName} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white/50 text-xs">
                              Mockup
                            </div>
                          )}
                        </div>
                      </div>
                    ));
                  })()}

                  {/* Decorative Elements */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-tr from-blue-100/50 to-purple-100/50 rounded-full blur-3xl -z-10 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Apps List Section */}
        <div id="apps" className="flex flex-col gap-0">
          {validLinks.map((app, index) => (
            <section key={app.id} className={`py-12 md:py-20 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} relative`}>
              {/* Background elements */}
              <div className={`absolute top-0 w-full h-full overflow-hidden pointer-events-none opacity-30`}>
                <div className={`absolute w-[800px] h-[800px] bg-gradient-to-r ${index % 2 === 0 ? 'from-blue-50 to-transparent right-[-200px]' : 'from-purple-50 to-transparent left-[-200px]'} rounded-full blur-3xl`} />
              </div>

              <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-20 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>

                  {/* Content Side */}
                  <div className="flex-1 text-center lg:text-left">
                    <div className="inline-flex items-center gap-3 mb-4 bg-white p-1.5 pr-4 rounded-full shadow-sm border border-gray-100">
                      {app.appIcon ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={app.appIcon} alt={app.appName} className="w-8 h-8 rounded-full object-cover shadow-sm" />
                      ) : (
                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xs">
                          {app.appName[0].toUpperCase()}
                        </div>
                      )}
                      <span className="font-bold text-gray-800 tracking-tight text-sm">{app.appDisplayName}</span>
                    </div>

                    <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                      {app.appDisplayName}
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6 max-w-xl mx-auto lg:mx-0">
                      {app.appDescription}
                    </p>

                    {/* Features List */}
                    {app.features && app.features.length > 0 && (
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6 text-left max-w-lg mx-auto lg:mx-0">
                        {app.features.map((feature, i) => (
                          <li key={i} className="flex items-center text-gray-700 text-sm md:text-base">
                            <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Buttons & QR Section */}
                    <div className="flex flex-col items-center justify-center lg:items-start gap-6 mb-8">
                      {/* Action Buttons */}
                      <div className="flex flex-col gap-3 w-full sm:w-auto">
                        <a href={app.websiteUrl || '#'} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded-xl font-medium shadow-lg hover:bg-gray-800 transition-all hover:-translate-y-0.5 text-sm md:text-base w-full sm:w-auto">
                          Visit Website
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                        </a>
                        {(app.appStoreUrl || app.playStoreUrl) && (
                          <div className="flex gap-2 justify-center sm:justify-start">
                            {app.appStoreUrl && (
                              <a href={app.appStoreUrl} target="_blank" title="App Store" className="p-2.5 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-gray-900"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.61-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.18 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.84 1.53-2.95 1.46-.14-1.2.35-2.31 1.05-3.15z" /></svg>
                              </a>
                            )}
                            {app.playStoreUrl && (
                              <a href={app.playStoreUrl} target="_blank" title="Play Store" className="p-2.5 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-gray-900"><path d="M3,20.5V3.5C3,2.91,3.34,2.39,3.84,2.15L13.69,12L3.84,21.85C3.34,21.6,3,21.09,3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.3,13.1L18.06,14.4L15.39,11.73L18.06,9.07L20.3,10.37C20.84,10.68,21.2,11.19,21.2,11.73C21.2,12.28,20.84,12.79,20.3,13.1M16.81,8.35L14.54,10.63L6.05,2.13L16.81,8.35Z" /></svg>
                              </a>
                            )}
                          </div>
                        )}
                      </div>



                      {/* Redesigned QR Section */}
                      {app.qrCode && (
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-4 bg-white p-2.5 pr-6 rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all group cursor-default">
                            <div className="w-20 h-20 relative bg-white rounded-lg overflow-hidden shrink-0">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={app.qrCode} alt="QR Code" className="w-full h-full object-contain p-0.5 group-hover:scale-105 transition-transform duration-300" />
                            </div>
                            <div className="flex flex-col text-left">
                              <span className="text-gray-500 text-xs font-medium leading-none mb-1">Scan to</span>
                              <span className="text-gray-900 text-sm font-bold leading-tight">Download</span>
                              <span className="text-gray-900 text-sm font-bold leading-tight">this app</span>
                            </div>
                          </div>

                          {/* Platform Icons */}
                          <div className="flex items-center gap-3 text-gray-800">
                            {/* Mobile Icon */}
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                            {/* Tablet Icon */}
                            <svg className="w-6 h-6 hidden xs:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                            {/* Desktop Icon */}
                            <svg className="w-6 h-6 hidden sm:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Image Side */}
                  <div className="flex-1 w-full flex justify-center perspective-1000 group">
                    <div className={`relative w-[220px] xs:w-[260px] md:w-[320px] aspect-[4/8] transition-transform duration-700 ease-out group-hover:rotate-y-12 ${index % 2 === 0 ? '-rotate-y-6' : 'rotate-y-6'}`}>
                      {/* Phone Border */}
                      <div className="absolute inset-0 bg-gray-900 rounded-[2.5rem] shadow-2xl border-[10px] border-gray-900 overflow-hidden z-20">
                        {app.mockupImage ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={app.mockupImage} alt={`${app.appName} mockup`} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold opacity-80">
                            Mockup
                          </div>
                        )}
                      </div>
                      {/* Shadow/Glow */}
                      <div className={`absolute top-8 ${index % 2 === 0 ? '-right-8' : '-left-8'} w-full h-full bg-indigo-500/20 rounded-[2.5rem] blur-xl -z-10`} />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}

          {validLinks.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-lg text-gray-500">No apps available yet.</h3>
              <p className="text-gray-400 mt-2 text-sm">Add them from the admin panel.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
