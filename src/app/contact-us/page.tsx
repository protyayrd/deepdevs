'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';
import Logo from '@/components/Logo';

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailAddress: '',
    subject: '',
    message: '',
    isRobot: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      isRobot: e.target.checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          phoneNumber: '',
          emailAddress: '',
          subject: '',
          message: '',
          isRobot: false,
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

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
        {/* Top Section - Get in Touch Title and Description */}
        <section className="bg-[#f8ffee] w-full py-[100px] pb-[60px]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-start justify-center gap-4 text-left">
              <h1 className="font-open-sans font-bold text-[40px] leading-[1.2] text-[#171a20] w-full capitalize">
                Get in Touch
              </h1>
              <p className="font-poppins font-normal text-[16px] leading-[28px] text-[#171a20] w-full">
                We're here to help with any questions or concerns
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="w-full py-16">
          <div className="max-w-[818px] mx-auto px-4 sm:px-6 lg:px-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-12">
              {/* Contact us Heading */}
              <div className="flex flex-col gap-6 items-start">
                <h2 className="font-inter font-bold text-[32px] leading-[41.6px] text-[#303030] w-full">
                  Contact us
                </h2>
              </div>

              {/* Form Fields */}
              <div className="flex flex-col gap-6 items-start justify-center w-full">
                {/* First Name and Last Name - Side by Side */}
                <div className="flex flex-wrap gap-4 items-start w-full">
                  <div className="flex-1 flex flex-col gap-1 items-start min-w-[183px]">
                    <label className="font-nunito font-normal text-[16px] leading-[24px] text-[#062129] w-full">
                      First name <span className="text-[#ff4e36]">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter here..."
                      required
                      className="bg-[#f1f1f1] w-full px-4 py-[14px] rounded-[8px] font-nunito font-normal text-[16px] leading-[24px] text-[#878787] placeholder:text-[#878787] focus:outline-none focus:ring-2 focus:ring-[#3e66f3] focus:bg-white transition-colors"
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-1 items-start min-w-[183px]">
                    <label className="font-nunito font-normal text-[16px] leading-[24px] text-[#062129] w-full">
                      Last name <span className="text-[#ff4e36]">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter here..."
                      required
                      className="bg-[#f1f1f1] w-full px-4 py-[14px] rounded-[8px] font-nunito font-normal text-[16px] leading-[24px] text-[#878787] placeholder:text-[#878787] focus:outline-none focus:ring-2 focus:ring-[#3e66f3] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="flex flex-col gap-1 items-start w-full">
                  <label className="font-nunito font-normal text-[16px] leading-[24px] text-[#062129] w-full">
                    Phone Number <span className="text-[#ff4e36]">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter here..."
                    required
                    className="bg-[#f1f1f1] w-full px-4 py-4 rounded-[8px] font-nunito font-normal text-[16px] leading-[24px] text-[#878787] placeholder:text-[#878787] focus:outline-none focus:ring-2 focus:ring-[#3e66f3] focus:bg-white transition-colors"
                  />
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-1 items-start w-full">
                  <label className="font-nunito font-normal text-[16px] leading-[24px] text-[#062129] w-full">
                    Email Address <span className="text-[#ff4e36]">*</span>
                  </label>
                  <input
                    type="email"
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleInputChange}
                    placeholder="Enter here..."
                    required
                    className="bg-[#f1f1f1] w-full px-4 py-4 rounded-[8px] font-nunito font-normal text-[16px] leading-[24px] text-[#878787] placeholder:text-[#878787] focus:outline-none focus:ring-2 focus:ring-[#3e66f3] focus:bg-white transition-colors"
                  />
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1 items-start w-full">
                  <label className="font-nunito font-normal text-[16px] leading-[24px] text-[#062129] w-full">
                    Subject <span className="text-[#ff4e36]">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Enter here..."
                    required
                    className="bg-[#f1f1f1] w-full px-4 py-4 rounded-[8px] font-nunito font-normal text-[16px] leading-[24px] text-[#878787] placeholder:text-[#878787] focus:outline-none focus:ring-2 focus:ring-[#3e66f3] focus:bg-white transition-colors"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1 items-start w-full">
                  <label className="font-nunito font-normal text-[16px] leading-[24px] text-[#062129] w-full">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Enter here..."
                    rows={4}
                    className="bg-[#f1f1f1] w-full px-4 py-4 rounded-[8px] font-nunito font-normal text-[16px] leading-[24px] text-[#878787] placeholder:text-[#878787] focus:outline-none focus:ring-2 focus:ring-[#3e66f3] focus:bg-white transition-colors resize-none"
                  />
                </div>

                {/* reCAPTCHA */}
                <div className="bg-[#f1f1f1] flex gap-[43px] h-[85px] items-center p-[22px] rounded-[4px] w-[285px]">
                  <div className="flex gap-4 items-center">
                    <input
                      type="checkbox"
                      id="isRobot"
                      name="isRobot"
                      checked={formData.isRobot}
                      onChange={handleCheckboxChange}
                      className="bg-[#f1f1f1] border border-[#bbbbbb] w-[18px] h-[18px] rounded cursor-pointer"
                    />
                    <label htmlFor="isRobot" className="font-open-sans font-normal text-[16px] leading-normal text-[#111111] cursor-pointer">
                      Jeg ikke en roboto
                    </label>
                  </div>
                  <div className="flex flex-col gap-[3px] items-center w-[41px]">
                    <div className="relative w-6 h-6">
                      <Image
                        src="/recaptcha-logo.png"
                        alt="reCAPTCHA"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="font-roboto font-normal text-[8px] leading-normal text-[#222222] text-center">
                      re CAPCHA
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Status Messages */}
              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                  Thank you! Your message has been sent successfully.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  Sorry, there was an error sending your message. Please try again.
                </div>
              )}

              {/* Submit Button */}
              <div className="flex flex-col gap-12 items-center w-full">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-black w-full px-6 py-[14px] rounded-[8px] font-nunito font-extrabold text-[16px] leading-[24px] text-[#f1f1f1] text-center hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* Footer - Same as Homepage */}
      <Footer />
    </div>
  );
}

