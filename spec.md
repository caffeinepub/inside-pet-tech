# Specification

## Summary
**Goal:** Rebuild the entire public-facing frontend to match the Version 3 design exactly, while preserving the current post-Version-7 footer, and ensuring the backend remains fully intact and compatible.

**Planned changes:**
- Rebuild the top navigation bar with the Inside Pet Tech logo and four category links (Startups & Funding, News & Views, Interviews, Market Trends), with no admin or sign-in links visible
- Rebuild the homepage hero/featured article section showing the most recent featured article in a large editorial layout (thumbnail, category tag, headline, summary, author, published date)
- Rebuild the Latest News grid showing recent published articles with thumbnail, category tag, headline, summary, author, and date
- Rebuild all four category spotlight sections on the homepage with article cards
- Rebuild the About page at /about with Version 3 content and styling
- Rebuild the Contact page at /contact with Version 3 content, contact form, and advertising opportunities mention
- Rebuild the article detail page (headline, author, date, category tag, content type badge, hero image or video embed, full body, related articles)
- Rebuild category listing pages for all four categories
- Apply Version 3 typography (Playfair Display headlines, Inter body), color scheme (deep crimson-to-indigo gradient accents, off-white/light-gray background, dark near-black text), spacing, and layout throughout
- Preserve the current footer with functional newsletter signup (wired to subscribeToNewsletter), About/Contact links, all four category links, tagline "Covering the Companies, Technology, and Ideas Reshaping Pet Care", site description, and caffeine.ai attribution badge
- Ensure backend Motoko actor retains all existing endpoints and seeded sample articles

**User-visible outcome:** Visitors see the full Version 3 site design with all pages, article content, and category sections intact, plus the current footer with newsletter signup and attribution, and the backend fully operational with populated sample content.
