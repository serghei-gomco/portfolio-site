// One place for site-wide facts. Personal contact data (email, phone) is NOT here:
// the contact form delivers to CONTACT_TO_EMAIL from the environment.
export const site = {
  name: "Serghei Gomco",
  role: "Frontend developer · React, Vue/Nuxt",
  description:
    "Personal portfolio of Serghei Gomco: frontend developer (6+ years, the last 3 with Vue/Nuxt on an e-commerce platform). Case studies, personal projects and contact.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  location: "Bălți, Moldova · remote (UTC+2)",
  links: {
    github: "https://github.com/serghei-gomco",
    linkedin: "https://www.linkedin.com/in/serghei-gomco-bab923189",
  },
};
