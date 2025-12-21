import Link from 'next/link';
import Footer from '@/components/Footer';
import Logo from '@/components/Logo';

export default function TermsAndConditionsPage() {
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
              <Link className="hover:text-gray-900 transition-colors" href="/contact-us">Contact Us</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="pt-20">
        {/* Top Section - Terms & Conditions Title and Description */}
        <section className="bg-[#f8ffee] w-full py-[100px] pb-[60px]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-start justify-center gap-4 text-left">
              <h1 className="font-open-sans font-bold text-[40px] leading-[1.2] text-[#171a20] w-full capitalize">
                Terms & Conditions
              </h1>
              <p className="font-poppins font-normal text-[16px] leading-[28px] text-[#171a20] w-full">
                We're here to help with any questions or concerns
              </p>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="w-full py-16">
          <div className="max-w-[1124px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-20">
              {/* First Column of Sections */}
              <div className="flex flex-col gap-10">
                {/* Welcome Section */}
                <div className="flex flex-col gap-10">
                  <p className="font-inter font-normal leading-[1.5] text-black w-full">
                    <span className="font-inter font-medium text-[#171a20] text-[32px]">Welcome to DeepDevs!</span>
                    <span className="text-[22px]"> These Terms & Conditions govern your use of our website, apps, and plugins. By accessing or using DeepDevs, you agree to be bound by these Terms. If you do not agree, please do not use our services.</span>
                  </p>

                  {/* Accounts and Registration */}
                  <div className="flex flex-col gap-4">
                    <h2 className="font-inter font-medium text-[32px] leading-normal text-[#171a20] w-full">
                      Accounts and Registration
                    </h2>
                    <div className="font-inter font-normal leading-[1.5] text-[22px] text-black w-full">
                      <p className="mb-0">To access certain features, you may need to create an account with accurate and up-to-date information.</p>
                      <p className="mb-0">You are responsible for maintaining the confidentiality of your account credentials.</p>
                      <p>DeepDevs is not responsible for any activity that occurs under your account due to your failure to safeguard your login details.</p>
                    </div>
                  </div>

                  {/* Purchases and Payments */}
                  <div className="flex flex-col gap-4">
                    <h2 className="font-inter font-medium text-[32px] leading-normal text-[#171a20] w-full">
                      Purchases and Payments
                    </h2>
                    <div className="font-inter font-normal leading-[1.5] text-[22px] text-black w-full">
                      <p className="mb-0">Some apps and plugins may require payment. All payments are processed securely through third-party providers.</p>
                      <p className="mb-0">Prices may change at any time without notice.</p>
                      <p>Refunds will be handled according to our Refund Policy</p>
                    </div>
                  </div>
                </div>

                {/* Intellectual Property */}
                <div className="flex flex-col gap-4">
                  <h2 className="font-inter font-medium text-[32px] leading-normal text-[#171a20] w-full">
                    Intellectual Property
                  </h2>
                  <div className="font-inter font-normal leading-[1.5] text-[22px] text-black w-full">
                    <p className="mb-0">All content, designs, code, apps, and plugins available on DeepDevs are owned or licensed by us.</p>
                    <p className="mb-0">You are granted a limited, non-exclusive license to use our apps and plugins for personal or business purposes.</p>
                    <p>You may not copy, distribute, or modify our products without written permission.</p>
                  </div>
                </div>
              </div>

              {/* Second Column of Sections */}
              <div className="flex flex-col gap-10">
                {/* Third-Party Services */}
                <div className="flex flex-col gap-4">
                  <h2 className="font-inter font-medium text-[32px] leading-normal text-[#171a20] w-full">
                    Third-Party Services
                  </h2>
                  <ul className="font-inter font-normal leading-[1.5] text-[22px] text-black w-full list-disc list-inside space-y-2 ml-4">
                    <li>
                      <span>Some of our apps or plugins may integrate with third-party platforms.</span>
                    </li>
                    <li>
                      <span>We are not responsible for the content, terms, or practices of third-party services.</span>
                    </li>
                  </ul>
                </div>

                {/* Limitation of Liability */}
                <div className="flex flex-col gap-4">
                  <h2 className="font-inter font-medium text-[32px] leading-normal text-[#171a20] w-full">
                    Limitation of Liability
                  </h2>
                  <ul className="font-inter font-normal leading-[1.5] text-[22px] text-black w-full list-disc list-inside space-y-2 ml-4">
                    <li>
                      <span>DeepDevs provides its services "as is" and makes no warranties, express or implied.</span>
                    </li>
                    <li>
                      <span>We are not liable for any direct, indirect, incidental, or consequential damages arising from the use of our website, apps, or plugins.</span>
                    </li>
                  </ul>
                </div>

                {/* Termination */}
                <div className="flex flex-col gap-4">
                  <h2 className="font-inter font-medium text-[32px] leading-normal text-[#171a20] w-full">
                    Termination
                  </h2>
                  <div className="font-inter font-normal leading-[1.5] text-[22px] text-black w-full">
                    <p className="mb-0">We reserve the right to suspend or terminate your account or access to our services if you violate these Terms.</p>
                    <p>Upon termination, your license to use our apps and plugins will immediately end.</p>
                  </div>
                </div>

                {/* Changes to the Terms */}
                <div className="flex flex-col gap-4">
                  <h2 className="font-inter font-medium text-[32px] leading-normal text-[#171a20] w-full">
                    Changes to the Terms
                  </h2>
                  <div className="font-inter font-normal leading-[1.5] text-[22px] text-black w-full">
                    <p className="mb-0">We may update these Terms from time to time.</p>
                    <p>Any changes will be effective immediately once posted on this page. Continued use of our services means you accept the updated Terms.</p>
                  </div>
                </div>

                {/* Governing Law */}
                <div className="flex flex-col gap-4">
                  <h2 className="font-inter font-medium text-[32px] leading-normal text-[#171a20] w-full">
                    Governing Law
                  </h2>
                  <p className="font-inter font-normal leading-[1.5] text-[22px] text-black w-full">
                    These Terms will be governed by and interpreted under the laws of [Insert Your Country/Region]. Any disputes will be handled by the courts
                  </p>
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

