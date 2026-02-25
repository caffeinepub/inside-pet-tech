# Specification

## Summary
**Goal:** Replace the homepage hero/video section with a generic featured article hero, expand the backend with full admin CRUD operations and role-based access control, and seed the backend with sample published articles.

**Planned changes:**
- Replace the top hero/video section on the homepage with a featured article section that displays the most recent featured article of any content type (Article, Feature Story, Interview, or Video), showing its thumbnail, category tag, headline, summary, author, and published date in a large editorial layout
- Implement full admin operations in the Motoko backend actor: create, update, delete, publish, and archive articles, all protected by admin principal checks
- Add functions to add and remove admin principals, callable only by existing admins
- Seed the backend with at least 6 published sample articles covering all six categories and all content types, with at least one article marked as featured

**User-visible outcome:** The homepage hero section displays any featured article (not just videos), the backend supports all admin dashboard operations with access control enforced, and the site renders populated content on first load without manual admin action.
