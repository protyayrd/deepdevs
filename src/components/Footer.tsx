"use client";
import Link from "next/link";
import Image from "next/image";

// Define props interface matching our backend model
export interface IFooterContent {
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
  };
  columns: {
    title: string;
    links: {
      label: string;
      url: string;
    }[];
  }[];
  copyrightText: string;
}

export default function Footer({ content }: { content?: IFooterContent }) {
  // Default values if content is not provided
  const defaults: IFooterContent = {
    socialLinks: {
      facebook: '#',
      instagram: '#',
      twitter: '#',
      linkedin: '#'
    },
    columns: [
      {
        title: 'Our Apps',
        links: [
          { label: 'Yoler', url: '/apps/yoler' },
          { label: 'Deep tattoo', url: '/apps/deep-tattoo' },
          { label: 'Plantzify', url: '/apps/plantzify' },
          { label: 'SeSign', url: '/apps/sesign' },
          { label: 'Deep Study Ai', url: '/apps/deep-study-ai' },
          { label: 'Ztax', url: '/apps/ztax' },
        ]
      },
      {
        title: 'Our Plugins',
        links: [
          { label: 'Deep Plugin', url: '#' },
          { label: 'Deep Plugin', url: '#' },
          { label: 'Deep Plugin', url: '#' },
          { label: 'Deep Plugin', url: '#' },
          { label: 'Deep Plugin', url: '#' },
        ]
      },
      {
        title: 'Quick Links',
        links: [
          { label: 'About Us', url: '/about-us' },
          { label: 'Faq', url: '#' },
          { label: 'Contact us', url: '/contact-us' },
          { label: 'Support', url: '#' },
          { label: 'More inf.', url: '#' },
        ]
      }
    ],
    copyrightText: 'All Rights Reserved.'
  };

  const footerData = content || defaults;

  return (
    <footer className="bg-[#f1f1f1] w-full">
      {/* Main Container */}
      <div className="max-w-[1267px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-0 pt-[72px] pb-[30px]">
          {/* Left Column - Logo and Description */}
          <div className="flex flex-col items-start w-full lg:w-[416px]">
            {/* Logo */}
            <div className="h-[72px] w-[320px] mb-4 relative">
              <Image
                src="/logo.png"
                alt="DeepDevs Logo"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Description */}
            <div className="pl-3 mb-10">
              <p className="font-inter font-normal text-[18px] leading-normal text-[#24222e]">
                Dictum curae mollis eu lectus leo non integer<br />
                tempus torquent sociis, sagittis tempor<br />
                imperdiet luctus.
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-3 pl-3">
              {footerData.socialLinks.facebook && (
                <a
                  href={footerData.socialLinks.facebook}
                  className="w-10 h-10 relative hover:opacity-70 transition-opacity"
                  aria-label="Facebook"
                >
                  <Image
                    src="/facebook-icon.svg"
                    alt="Facebook"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </a>
              )}
              {footerData.socialLinks.instagram && (
                <a
                  href={footerData.socialLinks.instagram}
                  className="w-10 h-10 relative hover:opacity-70 transition-opacity"
                  aria-label="Instagram"
                >
                  <Image
                    src="/figma/instagram-image.svg"
                    alt="Instagram"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </a>
              )}
            </div>
          </div>

          {/* Right Columns */}
          <div className="flex flex-col sm:flex-row gap-8 lg:gap-[26px] w-full lg:w-auto">
            {footerData.columns.map((column, colIndex) => (
              <div key={colIndex} className="flex flex-col gap-[30px] w-full sm:w-[235px]">
                <div className="relative pb-[17px]">
                  <h3 className="font-inter font-medium text-[24px] leading-normal text-[#24222e] mb-0">
                    {column.title}
                  </h3>
                  <div className="absolute bottom-0 left-0 h-[2px] w-[100px] bg-[#3e66f3]"></div>
                  <div className="absolute bottom-[-4px] left-[96px] w-[10px] h-[10px] rounded-full bg-white border-2 border-[#3e66f3]"></div>
                </div>

                <div className="flex flex-col gap-[21px]">
                  {column.links.map((link, index) => (
                    <Link
                      key={index}
                      href={link.url}
                      className="flex items-center gap-2 pl-5 relative group hover:text-[#3e66f3] transition-colors"
                    >
                      <span className="absolute left-0 text-[#24222e] group-hover:text-[#3e66f3] transition-colors text-[14.4px]">›</span>
                      <span className="font-inter font-medium text-[16px] leading-[1.6] text-[#24222e] group-hover:text-[#3e66f3] transition-colors">
                        {link.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section - Copyright and Legal Links */}
        <div className="border-t border-[rgba(121,129,150,0.35)] pt-[36.5px] pb-[35.5px]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-1 text-[16px] leading-[28px] text-[#24222e] font-roboto">
              <span>Copyright</span>
              <span className="inline-block w-4 h-4 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/copyright-icon.png"
                  alt="Copyright"
                  className="w-full h-full object-contain scale-y-[-1]"
                />
              </span>
              <span>2025</span>
              <Link href="#" className="text-[#3e66f3] hover:underline">
                DeepDevs
              </Link>
              <span>. All Rights Reserved.</span>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-0">
              <Link
                href="/terms-and-conditions"
                className="pr-[15px] relative text-[16px] leading-[26px] text-[#24222e] font-roboto hover:text-[#3e66f3] transition-colors"
              >
                Terms & Condition
                <span className="absolute right-0 top-1/2 -translate-y-1/2 h-5 w-px bg-[#24222e]"></span>
              </Link>
              <Link
                href="#"
                className="px-[15px] relative text-[16px] leading-[26px] text-[#24222e] font-roboto hover:text-[#3e66f3] transition-colors"
              >
                Careers
                <span className="absolute right-0 top-1/2 -translate-y-1/2 h-5 w-px bg-[#24222e]"></span>
              </Link>
              <Link
                href="/privacy-policy"
                className="pl-[15px] text-[16px] leading-[26px] text-[#24222e] font-roboto hover:text-[#3e66f3] transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
