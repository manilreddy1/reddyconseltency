# AdmitGlobal SaaS Platform

A premium Next.js App Router scaffold for a college admission consultancy platform with marketing pages, student portal, counselor dashboard, admin CRM, lead capture, appointment booking, blog SEO pages, payments, and analytics.

## Stack

- Next.js App Router
- React
- Tailwind CSS
- PostgreSQL with Prisma schema
- Vercel compatible deployment model
- API routes for leads, appointments, and payments

## Included Surfaces

- Marketing website: home, about, services, courses, colleges, success stories, blog, contact
- Student portal: applications and payment packages
- Counselor dashboard: meetings and application monitoring
- Admin CRM: analytics, leads, and appointments
- SEO plumbing: metadata, sitemap, robots
- Database schema covering users, leads, colleges, courses, appointments, applications, payments, testimonials, and blogs

## Next Steps

1. Run npm install
2. Copy .env.example to .env
3. Configure PostgreSQL and run prisma generate then prisma migrate dev
4. Replace demo arrays in lib/site-data.js with Prisma queries
5. Connect contact forms and dashboards to authenticated data
6. Add Stripe or Razorpay credentials and implement checkout session creation
7. Add file uploads through Cloudinary or S3 and enforce validation and rate limiting

## Demo Notes

This scaffold focuses on structure, IA, and reusable surfaces. The API handlers currently return demo payloads and are ready to be connected to Prisma, auth, and production validation layers.
