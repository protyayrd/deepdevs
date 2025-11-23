"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#F1F1F1]">
      {/* Main Container */}
      <div className="relative w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[100px]">
        {/* Footer Content */}
        <div className="flex flex-col lg:flex-row items-start justify-stretch gap-8 sm:gap-10 md:gap-12 lg:gap-[50px] pt-16 sm:pt-20 md:pt-24 lg:pt-[110px] pb-16 sm:pb-20 md:pb-24 lg:pb-[110px]">
          {/* Left Column - Brand Info */}
          <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-8 w-full lg:w-auto lg:flex-1">
            {/* Logo Section */}
            <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-4 pb-6 sm:pb-8 md:pb-10 lg:pb-6">
              {/* Logo with Z Tax */}
              <div className="flex flex-row items-center gap-2 sm:gap-[10px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/figma/ztax/ztax-logo.png"
                  alt="Z Tax Logo"
                  className="h-8 w-auto sm:h-10 md:h-12 lg:h-[41.51px] object-contain"
                />
              </div>

              {/* Contact Information */}
              <div className="flex flex-col gap-4 w-full">
                {/* Phone and Email */}
                <div className="flex flex-col gap-1">
                  <p className="font-poppins font-normal text-sm sm:text-base text-[14px] leading-[22.4px] text-black">
                    T: + (44) 9055 0269
                  </p>
                  <p className="font-poppins font-normal text-sm sm:text-base text-[14px] leading-[22.4px] text-black">
                    E: example@example.com
                  </p>
                </div>

                {/* Address */}
                <p className="font-poppins font-normal text-sm sm:text-base text-[14px] leading-[22.4px] text-black">
                  50 London Place, West Portal,<br />Western London, uk.
                </p>
              </div>

              {/* Social Icons */}
              <div className="flex flex-row items-center gap-3 sm:gap-4 md:gap-6 lg:gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/figma/ztax/footer/social-icons.png"
                  alt="Social Media Icons"
                  className="w-auto h-8 sm:h-10 md:h-12 lg:h-10 object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right Columns Container */}
          <div className="flex flex-col sm:flex-row items-start justify-start gap-8 sm:gap-10 md:gap-12 lg:gap-[70px] w-full lg:w-auto lg:flex-1">
            {/* Services Column */}
            <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-4 w-full sm:w-auto">
              <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-[14px]">
                {/* Services Heading */}
                <h4 className="font-poppins font-medium text-lg sm:text-xl md:text-2xl lg:text-[24px] leading-[38.4px] text-black">
                  Services
                </h4>
                {/* Services Links */}
                <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-2">
                  <Link href="#" className="font-poppins font-normal text-sm sm:text-base text-[14px] leading-[22.4px] text-black hover:text-[#00A5BB] transition-colors">
                    Create with AI
                  </Link>
                  <Link href="#" className="font-poppins font-normal text-sm sm:text-base text-[14px] leading-[22.4px] text-black hover:text-[#00A5BB] transition-colors">
                    Customize
                  </Link>
                  <Link href="#" className="font-poppins font-normal text-sm sm:text-base text-[14px] leading-[22.4px] text-black hover:text-[#00A5BB] transition-colors">
                    Blog
                  </Link>
                  <Link href="#" className="font-poppins font-normal text-sm sm:text-base text-[14px] leading-[22.4px] text-black hover:text-[#00A5BB] transition-colors">
                    Gallery
                  </Link>
                </div>
              </div>
            </div>

            {/* Information Column */}
            <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-4 w-full sm:w-auto">
              <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-[14px]">
                {/* Information Heading */}
                <h4 className="font-poppins font-medium text-lg sm:text-xl md:text-2xl lg:text-[24px] leading-[38.4px] text-black">
                  Information
                </h4>
                {/* Information Links */}
                <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-2">
                  <Link href="#" className="font-poppins font-normal text-sm sm:text-base text-[14px] leading-[22.4px] text-black hover:text-[#00A5BB] transition-colors">
                    About Us
                  </Link>
                  <Link href="#" className="font-poppins font-normal text-sm sm:text-base text-[14px] leading-[22.4px] text-black hover:text-[#00A5BB] transition-colors">
                    Privacy Policy
                  </Link>
                  <Link href="#" className="font-poppins font-normal text-sm sm:text-base text-[14px] leading-[22.4px] text-black hover:text-[#00A5BB] transition-colors">
                    Returns Policy
                  </Link>
                  <Link href="#" className="font-poppins font-normal text-sm sm:text-base text-[14px] leading-[22.4px] text-black hover:text-[#00A5BB] transition-colors">
                    Terms and Conditions
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-[15px] w-full sm:w-auto">
              <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-4">
                {/* Quick Links Heading */}
                <h4 className="font-poppins font-medium text-lg sm:text-xl md:text-2xl lg:text-[24px] leading-[38.4px] text-black">
                  Quick links
                </h4>
                {/* Quick Links */}
                <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-2">
                  <Link href="#" className="font-poppins font-normal text-sm sm:text-base text-[14px] leading-[22.4px] text-black hover:text-[#00A5BB] transition-colors">
                    My account
                  </Link>
                  <Link href="#" className="font-poppins font-normal text-sm sm:text-base text-[14px] leading-[22.4px] text-black hover:text-[#00A5BB] transition-colors">
                    My Work
                  </Link>
                  <Link href="#" className="font-poppins font-normal text-sm sm:text-base text-[14px] leading-[22.4px] text-black hover:text-[#00A5BB] transition-colors">
                    Inform.
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
