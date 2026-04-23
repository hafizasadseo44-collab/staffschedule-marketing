import { 
  Coffee, ShoppingBag, Stethoscope, HardHat, 
  TrendingUp, Clock, ShieldCheck, Zap, 
  Truck, Building2, Utensils, Globe, 
  Users, BarChart3, AlertCircle, CheckCircle2,
  MapPin, DollarSign, Calendar
} from "lucide-react";

export interface CaseStudy {
  slug: string;
  industry: string;
  region: string;
  companyName: string;
  title: string;
  summary: string;
  logo: string;
  heroImage: string;
  layoutStyle: 'narrative' | 'data' | 'timeline';
  metrics: {
    label: string;
    value: string;
    icon: any;
  }[];
  narrative: {
    background: string;
    strategy: string;
    execution: string;
    outcome: string;
  };
  proofImages: string[];
  problem: string[];
  solution: string[];
  results: string[];
  timeline: {
    week: string;
    milestone: string;
  }[];
  quote: {
    text: string;
    author: string;
    role: string;
  };
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "global-coffee-house",
    industry: "Hospitality",
    region: "London, UK",
    companyName: "The Coffee House Collective",
    title: "Streamlining Swaps for 15+ Roasteries.",
    summary: "How a rapidly growing coffee chain eliminated 'text-message-chaos' and reduced no-shows by 75%.",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=CHC&backgroundColor=4f46e5",
    heroImage: "/images/industry-hospitality-v2.jpg",
    layoutStyle: "narrative",
    narrative: {
      background: "As The Coffee House Collective expanded from a single indie roastery to a 15-site empire across London, their fragmented scheduling practices became a dangerous liability. Store managers were relying on disjointed WhatsApp groups to manage impromptu shift swaps, resulting in 'ghost shifts' where no one knew exactly who was covering the floor. This sheer volume of unverified text-based swapping led to timesheet discrepancies, delayed store openings, and manager burnout as they spent their weekends answering distressed scheduling queries.",
      strategy: "The operations team realized that simply hiring more managers wouldn't scale. They needed a decentralized framework that empowered baristas to self-manage their hours while enforcing strict corporate oversight without micromanagement. The collective partnered with StaffSchedule.io to deploy a centralized Peer-to-Peer (P2P) Marketplace, ensuring all shift adjustments were natively tracked, instantly verified against labor compliance rules, and synced directly to central operations—all through a consumer-grade mobile application.",
      execution: "Over a seamless 4-week rollout, the collective mandated the sunsetting of all ad-hoc WhatsApp groups. Store leads were trained to broadcast open shifts via the StaffSchedule.io Marketplace, triggering push notifications exclusively to qualified staff. The system’s automated guardrails completely prevented employees from picking up shifts that would inadvertently push them into overtime or violate consecutive-day rest mandates.",
      outcome: "The cultural and operational shift was profound. Within the first two quarters, the chain recorded a 75% plunge in no-shows and attendance discrepancies. Managers reclaimed approximately 15 hours a week previously lost to schedule tetris. More importantly, employee engagement scores skyrocketed to 98%, as front-line staff celebrated the total autonomy and transparency of managing their livelyhood directly from their phones."
    },
    proofImages: [
      "/images/manager-chaos-v2.jpg",
      "/images/morning-prep-v2.jpg"
    ],
    metrics: [
      { label: "No-Show Reduction", value: "-75%", icon: TrendingUp },
      { label: "Admin Time Saved", value: "15h/wk", icon: Clock },
      { label: "Staff Engagement", value: "98%", icon: Zap }
    ],
    problem: [
      "Staff used a messy group WhatsApp to coordinate swaps.",
      "Managers had no visibility into who was working at any given time.",
      "Timesheet errors were common due to manual roster updates."
    ],
    solution: [
      "Implemented the P2P Shift Swap marketplace.",
      "Digitized leave requests for central HQ visibility.",
      "Automated roster sync for perfect validation."
    ],
    results: [
      "Zero phone calls to managers on weekends.",
      "Perfect attendance records across all 15 sites.",
      "Employee morale hit an all-time high due to schedule autonomy."
    ],
    timeline: [
      { week: "Week 1", milestone: "Digital Roster Migration" },
      { week: "Week 2", milestone: "P2P Marketplace Beta" },
      { week: "Week 3", milestone: "Operations Sync Integration" },
      { week: "Week 4", milestone: "Full 15-Site Rollout" }
    ],
    quote: {
      text: "StaffSchedule.io didn't just give us a roster; it gave us our weekends back. I can finally see my whole business from my phone.",
      author: "Rachel Sterling",
      role: "Operations Director"
    }
  },
  {
    slug: "metro-health-systems",
    industry: "Healthcare",
    region: "Texas, USA",
    companyName: "Metro Care Systems",
    title: "100% Compliance in High-Stress Care.",
    summary: "Automating mandatory rest periods and certification tracking for a 24/7 nursing facility.",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=MCS&backgroundColor=emerald",
    heroImage: "/images/industry-healthcare-v2.jpg",
    layoutStyle: "timeline",
    narrative: {
      background: "Metro Care Systems operates a high-stakes 24/7 care network spanning five massive campuses in Texas. The administrative burden of manually tracking hundreds of rotating clinical schedules against complex state labor laws and vital clinical certifications was creating a catastrophic compliance threat. Shift coordinators were struggling to visually identify when nurses were approaching fatigue thresholds, heavily relying on expensive third-party nursing agencies to abruptly patch coverage gaps.",
      strategy: "The executive nursing leadership sought an uncompromising solution: a 'digital moat' that mathematically prevented staffing non-compliance while maximizing internal resource utilization. They integrated StaffSchedule.io to deploy an incredibly rigid Compliance Audit Engine coupled with a dynamic internal credential vault. The strategy was to 'hard-block' any scheduling action that risked a legal breach, relying on the software rather than human memory.",
      execution: "StaffSchedule.io’s engineering team collaborated with Metro Care's legal department to map out every Texas state labor rule. During week three of the rollout, the Certification Vault was activated, digitally tethering every nurse's profile to their live CPR/RN expiration dates. The system was calibrated to automatically reject shift claims from staff lacking valid certifications or adequate statutory rest, instantly re-routing those open shifts cleanly to compliant internal staff via the mobile app.",
      outcome: "The financial transformation was immediate: relying on an optimized internal marketplace rather than panicked agency calls saved the network a verified $144,000 annually. Clinically, patient care consistency vastly improved, as patients were far more likely to be treated by familiar core returning staff rather than transient agency workers. Best of all, Metro Care recently passed a rigorous state labor audit with absolutely zero flags."
    },
    proofImages: [
      "/images/attendance-kiosk-v1.jpg",
      "/images/features-reporting-v1.jpg"
    ],
    metrics: [
      { label: "Compliance Errors", value: "0", icon: ShieldCheck },
      { label: "Agency Spend", value: "-$12k/mo", icon: DollarSign },
      { label: "Audit Readiness", value: "100%", icon: Zap }
    ],
    problem: [
      "Accidental breach of labor laws regarding rest periods.",
      "Expensive reliance on third-party agencies for gap coverage.",
      "Manual certification checks were prone to human error."
    ],
    solution: [
      "Enabled the Compliance Audit Engine for hard-block violations.",
      "Prioritized internal staff for open shifts via the Marketplace.",
      "Automated renewal alerts for CPR and nursing certifications."
    ],
    results: [
      "Saved $144,000 annually by reducing agency reliance.",
      "Passed state labor audits with zero flags.",
      "Improved patient care consistency by retaining familiar staff."
    ],
    timeline: [
      { week: "Week 1", milestone: "Labor Law Ruleset Mapping" },
      { week: "Week 2", milestone: "Unit-Level Staff Onboarding" },
      { week: "Week 3", milestone: "Certification Vault Setup" },
      { week: "Week 4", milestone: "Live Audit Protocol Start" }
    ],
    quote: {
      text: "The compliance engine is essentially our digital legal department. We sleep better knowing the roster is always lawful.",
      author: "Dr. Aris Varma",
      role: "Chief Nursing Officer"
    }
  },
  {
    slug: "urban-retail-partners",
    industry: "Retail",
    region: "New York, USA",
    companyName: "Urban Style Labs",
    title: "Filling 95% of Gaps in Minutes.",
    summary: "Transforming staff shortage from a crisis into a simple mobile notification for 500+ employees.",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=USL&backgroundColor=blue",
    heroImage: "/images/industry-retail-v2.jpg",
    layoutStyle: "data",
    narrative: {
       background: "Urban Style Labs faced a retail nightmare: managing sudden shift dropouts across 40 busy New York boutiques. Relying on an antiquated call-down tree, regional managers spent an average of three hours a day dialing part-time staff to beg for coverage. When the clock ran out, managers were forced to heavily authorize overtime for whoever was already on the floor, bleeding out regional margins while sacrificing front-end customer experience due to understaffed peaks.",
       strategy: "To survive the upcoming holiday rush, leadership determined they needed a system that functioned like a gig-economy marketplace. They theorized that gamifying extra shift availability through targeted push notifications would bypass the social friction of phone calls. StaffSchedule.io was selected to build out an incredibly fast, highly competitive Open Shift Marketplace where employees could literally claim empty hours with a single tap.",
       execution: "The rollout began with comprehensive manager training focusing entirely on behavior change: completely halting all manual call-downs. Instead, managers were instructed to flag a shift as 'Open & Urgent', allowing StaffSchedule.io's engine to cross-reference 500+ employee schedules, immediately alerting only those within a 5-mile geo-radius who had cleanly observed overtime limitations. A stringent 40-hour block was put heavily into effect.",
       outcome: "The marketplace effect was explosive. Instead of spending hours hunting for staff, managers found that precisely targeted notifications resulted in 95% of shifts being claimed eagerly in under 12 minutes. By allowing the software to algorithmically enforce overtime guardrails rather than relying on human hesitation, overtime leakage dropped aggressively by 25% just within the first quarter."
    },
    proofImages: [
       "/images/attendance-dashboard-v1.jpg",
       "/images/cost-tracking-v2.jpg"
    ],
    metrics: [
      { label: "Fill Speed", value: "12min", icon: Zap },
      { label: "Holiday Coverage", value: "100%", icon: Clock },
      { label: "Overtime Reduction", value: "25%", icon: TrendingUp }
    ],
    problem: [
      "Last-minute sick calls left stores understaffed during peak hours.",
      "Managers spent 3 hours a day on the phone 'begging' for coverage.",
      "Overtime costs were dragging down regional margins."
    ],
    solution: [
      "Launched the Open Shift Marketplace to all part-time staff.",
      "Used geo-targeted notifications for urgent cover requests.",
      "Set strict overtime blocks at the point of claim."
    ],
    results: [
      "95% of open shifts are now filled without a single manager phone call.",
      "Overtime spend dropped by 25% in the first quarter.",
      "Staff love the ability to claim extra hours whenever they need cash."
    ],
    timeline: [
      { week: "Week 1", milestone: "Marketplace Configuration" },
      { week: "Week 2", milestone: "Staff Mobile App Training" },
      { week: "Week 3", milestone: "Overtime Guardrails Live" },
      { week: "Week 4", milestone: "Regional Store Expansion" }
    ],
    quote: {
      text: "Our managers are now leaders again, not call-center operators. The marketplace is the most valuable tool we have.",
      author: "Marcus Thorne",
      role: "Regional VP, Retail"
    }
  },
  {
    slug: "steel-and-stone-construction",
    industry: "Construction",
    region: "Dublin, IE",
    companyName: "Steel & Stone Infrastructure",
    title: "Eliminating Time Theft with GPS.",
    summary: "Securing site attendance across 12 diverse jobsites with geo-fenced clock-ins.",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=SSC&backgroundColor=amber",
    heroImage: "/images/industry-construction-v2.jpg",
    layoutStyle: "timeline",
    narrative: {
       background: "Running 12 sprawling infrastructure sites across Dublin, Steel & Stone faced a massive visibility void. In specialized contracting, unverified attendance meant hemorrhaging cash. The archaic paper timesheet system, coupled with decentralized foreman approvals, fostered extreme 'time theft'. Foremen couldn't possibly track precisely when transient contractors entered and practically left massive acreage sites, resulting in profound billing discrepancies.",
       strategy: "The operations board realized they didn't just need software; they needed unassailable topological proof. They sought to digitize the entire heavy-labor workforce presence using hyper-localized mobile technology. StaffSchedule.io was engaged for its robust Geofencing capabilities. The strategy required every contractor to use a smartphone to digitally punch in, but only if GPS heavily corroborated that they were physically standing exclusively within precise construction perimeters.",
       execution: "Drawing digital perimeters over satellite imagery of all 12 job sites established hard boundaries. Contractors downloaded a secure app; if they attempted to clock in from the parking lot or local cafe, the system threw an error. Furthermore, HQ was equipped with a massive live 'Heat Map' dashboard, allowing project directors to vividly see real-time skill distribution without ever stepping into the mud.",
       outcome: "Within mere weeks, the brutal elimination of padded hours yielded spectacular returns, slashing the total labor expenditure outright by 8.5%. With contractors forcefully tethered securely to legitimate work zones, trust surprisingly improved. The direct integration into operations erased a vicious four-day data-entry bottleneck at headquarters, streamlining administration brilliantly."
    },
    proofImages: [
      "/images/attendance-geofence-v1.jpg",
      "/images/features-chat-v1.jpg"
    ],
    metrics: [
      { label: "Time Theft", value: "0%", icon: ShieldCheck },
      { label: "Site Visibility", value: "Live", icon: MapPin },
      { label: "Labor Cost", value: "-8.5%", icon: DollarSign }
    ],
    problem: [
      "Site leads were manually signing off on paper timesheets.",
      "Significant discrepancy between 'reported hours' and 'site presence'.",
      "Coordination of cross-site skilled labor was disjointed."
    ],
    solution: [
      "Mandated GPS-verified mobile clock-ins for all contractors.",
      "Enabled geofencing to prevent 'clocking in from home'.",
      "Created a live map dashboard for site attendance monitoring."
    ],
    results: [
      "Saved 8.5% on total labor costs by identifying 'ghost hours'.",
      "Direct data feed to timesheets eliminated 4 days of data entry.",
      "Project leads can verify skill presence on-site in real-time."
    ],
    timeline: [
      { week: "Week 1", milestone: "Geofence Perimeter Definition" },
      { week: "Week 2", milestone: "Contractor App Deployment" },
      { week: "Week 3", milestone: "Live Site Dashboard Sync" },
      { week: "Week 4", milestone: "Paperless Validation Launch" }
    ],
    quote: {
      text: "We finally have eyes on our sites. The transparency has improved trust between us and our contractors.",
      author: "David Steel",
      role: "Operations Director"
    }
  },
  {
    slug: "apex-logistics-group",
    industry: "Logistics",
    region: "Singapore, SG",
    companyName: "Apex Global Logistics",
    title: "Scaling Shift Coordination for 300+ Drivers.",
    summary: "From manual dispatch sheets to real-time driver availability across Southeast Asia.",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=APX&backgroundColor=slate",
    heroImage: "/images/multi-location-global-v1.jpg",
    layoutStyle: "data",
    narrative: {
       background: "Handling intricate cross-border cargo runs between Singapore and Malaysia, Apex Global Logistics operated in an archaic darkness. Driver availability was bafflingly tracked via static command-center whiteboards. When an urgent cargo vessel arrived unexpectedly early, the dispatch team descended into a frantic state of 20+ phone calls simply to find an available hauler. The lag time in assigning routes directly impacted client cargo SLAs.",
       strategy: "Apex recognized that velocity was their only actual product. They needed absolutely instantaneous visibility into the availability of their 300-person driver network. The goal was to build a 'liquid fleet' where idle drivers could be forcefully activated in minutes, not hours. StaffSchedule.io brought a centralized, digital availability-matrix paired with an aggressive 'Urgent Shift' broadcast toolkit.",
       execution: "The rollout unified three regional hubs onto a singular dispatch dashboard. Every driver was trained to preemptively log their legal driving parameters and rest data natively into the App. When an emergency container required movement, dispatchers could instantly broadcast the open route exclusively to drivers legally permitted to cross-border lines without breaching intense transportation safety limits.",
       outcome: "The speed delta was breathtaking. Dispatch desk time-to-fill for chaotic empty routes collapsed from a grueling two hours down to an average of five minutes, achieving perfect 100% dispatch accuracy. With the system actively preventing safety breaches gracefully in real-time, Apex navigated their absolute peak Q4 season heavily without incurring a single cross-border compliance infraction."
    },
    proofImages: [
       "/images/multi-location-global-v1.jpg",
       "/images/multi-location-manager-v1.jpg"
    ],
    metrics: [
      { label: "Dispatch Accuracy", value: "100%", icon: CheckCircle2 },
      { label: "Driver Util.", value: "+20%", icon: TrendingUp },
      { label: "Response Time", value: "<5min", icon: Zap }
    ],
    problem: [
      "Driver availability was recorded on static whiteboards.",
      "Urgent delivery shifts often required 20+ phone calls to fill.",
      "Compliance with cross-border driving limits was hard to track."
    ],
    solution: [
      "Digitized driver availability and leave in one central hub.",
      "Implemented 'Urgent Shift' notifications for empty routes.",
      "Automated cross-border hours tracking for regional compliance."
    ],
    results: [
      "Increased driver utilization by 20% by filling gap routes instantly.",
      "Reduced time-to-fill for urgent routes from 2 hours to 5 minutes.",
      "Zero compliance breaches during intense Q4 delivery seasons."
    ],
    timeline: [
      { week: "Week 1", milestone: "Regional Cluster Setup" },
      { week: "Week 2", milestone: "Driver App Beta (SG Cluster)" },
      { week: "Week 3", milestone: "Dispatch Dashboard Sync" },
      { week: "Week 4", milestone: "Pan-SEA Expansion" }
    ],
    quote: {
      text: "StaffSchedule.io has effectively automated our dispatch desk. We scale without adding more head office staff.",
      author: "Lim Wei Jin",
      role: "Regional Logistics Head"
    }
  },
  {
    slug: "horizon-hotels-resorts",
    industry: "Hospitality",
    region: "Maldives",
    companyName: "Horizon Luxury Resorts",
    title: "Perfect Service with Variable Occupancy.",
    summary: "Matching staffing levels to real-time booking data for a high-end island resort group.",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=HHR&backgroundColor=indigo",
    heroImage: "/images/industry-hospitality-v2.jpg",
    layoutStyle: "narrative",
    narrative: {
       background: "Running ultra-luxury resorts across remote Maldivian atolls creates an intense staffing paradox. Horizon Luxury Resorts was consistently leaking revenue because they frequently overstaffed during unexpected low-occupancy weather dips. Conversely, when massive VIP surges occurred, core teams suffered devastating burnout. Because operations were isolated on separate islands, inter-site talent shifting was essentially non-existent.",
       strategy: "Horizon’s executive board aimed to dynamically tether their sprawling human capital directly to live booking volume. Through deep integration, StaffSchedule.io was synced seamlessly with their central reservations software. The new operational philosophy was establishing a 'floating liquid pool' of multi-lingual hospitality staff capable of violently shifting to whatever island required immediate reinforcement.",
       execution: "The deployment focused on creating high-level, cross-island transparency grids. When the forecast engine identified that Island A was reaching 98% occupancy while Island B hovered lower, managers could digitally solicit floating housekeepers to transfer via seaplane. Centralized, deeply integrated hotel bulletins kept all remote island bases thoroughly unified regarding VIP arrival protocols.",
       outcome: "Precision deployment slashed their sprawling labor-to-revenue burn ratio by a stunning 12% in sheer margin recovery. By preventing harsh overwork surges, the luxury group recorded a brilliant 95% retention rate among their premier talent pool. Even amid chaotic booking spikes, their golden metric—the ultimate guest service satisfaction score—remained a nearly perfect 9.8 out of 10."
    },
    proofImages: [
       "/images/manager-calm-v2.jpg",
       "/images/closing-time-v2.jpg"
    ],
    metrics: [
      { label: "Service Score", value: "9.8/10", icon: TrendingUp },
      { label: "Labor/Rev Ratio", value: "-12%", icon: DollarSign },
      { label: "Staff Retention", value: "95%", icon: Users }
    ],
    problem: [
      "Overstaffing during low occupancy days was bleaching margins.",
      "Staff burnout during peak holiday surges was causing turnover.",
      "Communication between island sites was delayed and fragmented."
    ],
    solution: [
      "Integrated booking forecasts with the StaffSchedule.io roster.",
      "Implemented a floating-staff pool for on-demand housekeepers.",
      "Centralized resort announcements and staff communication."
    ],
    results: [
      "Optimized labor-to-revenue ratio by 12% in the first season.",
      "Increased staff retention to 95% via better workload balancing.",
      "Sustained a near-perfect guest service score through peak surges."
    ],
    timeline: [
      { week: "Week 1", milestone: "Booking Data Integration" },
      { week: "Week 2", milestone: "Housekeeping Staff Training" },
      { week: "Week 3", milestone: "Cross-Island Comms Launch" },
      { week: "Week 4", milestone: "Live Margin Monitoring" }
    ],
    quote: {
      text: "We now have a data-driven pulse on our resort staffing. It's the standard for our luxury properties.",
      author: "Sofia Al-Maktoum",
      role: "General Manager"
    }
  },
  {
    slug: "technovo-support-centers",
    industry: "Corporate",
    region: "Austin, TX",
    companyName: "TechNovo Global Support",
    title: "Global Follow-the-Sun Rota Management.",
    summary: "Coordinating shifts for 800+ support engineers across 3 timezones for 24/7 coverage.",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=TNG&backgroundColor=cyan",
    heroImage: "/images/analytics-team-v1.jpg",
    layoutStyle: "data",
    narrative: {
       background: "As TechNovo ballooned to over 800 corporate support engineers across Austin, Dublin, and Tokyo, their fragile spreadsheet-based shift rotations collapsed entirely. The lethal pain point was the 'handover transition' between continents—engineers frequently finished their shifts exhausted, dropping urgent enterprise tickets due to complex overlap mismatches. Furthermore, managing uniquely strict localized labor codes dynamically across wildly different sovereign boundaries was practically impossible.",
       strategy: "To stabilize their bleeding Service Level Agreements (SLAs), leadership pursued a seamless 'Follow-the-Sun' structural rotation. The goal was to utilize StaffSchedule.io’s AI algorithms to permanently balance the intense mental fatigue inherent in continuous night-shifts, automatically weighting equitable distribution. Every localized cluster would operate under its own bespoke software-enforced legal ruleset.",
       execution: "Deploying via a highly methodical phase-in, StaffSchedule.io intricately mapped local European Working Time Directives (WTD) alongside more flexible US laws. The rotation engine synchronized the global grid, assuring every single handover window featured exactly 30 minutes of robust overlap. Planners used deep AI suggestions to predictably schedule engineers with minimal circadian disruption.",
       outcome: "The engineering teams responded with staggering relief, noted securely by a 45% uplift in deep night-shift workplace satisfaction metrics. Through brutally efficient digital overlap planning, handover speeds accelerated by roughly 30%. Critically, the corporate executive layer slept better, observing a brilliant 90% plunge in daunting regional labor-law compliance panic-alerts."
    },
    proofImages: [
       "/images/analytics-dashboard-v1.jpg",
       "/images/analytics-team-v1.jpg"
    ],
    metrics: [
      { label: "Handover Speed", value: "+30%", icon: Zap },
      { label: "Night Shift Sat.", value: "+45%", icon: Users },
      { label: "Error Rate", value: "-90%", icon: ShieldCheck }
    ],
    problem: [
      "Complex handover transitions between US, EU, and Asia teams.",
      "Manual rotation scheduling was causing 'Shift Fatigue'.",
      "Tracking diverse local labor laws in 5 different countries."
    ],
    solution: [
      "Automated time-zone based shift rotations.",
      "Used AI-suggestions to balance night-shift weights fairly.",
      "Localized Compliance Engines for every regional sub-group."
    ],
    results: [
      "30% faster shift handovers via integrated handover notes.",
      "45% increase in staff satisfaction for night-shift workers.",
      "90% reduction in regional labor law compliance alerts."
    ],
    timeline: [
      { week: "Week 1", milestone: "Global Cluster Mapping" },
      { week: "Week 2", milestone: "Support Lead Training (Asia)" },
      { week: "Week 3", milestone: "Follow-the-Sun Rota Sync" },
      { week: "Week 4", milestone: "Global Launch" }
    ],
    quote: {
      text: "Coordinating 24/7 global support used to be a full-time job for two people. Now, it runs itself.",
      author: "Kevin Chen",
      role: "Head of Global Support"
    }
  },
  {
    slug: "prime-meat-packing",
    industry: "Logistics",
    region: "Chicago, IL",
    companyName: "Prime Distribution Labs",
    title: "Cold-Chain Staffing Precision.",
    summary: "Managing 200+ warehouse staff in a high-compliance, temperature-sensitive environment.",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=PDL&backgroundColor=blue",
    heroImage: "/images/morning-prep-v2.jpg",
    layoutStyle: "timeline",
    narrative: {
       background: "Running a massive scale, temperature-controlled distribution complex demands utter precision. Prime Labs struggled heavily with basic attendance verification because extreme sub-zero warehouse zones broke traditional hardware scanners, and frostbitten gloves made paper ledgers unusable. When staff invariably called out sick, immediate blind-spots crippled the floor speed, creating highly terrifying food-spoilage risks for premium commodities stuck on the loading dock.",
       strategy: "The plant's stark mandate was executing an entirely touchless, highly reliable management infrastructure. Since operators already securely stored smartphones beneath heavy gear, StaffSchedule.io was selected to run purely mobile geo-verified interactions. The strategy required utilizing intricate geofencing precisely bound entirely within the freezing operational bays for irrefutable attendance, tied to rapid marketplace deployment for unexpected gaps.",
       execution: "Zonal geofences were intensely calibrated heavily against structural concrete walls to prevent 'buffer zone' spoofing. Because managers operate fully on the move via digital tablets, StaffSchedule.io’s direct communication hub bypassed incredibly loud floor walkie-talkies. Overtime rules were instantly hard-coded directly into the system, forcefully capping heavy manual lifting prior to immense fatigue sets.",
       outcome: "During their brutally intense holiday dispatch season, Prime flawlessly documented a completely staggering 100% shift fill-rate using marketplace alerts. Unchecked, lingering floor overtime was viciously cut by 18%, padding razor-thin logistics margins. Most vitally, superior rotation timing utterly eliminated dangerous thermal-exposure violations for all critical cold-chain personnel."
    },
    proofImages: [
      "/images/attendance-paper-v1.jpg",
      "/images/lunch-rush-v2.jpg"
    ],
    metrics: [
      { label: "Shift Fill Rate", value: "100%", icon: CheckCircle2 },
      { label: "OT Expenses", value: "-18%", icon: TrendingUp },
      { label: "Temp. Breach", value: "0", icon: ShieldCheck }
    ],
    problem: [
      "Staff shortages led to slower packing, risking food spoilage.",
      "Inaccurate clock-ins in freezer zones (hard for paper/hardware).",
      "Manual roster changes took hours to communicate to floor staff."
    ],
    solution: [
      "Mobile clock-ins with geofenced freezer zone validation.",
      "Urgent marketplace triggers for peak loading hours.",
      "Direct floor-manager communication via the mobile hub."
    ],
    results: [
      "Achieved 100% shift fill rate during the busiest holiday windows.",
      "Reduced overtime expenses by 18% through better shift distribution.",
      "Zero thermal-exposure violations due to automated rotation alerts."
    ],
    timeline: [
      { week: "Week 1", milestone: "Zonal Geofence Setup" },
      { week: "Week 2", milestone: "Floor Staff App Adoption" },
      { week: "Week 3", milestone: "OT Prevention Rules Live" },
      { week: "Week 4", milestone: "Timesheet Sync Finalization" }
    ],
    quote: {
      text: "The geofenced clock-in has paid for itself in reduced timesheet leakage alone. A must-have for cold-chain ops.",
      author: "Bill Kowalski",
      role: "Plant Manager"
    }
  },
  {
    slug: "pacific-care-group",
    industry: "Healthcare",
    region: "Sydney, AU",
    companyName: "Pacific Care Centers",
    title: "Zero Agency Dependency in Elderly Care.",
    summary: "How an Australian care group reclaimed 20% of their labor budget by filling internal shifts first.",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=PCC&backgroundColor=emerald",
    heroImage: "/images/industry-healthcare-v2.jpg",
    layoutStyle: "narrative",
    narrative: {
       background: "Pacific Care managed five sprawling elderly care facilities caught in a vicious cycle: chronically under-staffing their grueling night shifts, followed by desperately begging highly expensive external nursing registries for last-minute bodies. The core internal staff were experiencing devastating burnout due to heavily unequal rotation distributions, while HQ possessed zero reliable financial visibility regarding the massive, uncontrolled overtime leakage occurring daily.",
       strategy: "To dismantle the reliance on parasitic external agencies, Pacific Care aimed to forge a massive, deeply unified 'Internal Talent Network'. By uniting the distinct five complexes onto StaffSchedule.io, they designed a unified 'Shared Pool' marketplace. The operational goal was ensuring that an extraordinarily lucrative and convenient internal shift offer was massively exposed to their own workforce first before a single dime was paid outside.",
       execution: "The rollout intricately pooled all nursing data into a centralized HQ matrix. To prevent internal exhaustion, fatigue-monitoring heavily throttled employees working excessive consecutive hours. When sudden night-shift gaps inevitably emerged, push notifications instantly targeted highly qualified, thoroughly refreshed staff securely across adjacent complexes. Any attempt to book an external agency required strict automated HQ authorization.",
       outcome: "The financial hemorrhage was stopped entirely; within merely six months, Pacific Care annihilated 90% of all external agency payouts. Staff felt dramatically more respected, enjoying vastly fairer rotations which actively pushed their retention tenure up an impressive 14%. Furthermore, with verified, digital scheduling traces, they sailed easily through their heavy Australian Aged Care Quality standard audits."
    },
    proofImages: [
       "/images/chat-staff-v1.jpg",
       "/images/chat-manager-v1.jpg"
    ],
    metrics: [
      { label: "Agency Cost", value: "-$25k/mo", icon: DollarSign },
      { label: "Internal Fill", value: "92%", icon: Zap },
      { label: "Staff Wellbeing", value: "High", icon: Users }
    ],
    problem: [
      "Over-reliance on expensive casual agencies to fill night shifts.",
      "High burnout among core staff due to unequal shift distribution.",
      "Lack of real-time visibility into overtime leakage."
    ],
    solution: [
      "Implemented a 'Shared Pool' marketplace across 5 care sites.",
      "Used AI-driven fatigue monitoring to balance work hours.",
      "Automated agency-booking approvals at the HQ level."
    ],
    results: [
      "Eliminated 90% of agency spending in the first 6 months.",
      "Increased staff tenure by 14% through fairer shift rotations.",
      "Maintained 100% compliance with Australian Aged Care Quality Standards."
    ],
    timeline: [
      { week: "Week 1", milestone: "Site Data Migration" },
      { week: "Week 2", milestone: "Shift Pool Beta" },
      { week: "Week 3", milestone: "Ruleset Benchmarking" },
      { week: "Week 4", milestone: "Regional Launch" }
    ],
    quote: {
      text: "We finally have a unified workforce. Our staff are happier, and our financial health has never been better.",
      author: "Dr. Elizabeth Thorne",
      role: "CEO"
    }
  },
  {
    slug: "nordic-retail-labs",
    industry: "Retail",
    region: "Stockholm, SE",
    companyName: "Nordic Design Collective",
    title: "100% Roster Accuracy for 50+ Boutiques.",
    summary: "Managing complex Scandanavian labor laws with automated auditing and real-time punch-clocks.",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=NDC&backgroundColor=blue",
    heroImage: "/images/industry-retail-v2.jpg",
    layoutStyle: "data",
    narrative: {
       background: "Nordic Design Collective operates beautifully minimalist spaces, but their backstage administration was an absolute nightmare. Intense, heavily penalized regional labor legislation required virtually flawless tracking of employee minutes. Their fractured system meant intense manual cross-referencing between boutique-level manager journals and deeply aggressive state templates. The friction was destroying the creative energy of top boutique design leads.",
       strategy: "The directive was absolute elimination of all manual paperwork safely within 60 days. The Collective deployed StaffSchedule.io specifically for its famously rigid, mathematically localized algorithmic compliance engines. The strategic shift was moving entirely to strict Mobile Punch-Clocks secured firmly by precise geofencing, ensuring the raw data pouring into headquarters was impossibly clean and totally uncompromised.",
       execution: "Store leads were completely banned from manual timescale alterations. The new infrastructure forced all 50+ stylish boutiques onto a centralized, automated matrix. If an employee's planned shift illegally breached a Scandanavian Working Time directive (WTR), the dashboard flashed deeply red and rigidly blocked the error. Announcements were fully integrated natively to keep staff creatively aligned.",
       outcome: "The operation achieved utter perfection—zero compliance fines were issued across any jurisdiction since rigorous adoption. By identifying immense invisible labor leakage, they recovered nearly 5% simply on labor-to-sales efficiencies. A truly monumental administrative win reduced the intensely stressful weekly timesheet marathon from a grueling 48-hour nightmare down to just three heavily automated minutes."
    },
    proofImages: [
       "/images/attendance-manager-v1.jpg",
       "/images/closing-time-v2.jpg"
    ],
    metrics: [
      { label: "Audit Pass Rate", value: "100%", icon: ShieldCheck },
      { label: "Sales/Labor %", value: "-5%", icon: TrendingUp },
      { label: "Admin Speed", value: "3min", icon: Zap }
    ],
    problem: [
      "Strict regional labor laws required manual oversight for every roster.",
      "Discrepancies between staff attendance and reported hours.",
      "High communication overhead between HQ and store leads."
    ],
    solution: [
      "Localized the Compliance Engine for Scandanavian WTR.",
      "Rolled out geofenced mobile clock-ins for all retail staff.",
      "Centralized store-level announcements into one platform."
    ],
    results: [
      "Zero compliance fines issued since platform adoption.",
      "5% improvement in labor-to-sales ratios by identifying leakage.",
      "Reduced weekly validation prep from 48 hours to 3 minutes."
    ],
    timeline: [
      { week: "Week 1", milestone: "WTR Compliance Setup" },
      { week: "Week 2", milestone: "Store Lead Training" },
      { week: "Week 3", milestone: "Geofence Verification" },
      { week: "Week 4", milestone: "HQ Operations Sync" }
    ],
    quote: {
      text: "StaffSchedule.io is the backbone of our operational excellence. It handles the complexity so we can focus on design.",
      author: "Anders Holm",
      role: "Operations Manager"
    }
  },
  {
    slug: "asian-logistics-hubs",
    industry: "Logistics",
    region: "Vung Tau, VN",
    companyName: "Vung Tau Port Logistics",
    title: "Managing 1,000+ Port Operators Daily.",
    summary: "Real-time workforce coordination for high-volume container shipping terminals.",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=VTP&backgroundColor=slate",
    heroImage: "/images/multi-location-global-v1.jpg",
    layoutStyle: "timeline",
    narrative: {
       background: "At the violently chaotic, high-volume shipping terminals of Vung Tau, thousands of steel containers must move precisely. Vung Tau Port relied on dangerously precarious paper-based shift logs to manage over a thousand extremely specialized operators. Sudden illness led to incredibly massive delays, heavily bleeding up to $15,000 hourly in idle berth penalties. Furthermore, validating physical safety licenses strictly on massive cranes was essentially impossible during frantic peak surges.",
       strategy: "Port Authority leadership demanded absolute centralized omniscience over heavily certified skillsets. The operation needed radically clear validation linking human operators mathematically to mega-machinery. By infusing StaffSchedule.io directly into the central terminal command, the strategy locked high-risk equipment completely behind digital 'Certification Gates', demanding absolute proof of qualification before a shift was even mathematically generated.",
       execution: "The rollout mapped all 1,000 operators strictly against an intricate, live-updating 'Operator Skill Vault'. The complex logic engines heavily automated the daily bidding wars for extremely lucrative highly-skilled shifts. During intense surges, the command center viewed a staggering real-time hub heavily synchronized natively with complex labor availabilities, allowing dispatchers to pivot mass workforces efficiently within seconds.",
       outcome: "Vessel turnaround speed achieved legendary metrics. By ensuring perfect manpower assignment dynamically, massive container throughput spiked immediately by 18% during their busiest brutal ocean seasons. Idle berth fees vanished. Most phenomenally, the unyielding digital safety barriers flawlessly prevented any catastrophic uncertified machine assignments, scoring a completely flawless zero-incident safety record."
    },
    proofImages: [
       "/images/analytics-dashboard-v1.jpg",
       "/images/attendance-geofence-v1.jpg"
    ],
    metrics: [
      { label: "Ops Throughput", value: "+18%", icon: Zap },
      { label: "Site Safety", value: "100%", icon: ShieldCheck },
      { label: "Turnaround Time", value: "-25%", icon: Clock }
    ],
    problem: [
      "Paper-based shift logs led to dangerous staffing gaps during surges.",
      "Difficulty in verifying specialist certifications (crane/forklift) on site.",
      "Communication delays cost $15,000 per hour in idle berth fees."
    ],
    solution: [
      "Digitized shift bidding for certified port operators.",
      "Automated certification-gating for high-risk equipment roles.",
      "Live terminal status hub integrated with staffing levels."
    ],
    results: [
      "18% increase in container throughput during peak sea seasons.",
      "Zero safety incidents related to certification lapses.",
      "25% reduction in vessel turnaround times through better staffing."
    ],
    timeline: [
      { week: "Week 1", milestone: "Port Safety Infrastructure Mapping" },
      { week: "Week 2", milestone: "Operator Skill Vault Setup" },
      { week: "Week 3", milestone: "Live Terminal Sync Beta" },
      { week: "Week 4", milestone: "Full Port Deployment" }
    ],
    quote: {
      text: "In the shipping world, every minute counts. StaffSchedule.io ensures we never lose a second to staffing confusion.",
      author: "Nguyen Van Bau",
      role: "Terminal Director"
    }
  },
  {
    slug: "uk-pub-partners",
    industry: "Hospitality",
    region: "London, UK",
    companyName: "The Heritage Pub Group",
    title: "Traditional Hospitality, Modern Operations.",
    summary: "Revitalizing 25 historic pubs with modern staff coordination and shift rotation tools.",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=HPG&backgroundColor=indigo",
    heroImage: "/images/industry-hospitality-v2.jpg",
    layoutStyle: "narrative",
    narrative: {
       background: "The Heritage Pub Group proudly managed 25 deeply historic, charmingly analog social pubs across London. However, their quaint administrative habits were destroying service standards. Pub managers bitterly played favorites with highly lucrative busy holiday night shifts, resulting in completely toxic resentments and an enormous staff turnover rate. With no massive central hub, sharing highly critical new kitchen menus or emergency supply updates was slow and hopelessly unreliable.",
       strategy: "Foundership aimed heavily to modernize their background engines while preserving the vintage frontend pub magic entirely. The strategy involved injecting StaffSchedule.io heavily to absolutely democratize shift distribution mathematically while providing a singular digital watercooler for team culture. Eliminating obvious human bias from the deeply chaotic evening rotations was entirely paramount to surviving.",
       execution: "By initiating an algorithmic fair-rotation protocol, the software systematically blocked managers from perpetually handing the best lucrative tip shifts to the identical people. A natively integrated P2P Marketplace empowered bartenders to safely trade grueling shifts transparently. Additionally, HQ launched a comprehensive central 'Kitchen Hub' directly to the employees' phones for instant recipe rollouts.",
       outcome: "Staff hostility instantly evaporated. Retaining well-trained core staff spiked dramatically up to an unbelievable 92%—dwarfing the notoriously volatile 45% industry standard outright. Because pubs were constantly operating fully-crewed without disastrous last-minute absences, highly-lucrative table turnover metrics climbed beautifully by roughly 12% uniformly across the deeply historic portfolio."
    },
    proofImages: [
       "/images/manager-chaos-v2.jpg",
       "/images/cost-tracking-v2.jpg"
    ],
    metrics: [
      { label: "Table Turn.", value: "+12%", icon: TrendingUp },
      { label: "Team Retention", value: "92%", icon: Users },
      { label: "Prep Time", value: "-30min", icon: Clock }
    ],
    problem: [
      "Inconsistent service quality due to last-minute shift no-shows.",
      "Manual rotation of morning/evening staff was seen as 'unfair'.",
      "No central way to share recipe updates or training videos."
    ],
    solution: [
      "Automated fair-rotation scheduling logic.",
      "P2P marketplace for shift coverage among bar staff.",
      "Centralized 'Kitchen Hub' for training and announcements."
    ],
    results: [
      "92% staff retention rate (far above the industry average of 45%).",
      "12% increase in table turnover due to consistent staffing levels.",
      "30-minute reduction in daily prep time via centralized communication."
    ],
    timeline: [
      { week: "Week 1", milestone: "Cultural Transition Workshops" },
      { week: "Week 2", milestone: "Roster Automation Launch" },
      { week: "Week 3", milestone: "Marketplace Training" },
      { week: "Week 4", milestone: "Region-Wide Live Rollout" }
    ],
    quote: {
      text: "Even our oldest pubs have embraced the digital era. It's made the job more human, not more technical.",
      author: "Sam Whittaker",
      role: "Partner & Founder"
    }
  }
];
