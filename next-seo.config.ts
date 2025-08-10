// next-seo.config.ts
const SEO = {
  title: "Shalitha Madhuwantha | Cybersecurity Enthusiast",
  description:
    "Cybersecurity enthusiast, exploit developer, and Linux system engineer specializing in penetration testing and system hardening.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shalitha.me",
    site_name: "Shalitha.me",
    images: [
      {
        url: "https://shalitha.me/images/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Shalitha Madhuwantha - Cybersecurity Enthusiast",
      },
    ],
  },
  twitter: {
    handle: "@shalithamadh",
    site: "@shalithamadh",
    cardType: "summary_large_image",
  },
};

export default SEO;
