import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Video,
  FileText,
  Wand2,
  Play,
  Instagram,
  Twitter,
  Linkedin,
  Image,
  Scissors,
  Sparkles,
  Clock,
  CheckCircle,
  Mail,
  Calendar,
  Home,
  Stethoscope,
  HardHat,
  Shield,
  Scale,
  Landmark,
  AlertCircle,
} from 'lucide-react';
import { Button, Card, Modal, Input } from '../common';

// Industry definitions
const industries = [
  { id: 'real-estate', name: 'Real Estate', icon: Home, color: 'from-blue-500 to-blue-600' },
  { id: 'healthcare', name: 'Healthcare', icon: Stethoscope, color: 'from-emerald-500 to-emerald-600' },
  { id: 'construction', name: 'Construction', icon: HardHat, color: 'from-orange-500 to-orange-600' },
  { id: 'insurance', name: 'Insurance', icon: Shield, color: 'from-purple-500 to-purple-600' },
  { id: 'legal', name: 'Legal', icon: Scale, color: 'from-red-500 to-red-600' },
  { id: 'finance', name: 'Finance', icon: Landmark, color: 'from-cyan-500 to-cyan-600' },
];

// Keywords for auto-detection
const industryKeywords = {
  'real-estate': ['property', 'home', 'house', 'real estate', 'realtor', 'mortgage', 'listing', 'buyer', 'seller', 'condo', 'apartment', 'rent', 'lease'],
  'healthcare': ['health', 'medical', 'doctor', 'patient', 'hospital', 'clinic', 'wellness', 'therapy', 'treatment', 'care', 'nurse', 'dental', 'healthcare'],
  'construction': ['construction', 'build', 'contractor', 'renovation', 'remodel', 'project', 'site', 'foundation', 'roofing', 'plumbing', 'electrical', 'concrete'],
  'insurance': ['insurance', 'policy', 'coverage', 'claim', 'premium', 'deductible', 'risk', 'liability', 'underwriting', 'insured', 'broker'],
  'legal': ['legal', 'law', 'attorney', 'lawyer', 'court', 'case', 'litigation', 'contract', 'settlement', 'plaintiff', 'defendant', 'rights'],
  'finance': ['finance', 'investment', 'bank', 'loan', 'credit', 'wealth', 'portfolio', 'stock', 'trading', 'financial', 'advisor', 'retirement', 'tax'],
};

// Simulated transcript segments for different industries
const industryTranscripts = {
  'real-estate': [
    { start: 5, end: 20, text: "The market is shifting and here's what every buyer needs to know right now", hookTitle: "Market Update Hook", subtitle: "the market is shifting and here's what every buyer needs to know" },
    { start: 45, end: 75, text: "First time buyers make these three mistakes and it costs them thousands", hookTitle: "First-Time Buyer Tips", subtitle: "first time buyers make these three mistakes" },
    { start: 90, end: 112, text: "Just listed this stunning four bedroom home in the heart of downtown", hookTitle: "Property Showcase", subtitle: "just listed this stunning four bedroom home" },
  ],
  'healthcare': [
    { start: 8, end: 26, text: "Five health tips that will change your life starting today", hookTitle: "Health Tips Hook", subtitle: "five health tips that will change your life" },
    { start: 50, end: 75, text: "The biggest wellness myth that doctors wish you knew wasn't true", hookTitle: "Wellness Myth Buster", subtitle: "the biggest wellness myth doctors wish you knew" },
    { start: 100, end: 120, text: "Prevention is always better than treatment here's why", hookTitle: "Prevention Tips", subtitle: "prevention is always better than treatment" },
  ],
  'construction': [
    { start: 3, end: 23, text: "This is how we onboard new trades clients in under 48 hours", hookTitle: "Client Onboarding Process", subtitle: "this is how we onboard new trades clients in under 48 hours" },
    { start: 40, end: 55, text: "How can you keep it an honest crew a motivated crew a transparent crew", hookTitle: "Building Your Team", subtitle: "how can you keep it an honest crew a motivated crew a transparent crew" },
    { start: 85, end: 115, text: "Watch this ninety day build come together in just thirty seconds", hookTitle: "Project Timelapse", subtitle: "watch this ninety day build come together" },
  ],
  'insurance': [
    { start: 5, end: 23, text: "Insurance doesn't have to be confusing let me break it down for you", hookTitle: "Coverage Made Simple", subtitle: "insurance doesn't have to be confusing let me break it down" },
    { start: 48, end: 78, text: "The three coverage gaps that could cost you everything you own", hookTitle: "Coverage Gap Warning", subtitle: "the three coverage gaps that could cost you everything" },
    { start: 95, end: 113, text: "How to file a claim and actually get approved the first time", hookTitle: "Claims Process Guide", subtitle: "how to file a claim and actually get approved" },
  ],
  'legal': [
    { start: 6, end: 26, text: "Know your rights before you sign anything these are the red flags", hookTitle: "Know Your Rights", subtitle: "know your rights before you sign anything" },
    { start: 52, end: 77, text: "Five contract clauses that should never be ignored ever", hookTitle: "Contract Red Flags", subtitle: "five contract clauses that should never be ignored" },
    { start: 92, end: 114, text: "When should you actually get a lawyer involved most people wait too long", hookTitle: "When to Get Legal Help", subtitle: "when should you actually get a lawyer involved" },
  ],
  'finance': [
    { start: 4, end: 19, text: "The money minute here's today's tip that could save you thousands", hookTitle: "Money Minute", subtitle: "here's today's tip that could save you thousands" },
    { start: 55, end: 83, text: "Compound interest is the eighth wonder of the world here's why", hookTitle: "Power of Compound Interest", subtitle: "compound interest is the eighth wonder of the world" },
    { start: 98, end: 118, text: "Three investment myths that are keeping you broke let's bust them", hookTitle: "Investment Myth Buster", subtitle: "three investment myths that are keeping you broke" },
  ],
};

// Industry-specific mock content with enhanced visuals
const industryContent = {
  'real-estate': {
    color: 'from-blue-500 to-blue-600',
    accentColor: 'blue',
    gradientTop: 'from-blue-900/90 via-blue-900/50 to-transparent',
    gradientBottom: 'from-transparent via-blue-900/50 to-blue-900/90',
    clips: [
      { id: 1, title: 'Market Update Hook', duration: '0:15', type: 'Reel/Short', thumbnail: '🏠', subtitle: '"2024 Market Trends"', textOverlay: 'THE MARKET IS SHIFTING' },
      { id: 2, title: 'Tip: First-Time Buyers', duration: '0:30', type: 'Reel/Short', thumbnail: '🔑', subtitle: '"3 Must-Know Tips"', textOverlay: 'FIRST TIME BUYER?' },
      { id: 3, title: 'Property Showcase Teaser', duration: '0:22', type: 'Reel/Short', thumbnail: '✨', subtitle: '"Just Listed"', textOverlay: 'STUNNING 4BR HOME' },
    ],
    captions: [
      {
        platform: 'Instagram',
        icon: Instagram,
        color: 'from-pink-500 to-purple-500',
        caption: "The market is shifting! Here are 3 things every buyer needs to know right now. Save this for later! \n\n#RealEstate #HomeBuying #MarketUpdate #RealEstateAgent #PropertyTips",
      },
      {
        platform: 'Twitter/X',
        icon: Twitter,
        color: 'from-gray-600 to-gray-800',
        caption: "Hot take: The best time to buy isn't when everyone else is buying.\n\nHere's what smart buyers are doing in today's market:\n\n🔹 Getting pre-approved early\n🔹 Looking in emerging neighborhoods\n🔹 Being flexible on timing\n\nThread below 👇",
      },
      {
        platform: 'LinkedIn',
        icon: Linkedin,
        color: 'from-blue-600 to-blue-800',
        caption: "After helping 200+ families find their dream homes, I've noticed a pattern.\n\nThe most successful buyers do these 3 things differently:\n\n1. They understand their true budget\n2. They invest time in neighborhood research\n3. They work with agents who know the micro-markets\n\nWhat would you add to this list?",
      },
    ],
    imageCards: [
      { id: 1, type: 'Quote Card', quote: '"The best investment on Earth is earth."', style: 'Minimal Dark', bgStyle: 'from-blue-900 via-slate-900 to-blue-950', icon: '🏡' },
      { id: 2, type: 'Stats Card', stat: '47%', label: 'of buyers start online', style: 'Gradient', bgStyle: 'from-blue-600 to-cyan-500', icon: '📊' },
      { id: 3, type: 'Tip Card', tip: '3 Questions to Ask Before Making an Offer', style: 'Bold', bgStyle: 'from-slate-800 to-slate-900', icon: '💡' },
    ],
  },
  'healthcare': {
    color: 'from-emerald-500 to-emerald-600',
    accentColor: 'emerald',
    gradientTop: 'from-emerald-900/90 via-emerald-900/50 to-transparent',
    gradientBottom: 'from-transparent via-emerald-900/50 to-emerald-900/90',
    clips: [
      { id: 1, title: 'Patient Care Tips', duration: '0:18', type: 'Reel/Short', thumbnail: '💚', subtitle: '"Wellness Guide"', textOverlay: '5 HEALTH TIPS' },
      { id: 2, title: 'Wellness Wednesday Hook', duration: '0:25', type: 'Reel/Short', thumbnail: '🩺', subtitle: '"Weekly Wellness"', textOverlay: 'WELLNESS WEDNESDAY' },
      { id: 3, title: 'Health Myth Buster', duration: '0:20', type: 'Reel/Short', thumbnail: '❌', subtitle: '"Myth vs Fact"', textOverlay: 'MYTH BUSTED!' },
    ],
    captions: [
      {
        platform: 'Instagram',
        icon: Instagram,
        color: 'from-pink-500 to-purple-500',
        caption: "Your health journey starts with one small step! Here's what our patients wish they knew sooner 💚\n\n#HealthTips #WellnessJourney #HealthcareMatters #PatientCare #MedicalAdvice",
      },
      {
        platform: 'Twitter/X',
        icon: Twitter,
        color: 'from-gray-600 to-gray-800',
        caption: "Prevention > Treatment. Always.\n\n3 things you can do TODAY for better health:\n\n🩺 Schedule that checkup you've been putting off\n🥗 Add one more serving of vegetables\n🚶 Take a 10-min walk after meals\n\nSmall steps, big impact.",
      },
      {
        platform: 'LinkedIn',
        icon: Linkedin,
        color: 'from-blue-600 to-blue-800',
        caption: "In healthcare, we often see patients only when something goes wrong.\n\nBut the real wins happen in prevention:\n\n1. Regular wellness visits catch issues early\n2. Patient education reduces complications\n3. Building trust leads to better outcomes\n\nHow is your practice prioritizing preventive care?",
      },
    ],
    imageCards: [
      { id: 1, type: 'Quote Card', quote: '"The greatest wealth is health."', style: 'Minimal Dark', bgStyle: 'from-emerald-900 via-slate-900 to-teal-950', icon: '💚' },
      { id: 2, type: 'Stats Card', stat: '80%', label: 'of health issues are preventable', style: 'Gradient', bgStyle: 'from-emerald-600 to-teal-500', icon: '📈' },
      { id: 3, type: 'Tip Card', tip: '5 Signs You Should See a Doctor', style: 'Bold', bgStyle: 'from-slate-800 to-slate-900', icon: '⚠️' },
    ],
  },
  'construction': {
    color: 'from-orange-500 to-orange-600',
    accentColor: 'orange',
    gradientTop: 'from-amber-600/95 via-orange-500/70 to-transparent',
    gradientBottom: 'from-transparent via-orange-500/70 to-amber-600/95',
    clips: [
      { id: 1, title: 'Project Timelapse Hook', duration: '0:20', type: 'Reel/Short', thumbnail: '🏗️', subtitle: '"Build Progress"', textOverlay: '90 DAYS IN 30 SEC' },
      { id: 2, title: 'Safety Tip of the Week', duration: '0:15', type: 'Reel/Short', thumbnail: '⚠️', subtitle: '"Safety First"', textOverlay: 'STAY SAFE ON SITE' },
      { id: 3, title: 'Before & After Reveal', duration: '0:30', type: 'Reel/Short', thumbnail: '✨', subtitle: '"Transformation"', textOverlay: 'THE BIG REVEAL' },
    ],
    captions: [
      {
        platform: 'Instagram',
        icon: Instagram,
        color: 'from-pink-500 to-purple-500',
        caption: "From foundation to finish - this is what dedication looks like! 🏗️ Watch the transformation!\n\n#Construction #BuildingDreams #ContractorLife #HomeRenovation #ConstructionLife",
      },
      {
        platform: 'Twitter/X',
        icon: Twitter,
        color: 'from-gray-600 to-gray-800',
        caption: "Construction tip that saves time AND money:\n\nPlan your material deliveries in reverse order.\n\n📦 What you need last, order last\n📦 Reduces on-site storage needs\n📦 Minimizes damage and theft\n\nSimple logistics = better margins.",
      },
      {
        platform: 'LinkedIn',
        icon: Linkedin,
        color: 'from-blue-600 to-blue-800',
        caption: "After 15 years in construction, here's what separates great contractors from good ones:\n\n1. Communication - Updates before clients ask\n2. Documentation - Photos and reports daily\n3. Problem-solving - Solutions, not excuses\n\nThe build quality matters, but the experience matters more.\n\nWhat would you add?",
      },
    ],
    imageCards: [
      { id: 1, type: 'Quote Card', quote: '"We don\'t just build structures, we build trust."', style: 'Minimal Dark', bgStyle: 'from-orange-900 via-slate-900 to-amber-950', icon: '🏗️' },
      { id: 2, type: 'Stats Card', stat: '150+', label: 'projects completed on time', style: 'Gradient', bgStyle: 'from-orange-600 to-amber-500', icon: '🎯' },
      { id: 3, type: 'Tip Card', tip: '3 Questions to Ask Your Contractor', style: 'Bold', bgStyle: 'from-slate-800 to-slate-900', icon: '📋' },
    ],
  },
  'insurance': {
    color: 'from-purple-500 to-purple-600',
    accentColor: 'purple',
    gradientTop: 'from-purple-900/90 via-purple-900/50 to-transparent',
    gradientBottom: 'from-transparent via-purple-900/50 to-purple-900/90',
    clips: [
      { id: 1, title: 'Coverage Explained Simply', duration: '0:25', type: 'Reel/Short', thumbnail: '🛡️', subtitle: '"Coverage 101"', textOverlay: 'INSURANCE MADE EASY' },
      { id: 2, title: 'Claim Process Walkthrough', duration: '0:30', type: 'Reel/Short', thumbnail: '📝', subtitle: '"Step by Step"', textOverlay: 'HOW TO FILE A CLAIM' },
      { id: 3, title: 'Policy Myth Buster', duration: '0:18', type: 'Reel/Short', thumbnail: '❌', subtitle: '"Myth vs Fact"', textOverlay: 'POLICY MYTHS BUSTED' },
    ],
    captions: [
      {
        platform: 'Instagram',
        icon: Instagram,
        color: 'from-pink-500 to-purple-500',
        caption: "Insurance doesn't have to be confusing! Here's what you ACTUALLY need to know about coverage 🛡️\n\n#InsuranceTips #ProtectWhatMatters #CoverageMatters #InsuranceAgent #FinancialPlanning",
      },
      {
        platform: 'Twitter/X',
        icon: Twitter,
        color: 'from-gray-600 to-gray-800',
        caption: "The most expensive insurance is the one you don't have when you need it.\n\n3 coverages people skip (and regret):\n\n🛡️ Umbrella liability\n🛡️ Disability income\n🛡️ Flood insurance\n\nReview your policies annually. Seriously.",
      },
      {
        platform: 'LinkedIn',
        icon: Linkedin,
        color: 'from-blue-600 to-blue-800',
        caption: "In 20 years of insurance, I've seen too many 'I wish I had known' moments.\n\nThe gap between what people think they're covered for vs. reality is often huge:\n\n1. Read your declarations page\n2. Understand your deductibles\n3. Know your policy limits\n\nWhat coverage surprises have you encountered?",
      },
    ],
    imageCards: [
      { id: 1, type: 'Quote Card', quote: '"Peace of mind is the best policy."', style: 'Minimal Dark', bgStyle: 'from-purple-900 via-slate-900 to-violet-950', icon: '🛡️' },
      { id: 2, type: 'Stats Card', stat: '40%', label: 'are underinsured', style: 'Gradient', bgStyle: 'from-purple-600 to-violet-500', icon: '📊' },
      { id: 3, type: 'Tip Card', tip: '5 Things Your Policy May Not Cover', style: 'Bold', bgStyle: 'from-slate-800 to-slate-900', icon: '⚡' },
    ],
  },
  'legal': {
    color: 'from-red-500 to-red-600',
    accentColor: 'red',
    gradientTop: 'from-red-900/90 via-red-900/50 to-transparent',
    gradientBottom: 'from-transparent via-red-900/50 to-red-900/90',
    clips: [
      { id: 1, title: 'Know Your Rights', duration: '0:20', type: 'Reel/Short', thumbnail: '⚖️', subtitle: '"Legal Rights"', textOverlay: 'KNOW YOUR RIGHTS' },
      { id: 2, title: 'Legal Tip Tuesday', duration: '0:25', type: 'Reel/Short', thumbnail: '📜', subtitle: '"Weekly Tips"', textOverlay: 'LEGAL TIP TUESDAY' },
      { id: 3, title: 'Contract Red Flags', duration: '0:22', type: 'Reel/Short', thumbnail: '🚩', subtitle: '"Warning Signs"', textOverlay: '5 CONTRACT RED FLAGS' },
    ],
    captions: [
      {
        platform: 'Instagram',
        icon: Instagram,
        color: 'from-pink-500 to-purple-500',
        caption: "Knowledge is power - especially when it comes to your legal rights! Here's what everyone should know ⚖️\n\n#LegalTips #KnowYourRights #LawFirm #AttorneyAdvice #LegalHelp",
      },
      {
        platform: 'Twitter/X',
        icon: Twitter,
        color: 'from-gray-600 to-gray-800',
        caption: "Before you sign ANYTHING:\n\n📜 Read every clause (yes, really)\n📜 Ask about exit terms\n📜 Get unclear language explained\n📜 Keep a signed copy\n\nThe 10 minutes you spend reading could save you 10 months in court.",
      },
      {
        platform: 'LinkedIn',
        icon: Linkedin,
        color: 'from-blue-600 to-blue-800',
        caption: "The best legal advice I give clients isn't about litigation.\n\nIt's about prevention:\n\n1. Document everything in writing\n2. Have contracts reviewed BEFORE signing\n3. Know your rights before disputes arise\n\nA consultation today can prevent a lawsuit tomorrow.\n\nWhat legal lesson did you learn the hard way?",
      },
    ],
    imageCards: [
      { id: 1, type: 'Quote Card', quote: '"Justice delayed is justice denied."', style: 'Minimal Dark', bgStyle: 'from-red-900 via-slate-900 to-rose-950', icon: '⚖️' },
      { id: 2, type: 'Stats Card', stat: '95%', label: 'of cases settle out of court', style: 'Gradient', bgStyle: 'from-red-600 to-rose-500', icon: '📈' },
      { id: 3, type: 'Tip Card', tip: 'When to Consult an Attorney', style: 'Bold', bgStyle: 'from-slate-800 to-slate-900', icon: '🔍' },
    ],
  },
  'finance': {
    color: 'from-cyan-500 to-cyan-600',
    accentColor: 'cyan',
    gradientTop: 'from-cyan-900/90 via-cyan-900/50 to-transparent',
    gradientBottom: 'from-transparent via-cyan-900/50 to-cyan-900/90',
    clips: [
      { id: 1, title: 'Money Minute Hook', duration: '0:15', type: 'Reel/Short', thumbnail: '💰', subtitle: '"Quick Tips"', textOverlay: 'MONEY MINUTE' },
      { id: 2, title: 'Investment Strategy Breakdown', duration: '0:28', type: 'Reel/Short', thumbnail: '📈', subtitle: '"Smart Investing"', textOverlay: 'GROW YOUR WEALTH' },
      { id: 3, title: 'Financial Myth Buster', duration: '0:20', type: 'Reel/Short', thumbnail: '❌', subtitle: '"Myth vs Fact"', textOverlay: 'MONEY MYTHS BUSTED' },
    ],
    captions: [
      {
        platform: 'Instagram',
        icon: Instagram,
        color: 'from-pink-500 to-purple-500',
        caption: "Your future self will thank you for starting today! 💰 Here are the money moves that actually work.\n\n#FinanceTips #InvestSmart #WealthBuilding #FinancialFreedom #MoneyMatters",
      },
      {
        platform: 'Twitter/X',
        icon: Twitter,
        color: 'from-gray-600 to-gray-800',
        caption: "The best investment advice fits in one tweet:\n\n💰 Spend less than you earn\n💰 Invest the difference consistently\n💰 Don't touch it for 20+ years\n\nCompound interest does the heavy lifting. Patience is your edge.",
      },
      {
        platform: 'LinkedIn',
        icon: Linkedin,
        color: 'from-blue-600 to-blue-800',
        caption: "After advising hundreds of clients on their finances, the pattern is clear.\n\nWealth builders do these 3 things consistently:\n\n1. Automate savings (pay yourself first)\n2. Diversify across asset classes\n3. Rebalance annually, not emotionally\n\nWhat financial habit changed your trajectory?",
      },
    ],
    imageCards: [
      { id: 1, type: 'Quote Card', quote: '"Compound interest is the eighth wonder of the world."', style: 'Minimal Dark', bgStyle: 'from-cyan-900 via-slate-900 to-teal-950', icon: '💎' },
      { id: 2, type: 'Stats Card', stat: '67%', label: 'don\'t have a budget', style: 'Gradient', bgStyle: 'from-cyan-600 to-teal-500', icon: '📊' },
      { id: 3, type: 'Tip Card', tip: '3 Steps to Financial Freedom', style: 'Bold', bgStyle: 'from-slate-800 to-slate-900', icon: '🎯' },
    ],
  },
};

// Function to detect industry from content
const detectIndustry = (text) => {
  const lowerText = text.toLowerCase();
  const scores = {};

  for (const [industry, keywords] of Object.entries(industryKeywords)) {
    scores[industry] = keywords.filter(keyword => lowerText.includes(keyword)).length;
  }

  const maxScore = Math.max(...Object.values(scores));
  if (maxScore === 0) return null;

  return Object.keys(scores).find(key => scores[key] === maxScore);
};

// Extract YouTube video ID from URL
const extractYouTubeId = (url) => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

// Generate clip timestamps based on video and industry (simulated AI transcript analysis)
const generateClipTimestamps = (videoId, industry) => {
  // In a real implementation, AI would analyze the video transcript and find key moments
  // For demo, we use simulated industry-specific transcripts
  const transcripts = industryTranscripts[industry] || industryTranscripts['construction'];

  return transcripts.map((segment) => ({
    start: segment.start,
    end: segment.end,
    duration: `0:${(segment.end - segment.start).toString().padStart(2, '0')}`,
    subtitle: segment.subtitle,
    hookTitle: segment.hookTitle,
    fullText: segment.text,
  }));
};

const processingSteps = [
  { text: 'Analyzing content...', icon: FileText },
  { text: 'Identifying key moments...', icon: Wand2 },
  { text: 'Generating short clips...', icon: Scissors },
  { text: 'Creating social captions...', icon: Twitter },
  { text: 'Designing image cards...', icon: Image },
  { text: 'Finalizing assets...', icon: Sparkles },
];

function ProcessingAnimation({ currentStep }) {
  return (
    <div className="py-12">
      <div className="max-w-md mx-auto">
        {/* Animated icon */}
        <motion.div
          className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-a7-warning to-orange-400 flex items-center justify-center"
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <Wand2 size={36} className="text-white" />
        </motion.div>

        {/* Progress steps */}
        <div className="space-y-3">
          {processingSteps.map((step, index) => {
            const isActive = index === currentStep;
            const isComplete = index < currentStep;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-a7-warning/20 border border-a7-warning/30'
                    : isComplete
                    ? 'bg-a7-dark-700/50'
                    : 'opacity-50'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isComplete
                      ? 'bg-a7-success text-white'
                      : isActive
                      ? 'bg-a7-warning text-white'
                      : 'bg-a7-dark-600 text-gray-400'
                  }`}
                >
                  {isComplete ? (
                    <CheckCircle size={16} />
                  ) : (
                    <step.icon size={16} />
                  )}
                </div>
                <span
                  className={`text-sm font-medium ${
                    isActive ? 'text-a7-warning' : isComplete ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  {step.text}
                </span>
                {isActive && (
                  <motion.div
                    className="ml-auto"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Clock size={14} className="text-a7-warning" />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ClipCard({ clip, index, industryColor, youtubeId, timestamp, gradientTop, gradientBottom }) {
  const [showPreview, setShowPreview] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [clipEnded, setClipEnded] = useState(false);

  const handlePlay = (e) => {
    e.stopPropagation();
    setClipEnded(false);
    if (timestamp) {
      setTimeRemaining(timestamp.end - timestamp.start);
    }
    setShowPreview(true);
  };

  // ESC key to close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && showPreview) {
        setShowPreview(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [showPreview]);

  // Countdown timer for clip duration - auto-stop when clip ends
  useEffect(() => {
    if (!showPreview || !timestamp || clipEnded) return;

    const clipDuration = timestamp.end - timestamp.start;
    setTimeRemaining(clipDuration);

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setClipEnded(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showPreview, timestamp, clipEnded]);

  const closePreview = () => {
    setShowPreview(false);
    setClipEnded(false);
  };

  // Check if we have a real YouTube video to show
  const hasYouTubeVideo = youtubeId && timestamp;
  const clipDuration = timestamp ? timestamp.end - timestamp.start : 0;
  const progress = clipDuration > 0 ? ((clipDuration - timeRemaining) / clipDuration) * 100 : 0;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 }}
      >
        <Card variant="glass" padding="none" className="overflow-hidden group cursor-pointer" onClick={handlePlay}>
          {/* Video thumbnail - always use gradient design */}
          <div className={`aspect-[9/16] relative overflow-hidden`}>
            {/* Background - simulated video area (middle portion) */}
            <div className={`absolute inset-0 bg-gradient-to-br ${industryColor || 'from-a7-dark-700 to-a7-dark-600'}`}>
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_50%)]" />
              </div>
            </div>

            {/* TOP BRANDED GRADIENT OVERLAY - prominent orange bar */}
            <div className={`absolute top-0 left-0 right-0 h-24 bg-gradient-to-b ${gradientTop || 'from-amber-600 via-orange-500/80 to-transparent'} z-10`} />

            {/* Large emoji icon - centered in middle */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-5xl opacity-60 group-hover:opacity-80 transition-opacity drop-shadow-lg z-[5]">
              {clip.thumbnail}
            </div>

            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 z-20">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center cursor-pointer shadow-xl"
              >
                <Play size={20} className="text-gray-900 ml-1" fill="currentColor" />
              </motion.div>
            </div>

            {/* Type badge */}
            <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-white/90 text-xs text-gray-900 font-bold z-20">
              {clip.type}
            </div>

            {/* "From your video" badge if YouTube */}
            {hasYouTubeVideo && (
              <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-a7-success/90 text-xs text-white font-medium z-20">
                Your Video
              </div>
            )}

            {/* BOTTOM BRANDED GRADIENT OVERLAY with BAKED-IN SUBTITLE - prominent orange bar */}
            <div className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t ${gradientBottom || 'from-amber-600 via-orange-500/80 to-transparent'} z-10`}>
              {/* Subtitle text - baked into the clip like in real reels */}
              <div className="absolute bottom-4 left-2 right-2 text-center">
                <p
                  className="text-white font-black text-xs leading-tight uppercase tracking-wide"
                  style={{
                    textShadow: '1px 1px 3px rgba(0,0,0,0.9), -1px -1px 2px rgba(0,0,0,0.6)',
                  }}
                >
                  {timestamp?.subtitle || clip.textOverlay}
                </p>
              </div>
            </div>

            {/* Duration badge */}
            <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 text-[10px] text-white font-medium z-20">
              {timestamp ? timestamp.duration : clip.duration}
            </div>
          </div>
          <div className="p-3 bg-a7-dark-800">
            <p className="text-sm font-semibold text-white truncate">{timestamp?.hookTitle || clip.title}</p>
            <p className="text-xs text-gray-400 mt-0.5">
              {hasYouTubeVideo ? `Clip from ${timestamp.start}s - ${timestamp.end}s` : 'Click to preview'}
            </p>
          </div>
        </Card>
      </motion.div>

      {/* Video Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
            onClick={closePreview}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {hasYouTubeVideo ? (
                /* Real YouTube embed with clip controls */
                <>
                  <div className="bg-gray-900 rounded-2xl p-2 shadow-2xl">
                    {/* Progress bar at top */}
                    <div className="h-1 bg-gray-700 rounded-full mb-2 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-a7-warning to-orange-400"
                        initial={{ width: '0%' }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>

                    <div className="aspect-[9/16] rounded-xl overflow-hidden bg-black relative">
                      {!clipEnded ? (
                        <>
                          <iframe
                            src={`https://www.youtube.com/embed/${youtubeId}?start=${timestamp.start}&autoplay=1&modestbranding=1&rel=0&controls=0`}
                            title={clip.title}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          />
                          {/* TOP BRANDED GRADIENT OVERLAY - prominent orange */}
                          <div className={`absolute top-0 left-0 right-0 h-28 bg-gradient-to-b ${gradientTop || 'from-amber-600 via-orange-500/80 to-transparent'} pointer-events-none z-10`} />

                          {/* BOTTOM BRANDED GRADIENT OVERLAY with SUBTITLE - prominent orange */}
                          <div className={`absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t ${gradientBottom || 'from-amber-600 via-orange-500/80 to-transparent'} pointer-events-none z-10`}>
                            <div className="absolute bottom-8 left-4 right-4 text-center">
                              <motion.p
                                className="text-white font-black text-lg leading-tight uppercase tracking-wide"
                                style={{
                                  textShadow: '2px 2px 6px rgba(0,0,0,0.95), -1px -1px 3px rgba(0,0,0,0.6)',
                                }}
                                animate={{ opacity: [0.9, 1, 0.9] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                {timestamp?.subtitle || clip.textOverlay}
                              </motion.p>
                            </div>
                          </div>
                        </>
                      ) : (
                        /* Clip ended overlay */
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-a7-dark-800 to-a7-dark-900">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', delay: 0.1 }}
                            className="w-20 h-20 rounded-full bg-a7-success/20 flex items-center justify-center mb-4"
                          >
                            <CheckCircle size={40} className="text-a7-success" />
                          </motion.div>
                          <p className="text-white font-bold text-xl mb-2">Clip Complete!</p>
                          <p className="text-gray-400 text-sm mb-4">
                            {clipDuration} second clip from your video
                          </p>
                          <Button
                            variant="primary"
                            size="sm"
                            className="bg-gradient-to-r from-a7-warning to-orange-400"
                            onClick={() => {
                              setClipEnded(false);
                              setTimeRemaining(clipDuration);
                            }}
                          >
                            <Play size={16} className="mr-1" /> Replay Clip
                          </Button>
                        </div>
                      )}

                      {/* Time remaining indicator */}
                      {!clipEnded && (
                        <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-sm flex items-center gap-2 z-20">
                          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                          <span className="text-white text-sm font-mono font-bold">
                            0:{timeRemaining.toString().padStart(2, '0')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Clip info */}
                  <div className="mt-4 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-a7-success/20 border border-a7-success/30 mb-2">
                      <CheckCircle size={14} className="text-a7-success" />
                      <span className="text-xs text-a7-success font-medium">AI-extracted clip from your video</span>
                    </div>
                    <p className="text-white font-semibold">{timestamp?.hookTitle || clip.title}</p>
                    <p className="text-gray-400 text-sm">{timestamp.duration} • Clip {index + 1} of 3</p>
                    <p className="text-gray-500 text-xs mt-1">Original segment: {timestamp.start}s - {timestamp.end}s</p>
                    <div className="flex gap-2 justify-center mt-3">
                      <Button
                        variant="primary"
                        size="sm"
                        className="bg-gradient-to-r from-a7-warning to-orange-400"
                      >
                        Export HD Clip
                      </Button>
                    </div>
                    <p className="text-gray-500 text-xs mt-3">
                      Full version exports trimmed HD clips with your branding
                    </p>
                  </div>
                </>
              ) : (
                /* Fallback animated preview for non-YouTube content */
                <>
                  <div className="bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
                    <div className={`aspect-[9/16] bg-gradient-to-br ${industryColor || 'from-a7-dark-700 to-a7-dark-600'} rounded-[2rem] relative overflow-hidden`}>
                      {/* TOP BRANDED GRADIENT OVERLAY - prominent orange */}
                      <div className={`absolute top-0 left-0 right-0 h-28 bg-gradient-to-b ${gradientTop || 'from-amber-600 via-orange-500/80 to-transparent'} z-10`} />

                      <motion.div
                        className="absolute top-1/3 left-1/2 -translate-x-1/2 text-7xl z-[5]"
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {clip.thumbnail}
                      </motion.div>

                      {/* Social icons on right side */}
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-20">
                        <motion.div
                          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                        >
                          <span className="text-lg">❤️</span>
                        </motion.div>
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                          <span className="text-lg">💬</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                          <span className="text-lg">↗️</span>
                        </div>
                      </div>

                      {/* BOTTOM BRANDED GRADIENT OVERLAY with SUBTITLE - prominent orange */}
                      <div className={`absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t ${gradientBottom || 'from-amber-600 via-orange-500/80 to-transparent'} z-10`}>
                        <div className="absolute bottom-8 left-4 right-4 text-center">
                          <motion.p
                            className="text-white font-black text-lg leading-tight uppercase tracking-wide"
                            style={{
                              textShadow: '2px 2px 6px rgba(0,0,0,0.95), -1px -1px 3px rgba(0,0,0,0.6)',
                            }}
                            animate={{ opacity: [0.8, 1, 0.8] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            {timestamp?.subtitle || clip.textOverlay}
                          </motion.p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-white font-semibold">{timestamp?.hookTitle || clip.title}</p>
                    <p className="text-gray-400 text-sm">{timestamp?.duration || clip.duration} • {clip.type}</p>
                    <p className="text-gray-500 text-xs mt-2">Paste a YouTube URL to see real clips from your video</p>
                  </div>
                </>
              )}

              {/* Close button */}
              <button
                onClick={closePreview}
                className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              >
                <span className="text-xl">×</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function CaptionCard({ caption, index }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(caption.caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15 }}
    >
      <Card variant="glass" padding="md">
        <div className="flex items-center gap-3 mb-3">
          <div className={`p-2 rounded-lg bg-gradient-to-br ${caption.color}`}>
            <caption.icon size={16} className="text-white" />
          </div>
          <span className="font-medium text-white">{caption.platform}</span>
        </div>
        <p className="text-sm text-gray-300 whitespace-pre-line mb-3 line-clamp-4">
          {caption.caption}
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="w-full"
        >
          {copied ? 'Copied!' : 'Copy Caption'}
        </Button>
      </Card>
    </motion.div>
  );
}

function ImageCardPreview({ card, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card variant="glass" padding="none" className="overflow-hidden group cursor-pointer">
        {/* Image card preview - styled like actual social graphics */}
        <div className={`aspect-square bg-gradient-to-br ${card.bgStyle || 'from-a7-primary/20 via-a7-dark-700 to-a7-secondary/20'} relative flex items-center justify-center p-5 overflow-hidden`}>
          {/* Decorative background elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-white/5 blur-xl" />
          </div>

          {/* Icon in corner */}
          <div className="absolute top-3 right-3 text-2xl opacity-60">
            {card.icon}
          </div>

          {/* Quote Card Design */}
          {card.quote && (
            <div className="relative z-10 text-center px-2">
              <div className="text-4xl mb-3 opacity-40">"</div>
              <p className="text-base font-bold text-white leading-snug tracking-wide" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                {card.quote.replace(/"/g, '')}
              </p>
              <div className="mt-4 w-12 h-0.5 bg-white/40 mx-auto" />
            </div>
          )}

          {/* Stats Card Design */}
          {card.stat && (
            <div className="relative z-10 text-center">
              <motion.p
                className="text-5xl font-black text-white mb-2"
                style={{ textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
              >
                {card.stat}
              </motion.p>
              <p className="text-sm text-white/90 font-medium uppercase tracking-wider">
                {card.label}
              </p>
              <div className="mt-3 flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/60" />
                ))}
              </div>
            </div>
          )}

          {/* Tip Card Design */}
          {card.tip && (
            <div className="relative z-10 text-center px-2">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">{card.icon}</span>
              </div>
              <p className="text-sm font-bold text-white/90 uppercase tracking-wide mb-2">Pro Tip</p>
              <p className="text-base font-semibold text-white leading-tight" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                {card.tip}
              </p>
            </div>
          )}

        </div>
        <div className="p-3 bg-a7-dark-800 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-white">{card.type}</p>
            <p className="text-xs text-gray-400">{card.style} • 1080x1080</p>
          </div>
          <Button variant="ghost" size="sm" className="text-a7-warning hover:text-white">
            Download
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

const BOOKING_URL = 'https://calendly.com/team-a7agents/30min';

function CTAModal({ isOpen, onClose }) {
  const handleBookCall = () => {
    window.open(BOOKING_URL, '_blank');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Automate Your Content" size="md">
      <p className="text-gray-400 mb-6">
        Turn one piece of content into dozens of social assets automatically. Save hours every week.
      </p>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 rounded-xl bg-a7-dark-700/50">
          <Video size={20} className="text-a7-warning mx-auto mb-1" />
          <p className="text-2xl font-bold text-white">3</p>
          <p className="text-xs text-gray-500">Short Clips</p>
        </div>
        <div className="text-center p-3 rounded-xl bg-a7-dark-700/50">
          <FileText size={20} className="text-a7-warning mx-auto mb-1" />
          <p className="text-2xl font-bold text-white">6</p>
          <p className="text-xs text-gray-500">Captions</p>
        </div>
        <div className="text-center p-3 rounded-xl bg-a7-dark-700/50">
          <Image size={20} className="text-a7-warning mx-auto mb-1" />
          <p className="text-2xl font-bold text-white">4</p>
          <p className="text-xs text-gray-500">Image Cards</p>
        </div>
      </div>

      <Button onClick={handleBookCall} size="lg" className="w-full" variant="primary" icon={<Calendar size={18} />}>
        Book Your Demo
      </Button>
      <p className="text-center text-xs text-gray-500 mt-4">
        Free consultation. No commitment required.
      </p>
    </Modal>
  );
}

export default function ContentEngine({ onBack }) {
  const [inputType, setInputType] = useState('youtube'); // youtube or text
  const [inputValue, setInputValue] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [detectedIndustry, setDetectedIndustry] = useState(null);
  const [phase, setPhase] = useState('industry'); // industry, input, processing, results
  const [processingStep, setProcessingStep] = useState(0);
  const [showCTA, setShowCTA] = useState(false);
  const [youtubeId, setYoutubeId] = useState(null);
  const [clipTimestamps, setClipTimestamps] = useState([]);

  // Detect industry when input changes
  useEffect(() => {
    if (inputValue.trim()) {
      const detected = detectIndustry(inputValue);
      setDetectedIndustry(detected);
    } else {
      setDetectedIndustry(null);
    }
  }, [inputValue]);

  const handleIndustrySelect = (industryId) => {
    setSelectedIndustry(industryId);
    setPhase('input');
  };

  const handleTransform = () => {
    if (!inputValue.trim()) return;

    // If we detected a different industry, use that; otherwise use selected
    const finalIndustry = detectedIndustry || selectedIndustry;
    if (finalIndustry && finalIndustry !== selectedIndustry) {
      setSelectedIndustry(finalIndustry);
    }

    // Extract YouTube video ID if input is a YouTube URL
    if (inputType === 'youtube') {
      const videoId = extractYouTubeId(inputValue);
      if (videoId) {
        setYoutubeId(videoId);
        setClipTimestamps(generateClipTimestamps(videoId, finalIndustry));
      } else {
        setYoutubeId(null);
        setClipTimestamps(generateClipTimestamps(null, finalIndustry));
      }
    } else {
      setYoutubeId(null);
      setClipTimestamps(generateClipTimestamps(null, finalIndustry));
    }

    setPhase('processing');
    setProcessingStep(0);

    // Animate through processing steps
    const interval = setInterval(() => {
      setProcessingStep((prev) => {
        if (prev >= processingSteps.length - 1) {
          clearInterval(interval);
          setTimeout(() => setPhase('results'), 500);
          return prev;
        }
        return prev + 1;
      });
    }, 800);
  };

  const resetDemo = () => {
    setPhase('industry');
    setInputValue('');
    setSelectedIndustry(null);
    setDetectedIndustry(null);
    setProcessingStep(0);
    setYoutubeId(null);
    setClipTimestamps([]);
  };

  // Get current content based on selected industry
  const currentContent = industryContent[selectedIndustry] || industryContent['real-estate'];
  const currentIndustryData = industries.find(i => i.id === selectedIndustry);

  return (
    <div className="min-h-screen bg-a7-dark-900 bg-grid">
      <div className="fixed inset-0 bg-gradient-radial from-a7-warning/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack} icon={<ArrowLeft size={18} />}>
            Back
          </Button>
          {phase === 'results' && (
            <Button variant="secondary" onClick={resetDemo}>
              Transform Another
            </Button>
          )}
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-a7-warning/10 border border-a7-warning/30 mb-4">
            <Video size={16} className="text-a7-warning" />
            <span className="text-sm text-a7-warning font-medium">Content Engine Demo</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Transform Content Instantly
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Paste a YouTube URL or long-form text and watch AI create short clips, social captions, and image cards.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Industry Selection Phase */}
          {phase === 'industry' && (
            <motion.div
              key="industry"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl mx-auto"
            >
              <Card variant="glass" padding="lg">
                <h2 className="text-xl font-semibold text-white text-center mb-2">
                  Select Your Industry
                </h2>
                <p className="text-gray-400 text-center mb-6 text-sm">
                  We'll generate industry-specific content for your brand
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {industries.map((industry) => {
                    const IconComponent = industry.icon;
                    return (
                      <motion.button
                        key={industry.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleIndustrySelect(industry.id)}
                        className="p-4 rounded-xl bg-a7-dark-700/50 border border-a7-dark-600 hover:border-a7-warning/50 transition-all group text-left"
                      >
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${industry.color} flex items-center justify-center mb-3`}>
                          <IconComponent size={20} className="text-white" />
                        </div>
                        <p className="font-medium text-white group-hover:text-a7-warning transition-colors">
                          {industry.name}
                        </p>
                      </motion.button>
                    );
                  })}
                </div>
              </Card>
            </motion.div>
          )}

          {/* Input Phase */}
          {phase === 'input' && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <Card variant="glass" padding="lg">
                {/* Selected Industry Badge */}
                {currentIndustryData && (
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${currentIndustryData.color}`}>
                      <currentIndustryData.icon size={16} className="text-white" />
                    </div>
                    <span className="text-sm text-gray-300">{currentIndustryData.name} Content</span>
                    <button
                      onClick={() => setPhase('industry')}
                      className="text-xs text-gray-500 hover:text-a7-warning transition-colors ml-2"
                    >
                      Change
                    </button>
                  </div>
                )}

                {/* Input Type Toggle */}
                <div className="flex gap-2 mb-6">
                  <button
                    onClick={() => setInputType('youtube')}
                    className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all ${
                      inputType === 'youtube'
                        ? 'bg-a7-warning/20 border border-a7-warning/30 text-a7-warning'
                        : 'bg-a7-dark-700/50 border border-a7-dark-600 text-gray-400 hover:text-white'
                    }`}
                  >
                    <Video size={18} />
                    YouTube URL
                  </button>
                  <button
                    onClick={() => setInputType('text')}
                    className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all ${
                      inputType === 'text'
                        ? 'bg-a7-warning/20 border border-a7-warning/30 text-a7-warning'
                        : 'bg-a7-dark-700/50 border border-a7-dark-600 text-gray-400 hover:text-white'
                    }`}
                  >
                    <FileText size={18} />
                    Long-form Text
                  </button>
                </div>

                {/* Input Field */}
                {inputType === 'youtube' ? (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      YouTube Video URL
                    </label>
                    <input
                      type="url"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="https://youtube.com/watch?v=..."
                      className="w-full px-4 py-3 rounded-xl bg-a7-dark-700/50 border border-a7-dark-500 text-white placeholder-gray-500 focus:outline-none focus:border-a7-warning transition-colors"
                    />
                  </div>
                ) : (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Paste Your Content
                    </label>
                    <textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Paste your blog post, script, article, or any long-form content here..."
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl bg-a7-dark-700/50 border border-a7-dark-500 text-white placeholder-gray-500 focus:outline-none focus:border-a7-warning transition-colors resize-none"
                    />
                  </div>
                )}

                {/* Detected Industry Notice */}
                {detectedIndustry && detectedIndustry !== selectedIndustry && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 rounded-xl bg-a7-primary/10 border border-a7-primary/30 mb-4"
                  >
                    <AlertCircle size={16} className="text-a7-primary" />
                    <span className="text-sm text-a7-primary">
                      Detected <strong>{industries.find(i => i.id === detectedIndustry)?.name}</strong> content - output will be adjusted automatically
                    </span>
                  </motion.div>
                )}

                <Button
                  size="lg"
                  variant="primary"
                  className="w-full bg-gradient-to-r from-a7-warning to-orange-400 hover:from-a7-warning/90 hover:to-orange-400/90"
                  onClick={handleTransform}
                  disabled={!inputValue.trim()}
                  icon={<Wand2 size={18} />}
                >
                  Transform Content
                </Button>

                <p className="text-center text-xs text-gray-500 mt-4">
                  Demo uses sample outputs. Real AI analyzes your actual content.
                </p>
              </Card>
            </motion.div>
          )}

          {/* Processing Phase */}
          {phase === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Card variant="glass" padding="lg" className="max-w-xl mx-auto">
                <ProcessingAnimation currentStep={processingStep} />
              </Card>
            </motion.div>
          )}

          {/* Results Phase */}
          {phase === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              {/* Industry Badge */}
              {currentIndustryData && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center gap-2"
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${currentIndustryData.color}`}>
                    <currentIndustryData.icon size={16} className="text-white" />
                  </div>
                  <span className="text-sm text-gray-300">
                    Generated for <strong className="text-white">{currentIndustryData.name}</strong>
                  </span>
                </motion.div>
              )}

              {/* Short Clips */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Scissors size={20} className="text-a7-warning" />
                  <h3 className="text-lg font-semibold text-white">Short Clips Generated</h3>
                  <span className="px-2 py-0.5 rounded-full bg-a7-warning/20 text-xs text-a7-warning">
                    {currentContent.clips.length} clips
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {currentContent.clips.map((clip, i) => (
                    <ClipCard
                      key={clip.id}
                      clip={clip}
                      index={i}
                      industryColor={currentContent.color}
                      youtubeId={youtubeId}
                      timestamp={clipTimestamps[i]}
                      gradientTop={currentContent.gradientTop}
                      gradientBottom={currentContent.gradientBottom}
                    />
                  ))}
                </div>
              </div>

              {/* Social Captions */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <FileText size={20} className="text-a7-warning" />
                  <h3 className="text-lg font-semibold text-white">Platform-Optimized Captions</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {currentContent.captions.map((caption, i) => (
                    <CaptionCard key={i} caption={caption} index={i} />
                  ))}
                </div>
              </div>

              {/* Image Cards */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Image size={20} className="text-a7-warning" />
                  <h3 className="text-lg font-semibold text-white">Social Image Cards</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {currentContent.imageCards.map((card, i) => (
                    <ImageCardPreview key={card.id} card={card} index={i} />
                  ))}
                </div>
              </div>

              {/* Summary */}
              <Card variant="gradient" padding="lg" className="border-a7-warning/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-a7-warning/20">
                    <Sparkles size={24} className="text-a7-warning" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Content Transformation Complete</h3>
                    <p className="text-gray-400">
                      From 1 video → {currentContent.clips.length + currentContent.captions.length + currentContent.imageCards.length} pieces of content
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{currentContent.clips.length}</p>
                    <p className="text-xs text-gray-500">Short Clips</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{currentContent.captions.length}</p>
                    <p className="text-xs text-gray-500">Captions</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{currentContent.imageCards.length}</p>
                    <p className="text-xs text-gray-500">Image Cards</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-a7-success">4+ hrs</p>
                    <p className="text-xs text-gray-500">Time Saved</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-xl bg-a7-warning/10 border border-a7-warning/30 text-sm text-a7-warning">
                  <Clock size={16} />
                  <span>This would typically take 4+ hours to create manually</span>
                </div>
              </Card>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center"
              >
                <Button
                  size="xl"
                  onClick={() => setShowCTA(true)}
                  icon={<Wand2 size={20} />}
                  className="shadow-lg shadow-a7-warning/30 bg-gradient-to-r from-a7-warning to-orange-400 hover:from-a7-warning/90 hover:to-orange-400/90"
                >
                  Automate My Content Creation
                </Button>
                <p className="text-gray-500 text-sm mt-3">
                  Get AI-powered content repurposing for your brand
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <CTAModal isOpen={showCTA} onClose={() => setShowCTA(false)} />
    </div>
  );
}
