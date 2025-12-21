import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';
import Logo from '@/components/Logo';

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Header with Liquid Glass Effect - Same as Homepage */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-morphism border-b border-white/20 shadow-lg">
        <div className="w-[85%] mx-auto px-6 md:px-10 lg:px-16 py-[1.2rem]">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <Logo />
            </Link>
            <nav className="hidden md:flex items-center gap-8 text-sm text-gray-700">
              <a className="hover:text-gray-900 transition-colors" href="#plugins">Our Plugins</a>
              <Link className="text-indigo-600 font-medium" href="/apps">Our Apps</Link>
              <a className="hover:text-gray-900 transition-colors" href="#support">Support</a>
              <Link className="hover:text-gray-900 transition-colors" href="/about-us">About Us</Link>
              <a className="hover:text-gray-900 transition-colors" href="#contact">Contact Us</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="pt-20">
        {/* Top Section - About us Title and Description */}
        <section className="bg-[#fafff5] w-full py-[100px] pb-[60px]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <h1 className="font-inter font-medium text-[40px] leading-normal text-[#091610] max-w-full">
                About us
              </h1>
              <p className="font-inter font-normal text-[16px] leading-[1.6] text-[#11271d] max-w-[629px]">
                Software is our canvas, and innovation is our paint. We invest years of creativity and expertise to build products people truly love. This isn't just a paycheck — it's our passion, our art, and our promise
              </p>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="w-full py-[100px]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[100px]">
            <div className="flex flex-col gap-12">
              {/* First Row - Text and Image */}
              <div className="flex flex-col lg:flex-row gap-12 items-center">
                {/* Left Content - Text */}
                <div className="flex-1 flex flex-col gap-8 items-start justify-center">
                  <div className="flex flex-col gap-6 items-start justify-center w-full">
                    <h2 className="font-inter font-medium text-[32px] leading-normal text-[#091610] w-full">
                      Know ourselves who we are
                    </h2>
                    <div className="font-inter font-normal leading-[1.5] text-[22px] text-black w-full">
                      <p className="mb-0">
                        Your success, built on our dedication. Every product we create is crafted with care, precision, and years of expertise. We believe that true innovation comes from commitment — a relentless focus on quality, detail, and the people we serve.
                      </p>
                      <p className="mb-0">&nbsp;</p>
                      <p>
                        Our dedication isn't just about building software; it's about building trust, empowering your goals, and helping you achieve lasting success
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Content - Image */}
                <div className="flex-1 h-[478px] relative rounded-[20px] overflow-hidden">
                  <Image
                    src="/about-us-image.png"
                    alt="About Us"
                    fill
                    className="object-cover object-center rounded-[20px]"
                    priority
                  />
                </div>
              </div>

              {/* Second Row - Mission and Vision Boxes */}
              <div className="flex flex-col lg:flex-row gap-12 items-stretch">
                {/* Our Mission Box */}
                <div className="flex-1 bg-[#f1f1f1] rounded-[20px] p-6 flex flex-col gap-4 items-start justify-center">
                  <h3 className="font-inter font-medium text-[40px] leading-normal text-[#333333] w-full">
                    Our Mission
                  </h3>
                  <div className="font-inter font-normal leading-[1.5] text-[22px] text-black w-full">
                    <p className="mb-0">
                      Our mission is to transform ideas into meaningful digital experiences that empower people and businesses to thrive. We are dedicated to crafting software with precision
                    </p>
                    <p>
                      Through innovation, integrity, and relentless dedication, we aim to fuel success for our customers, because their growth is the true measure of our work.
                    </p>
                  </div>
                </div>

                {/* Our Vision Box */}
                <div className="flex-1 bg-[#f1f1f1] rounded-[20px] p-6 h-[376px] flex flex-col gap-4 items-start justify-center">
                  <h3 className="font-inter font-medium text-[40px] leading-normal text-[#333333] w-full">
                    Our vision
                  </h3>
                  <div className="font-inter font-normal leading-[1.5] text-[22px] text-black w-full">
                    <p className="mb-0">
                      Our vision is to shape a future where technology and creativity work hand in hand to make life simpler, smarter, and more meaningful.
                    </p>
                    <p>
                      We aspire to be a trusted global leader in delivering innovative software that empowers individuals, transforms businesses, and drives positive change in the world.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer - Same as Homepage */}
      <Footer />
    </div>
  );
}

