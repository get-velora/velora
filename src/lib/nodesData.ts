import type { PathfinderNode } from './types';
import {
    User, Search, BookOpen, GraduationCap, Sparkles,
    Flag, Compass, Target, FileText, ClipboardList,
    Star, DollarSign, Mail, Calendar, CheckSquare,
    TrendingUp, Globe, Award, Microscope, Palette,
    Music, Code, Heart, Building, PenTool, BarChart
} from 'lucide-svelte';

// ─────────────────────────────────────────────
// PLACEHOLDER TEXT — easy to find & replace
// Each resource has a PLACEHOLDER_DESCRIPTION and PLACEHOLDER_URL
// Hand this file to an LLM to fill in the real content.
// ─────────────────────────────────────────────

const PLACEHOLDER_DESC = 'Resource description placeholder — replace with real content.';
const PLACEHOLDER_URL = 'https://placeholder.example.com';

function res(id: string, title: string, type: NodeResource['type']) {
    return {
        id,
        title,
        description: PLACEHOLDER_DESC,
        url: PLACEHOLDER_URL,
        type,
        completed: false,
    };
}

// Import type here so the helper above works
import type { NodeResource } from './types';

export const nodes: PathfinderNode[] = [

    // ════════════════════════════════════════
    // PHASE 1 — SELF ASSESSMENT (Levels 0–1)
    // ════════════════════════════════════════

    {
        id: 'node-0',
        title: 'Start Here',
        description: 'PLACEHOLDER — Welcome node. Orients the student to the college application process as an incoming senior.',
        status: 'completed',
        level: 0,
        position: 'center',
        icon: User,
        resources: [
            res('0-1', 'What Is the College Application Process?', 'guide'),
            res('0-2', 'Senior Year Timeline Overview', 'article'),
            res('0-3', 'Common App vs Coalition App Explained', 'official'),
            res('0-4', 'How Admissions Officers Read Applications', 'video'),
            res('0-5', 'Understanding Holistic Review', 'article'),
            res('0-6', 'FAFSA & Aid Overview (Early Peek)', 'official'),
            res('0-7', 'Setting Up Your Application Workspace', 'tool'),
        ],
    },

    {
        id: 'node-1',
        title: 'Know Yourself',
        description: 'PLACEHOLDER — Self-assessment of strengths, values, interests, and goals before building a college list.',
        status: 'completed',
        level: 1,
        position: 'center',
        icon: Target,
        resources: [
            res('1-1', 'College Board BigFuture Interest Inventory', 'tool'),
            res('1-2', 'How to Identify Your Core Strengths', 'guide'),
            res('1-3', 'Values Clarification Exercise', 'article'),
            res('1-4', 'What Do You Want From College? (Framework)', 'guide'),
            res('1-5', 'Career Exploration for High Schoolers', 'tool'),
            res('1-6', 'Personality & Learning Style Assessments', 'tool'),
            res('1-7', 'Journaling Prompts for College Readiness', 'article'),
        ],
    },

    {
        id: 'node-1-l',
        title: 'STEM Self-Audit',
        description: 'PLACEHOLDER — Branch for students leaning toward STEM. Evaluate math/science strengths and research interests.',
        status: 'completed',
        level: 1,
        position: 'left',
        icon: Microscope,
        track: 'stem',
        resources: [
            res('1l-1', 'STEM College Readiness Checklist', 'guide'),
            res('1l-2', 'Research vs Engineering vs Pre-Med Paths', 'article'),
            res('1l-3', 'AP/IB Science Course Impact on Admissions', 'article'),
            res('1l-4', 'Math Readiness Self-Assessment', 'tool'),
            res('1l-5', 'Top STEM Programs to Know', 'guide'),
            res('1l-6', 'Science Olympiad & Competition Landscape', 'article'),
            res('1l-7', 'How to Talk About STEM Passion in Essays', 'guide'),
        ],
    },

    {
        id: 'node-1-r',
        title: 'Humanities Self-Audit',
        description: 'PLACEHOLDER — Branch for students leaning toward humanities/arts. Evaluate writing, critical thinking, and creative strengths.',
        status: 'completed',
        level: 1,
        position: 'right',
        icon: PenTool,
        track: 'humanities',
        resources: [
            res('1r-1', 'Humanities & Social Sciences College Paths', 'guide'),
            res('1r-2', 'How Writing Skills Are Evaluated in Admissions', 'article'),
            res('1r-3', 'Liberal Arts vs Research University Differences', 'article'),
            res('1r-4', 'AP Humanities Courses and Their Value', 'article'),
            res('1r-5', 'Building a Portfolio Mindset Early', 'guide'),
            res('1r-6', 'Debate, MUN, and Humanities Competitions', 'article'),
            res('1r-7', 'Showcasing Intellectual Curiosity in Apps', 'guide'),
        ],
    },

    // ════════════════════════════════════════
    // PHASE 2 — COLLEGE LIST (Levels 2–3)
    // ════════════════════════════════════════

    {
        id: 'node-2',
        title: 'Build Your College List',
        description: 'PLACEHOLDER — Research and categorize schools into reach, target, and safety tiers based on stats and fit.',
        status: 'completed',
        level: 2,
        position: 'center',
        icon: ClipboardList,
        resources: [
            res('2-1', 'How to Build a Balanced College List', 'guide'),
            res('2-2', 'Naviance / Scattergrams Explained', 'tool'),
            res('2-3', 'Niche.com School Research Tool', 'tool'),
            res('2-4', 'Understanding Acceptance Rate Data', 'article'),
            res('2-5', 'College Scorecard (Official Gov Data)', 'official'),
            res('2-6', 'Reach vs Target vs Safety — Real Definitions', 'article'),
            res('2-7', 'How Many Schools Should You Apply To?', 'guide'),
        ],
    },

    {
        id: 'node-2-l',
        title: 'Public University Track',
        description: 'PLACEHOLDER — Branch for students prioritizing in-state public universities and flagship schools.',
        status: 'upcoming',
        level: 2,
        position: 'left',
        icon: Building,
        resources: [
            res('2l-1', 'In-State vs Out-of-State Tuition Breakdown', 'calculator'),
            res('2l-2', 'How State Flagship Admissions Work', 'guide'),
            res('2l-3', 'UC System Application Overview', 'official'),
            res('2l-4', 'Honors Programs at Public Universities', 'article'),
            res('2l-5', 'Merit Aid at Public Schools', 'guide'),
            res('2l-6', 'Research Opportunities at Large Publics', 'article'),
            res('2l-7', 'Top Public University Programs by Major', 'guide'),
        ],
    },

    {
        id: 'node-2-r',
        title: 'Private University Track',
        description: 'PLACEHOLDER — Branch for students targeting private colleges including LACs and research universities.',
        status: 'upcoming',
        level: 2,
        position: 'right',
        icon: Award,
        resources: [
            res('2r-1', 'Liberal Arts Colleges vs Research Universities', 'article'),
            res('2r-2', 'How Need-Blind Admissions Works', 'guide'),
            res('2r-3', 'Common Data Set — How to Read It', 'tool'),
            res('2r-4', 'Small Class Sizes & Mentorship Culture', 'article'),
            res('2r-5', 'Top Liberal Arts Colleges Overview', 'guide'),
            res('2r-6', 'Why LACs Are Underrated for STEM', 'article'),
            res('2r-7', 'Ivy League & Highly Selective Schools Reality Check', 'article'),
        ],
    },

    {
        id: 'node-3',
        title: 'Campus Fit Research',
        description: 'PLACEHOLDER — Go beyond rankings. Evaluate culture, size, location, programs, and student life fit.',
        status: 'current',
        level: 3,
        position: 'center',
        icon: Search,
        resources: [
            res('3-1', 'Virtual Campus Tour Platforms', 'tool'),
            res('3-2', 'What Questions to Ask on a College Visit', 'guide'),
            res('3-3', 'How to Use Reddit for Honest College Reviews', 'article'),
            res('3-4', 'Evaluating Student-to-Faculty Ratios', 'article'),
            res('3-5', 'Greek Life, Clubs & Culture Research', 'guide'),
            res('3-6', 'Location & Cost of Living Considerations', 'calculator'),
            res('3-7', 'Finding Alumni Networks on LinkedIn', 'tool'),
        ],
    },

    {
        id: 'node-3-l',
        title: 'Urban Campus Track',
        description: 'PLACEHOLDER — Branch for students who want city-based schools with internship and networking proximity.',
        status: 'upcoming',
        level: 3,
        position: 'left',
        icon: Globe,
        resources: [
            res('3l-1', 'Best Urban Colleges for Networking', 'guide'),
            res('3l-2', 'Internship Access in Major Cities', 'article'),
            res('3l-3', 'Transit & Cost of Living in College Cities', 'calculator'),
            res('3l-4', 'Safety & Student Support in Urban Campuses', 'article'),
            res('3l-5', 'NYC, Boston, Chicago, SF — College Ecosystems', 'guide'),
            res('3l-6', 'Co-op Programs in Urban Universities', 'article'),
            res('3l-7', 'Part-Time Work & Campus Life Balance', 'guide'),
        ],
    },

    {
        id: 'node-3-r',
        title: 'Rural / College Town Track',
        description: 'PLACEHOLDER — Branch for students drawn to tight-knit campus communities and residential college life.',
        status: 'upcoming',
        level: 3,
        position: 'right',
        icon: Heart,
        resources: [
            res('3r-1', 'Benefits of Residential College Experiences', 'article'),
            res('3r-2', 'Tight-Knit Community & Mental Health', 'guide'),
            res('3r-3', 'Research Access at Smaller Colleges', 'article'),
            res('3r-4', 'Campus Jobs & Work-Study at Small Schools', 'guide'),
            res('3r-5', 'Greek Life & Traditions at Residential Colleges', 'article'),
            res('3r-6', 'Transportation & Getting Around Without a City', 'guide'),
            res('3r-7', 'Top Residential College Experiences Ranked', 'article'),
        ],
    },

    // ════════════════════════════════════════
    // PHASE 3 — TESTING (Levels 4–5)
    // ════════════════════════════════════════

    {
        id: 'node-4',
        title: 'Test Strategy',
        description: 'PLACEHOLDER — Decide between SAT and ACT, set score targets, and plan test dates for senior year.',
        status: 'upcoming',
        level: 4,
        position: 'center',
        icon: BarChart,
        resources: [
            res('4-1', 'SAT vs ACT: Which Is Right for You?', 'guide'),
            res('4-2', 'Test-Optional Policy Tracker 2025', 'tool'),
            res('4-3', 'How Colleges Superscore', 'article'),
            res('4-4', 'Senior Year Test Date Calendar', 'official'),
            res('4-5', 'Score Targets by School Tier', 'calculator'),
            res('4-6', 'How Much Do Test Scores Actually Matter?', 'article'),
            res('4-7', 'When to Stop Testing: Diminishing Returns', 'guide'),
        ],
    },

    {
        id: 'node-4-l',
        title: 'SAT Deep Dive',
        description: 'PLACEHOLDER — Branch for SAT-focused students. Study plans, official prep, and score improvement strategies.',
        status: 'upcoming',
        level: 4,
        position: 'left',
        icon: BookOpen,
        track: 'testing-sat',
        resources: [
            res('4l-1', 'Khan Academy Official SAT Prep (Free)', 'tool'),
            res('4l-2', 'College Board SAT Full Practice Tests', 'official'),
            res('4l-3', 'Digital SAT Format Changes Explained', 'article'),
            res('4l-4', 'SAT Math Section Strategy Guide', 'guide'),
            res('4l-5', 'SAT Reading & Writing Breakdown', 'guide'),
            res('4l-6', 'From 1200 to 1400: Real Student Plans', 'article'),
            res('4l-7', 'Bluebook App — Official Digital SAT Tool', 'tool'),
        ],
    },

    {
        id: 'node-4-r',
        title: 'ACT Deep Dive',
        description: 'PLACEHOLDER — Branch for ACT-focused students. Study plans, timing strategies, and science section prep.',
        status: 'upcoming',
        level: 4,
        position: 'right',
        icon: BookOpen,
        track: 'testing-act',
        resources: [
            res('4r-1', 'Official ACT Prep Guide & Practice Tests', 'official'),
            res('4r-2', 'ACT Science Section: What It Actually Tests', 'guide'),
            res('4r-3', 'ACT Timing Strategies That Work', 'guide'),
            res('4r-4', 'ACT Math vs SAT Math Differences', 'article'),
            res('4r-5', 'Free ACT Prep Resources Ranked', 'tool'),
            res('4r-6', 'Raising Your ACT Composite by 3+ Points', 'article'),
            res('4r-7', 'ACT vs SAT Score Concordance Table', 'tool'),
        ],
    },

    {
        id: 'node-5',
        title: 'Test-Optional Decision',
        description: 'PLACEHOLDER — Evaluate whether to submit test scores for each school on your list given your score range.',
        status: 'upcoming',
        level: 5,
        position: 'center',
        icon: CheckSquare,
        resources: [
            res('5-1', 'How to Decide Whether to Submit Test Scores', 'guide'),
            res('5-2', 'Test-Optional vs Test-Blind Difference', 'article'),
            res('5-3', 'How Admissions Officers Use Submitted Scores', 'article'),
            res('5-4', 'Score Range Benchmarks by School', 'tool'),
            res('5-5', 'International Students & Test Requirements', 'guide'),
            res('5-6', 'Community College Transfer & Testing Rules', 'guide'),
            res('5-7', 'Making the Final Call: Checklist', 'guide'),
        ],
    },

    // ════════════════════════════════════════
    // PHASE 4 — ACADEMICS & COURSEWORK (Level 6)
    // ════════════════════════════════════════

    {
        id: 'node-6',
        title: 'Senior Course Load',
        description: 'PLACEHOLDER — Finalize senior year courses. Colleges expect a rigorous senior schedule — avoid senioritis traps.',
        status: 'upcoming',
        level: 6,
        position: 'center',
        icon: GraduationCap,
        resources: [
            res('6-1', 'Why Senior Year Grades Matter More Than You Think', 'article'),
            res('6-2', 'How to Choose AP vs Dual Enrollment', 'guide'),
            res('6-3', 'What "Most Rigorous Curriculum" Means to Admissions', 'article'),
            res('6-4', 'Recovering From a Weak Junior Year', 'guide'),
            res('6-5', 'IB Diploma in Senior Year — Pros & Cons', 'article'),
            res('6-6', 'Communicating Course Changes to Colleges', 'official'),
            res('6-7', 'Grade Trends: Why Upward Trajectories Help', 'article'),
        ],
    },

    {
        id: 'node-6-l',
        title: 'AP / IB Strategy',
        description: 'PLACEHOLDER — Branch for students maximizing AP or IB course counts for selective admissions.',
        status: 'upcoming',
        level: 6,
        position: 'left',
        icon: Star,
        resources: [
            res('6l-1', 'AP Exam Score Cutoffs for College Credit', 'guide'),
            res('6l-2', 'Which APs Matter Most for Your Major', 'article'),
            res('6l-3', 'IB vs AP: What Colleges Prefer', 'article'),
            res('6l-4', 'Balancing Multiple APs Without Burning Out', 'guide'),
            res('6l-5', 'Free AP Prep — Khan Academy Courses', 'tool'),
            res('6l-6', 'AP Score Sending Strategy', 'guide'),
            res('6l-7', 'Dual Enrollment as an AP Alternative', 'article'),
        ],
    },

    {
        id: 'node-6-r',
        title: 'GPA Recovery Plan',
        description: 'PLACEHOLDER — Branch for students with a dip in junior year who need to show an upward trend senior year.',
        status: 'upcoming',
        level: 6,
        position: 'right',
        icon: TrendingUp,
        resources: [
            res('6r-1', 'Addressing a Low GPA in Your Application', 'guide'),
            res('6r-2', 'How Upward Grade Trends Are Evaluated', 'article'),
            res('6r-3', 'Writing an Additional Info Section Explanation', 'guide'),
            res('6r-4', 'Schools That Are More GPA-Flexible', 'article'),
            res('6r-5', 'Study Habits Reset for Senior Year', 'guide'),
            res('6r-6', 'Counselor Letter & Context Letters Strategy', 'guide'),
            res('6r-7', 'Community College Dual Enrollment as a Signal', 'article'),
        ],
    },

    // ════════════════════════════════════════
    // PHASE 5 — EXTRACURRICULARS (Levels 7–8)
    // ════════════════════════════════════════

    {
        id: 'node-7',
        title: 'EC Audit & Narrative',
        description: 'PLACEHOLDER — Review all extracurriculars and shape them into a coherent narrative that shows depth and leadership.',
        status: 'upcoming',
        level: 7,
        position: 'center',
        icon: Compass,
        resources: [
            res('7-1', 'How to List Extracurriculars on CommonApp', 'guide'),
            res('7-2', 'Quality vs Quantity in ECs', 'article'),
            res('7-3', 'Building a Spike vs Well-Rounded Profile', 'article'),
            res('7-4', 'How Admissions Officers Read Activity Lists', 'article'),
            res('7-5', 'Turning Informal Activities Into Resume Items', 'guide'),
            res('7-6', 'The 150-Character Activity Description Formula', 'guide'),
            res('7-7', 'What Leadership Means to Colleges', 'article'),
        ],
    },

    {
        id: 'node-7-l',
        title: 'Research & Science ECs',
        description: 'PLACEHOLDER — Branch for students with lab, research, or science competition experience.',
        status: 'upcoming',
        level: 7,
        position: 'left',
        icon: Microscope,
        track: 'stem',
        resources: [
            res('7l-1', 'How to Get a Research Position as a HS Student', 'guide'),
            res('7l-2', 'Science Fairs That Matter (ISEF, Regeneron)', 'article'),
            res('7l-3', 'Writing About Research in Your Application', 'guide'),
            res('7l-4', 'Cold Emailing Professors for Lab Opportunities', 'guide'),
            res('7l-5', 'Online Research Programs for HS Students', 'tool'),
            res('7l-6', 'RSI, PRIMES, and Other Elite Programs', 'article'),
            res('7l-7', 'How Research ECs Impact STEM Admissions', 'article'),
        ],
    },

    {
        id: 'node-7-r',
        title: 'Arts & Creative ECs',
        description: 'PLACEHOLDER — Branch for students with performing arts, visual arts, or creative writing portfolios.',
        status: 'upcoming',
        level: 7,
        position: 'right',
        icon: Palette,
        track: 'arts',
        resources: [
            res('7r-1', 'Submitting an Arts Supplement — Full Guide', 'guide'),
            res('7r-2', 'When to Apply to Art-Focused vs Regular Colleges', 'article'),
            res('7r-3', 'Building a Visual Arts Portfolio for College', 'guide'),
            res('7r-4', 'Performing Arts Audition Process Explained', 'guide'),
            res('7r-5', 'Creative Writing Portfolios in College Apps', 'guide'),
            res('7r-6', 'Music Supplement & Recording Tips', 'guide'),
            res('7r-7', 'How Arts Talent Affects Admissions Odds', 'article'),
        ],
    },

    {
        id: 'node-8',
        title: 'Leadership & Impact',
        description: 'PLACEHOLDER — Identify and articulate your most meaningful leadership moments and community impact.',
        status: 'upcoming',
        level: 8,
        position: 'center',
        icon: Flag,
        resources: [
            res('8-1', 'Defining Leadership for College Applications', 'guide'),
            res('8-2', 'Informal Leadership vs Formal Titles', 'article'),
            res('8-3', 'Community Impact Projects That Stand Out', 'guide'),
            res('8-4', 'How to Start a Club or Initiative Senior Year', 'guide'),
            res('8-5', 'Service Hours vs Meaningful Volunteering', 'article'),
            res('8-6', 'Pitching Your Impact Story Across App Sections', 'guide'),
            res('8-7', 'Social Entrepreneurship for High Schoolers', 'article'),
        ],
    },

    {
        id: 'node-8-l',
        title: 'Tech & Coding ECs',
        description: 'PLACEHOLDER — Branch for students with coding projects, hackathons, or open-source contributions.',
        status: 'upcoming',
        level: 8,
        position: 'left',
        icon: Code,
        track: 'stem',
        resources: [
            res('8l-1', 'GitHub Portfolio for College Applicants', 'tool'),
            res('8l-2', 'Hackathon Competitions for HS Students', 'guide'),
            res('8l-3', 'App Development as a College EC', 'article'),
            res('8l-4', 'Open Source Contributions on Your App', 'guide'),
            res('8l-5', 'Competitive Programming (USACO) Overview', 'article'),
            res('8l-6', 'Coding Bootcamps & Summer Programs', 'tool'),
            res('8l-7', 'How CS Admissions Reads Your Projects', 'article'),
        ],
    },

    {
        id: 'node-8-r',
        title: 'Advocacy & Social Impact',
        description: 'PLACEHOLDER — Branch for students driven by social justice, civic engagement, or nonprofit work.',
        status: 'upcoming',
        level: 8,
        position: 'right',
        icon: Heart,
        track: 'humanities',
        resources: [
            res('8r-1', 'Civic Engagement Activities That Impress Colleges', 'guide'),
            res('8r-2', 'Starting a Nonprofit or 501c3 in High School', 'article'),
            res('8r-3', 'Political Campaigns & Civic Internships', 'guide'),
            res('8r-4', 'Advocacy Writing — Op-Eds & Publications', 'guide'),
            res('8r-5', 'Model UN and Its Real Value in Admissions', 'article'),
            res('8r-6', 'Youth Councils & Local Government Experience', 'article'),
            res('8r-7', 'Turning Passion Into Policy — Student Stories', 'article'),
        ],
    },

    // ════════════════════════════════════════
    // PHASE 6 — ESSAYS (Levels 9–11)
    // ════════════════════════════════════════

    {
        id: 'node-9',
        title: 'CommonApp Personal Statement',
        description: 'PLACEHOLDER — Brainstorm, draft, and refine the 650-word personal statement — the heart of your application.',
        status: 'upcoming',
        level: 9,
        position: 'center',
        icon: PenTool,
        resources: [
            res('9-1', 'The 7 CommonApp Essay Prompts Broken Down', 'guide'),
            res('9-2', 'How to Choose Your Essay Topic', 'guide'),
            res('9-3', 'Show Don\'t Tell: Essay Writing Principles', 'article'),
            res('9-4', 'Essays That Worked — Real Examples', 'article'),
            res('9-5', 'The "So What?" Test for Your Essay', 'guide'),
            res('9-6', 'Avoiding the Most Common Essay Mistakes', 'article'),
            res('9-7', 'Revision Checklist for Your Personal Statement', 'tool'),
        ],
    },

    {
        id: 'node-9-l',
        title: 'Identity & Background Essays',
        description: 'PLACEHOLDER — Branch for students writing about cultural identity, immigrant experience, or first-gen background.',
        status: 'upcoming',
        level: 9,
        position: 'left',
        icon: User,
        resources: [
            res('9l-1', 'Writing About Your Culture Without Stereotyping', 'guide'),
            res('9l-2', 'First-Gen College Student Essay Strategies', 'guide'),
            res('9l-3', 'Immigrant Experience Essays That Stand Out', 'article'),
            res('9l-4', 'Balancing Vulnerability and Strength in Essays', 'guide'),
            res('9l-5', 'Multilingual Identity in College Essays', 'article'),
            res('9l-6', 'QuestBridge & First-Gen Specific Resources', 'official'),
            res('9l-7', 'How Diversity Statements Are Read', 'article'),
        ],
    },

    {
        id: 'node-9-r',
        title: 'Overcoming Adversity Essays',
        description: 'PLACEHOLDER — Branch for students whose story involves hardship, challenge, or significant personal obstacles.',
        status: 'upcoming',
        level: 9,
        position: 'right',
        icon: TrendingUp,
        resources: [
            res('9r-1', 'Writing About Hardship Without Being a Victim', 'guide'),
            res('9r-2', 'Trauma-Informed Essay Writing Tips', 'guide'),
            res('9r-3', 'Mental Health in College Essays — Yes or No?', 'article'),
            res('9r-4', 'Framing Challenge as Growth', 'guide'),
            res('9r-5', 'Family Hardship Essays Done Right', 'article'),
            res('9r-6', 'Adversity vs Obstacle: Knowing the Difference', 'article'),
            res('9r-7', 'Additional Info Section for Context', 'guide'),
        ],
    },

    {
        id: 'node-10',
        title: 'Supplement Essays',
        description: 'PLACEHOLDER — Research and write supplemental essays for each school: "Why Us", "Why Major", and short takes.',
        status: 'upcoming',
        level: 10,
        position: 'center',
        icon: FileText,
        resources: [
            res('10-1', '"Why This College" Essay Full Guide', 'guide'),
            res('10-2', '"Why This Major" Essay Strategy', 'guide'),
            res('10-3', 'Short Answer Questions — How to Be Concise', 'guide'),
            res('10-4', 'Researching Schools for Specific Supplement Details', 'tool'),
            res('10-5', 'Activity Essay & Intellectual Interest Prompts', 'guide'),
            res('10-6', 'Repurposing Essays Across Schools Ethically', 'article'),
            res('10-7', 'Essay Tracker Spreadsheet Template', 'tool'),
        ],
    },

    {
        id: 'node-10-l',
        title: 'Ivy & T20 Supplements',
        description: 'PLACEHOLDER — Branch for students applying to highly selective schools with unique multi-essay requirements.',
        status: 'upcoming',
        level: 10,
        position: 'left',
        icon: Star,
        resources: [
            res('10l-1', 'Harvard Supplement Essays Breakdown', 'guide'),
            res('10l-2', 'MIT Application Essays What They\'re Looking For', 'guide'),
            res('10l-3', 'Stanford Essays: Roommate Letter & Short Takes', 'guide'),
            res('10l-4', 'UChicago Uncommon Essay Strategy', 'guide'),
            res('10l-5', 'Columbia List Essays — Showing Genuine Interest', 'guide'),
            res('10l-6', 'How T20 Schools Use Supplements to Differentiate', 'article'),
            res('10l-7', 'Getting Feedback on High-Stakes Essays', 'guide'),
        ],
    },

    {
        id: 'node-10-r',
        title: 'UC Application Essays',
        description: 'PLACEHOLDER — Branch for students applying to the University of California system (4 PIQs instead of CommonApp).',
        status: 'upcoming',
        level: 10,
        position: 'right',
        icon: BookOpen,
        resources: [
            res('10r-1', 'UC Personal Insight Questions (PIQs) Full Guide', 'official'),
            res('10r-2', 'Choosing Which 4 PIQs to Answer', 'guide'),
            res('10r-3', 'How the UC System Reads Applications', 'article'),
            res('10r-4', 'UC GPA Calculation — Weighted vs Capped', 'calculator'),
            res('10r-5', 'UC vs CommonApp: Managing Both', 'guide'),
            res('10r-6', 'UC Campus Differences Explained', 'guide'),
            res('10r-7', 'PIQ Examples That Worked', 'article'),
        ],
    },

    {
        id: 'node-11',
        title: 'Letters of Recommendation',
        description: 'PLACEHOLDER — Identify, approach, and brief recommenders. Provide them a brag sheet and timeline.',
        status: 'upcoming',
        level: 11,
        position: 'center',
        icon: Mail,
        resources: [
            res('11-1', 'How to Choose Your Recommenders', 'guide'),
            res('11-2', 'Asking for a Rec Letter — Email Templates', 'guide'),
            res('11-3', 'Writing Your Own Brag Sheet', 'tool'),
            res('11-4', 'What Makes a Strong Recommendation Letter', 'article'),
            res('11-5', 'Counselor Rec vs Teacher Rec Differences', 'guide'),
            res('11-6', 'Optional Third Rec — When to Use It', 'article'),
            res('11-7', 'Rec Letter Deadlines & Tracker Template', 'tool'),
        ],
    },

    {
        id: 'node-11-l',
        title: 'Research Mentor Rec',
        description: 'PLACEHOLDER — Branch for STEM students getting a rec from a professor, lab mentor, or research supervisor.',
        status: 'upcoming',
        level: 11,
        position: 'left',
        icon: Microscope,
        track: 'stem',
        resources: [
            res('11l-1', 'How Research Mentor Letters Are Viewed', 'article'),
            res('11l-2', 'Briefing Your Mentor on Your College Goals', 'guide'),
            res('11l-3', 'When a Professor Rec Hurts vs Helps', 'article'),
            res('11l-4', 'Research Summary to Give Your Recommender', 'tool'),
            res('11l-5', 'Following Up Professionally With Mentors', 'guide'),
            res('11l-6', 'How to Waive Your Right to See the Letter', 'official'),
            res('11l-7', 'Getting a Rec From an Online Program Instructor', 'guide'),
        ],
    },

    {
        id: 'node-11-r',
        title: 'Arts Portfolio Submission',
        description: 'PLACEHOLDER — Branch for arts students submitting a portfolio or arts supplement alongside applications.',
        status: 'upcoming',
        level: 11,
        position: 'right',
        icon: Palette,
        track: 'arts',
        resources: [
            res('11r-1', 'Slideroom Portfolio Submission Guide', 'tool'),
            res('11r-2', 'What to Include in a Visual Arts Portfolio', 'guide'),
            res('11r-3', 'Writing Your Artist Statement', 'guide'),
            res('11r-4', 'Music Recording Submission Standards', 'guide'),
            res('11r-5', 'Theatre & Dance Audition Prep', 'guide'),
            res('11r-6', 'Creative Writing Portfolio Selection', 'guide'),
            res('11r-7', 'Getting Your Portfolio Reviewed Before Submission', 'article'),
        ],
    },

    // ════════════════════════════════════════
    // PHASE 7 — APPLICATIONS (Levels 12–13)
    // ════════════════════════════════════════

    {
        id: 'node-12',
        title: 'Application Strategy',
        description: 'PLACEHOLDER — Set deadlines, decide on ED/EA/RD for each school, and finalize your application calendar.',
        status: 'upcoming',
        level: 12,
        position: 'center',
        icon: Calendar,
        resources: [
            res('12-1', 'ED vs EA vs RD vs REA — Full Explainer', 'guide'),
            res('12-2', 'How to Pick Your ED School', 'guide'),
            res('12-3', 'Application Deadline Calendar Template', 'tool'),
            res('12-4', 'Rolling Admissions — Apply Early Strategy', 'article'),
            res('12-5', 'CommonApp Submission Checklist', 'official'),
            res('12-6', 'Coalition App vs CommonApp — Do You Need Both?', 'guide'),
            res('12-7', 'How Demonstrated Interest Affects Admissions', 'article'),
        ],
    },

    {
        id: 'node-12-l',
        title: 'Early Decision Strategy',
        description: 'PLACEHOLDER — Branch for students committing to an ED school. Understand the binding agreement and financial implications.',
        status: 'upcoming',
        level: 12,
        position: 'left',
        icon: Target,
        resources: [
            res('12l-1', 'Is ED Binding Even If Aid Is Insufficient?', 'guide'),
            res('12l-2', 'ED Acceptance Rate Boost — Real Data', 'article'),
            res('12l-3', 'How to Back Out of ED If Needed', 'official'),
            res('12l-4', 'ED II Schools and Timing', 'guide'),
            res('12l-5', 'Financial Aid Implications of ED', 'calculator'),
            res('12l-6', 'Telling Your Counselor About Your ED Choice', 'guide'),
            res('12l-7', 'ED Decision Day Prep', 'article'),
        ],
    },

    {
        id: 'node-12-r',
        title: 'Regular Decision Planning',
        description: 'PLACEHOLDER — Branch for students going RD-heavy. Maximize January apps and manage submission fatigue.',
        status: 'upcoming',
        level: 12,
        position: 'right',
        icon: ClipboardList,
        resources: [
            res('12r-1', 'Managing 10+ Applications Without Burning Out', 'guide'),
            res('12r-2', 'January 1 Deadline Survival Plan', 'guide'),
            res('12r-3', 'Prioritizing Schools in Your RD Pool', 'article'),
            res('12r-4', 'Waitlist Strategy From the Start', 'guide'),
            res('12r-5', 'How to Write Multiple "Why Us" Essays Fast', 'guide'),
            res('12r-6', 'Tracking Application Portals & Checklist Items', 'tool'),
            res('12r-7', 'RD Acceptance Rates vs ED — What to Expect', 'article'),
        ],
    },

    {
        id: 'node-13',
        title: 'Submit & Follow Up',
        description: 'PLACEHOLDER — Submit applications, confirm receipt, and manage portal logins and missing document requests.',
        status: 'upcoming',
        level: 13,
        position: 'center',
        icon: CheckSquare,
        resources: [
            res('13-1', 'Post-Submission Checklist for Every School', 'guide'),
            res('13-2', 'Setting Up Application Portals', 'tool'),
            res('13-3', 'What to Do If a Document Is Missing', 'guide'),
            res('13-4', 'Sending Mid-Year Reports & Senior Grades', 'official'),
            res('13-5', 'Writing an Admissions Update Letter', 'guide'),
            res('13-6', 'Demonstrated Interest After Submission', 'article'),
            res('13-7', 'Responding to Interviews & Info Sessions', 'guide'),
        ],
    },

    // ════════════════════════════════════════
    // PHASE 8 — FINANCIAL AID (Level 14)
    // ════════════════════════════════════════

    {
        id: 'node-14',
        title: 'FAFSA & CSS Profile',
        description: 'PLACEHOLDER — Complete the FAFSA and CSS Profile on time. Understand EFC, need-based aid, and merit aid.',
        status: 'upcoming',
        level: 14,
        position: 'center',
        icon: DollarSign,
        resources: [
            res('14-1', 'FAFSA Step-by-Step Completion Guide', 'official'),
            res('14-2', 'CSS Profile — Who Needs It & How to File', 'official'),
            res('14-3', 'EFC / SAI Calculator', 'calculator'),
            res('14-4', 'FAFSA Opening Dates & Priority Deadlines', 'official'),
            res('14-5', 'Dependency Status — Are You Independent?', 'guide'),
            res('14-6', 'How Financial Aid Packages Are Built', 'article'),
            res('14-7', 'Appealing a Financial Aid Award', 'guide'),
        ],
    },

    {
        id: 'node-14-l',
        title: 'Scholarships',
        description: 'PLACEHOLDER — Branch for identifying and applying to external scholarships separate from school-based aid.',
        status: 'upcoming',
        level: 14,
        position: 'left',
        icon: Award,
        track: 'financial',
        resources: [
            res('14l-1', 'Scholarship Search Engines Ranked', 'tool'),
            res('14l-2', 'Local vs National Scholarships — Which to Prioritize', 'guide'),
            res('14l-3', 'Common Scholarship Essay Prompts & How to Reuse', 'guide'),
            res('14l-4', 'QuestBridge National College Match', 'official'),
            res('14l-5', 'Gates Scholarship & Coca-Cola Scholars Overview', 'article'),
            res('14l-6', 'Scholarship Scam Red Flags', 'guide'),
            res('14l-7', 'Scholarship Tracker Spreadsheet Template', 'tool'),
        ],
    },

    {
        id: 'node-14-r',
        title: 'Net Price & Loans',
        description: 'PLACEHOLDER — Branch for understanding net price calculators, loan types, and realistic cost comparison.',
        status: 'upcoming',
        level: 14,
        position: 'right',
        icon: BarChart,
        track: 'financial',
        resources: [
            res('14r-1', 'Net Price Calculator — Every School Has One', 'calculator'),
            res('14r-2', 'Federal vs Private Loans Explained', 'guide'),
            res('14r-3', 'Work-Study Programs Demystified', 'official'),
            res('14r-4', 'Subsidized vs Unsubsidized Loans', 'article'),
            res('14r-5', 'How to Compare Financial Aid Award Letters', 'tool'),
            res('14r-6', 'ROI of College — Is the Cost Worth It?', 'calculator'),
            res('14r-7', 'Income-Driven Repayment Plans Overview', 'guide'),
        ],
    },

    // ════════════════════════════════════════
    // PHASE 9 — DECISIONS (Levels 15–16)
    // ════════════════════════════════════════

    {
        id: 'node-15',
        title: 'Decision Day Prep',
        description: 'PLACEHOLDER — Compare acceptance letters, financial aid packages, and make a final school decision by May 1.',
        status: 'upcoming',
        level: 15,
        position: 'center',
        icon: Flag,
        resources: [
            res('15-1', 'How to Compare College Acceptance Letters', 'guide'),
            res('15-2', 'Visiting Accepted Students Days (Revisit Programs)', 'guide'),
            res('15-3', 'Talking to Current Students Before Deciding', 'article'),
            res('15-4', 'Financial Aid Comparison Spreadsheet Template', 'tool'),
            res('15-5', 'Deferral & Waitlist — What to Do Now', 'guide'),
            res('15-6', 'Telling Other Schools You Won\'t Attend', 'guide'),
            res('15-7', 'Gap Year Option — When It Makes Sense', 'article'),
        ],
    },

    {
        id: 'node-15-l',
        title: 'Waitlist Strategy',
        description: 'PLACEHOLDER — Branch for students waitlisted at a dream school. LOCI letters, updates, and managing hope vs reality.',
        status: 'upcoming',
        level: 15,
        position: 'left',
        icon: Search,
        resources: [
            res('15l-1', 'Letter of Continued Interest (LOCI) Template', 'guide'),
            res('15l-2', 'How Many Students Get Off Waitlists?', 'article'),
            res('15l-3', 'What Updates to Send After Being Waitlisted', 'guide'),
            res('15l-4', 'When to Give Up on the Waitlist', 'article'),
            res('15l-5', 'Contacting the Admissions Office Professionally', 'guide'),
            res('15l-6', 'Depositing Elsewhere While Waitlisted', 'guide'),
            res('15l-7', 'Waitlist Stories: Real Student Outcomes', 'article'),
        ],
    },

    {
        id: 'node-15-r',
        title: 'Gap Year Planning',
        description: 'PLACEHOLDER — Branch for students deferring enrollment or choosing a structured gap year instead.',
        status: 'upcoming',
        level: 15,
        position: 'right',
        icon: Globe,
        resources: [
            res('15r-1', 'How to Request a Gap Year Deferral', 'guide'),
            res('15r-2', 'Structured Gap Year Programs Ranked', 'tool'),
            res('15r-3', 'AmeriCorps, City Year & Service Gap Years', 'official'),
            res('15r-4', 'International Gap Year Safety & Planning', 'guide'),
            res('15r-5', 'Using a Gap Year to Strengthen a Transfer App', 'article'),
            res('15r-6', 'Financial Planning During a Gap Year', 'guide'),
            res('15r-7', 'Gap Year Journals & Community Resources', 'tool'),
        ],
    },

    {
        id: 'node-16',
        title: 'Committed — What\'s Next',
        description: 'PLACEHOLDER — You\'ve committed! Final steps: housing, orientation, scholarships to accept, and senior summer prep.',
        status: 'upcoming',
        level: 16,
        position: 'center',
        icon: Sparkles,
        resources: [
            res('16-1', 'Housing Application & Roommate Matching Tips', 'guide'),
            res('16-2', 'Orientation Prep — What to Expect', 'guide'),
            res('16-3', 'Final Scholarship Acceptance Steps', 'official'),
            res('16-4', 'Sending Final Transcripts to Your College', 'official'),
            res('16-5', 'What to Do the Summer Before College', 'article'),
            res('16-6', 'College Packing List — What You Actually Need', 'guide'),
            res('16-7', 'Staying Connected With Your High School Network', 'article'),
        ],
    },
];