# Portfolio Website Changelog

## Session: December 26, 2025 (Night) — Margin Note Blockquotes

### Margin Note Styling for Blockquotes 🎉
- **Blockquotes now appear as margin notes** on desktop (1024px+)
  - Positioned in right margin, 200px wide
  - Right-aligned text with right blue border
  - Falls back to inline style on mobile (left border, light background)
- **Lora font** — modern serif for blockquotes, distinct from Inter body text
- **Muted blue color** — `#6b8cae` light / `#8badc9` dark — ties to brand
- **Fade + slide animation** — margin notes fade in and slide from right on page load

### Blog Post Date Format
- Changed from ISO format (`2025-12-26`) to human-readable (`December 26, 2025 (1d ago)`)
- Updated on homepage and blog listing pages

### Reading Progress Bar Fix
- Fixed client-side navigation detection using Next.js `usePathname()` hook
- Progress bar now correctly shows only on individual blog posts

### Fonts Added
- **Playfair Display** — serif option (not used)
- **Lora** — modern serif, used for blockquotes ✓
- **Crimson Text** — literary serif (tested, not used)

### Technical
- Created `TypewriterMarginNotes` component (typewriter effect not working, kept for future)
- Created `Callout` component with 3 variants: float, margin, editorial (available for future use)
- Fixed JSX quote escaping in `callout.tsx` for Netlify build
- Added `overflow-x-clip` to body for margin note overflow

### Files Modified
- `src/app/globals.css` — margin note blockquote styles
- `src/app/layout.tsx` — added Lora, Crimson, Playfair fonts
- `src/app/blog/[slug]/page.tsx` — integrated TypewriterMarginNotes
- `src/components/typewriter-margin-notes.tsx` — new component
- `src/components/callout.tsx` — new component (3 variants)
- `tailwind.config.ts` — added font-serif class

---

## Session: December 26, 2025 (Evening) — Blog Launch

### First Blog Post Published 🎉
- **"The Ceiling Is Gone"** — inaugural post about AI removing implementation barriers for non-coders
- Featured image: AI-generated split illustration (blue constraint → amber freedom) with sticky notes transforming to birds
- Links to ALiEM and Tricks of the Trade book

### Color Palette Finalized
- **Primary accent:** Blue (`#0077CC` light / `#33AAFF` dark) — better contrast than original teal
- **Secondary accent:** Amber (`#F59E0B`) — used in featured images
- Updated all UI elements from teal to blue (links, hover states, progress bar)
- Hero sparkle icon already blue (`#0099FF`) — now consistent

### Blog Features Added
1. **Featured images** — displayed at top of posts using Next.js Image optimization
2. **Reading progress bar** — blue bar at top that fills as you scroll (blog posts only)
3. **Link hover glow** — blue glow effect on hover
4. **Page animations** — title, date, image, and content fade in sequentially (BlurFade)
5. **External links open in new tabs** — automatic via rehype plugin (no manual HTML needed)

### Navigation Improvements
- **Homepage → Blog:** "Latest from the Blog" section after About (shows 3 most recent posts with thumbnails)
- **Blog → Home:** "← Back to home" link at top of blog listing and individual posts
- "View all →" link to full blog listing
- Hover effects with blue accent color throughout

### Technical
- Added `unist-util-visit` package for external link detection
- Created `rehypeExternalLinks` plugin in `src/data/blog.ts`
- Created `ReadingProgress` component with Framer Motion scroll tracking
- Blog metadata type extended to include optional `image` field

### Image Generation Workflow
- Established prompting pattern for Nano Banana Pro
- Always specify "Asian woman" for character representations
- Color palette specified in prompts: blue (`#0077CC`) + amber (`#F59E0B`)
- Request "no text, no words, no labels" for cleaner images

### Future Tasks Noted
- [ ] PAIA image generation skill (for automated blog featured images)
- [ ] Sidebar commentary feature (à la danielmiessler.com)
- [ ] Logo/monogram design

---

## Session: December 26, 2025 (Afternoon)

### Deployment to Production 🎉
- **GitHub repo created:** `michellealiem/michellelinmd-site`
- **Deployed to Netlify** — auto-deploys on push to main
- **Custom domain configured:** `michellelinmd.com` via Cloudflare DNS
- **SSL certificate:** Provisioning via Let's Encrypt (awaiting DNS propagation)

### Publications — Full Paper Lists Added
- Populated all 72 peer-reviewed publications across 6 themed cards
- Removed 7th theme (Clinical Research & Case Reports) — moved relevant papers to Digital Scholarship
- Removed paper count from section header ("72 peer-reviewed publications" → "Peer-reviewed publications organized by theme")
- Updated PublicationCard: shows 2 papers by default, expands to full list with max-height scroll

### Animations Added
1. **Scroll-triggered animations** — sections fade/blur in as user scrolls (`inView={true}` on BlurFade)
2. **Card hover lifts** — `hover:scale-[1.02]` on Work, Projects, Exploring, Publication cards
3. **Smooth link underlines** — animated underline effect on publication paper links (`.link-underline` CSS class)
4. **Animated gradient background** — subtle cyan-blue gradient shift behind hero section (15s animation cycle)

### Mobile Responsiveness Fixes
- Hero name: `text-3xl` → `text-2xl` on mobile (prevents line wrap on iPhone 12 Pro)
- Work Experience grid: `grid-cols-2` → `grid-cols-1 sm:grid-cols-2` (single column on phones)

### Visual Hierarchy
- Section headers reduced from `sm:text-5xl` → `sm:text-4xl` (hero name stays dominant)
- Removed trailing periods from section subheaders

### Contact Form
- Embedded Netlify Forms contact form (Name, Email, Message)
- Created `public/form.html` for Netlify form detection (Next.js App Router workaround)
- Honeypot spam protection (`bot-field`)

### Social Links Updated
- LinkedIn: `michellelinmd` → `michelle-lin-md`
- X/Twitter: `MichelleLinMD` → `M_Lin`
- Instagram: Added new icon and link to `MichelleLinMD`
- Email nav icon: Now scrolls to `#contact` section instead of `mailto:`

### Section Header Renamed
- "AI Research" → "AI Lab" (better fits operational tools + research projects)

### Bug Fixes
- Fixed TypeScript error in `blur-fade.tsx` (`margin` type assertion for Netlify build)

---

## Session: December 26, 2025 (Morning)

### Hero Section Refinements
- **Avatar size:** Increased from `size-28` (112px) to `size-32` (128px) — more presence without crowding headline
- **Headline font:** Added **Bricolage Grotesque** as display font for "Dr. Michelle Lin" — distinctive, creative personality
  - Tested: Instrument Sans (refined), DM Sans (warm), Plus Jakarta Sans (geometric), Outfit (clean)
  - Chose Bricolage for "approachable innovator" vibe that matches "AI tinkerer always"
- **"AI tinkerer always" text:** Reduced from `text-xl` to `text-lg` — better visual hierarchy, width closer to "Educator by day"
- **Spacing:** Tightened `space-y-1.5` to `space-y-1` between headline and taglines

### Technical
- Added `font-display` Tailwind utility class mapped to `--font-display` CSS variable
- Bricolage Grotesque loaded via `next/font/google` with weights 400-800

---

## Session: December 25, 2025 (Late Night)

### Layout Overhaul
- **Removed Education section** — credentials are assumed for a UCSF Professor; CV material not portfolio material
- **Reordered sections:** Hero → About → Work Experience → Projects → Currently Exploring → Publications → Skills → Contact
- **Work Experience redesigned** — changed from stacked cards to compact 2x2 grid
  - Tested 3 options: A (2x2 grid), B (inline logo bar), C (collapsible accordion)
  - Chose Option A for balance of info density and visual appeal
  - Reordered card content: Company → Dates → Title (dates now apply to tenure, not rank)

### UCSF Entry Corrected
- Start date: 2004 → **2001** (when Michelle joined as Clinical Instructor)
- Description updated: "Faculty since 2001. Professor since 2015."
- Avoids misleading implication of being Professor for 24 years

### Project Logos Completed
- **DIL logo.jpg** — Digital Innovation Lab card
- **Dynamed logo.jpg** — DynaMed Editor card  
- **aliemu logo cropped.jpg** — ALiEMU card
- All 6 project cards now have proper logos

### Bug Fix
- Corrected previous session's date from "December 26" to "December 25" (UTC vs PST issue)
- Added user preference for Pacific timezone to prevent future date errors

### Still TODO
- [ ] Update avatar image (currently placeholder)
- [ ] Update Contact section text
- [ ] Populate full paper lists in expandable publication cards
- [ ] Review mobile responsiveness and dark mode
- [ ] Deploy to production

---

## Session: December 25, 2025 (Evening)

### Projects Section (6 cards)
- **ALiEM** — flagship blog/education platform with ALiEM-medium-horizontal.jpg logo
- **#PostitPearls** — hand-drawn bedside teaching doodles (NEW)
- **Tricks of the Trade** — book with 50 clinical tricks
- **Digital Innovation Lab** — UCSF EM department lab director role (NEW)
- **DynaMed Editor** — EBSCO Health point-of-care editor (NEW)
- **ALiEMU** — free LMS with 75k+ course completions (NEW)

### Publications Section (replaced Hackathons)
- Created 6 themed publication cards with expandable functionality
- Themes: Digital Scholarship, COVID-19 & Virtual Education, Wellness & Burnout, Virtual Communities, ALiEM AIR Series, Medical Education Scholarship
- Featured papers verified with correct PubMed links
- Added PublicationCard component with click-to-expand and chevron icon

### Currently Exploring Section (NEW)
AI projects in healthcare and academic medicine:
1. **Faculty Promotion Letter Automation** — n8n workflow, In Use (green badge)
2. **PAIA: Executive AI Assistant** — Claude Agent SDK with memory/journaling/CRM, In Use
3. **Base Hospital Radio Call Analysis** — IRB approved (blue badge), In Progress (yellow)
4. **California Poison Center Call Analysis** — IRB approved, In Progress
5. **SF EMS Medical Record QI Analysis** — IRB approved, In Progress
6. **ALiEMU Analytics via Natural Language** — LearnDash REST API integration, Planned (gray badge)

### Skills Section Updates
- Added: Book Author, Bedside Teaching, #PostitPearls Creator, The Lin Sessions (EM:RAP)
- Now 14 skills total

### UI Improvements
- Fixed "Featured Work" section header and subtitle
- Publication cards with hover effects and expandable state
- Status badges: green (In Use), yellow (In Progress), gray (Planned), blue (IRB Approved)
- Responsive grids: 2-col for projects, 3-col for publications and exploring

### Logos Added
- Work: UCSF.svg, ALiEM logo.png, Crowdrx.png, Lindblad logo.png
- Education: Harbor UCLA logo.png, Stanford.png
- Projects: ALiEM-medium-horizontal.jpg, Post it pearls landing website page michellelinmd.com.jpg

### Still TODO
- [ ] Add dynamed.png and aliemu.png logos
- [ ] Update avatar image (currently placeholder)
- [ ] Update Contact section text
- [ ] Populate full paper lists in expandable publication cards
- [ ] Review mobile responsiveness and dark mode
- [ ] Deploy to production

---

## Session: December 25, 2025

### Template Selection
- Chose **Dillion Verma portfolio template** (MIT license, Next.js + shadcn + Magic UI)
- Rejected Once UI (CC BY-NC license, $128/yr for commercial) and techwithanirudh (TurboRepo complexity)

### Installation
- Cloned to `~/Library/CloudStorage/Dropbox/paia_personal_assistant/michellelinmd-site/`
- Using pnpm package manager
- Dev server: `pnpm dev` at localhost:3000

### Hero Section
- **Headline:** Changed to "Dr. Michelle Lin" (removed "Hi, I'm" and "MD")
- **Tagline:** Three-line staggered animation:
  - Emergency physician by night.
  - Educator by day.
  - *AI tinkerer always.* (italic, muted gray)
- **Sparkle icon:** Blue (#0099FF) SVG with pulse animation, sized to match text
- **Photo:** Replaced with Michelle's headshot (resized to 400x400, 106kb)

### About Section
- Split into two paragraphs for readability
- Content: UCSF Professor, Digital Innovation Lab Director, ZSFG ED, ALiEM founder, 2M annual views, AI/tech passion

### Work Experience
- UCSF — Professor of Emergency Medicine (2004-Present)
- ALiEM — Founder & Editor-in-Chief (2008-Present)
- CrowdRx — Event Physician, Chase Center and Moscone Convention Center (2019-Present)
- Lindblad Expeditions / National Geographic — Ship Physician (2018-Present)

### Education
- Harbor-UCLA Medical Center — Residency, Emergency Medicine (1998-2001)
- Stanford University — MD, School of Medicine (1993-1998)
- Stanford University — BS, Biology (1989-1993)

### Skills
- Emergency Medicine, Medical Education, Digital Health, AI in Healthcare, Curriculum Development, Health Professions Education, Academic Writing, Public Speaking, Leadership, n8n Automation, Workflow Design

### Social Links
- LinkedIn: linkedin.com/in/michellelinmd/
- X/Twitter: x.com/MichelleLinMD
- Email: michelle.lin@ucsf.edu

### UI/UX Improvements
1. Tagline third line styled differently (italic + muted) for emphasis
2. Removed placeholder avatar circles from Work/Education sections
3. Increased section spacing (space-y-10 → space-y-14)
4. Added pulse animation to sparkle icon

---

## Still TODO
- [ ] Add logos for Work Experience (UCSF, ALiEM, CrowdRx, Lindblad)
- [ ] Add logos for Education (Harbor-UCLA, Stanford)
- [ ] Update Projects section with ALiEM, publications, speaking
- [ ] Remove or repurpose Hackathons section
- [ ] Add CV page (`/src/app/cv/page.tsx`)
- [ ] Add blog posts (MDX in `/content/`)
- [ ] Deploy to Vercel/Netlify
- [ ] Point Cloudflare DNS to new host

---

## Key Files
- **Config:** `src/data/resume.tsx` — all content lives here
- **Hero page:** `src/app/page.tsx` — layout and components
- **Resume card:** `src/components/resume-card.tsx` — work/education display
- **Avatar:** `public/me.png`
- **Blog content:** `content/` (MDX files)
