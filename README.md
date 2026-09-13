# Wayfarer by Gugu Gaga
Team: LIM PIN GUAN, BRANDON CHAN EN HAO, TAN YU QING, NG KAH LOK
<br>Problem Statement: Travel Planner
<br>Video Presentation: https://youtu.be/fcK3e_suvSM?si=SquHyY9xq0sFfJZ6</br>
Presentation Slides: [Public Link]
<br>Prototype: [https://wayfarer2.netlify.app/]</br>

# 1. Project Overview

## The Problem
Modern group travel planning is paralyzed by fragmented tools, rigid itineraries, and conflicting companion preferences. The primary stakeholders are designated trip leads and squad members who bring differing physical stamina, dietary restrictions, and mobility requirements. While market solutions like Wanderlog map static pins and Splitwise logs retrospective debts, they fall critically short by failing to harmonize real-time logistics with human group dynamics. They cannot dynamically branch itineraries based on individual paces, coordinate step-free and allergy-safe alternatives, or provide automated weather contingencies.

## Our Solution
Wayfarer is an all-in-one collaborative squad travel concierge that transforms chaotic group escapes into cohesive, stress-free journeys. By unifying bookings, interactive mapping, multi-currency budgeting, and individual accessibility needs into a single responsive dashboard, it eliminates the need to juggle multiple disconnected travel apps. Its centerpiece innovation, the "Split & Reconnect" Compromise Engine, solves group pacing dilemmas by letting travelers divide into parallel daytime tracks and automatically reuniting them at sunset with zero wait time. Combined with dynamic "Plan B" weather contingencies and smart debt minimization, Wayfarer ensures every member travels on their own terms while keeping the squad united.

### Feature Set
* "Split & Reconnect" Squad Compromise Engine: Enables 1-click member vibe allocation between high-energy and chill tracks, synchronized parallel schedules, and automatic sunset convergence at a mutual evening landmark.
* Dynamic "Plan B" Weather Contingency System: Detects incoming weather disruptions and provides 1-tap indoor activity substitutions that preserve the overall schedule and geographic proximity.
* Interactive Timeline and Geo-Spatial SVG Map: Vector canvas with transit duration calculations, walking routes, landmark pins, and hover tooltips.
* Multi-Currency Budget Tracker and Debt Settlement Graph: Simplifies tangled multi-party balances into minimal direct transfers with live conversion across multiple currencies.
* Centralized Booking Manager and Live Price Tracker: Consolidates lodging, transit, and activity passes with confirmation codes and price trend tracking.
* Squad Hub, Democratic Voting and Accessibility Profiles: Ingests dietary and mobility requirements to guide routing, while enabling squad upvoting on wishlist destinations.
* Wayfarer AI Travel Concierge: Context-aware destination assistant offering local etiquette tips, packing lists tailored to forecast climates, and contextual recommendations.

---

# 2. Ideation & Process

## 2.1 Ideas We Considered

| Idea | Why it was dropped / kept |
| :--- | :--- |
| "Split & Reconnect" Squad Vibe Compromise Engine (Chosen) | Kept: Solves the primary human conflict in group travel differing stamina and pacing desires. Branches into parallel Explorer vs. Chill afternoon schedules and coordinates an automated Sunset Reconnect with zero wait time. |
| Interactive SVG Walking Map with Pinned Stops (Chosen) | Kept: Vector map canvas that plots stops with walking route connectors, providing instant spatial clarity and visualizing dual-track convergence points. |
| Plan B Weather-Triggered Smart Alternatives (Chosen) | Kept: Pairs weather forecasts directly with activity metadata, enabling instantaneous 1-tap swaps from vulnerable outdoor stops to curated indoor alternatives. |
| Smart Budget Tracker with Auto Cost-Splitting (Chosen) | Kept: Consolidates group debts into the minimum number of direct transfers, supports live multi-currency conversion, and eliminates messy external spreadsheets. |
| AI Concierge Chatbot ("Wayfarer AI") (Chosen) | Kept: Offers context-aware destination Q&A, skip-the-line tips, etiquette reminders, and dynamic climate-aware packing checklist generation. |
| Collaborative Group Voting & Want-to-Go Board (Chosen) | Kept: Enables democratic upvoting/downvoting and personal wishlists to eliminate messaging fatigue and single-planner dominance. |
| Accessibility-First Traveler Profiles (Chosen) | Kept: Captures mobility, sensory, and dietary restrictions, directly feeding track assignments and venue recommendations rather than burying them in notes. |
| AI-Generated Climate-Aware Packing Checklist (Chosen) | Kept: Generates destination-specific packing lists based on live weather forecasts and cultural expectations. |
| Multi-Trip Dashboard with Trip Switcher (Chosen) | Kept: Allows users to manage multiple concurrent itineraries independently without cross-trip state interference. |
| Booking & Voucher Management Hub (Chosen) | Kept: Organizes flights, hotels, transit passes, and vouchers with live price tracking in one central location. |
| Real-Time Squad GPS Tracking with Live Map | Dropped: Highly invasive to privacy, drains device batteries, and requires complex persistent infrastructure; resolved via planned ETA coordination instead. |
| Full Social Media Travel Feed / Story Sharing | Dropped: Dilutes core planning focus into a social clone, requiring moderation and storage infrastructure while competing with established social networks. |
| Per-Stop Expense Splitting at Activity Level | Dropped (Simplified): Created tight coupling between itinerary deletions and ledger accounting; simplified to run as parallel, independent modules. |
| Collaborative Real-Time Document Editing | Dropped: Real-time operational transformation or CRDTs introduce excessive engineering overhead; democratic voting achieves consensus with less complexity. |
| Multi-Language Translation Layer for Local Phrases | Dropped: Commoditized by dedicated translation apps; the AI concierge provides higher value by surfacing contextual etiquette tips. |

## 2.2 Ideation Boards

<img width="452" height="253" alt="image" src="https://github.com/user-attachments/assets/ec2bc718-3104-41a3-a77d-3eee5e58cc9e" />
 
Our opening brainstorm mapped group travel frustrations into pacing conflicts, planning chaos, money stress, and logistics nightmares to define the MVP scope.

<img width="452" height="251" alt="image" src="https://github.com/user-attachments/assets/82899198-d9d2-41c9-9aca-fc43af7d30d8" />

This root-cause analysis revealed that group trip frustration stems from squads being forced to move as one unit without a safe, anxiety-free way to split up and auto-reunite.

<img width="452" height="252" alt="image" src="https://github.com/user-attachments/assets/f1ed7e57-076e-4bbe-ab84-f36d100c8cdc" />

Flowchart detailing how a squad branches into Explorer and Chill tracks after lunch and reconvenes at a Sunset Reconnect point with a 2-minute sync margin.

<img width="452" height="251" alt="image" src="https://github.com/user-attachments/assets/1097d536-24f3-431a-a69f-a4fae0eeb3fc" />

Prioritization grid categorizing features into Must-Have, Should-Have, Nice-to-Have, and Dropped buckets to preserve engineering feasibility.

## 2.3 Mentor Consultation

| Date | Mentor | Feedback Received | What Was Changed |
| :--- | :--- | :--- | :--- |
| 13/9 | Iris Yan | • **Booking feature:** Advised against building actual direct booking because it is too difficult and complex. Suggested keeping it as a document/voucher viewer instead.<br>• **Idea uniqueness:** Pointed out that our ideas were mostly existing features and lacked a special, standout idea to attract the judges.<br>• **Video slides:** Noted that our video had way too much text (~80% text) and needed to be reduced.<br>• **Prototype:** Complimented that our prototype and project were very complete. | • Changed the booking section to only store booking confirmations and vouchers instead of real booking.<br>• Focused on pushing "Split & Reconnect" as our main unique idea to impress the judges.<br>• Cut down the text in our video, showing more UI screenshots and real screen interactions instead of paragraphs. |
| 13/9 | Looi Wei En | • **Core focus:** Noticed we had too many different ideas without one main idea to focus on.<br>• **Problem statement:** Confirmed that our project fits the problem statement well.<br>• **UI & Onboarding:** Said our UI was clean and not messy, but suggested adding an onboarding flow to guide new users.<br>• **Hero feature:** Mentioned that our "Split & Reconnect" feature was very standout and creative. | • Chose "Split & Reconnect" as our single main feature and focused our pitch around it.<br>• Added an onboarding flow to help first-time users set up their squad preferences easily.<br>• Highlighted Split & Reconnect clearly in our presentation. |

---


# 3. What Makes It Different

* "Split & Reconnect" Squad Vibe Compromise Engine: Traditional itinerary planners assume a monolithic group moving in lockstep. Wayfarer introduces an automated branching timeline where members split into Explorer (strenuous ascents, high step counts) and Chill (step-free, shaded cafes) tracks, then automatically calculates walking and transit buffers to reunite both squads at a shared evening anchor spot at the exact same time.
* Plan B Weather-Triggered Contingency Swapper: Instead of travelers manually scrambling when rain hits, Wayfarer pairs live weather forecasts directly with activity indoor/outdoor metadata, serving a 1-tap curated indoor swap that preserves the schedule and geographic proximity.
* Accessibility-First Squad Profiles: Structured member profiles (step-free mobility, dietary restrictions) act as active system constraints, automatically guiding low-mobility travelers to the Chill Track and filtering safe restaurant stops.
* Democratic "Want-to-Go" Wishlist: Eliminates chat debates by allowing companions to drop dream spots into a shared bucket and cast upvotes/downvotes, providing clear consensus before days are finalized.
* Unified In-Trip Financial Ledger: Merges schedule context with an algorithmic debt minimization engine, consolidating multi-currency expenses into the minimum number of transactions alongside reservation vouchers.

---

# 4. Technical Architecture & Feasibility

## Tech Stack
**Frontend framework:** React 19 with TypeScript 5.7  
* **Pros:** Offers the latest performance optimizations, seamless modern component rendering, and strict type safety that catches errors before running the app.  
* **Constraint:** Components must be default exports. All markup elements and brackets must be strictly closed. Apostrophes inside single-quoted strings must be avoided or escaped to prevent compilation errors.

**Build tooling:** Vite 8 with the React Vite plugin
* **Pros:** Delivers near-instant local server start-up, ultra-fast hot module reloading when editing files, and rapid code formatting.  
* **Constraint:** The development server is pre-managed and runs on a dedicated port in the background. Path shortcuts are tied to the source directory, and preconfigured workspace build plugins must remain intact.

**Styling:** Tailwind CSS v4 with the Tailwind Vite plugin  
* **Pros:** Generates tiny CSS bundles with zero manual CSS build steps, providing modern styling rules and fast responsive layout creation.  
* **Constraint:** Does not use traditional styling configuration or preprocessor files. Custom fonts and theme variables must be placed directly at the top of the main global stylesheet.

**State management:** Native React 19 Hooks (`useState` and `useMemo`)  
* **Pros:** Built directly into the runtime without adding external package bloat, keeping data flow predictable and easy to trace.  
* **Constraint:** No third-party state managers like Redux or Zustand are installed. All shared app data must be stored in the root view and passed down to screens through component properties.

**Backend & Database:** Supabase (PostgreSQL)  
* **Pros:** Gives you a powerful relational database out of the box with built-in user authentication, file storage, and instant real-time data sync for group planning.  
* **Cons:** Complex relational schemas can take more time to design upfront compared to document databases, and unused free projects are paused after inactivity.

**AI & LLM Service:** Gemini API (Google AI Studio)  
* **Pros:** Offers a generous free tier, huge context limits to read entire trip plans at once, and fast processing speeds.  
* **Cons:** Rate limits on the free tier can be tight during peak times, and safety filters can occasionally block harmless travel queries.

**APIs and Services Used**

**API Mapping Service:** Mapbox  
* **Pros:** Generous free tier with highly customizable, beautiful map themes that seamlessly match modern app designs.  
* **Cons:** Its place search and opening hour data are not as rich or reliable as Google Maps.

**Weather Service:** OpenWeatherMap API  
* **Pros:** Industry standard with dependable hourly forecasts and weather alerts worldwide.  
* **Cons:** Hourly and multi-day historical data often require a paid subscription.

**Currency Service:** Frankfurter API  
* **Pros:** Completely free, easy to use, requires no API key, and supports over 200 currencies with reliable daily exchange rates.
* **Cons:** Exchange rates are updated daily instead of in real time, and rates may not update on weekends or public holidays.

**Hosting Platform:** Vercel  
* **Pros:** Effortless Git integration, automated preview deployments for every update, and blazing-fast global edge delivery.  
* **Cons:** Bandwidth limits on the free tier can be reached quickly if you host heavy image files directly instead of through cloud storage.

## Build Plan & Scope

* "Split & Reconnect" Engine: Parallel timeline branching (Explorer vs. Chill tracks), member assignment chips, and automated Sunset Reconnect convergence scheduling.
* Day-by-Day Itinerary Planner: Daily navigation with time-stamped cards and 1-tap Plan B weather alternative swaps.
* Interactive Spatial SVG Walking Map: Map plotting daily stops, walking routes, and convergence beacons.
* Multi-Currency Budget Tracker: Categorized expense logging, live conversion across 8 currencies, and a debt minimization settlement graph.
* Democratic Wishlist Board: Wishlist cards with interactive upvoting and downvoting tallies.
* Accessibility Traveler Profiles: Member profiles capturing mobility constraints and dietary restrictions to guide routing.
* AI Concierge & Smart Packing Checklist: Conversational travel assistant and climate-tailored packing checklist generator.
* Multi-Trip Switcher & Booking Repository: Multi-trip workspace switching and centralized reservation voucher storage.
