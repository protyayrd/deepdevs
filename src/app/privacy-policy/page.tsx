import Link from 'next/link';
import Footer from '@/components/Footer';
import Logo from '@/components/Logo';

export default function PrivacyPolicyPage() {
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
        {/* Top Section - Privacy Policy Title and Description */}
        <section className="bg-[#fafff5] w-full py-[100px] pb-[60px]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <h1 className="font-inter font-medium text-[40px] leading-normal text-[#091610] max-w-full">
                Privacy Policy
              </h1>
              <p className="font-inter font-normal text-[16px] leading-[1.6] text-[#11271d] max-w-[629px]">
                Your privacy is important to us. This policy explains how we collect, use, and protect your personal information when you use our services.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="w-full py-[100px]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[100px]">
            <div className="flex flex-col gap-12">
              {/* Introduction */}
              <div className="flex flex-col gap-6">
                <h2 className="font-inter font-medium text-[32px] leading-normal text-[#091610]">
                  Introduction
                </h2>
                <div className="font-inter font-normal leading-[1.6] text-[18px] text-[#11271d]">
                  <p className="mb-4">
                    At DeepDevs, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                  </p>
                  <p>
                    By using our services, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.
                  </p>
                </div>
              </div>

              {/* Information We Collect */}
              <div className="flex flex-col gap-6">
                <h2 className="font-inter font-medium text-[32px] leading-normal text-[#091610]">
                  Information We Collect
                </h2>
                <div className="font-inter font-normal leading-[1.6] text-[18px] text-[#11271d]">
                  <p className="mb-4">
                    We collect information that you provide directly to us, including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Personal identification information (name, email address, phone number)</li>
                    <li>Account information and credentials</li>
                    <li>Payment and billing information</li>
                    <li>Communication preferences and feedback</li>
                    <li>Information you provide when contacting our support team</li>
                  </ul>
                  <p className="mt-4">
                    We also automatically collect certain information when you visit our website, such as your IP address, browser type, device information, and usage patterns through cookies and similar tracking technologies.
                  </p>
                </div>
              </div>

              {/* How We Use Your Information */}
              <div className="flex flex-col gap-6">
                <h2 className="font-inter font-medium text-[32px] leading-normal text-[#091610]">
                  How We Use Your Information
                </h2>
                <div className="font-inter font-normal leading-[1.6] text-[18px] text-[#11271d]">
                  <p className="mb-4">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Process transactions and send related information</li>
                    <li>Send you technical notices, updates, and support messages</li>
                    <li>Respond to your comments, questions, and requests</li>
                    <li>Monitor and analyze trends, usage, and activities</li>
                    <li>Detect, prevent, and address technical issues and security threats</li>
                    <li>Personalize your experience and provide tailored content</li>
                  </ul>
                </div>
              </div>

              {/* Information Sharing */}
              <div className="flex flex-col gap-6">
                <h2 className="font-inter font-medium text-[32px] leading-normal text-[#091610]">
                  Information Sharing and Disclosure
                </h2>
                <div className="font-inter font-normal leading-[1.6] text-[18px] text-[#11271d]">
                  <p className="mb-4">
                    We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>With service providers who assist us in operating our website and conducting our business</li>
                    <li>When required by law or to respond to legal process</li>
                    <li>To protect our rights, property, or safety, or that of our users</li>
                    <li>In connection with a merger, acquisition, or sale of assets (with notice to users)</li>
                    <li>With your explicit consent</li>
                  </ul>
                </div>
              </div>

              {/* Data Security */}
              <div className="flex flex-col gap-6">
                <h2 className="font-inter font-medium text-[32px] leading-normal text-[#091610]">
                  Data Security
                </h2>
                <div className="font-inter font-normal leading-[1.6] text-[18px] text-[#11271d]">
                  <p className="mb-4">
                    We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
                  </p>
                  <p>
                    While we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security. You are responsible for maintaining the confidentiality of your account credentials.
                  </p>
                </div>
              </div>

              {/* Your Rights */}
              <div className="flex flex-col gap-6">
                <h2 className="font-inter font-medium text-[32px] leading-normal text-[#091610]">
                  Your Rights and Choices
                </h2>
                <div className="font-inter font-normal leading-[1.6] text-[18px] text-[#11271d]">
                  <p className="mb-4">
                    You have the right to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Access and receive a copy of your personal information</li>
                    <li>Rectify inaccurate or incomplete information</li>
                    <li>Request deletion of your personal information</li>
                    <li>Object to or restrict processing of your information</li>
                    <li>Data portability (receive your data in a structured format)</li>
                    <li>Withdraw consent at any time where we rely on consent</li>
                    <li>Opt-out of marketing communications</li>
                  </ul>
                  <p className="mt-4">
                    To exercise these rights, please contact us using the information provided in the Contact Us section.
                  </p>
                </div>
              </div>

              {/* Cookies */}
              <div className="flex flex-col gap-6">
                <h2 className="font-inter font-medium text-[32px] leading-normal text-[#091610]">
                  Cookies and Tracking Technologies
                </h2>
                <div className="font-inter font-normal leading-[1.6] text-[18px] text-[#11271d]">
                  <p className="mb-4">
                    We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier.
                  </p>
                  <p>
                    You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
                  </p>
                </div>
              </div>

              {/* Changes to Policy */}
              <div className="flex flex-col gap-6">
                <h2 className="font-inter font-medium text-[32px] leading-normal text-[#091610]">
                  Changes to This Privacy Policy
                </h2>
                <div className="font-inter font-normal leading-[1.6] text-[18px] text-[#11271d]">
                  <p>
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date. You are advised to review this Privacy Policy periodically for any changes.
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="flex flex-col gap-6">
                <h2 className="font-inter font-medium text-[32px] leading-normal text-[#091610]">
                  Contact Us
                </h2>
                <div className="font-inter font-normal leading-[1.6] text-[18px] text-[#11271d]">
                  <p className="mb-4">
                    If you have any questions about this Privacy Policy, please contact us:
                  </p>
                  <ul className="list-none space-y-2 ml-4">
                    <li>Email: privacy@deepdevs.com</li>
                    <li>Address: 50 London Place, West Portal, Western London, UK</li>
                    <li>
                      <Link href="/contact-us" className="text-[#3e66f3] hover:underline">
                        Contact Us Page
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Last Updated */}
              <div className="flex flex-col gap-6 pt-6 border-t border-gray-200">
                <p className="font-inter font-normal text-[16px] leading-[1.6] text-[#878787]">
                  Last Updated: January 2025
                </p>
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

