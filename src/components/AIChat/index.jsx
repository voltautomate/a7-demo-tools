import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  MessageSquare,
  Send,
  Bot,
  User,
  Calendar,
  Home,
  DollarSign,
  MapPin,
  Clock,
  Sparkles,
  Mail,
  Building2,
  Stethoscope,
  HardHat,
  Shield,
  Scale,
  Landmark,
  Phone,
  FileText,
  Wrench,
  Briefcase,
} from 'lucide-react';
import { Button, Card, Input, Modal } from '../common';

// Industry configurations
const industries = [
  { id: 'real-estate', name: 'Real Estate', icon: Home, color: 'from-blue-500 to-blue-600' },
  { id: 'healthcare', name: 'Healthcare', icon: Stethoscope, color: 'from-emerald-500 to-emerald-600' },
  { id: 'construction', name: 'Construction', icon: HardHat, color: 'from-orange-500 to-orange-600' },
  { id: 'insurance', name: 'Insurance', icon: Shield, color: 'from-purple-500 to-purple-600' },
  { id: 'legal', name: 'Legal', icon: Scale, color: 'from-red-500 to-red-600' },
  { id: 'finance', name: 'Finance', icon: Landmark, color: 'from-cyan-500 to-cyan-600' },
];

// Common responses that work across all industries
const commonResponses = {
  greeting: {
    patterns: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'howdy', 'greetings'],
    response: (company) => `Hello! Welcome to ${company}. How can I assist you today?`,
    delay: 1000,
  },
  thanks: {
    patterns: ['thank', 'thanks', 'appreciate', 'thx', 'ty'],
    response: () => "You're welcome! Is there anything else I can help you with today?",
    delay: 1000,
  },
  goodbye: {
    patterns: ['bye', 'goodbye', 'see you', 'later', 'gotta go', 'have to go'],
    response: () => "Thank you for chatting with us! Don't hesitate to reach out if you have any more questions. Have a great day! 👋",
    delay: 1000,
  },
  hours: {
    patterns: ['hours', 'open', 'close', 'when are you', 'business hours', 'operating hours', 'what time'],
    response: (company) => `${company} is available:\n\n🕐 **Monday - Friday:** 8:00 AM - 6:00 PM\n🕐 **Saturday:** 9:00 AM - 2:00 PM\n🕐 **Sunday:** Closed\n\nHowever, I'm available 24/7 to answer questions and schedule appointments!`,
    delay: 1200,
  },
  location: {
    patterns: ['where', 'location', 'address', 'find you', 'directions', 'located', 'office'],
    response: (company) => `${company} is conveniently located in the downtown business district. I can provide specific directions once you're ready to visit.\n\nWould you like to schedule an appointment, or do you have questions I can help answer first?`,
    delay: 1200,
  },
  contact: {
    patterns: ['phone', 'call you', 'email', 'contact', 'reach', 'number'],
    response: (company) => `You can reach ${company} through several channels:\n\n📧 **Email:** info@company.com\n📞 **Phone:** (555) 123-4567\n💬 **Chat:** You're using it now!\n\nI can also schedule a callback if you prefer. What works best for you?`,
    delay: 1200,
  },
  whoAreYou: {
    patterns: ['who are you', 'what are you', 'are you a bot', 'are you real', 'are you human', 'are you ai', 'robot'],
    response: (company) => `I'm an AI assistant for ${company}! I'm designed to help answer your questions, provide information about our services, and schedule appointments 24/7.\n\nWhile I'm not human, I'm here to make sure you get the help you need quickly. If you'd prefer to speak with a team member, I can arrange that. How can I help you today?`,
    delay: 1500,
  },
  capabilities: {
    patterns: ['what can you do', 'how can you help', 'capabilities', 'what do you do'],
    response: (company) => `I can help you with several things:\n\n✅ Answer questions about our services\n✅ Provide pricing information\n✅ Schedule appointments and consultations\n✅ Connect you with the right team member\n✅ Share our business hours and location\n\nWhat would you like to know more about?`,
    delay: 1300,
  },
  confused: {
    patterns: ['confused', "don't understand", 'what do you mean', 'huh', 'unclear', '?'],
    response: () => "I apologize if I wasn't clear! Let me help you better. Are you looking to:\n\n1️⃣ Learn about our services\n2️⃣ Get pricing information\n3️⃣ Schedule an appointment\n\nJust let me know which one, or feel free to ask your question another way!",
    delay: 1200,
  },
  negative: {
    patterns: ['no', 'nope', 'not interested', 'no thanks', 'nah'],
    response: () => "No problem at all! Is there something else I can help you with, or would you like more information about a different topic?",
    delay: 1000,
  },
  positive: {
    patterns: ['yes', 'yeah', 'sure', 'ok', 'okay', 'sounds good', 'perfect', 'great'],
    response: () => "Great! What would you like to know more about, or shall I help you schedule an appointment?",
    delay: 1000,
  },
  complaint: {
    patterns: ['complaint', 'unhappy', 'problem', 'issue', 'frustrated', 'angry', 'terrible', 'worst'],
    response: (company) => `I'm truly sorry to hear you're experiencing an issue. Your feedback is important to us at ${company}.\n\nI'd like to connect you with a team member who can help resolve this. Would you prefer:\n\n📞 A callback within the hour\n📧 An email response\n💬 Continue chatting here\n\nHow can I best help you?`,
    delay: 1500,
  },
  emergency: {
    patterns: ['emergency', 'urgent', 'asap', 'immediately', 'right now', 'hurry'],
    response: (company) => `I understand this is urgent. For immediate assistance, please call us directly at **(555) 123-4567**.\n\nAlternatively, I can flag this as high priority and have someone from ${company} reach out to you within 15 minutes. Would you like me to do that?`,
    delay: 1200,
  },
  random: {
    patterns: ['weather', 'joke', 'funny', 'sports', 'news', 'politics'],
    response: (company) => `Ha! I appreciate the conversation, but I'm specifically designed to help with ${company}'s services. 😊\n\nIs there anything related to our business I can help you with? I'm happy to answer questions about our services, pricing, or schedule an appointment.`,
    delay: 1200,
  },
  fallback: {
    response: (company) => `Thanks for your message! While I want to make sure I give you accurate information, I'd be happy to help in a few ways:\n\n• Tell you about our services\n• Provide pricing estimates\n• Schedule a consultation\n• Connect you with a team member\n\nWhat interests you most?`,
    delay: 1300,
  },
};

// Industry-specific conversation flows
const industryFlows = {
  'real-estate': {
    greeting: (company) => `Hi there! I'm the AI Assistant for ${company}. I can help you find properties, schedule viewings, or answer questions about the local market. What can I help you with today?`,
    specificResponses: {
      mortgage: {
        patterns: ['mortgage', 'financing', 'loan', 'pre-approved', 'pre-approval'],
        response: "Great question about financing! We work with several trusted mortgage partners who offer competitive rates. Currently, rates are ranging from 6.25-7.25% depending on your profile.\n\nWould you like me to:\n• Connect you with a mortgage specialist\n• Get you pre-approved before viewing homes\n• Discuss your budget to find the right price range",
        delay: 1500,
      },
      neighborhood: {
        patterns: ['neighborhood', 'area', 'schools', 'safety', 'crime', 'community'],
        response: "I can provide detailed neighborhood information! Our listings include data on:\n\n🏫 School ratings and distances\n🛡️ Safety statistics\n🌳 Parks and recreation\n🛒 Shopping and dining\n🚗 Commute times\n\nWhich neighborhood are you interested in learning more about?",
        delay: 1500,
      },
      selling: {
        patterns: ['sell', 'selling', 'list my home', 'market my', 'home value'],
        response: "Looking to sell? Great timing! The market is currently favoring sellers in most areas.\n\nI can help you with:\n📊 Free home valuation\n📸 Professional photography services\n📋 Marketing strategy\n\nWould you like to schedule a free home evaluation?",
        delay: 1500,
      },
    },
    flows: {
      services: {
        response: "I'd be happy to help you find the perfect property! We currently have 47 active listings. To narrow things down, could you tell me:\n\n• What's your preferred location or neighborhood?\n• What's your budget range?\n• How many bedrooms do you need?",
        delay: 1500,
      },
      pricing: {
        response: "Great choice! In the $400K-$600K range, we have 12 beautiful properties available. I found a few that might interest you:\n\n🏠 **123 Oak Street** - 4 bed/3 bath, $525K\n🏠 **456 Maple Ave** - 3 bed/2 bath, $475K\n🏠 **789 Pine Lane** - 4 bed/2.5 bath, $549K\n\nWould you like to schedule a viewing for any of these?",
        delay: 2000,
      },
      schedule: {
        response: "I can schedule that viewing for you right away. I have the following times available this week:\n\n📅 **Tomorrow** - 10 AM, 2 PM, 4 PM\n📅 **Thursday** - 11 AM, 1 PM, 3 PM\n📅 **Saturday** - 9 AM, 11 AM, 2 PM\n\nWhich time works best for you?",
        delay: 1500,
      },
      confirm: {
        response: "Perfect! I've scheduled your viewing for **Thursday at 1 PM** at 123 Oak Street. You'll receive a confirmation email shortly.\n\nOur agent Sarah will meet you there. Is there anything specific you'd like her to prepare information about?",
        delay: 1800,
      },
    },
    prompts: [
      { text: "Show me available properties", icon: Home, flow: 'services' },
      { text: "I'm looking in the $400-600K range", icon: DollarSign, flow: 'pricing' },
      { text: "Schedule a viewing", icon: Calendar, flow: 'schedule' },
    ],
  },
  'healthcare': {
    greeting: (company) => `Hello! I'm the AI Assistant for ${company}. I can help you schedule appointments, answer questions about our services, or connect you with the right department. How can I assist you today?`,
    specificResponses: {
      insurance: {
        patterns: ['insurance', 'coverage', 'accept', 'in-network', 'out of network'],
        response: "We accept most major insurance plans including:\n\n✅ Blue Cross Blue Shield\n✅ Aetna\n✅ United Healthcare\n✅ Cigna\n✅ Medicare/Medicaid\n\nI can verify your specific coverage if you'd like. What insurance do you have?",
        delay: 1400,
      },
      symptoms: {
        patterns: ['sick', 'pain', 'hurt', 'symptom', 'feeling', 'fever', 'cough', 'headache'],
        response: "I'm sorry you're not feeling well. While I can't provide medical advice, I can help you get care quickly.\n\n🚨 **If this is an emergency**, please call 911 or go to the nearest ER.\n\n📅 For non-emergency concerns, I can schedule you with the next available provider. Would you like me to check availability today?",
        delay: 1500,
      },
      prescriptions: {
        patterns: ['prescription', 'refill', 'medication', 'medicine', 'pharmacy', 'rx'],
        response: "For prescription refills, I can help! Please provide:\n\n• Your name and date of birth\n• The medication you need refilled\n• Your preferred pharmacy\n\nOr you can call our prescription line directly at (555) 123-4567 ext. 3. Would you like to proceed with a refill request?",
        delay: 1400,
      },
    },
    flows: {
      services: {
        response: "We offer a comprehensive range of healthcare services:\n\n🏥 **Primary Care** - Annual checkups, preventive care\n🦷 **Dental Services** - Cleanings, procedures\n👁️ **Vision Care** - Eye exams, prescriptions\n💊 **Specialist Referrals** - Cardiology, dermatology, etc.\n\nWhich service are you interested in?",
        delay: 1500,
      },
      pricing: {
        response: "I'd be happy to help with pricing information. Our services vary based on your insurance coverage.\n\n**With Insurance:**\n• Copays typically range from $20-$50\n• Most preventive care is fully covered\n\n**Self-Pay Options:**\n• We offer competitive cash-pay rates\n• Payment plans available\n\nWould you like me to verify your insurance benefits?",
        delay: 2000,
      },
      schedule: {
        response: "I can help you schedule an appointment! Here are our next available slots:\n\n📅 **Tomorrow** - 9:30 AM, 2:00 PM\n📅 **Wednesday** - 10:00 AM, 3:30 PM\n📅 **Friday** - 8:00 AM, 1:00 PM\n\nWhich time works best for you?",
        delay: 1500,
      },
      confirm: {
        response: "Your appointment is confirmed for **Wednesday at 10:00 AM**. You'll receive a confirmation text and email shortly.\n\n**Please bring:**\n• Photo ID\n• Insurance card\n• List of current medications\n\nIs there anything else I can help you with?",
        delay: 1800,
      },
    },
    prompts: [
      { text: "What services do you offer?", icon: Stethoscope, flow: 'services' },
      { text: "Schedule an appointment", icon: Calendar, flow: 'schedule' },
      { text: "Insurance and pricing info", icon: FileText, flow: 'pricing' },
    ],
  },
  'construction': {
    greeting: (company) => `Hello! I'm the AI Assistant for ${company}. I can help you get project estimates, schedule consultations, or answer questions about our construction services. What can I help you with?`,
    specificResponses: {
      timeline: {
        patterns: ['how long', 'timeline', 'duration', 'time frame', 'when done', 'finish'],
        response: "Project timelines vary based on scope, but here are typical durations:\n\n⏱️ **Kitchen Remodel:** 4-8 weeks\n⏱️ **Bathroom Remodel:** 2-4 weeks\n⏱️ **Room Addition:** 8-16 weeks\n⏱️ **Custom Home:** 6-12 months\n\nWould you like to discuss your specific project timeline?",
        delay: 1400,
      },
      permits: {
        patterns: ['permit', 'license', 'approval', 'code', 'inspection', 'legal'],
        response: "Great question! We handle all permitting and inspections as part of our service. This includes:\n\n📋 Building permits\n📋 Electrical permits\n📋 Plumbing permits\n📋 All required inspections\n\nOur team ensures your project is fully compliant. Any other questions about the process?",
        delay: 1400,
      },
      materials: {
        patterns: ['material', 'quality', 'brand', 'supplier', 'wood', 'concrete', 'steel'],
        response: "We use only high-quality materials from trusted suppliers. Our standard includes:\n\n🔨 Premium-grade lumber\n🔨 Energy-efficient windows\n🔨 Name-brand fixtures\n🔨 Durable flooring options\n\nWe can also work with your preferred materials if you have specific requirements. What type of project are you planning?",
        delay: 1400,
      },
    },
    flows: {
      services: {
        response: "We handle a wide range of construction projects:\n\n🏗️ **Commercial Construction** - Office buildings, retail spaces\n🏠 **Residential** - Custom homes, renovations\n🔧 **Remodeling** - Kitchens, bathrooms, additions\n🏢 **Industrial** - Warehouses, manufacturing facilities\n\nWhat type of project are you planning?",
        delay: 1500,
      },
      pricing: {
        response: "For accurate pricing, I'd need to know more about your project. However, here are typical ranges:\n\n**Residential Remodel:** $150-$400/sq ft\n**Custom Home Build:** $200-$500/sq ft\n**Commercial Buildout:** $100-$300/sq ft\n\nWould you like to schedule a free consultation for a detailed estimate?",
        delay: 2000,
      },
      schedule: {
        response: "I can schedule a site consultation with one of our project managers. Available times:\n\n📅 **Tomorrow** - 9:00 AM, 2:00 PM\n📅 **Thursday** - 10:00 AM, 3:00 PM\n📅 **Friday** - 11:00 AM, 1:00 PM\n\nWhich time works for you?",
        delay: 1500,
      },
      confirm: {
        response: "Excellent! Your consultation is scheduled for **Thursday at 10:00 AM**. Our project manager Mike will meet you at the site.\n\n**He'll discuss:**\n• Project scope and timeline\n• Budget considerations\n• Permit requirements\n\nPlease have your property address ready. Anything else I can help with?",
        delay: 1800,
      },
    },
    prompts: [
      { text: "What services do you offer?", icon: Wrench, flow: 'services' },
      { text: "Get a project estimate", icon: DollarSign, flow: 'pricing' },
      { text: "Schedule a consultation", icon: Calendar, flow: 'schedule' },
    ],
  },
  'insurance': {
    greeting: (company) => `Hi! I'm the AI Assistant for ${company}. I can help you get quotes, understand coverage options, or file a claim. How can I assist you today?`,
    specificResponses: {
      claim: {
        patterns: ['claim', 'accident', 'damage', 'file', 'report', 'incident'],
        response: "I'm sorry to hear you need to file a claim. I can help you get started right away.\n\n📋 **To file a claim, I'll need:**\n• Your policy number\n• Date of incident\n• Brief description of what happened\n\nOr for immediate assistance, call our 24/7 claims line: **(555) 123-CLAIM**\n\nWould you like to proceed here or prefer to call?",
        delay: 1500,
      },
      discount: {
        patterns: ['discount', 'save', 'cheaper', 'lower', 'bundle', 'deal'],
        response: "Great question! We offer several ways to save:\n\n💰 **Multi-policy discount:** Up to 25% off\n💰 **Good driver discount:** Up to 20% off\n💰 **Home security discount:** Up to 15% off\n💰 **Loyalty discount:** Up to 10% off\n\nWould you like me to help identify which discounts you qualify for?",
        delay: 1400,
      },
      deductible: {
        patterns: ['deductible', 'coverage limit', 'policy details', 'what\'s covered', 'exclusion'],
        response: "I can help explain your coverage options!\n\n**Deductible options:** $250, $500, $1000, $2500\n• Lower deductible = Higher premium but less out-of-pocket\n• Higher deductible = Lower premium but more out-of-pocket\n\nWould you like to speak with an agent to review the best option for your situation?",
        delay: 1400,
      },
    },
    flows: {
      services: {
        response: "We offer comprehensive insurance coverage:\n\n🚗 **Auto Insurance** - Liability, collision, comprehensive\n🏠 **Home Insurance** - Property, liability, personal items\n💼 **Business Insurance** - General liability, professional\n❤️ **Life Insurance** - Term, whole, universal\n\nWhich type of coverage interests you?",
        delay: 1500,
      },
      pricing: {
        response: "I can get you a quick quote! Based on typical profiles:\n\n**Auto Insurance:** $80-$200/month\n**Home Insurance:** $100-$300/month\n**Life Insurance:** $25-$100/month\n\nFor an exact quote, I'll need some basic information. Would you like to proceed?",
        delay: 2000,
      },
      schedule: {
        response: "I can schedule a call with one of our licensed agents. Available times:\n\n📅 **Today** - 3:00 PM, 4:30 PM\n📅 **Tomorrow** - 10:00 AM, 2:00 PM\n📅 **Wednesday** - 9:00 AM, 1:00 PM\n\nWhich time works for you?",
        delay: 1500,
      },
      confirm: {
        response: "Your consultation call is scheduled for **Tomorrow at 10:00 AM**. Agent Jennifer will call you at the number on file.\n\n**She'll help you:**\n• Review coverage needs\n• Compare policy options\n• Find available discounts\n\nIs there anything specific you'd like her to prepare?",
        delay: 1800,
      },
    },
    prompts: [
      { text: "What coverage do you offer?", icon: Shield, flow: 'services' },
      { text: "Get a quote", icon: DollarSign, flow: 'pricing' },
      { text: "Speak with an agent", icon: Phone, flow: 'schedule' },
    ],
  },
  'legal': {
    greeting: (company) => `Hello! I'm the AI Assistant for ${company}. I can help you schedule a consultation, learn about our practice areas, or get general information. How may I assist you?`,
    specificResponses: {
      urgency: {
        patterns: ['deadline', 'court date', 'served', 'summons', 'subpoena', 'statute of limitations'],
        response: "I understand this may be time-sensitive. Legal deadlines are critical.\n\n⚠️ **If you've been served with papers**, you typically have 20-30 days to respond.\n\nI recommend speaking with an attorney as soon as possible. I can:\n• Schedule an urgent consultation today\n• Have an attorney call you within 2 hours\n\nWhich would you prefer?",
        delay: 1500,
      },
      confidential: {
        patterns: ['confidential', 'private', 'secret', 'sensitive', 'discrete'],
        response: "Absolutely. All communications with our firm are protected by **attorney-client privilege**. This means:\n\n🔒 Everything you share is confidential\n🔒 We cannot disclose information without your consent\n🔒 This protection begins from your first contact\n\nYou can speak freely about your situation. How can we help?",
        delay: 1400,
      },
      experience: {
        patterns: ['experience', 'success rate', 'won', 'track record', 'qualified', 'years'],
        response: "Great question! Our attorneys bring extensive experience:\n\n⚖️ **Combined 50+ years** of legal practice\n⚖️ **500+ cases** successfully resolved\n⚖️ **Multi-million dollar** settlements obtained\n⚖️ **AV-rated** by Martindale-Hubbell\n\nWould you like to schedule a free consultation to discuss your case?",
        delay: 1400,
      },
    },
    flows: {
      services: {
        response: "Our firm handles a variety of legal matters:\n\n⚖️ **Personal Injury** - Auto accidents, slip & fall\n👨‍👩‍👧 **Family Law** - Divorce, custody, adoption\n🏢 **Business Law** - Contracts, formation, disputes\n📋 **Estate Planning** - Wills, trusts, probate\n\nWhich area do you need assistance with?",
        delay: 1500,
      },
      pricing: {
        response: "Our fee structures vary by practice area:\n\n**Personal Injury:** Contingency (no fee unless we win)\n**Family Law:** $250-$400/hour or flat fee packages\n**Business Law:** $300-$500/hour or retainer\n**Estate Planning:** Flat fee packages from $500\n\nWould you like to schedule a free initial consultation?",
        delay: 2000,
      },
      schedule: {
        response: "I can schedule a consultation with one of our attorneys. Available times:\n\n📅 **Tomorrow** - 11:00 AM, 3:00 PM\n📅 **Thursday** - 9:00 AM, 2:00 PM\n📅 **Friday** - 10:00 AM, 4:00 PM\n\nWhich time works for you?",
        delay: 1500,
      },
      confirm: {
        response: "Your consultation is confirmed for **Thursday at 2:00 PM** with Attorney Sarah Martinez.\n\n**Please bring:**\n• Any relevant documents\n• Timeline of events\n• List of questions\n\nThe initial consultation is complimentary. Anything else I can help with?",
        delay: 1800,
      },
    },
    prompts: [
      { text: "What areas do you practice?", icon: Scale, flow: 'services' },
      { text: "Consultation fees", icon: DollarSign, flow: 'pricing' },
      { text: "Schedule a consultation", icon: Calendar, flow: 'schedule' },
    ],
  },
  'finance': {
    greeting: (company) => `Hello! I'm the AI Assistant for ${company}. I can help you explore investment options, schedule a meeting with an advisor, or answer questions about our services. How can I help?`,
    specificResponses: {
      investment: {
        patterns: ['invest', 'stock', 'bond', 'mutual fund', 'etf', 'portfolio', 'market'],
        response: "I can help you understand our investment options!\n\n📈 **Stocks & ETFs** - Individual securities and funds\n📊 **Mutual Funds** - Diversified portfolios\n💵 **Bonds** - Fixed income securities\n🏠 **REITs** - Real estate investments\n\nInvestment strategies should align with your goals and risk tolerance. Would you like to schedule a free consultation with an advisor?",
        delay: 1500,
      },
      retirement: {
        patterns: ['retire', '401k', 'ira', 'pension', 'social security', 'nest egg'],
        response: "Planning for retirement is so important! We offer several options:\n\n👴 **401(k) Plans** - Employer-sponsored with tax benefits\n💰 **Traditional IRA** - Tax-deferred growth\n💎 **Roth IRA** - Tax-free withdrawals\n📋 **Pension Analysis** - Maximize your benefits\n\nThe right choice depends on your situation. Would you like to discuss your retirement goals with an advisor?",
        delay: 1500,
      },
      account: {
        patterns: ['account', 'balance', 'statement', 'transaction', 'login', 'password'],
        response: "For account-related inquiries:\n\n🔐 **Online Access:** Visit our secure portal at www.company.com/login\n📱 **Mobile App:** Download from App Store or Google Play\n📞 **Phone Support:** (555) 123-4567\n\nFor security reasons, I can't access account details directly. Is there something else I can help with?",
        delay: 1300,
      },
    },
    flows: {
      services: {
        response: "We offer comprehensive financial services:\n\n📈 **Wealth Management** - Portfolio management, planning\n🏦 **Business Banking** - Loans, lines of credit\n👴 **Retirement Planning** - 401k, IRA, pension\n🏠 **Mortgage Services** - Purchase, refinance\n\nWhich service interests you?",
        delay: 1500,
      },
      pricing: {
        response: "Our fee structure is transparent:\n\n**Wealth Management:** 0.5-1.5% of AUM annually\n**Financial Planning:** Flat fee from $1,500\n**Mortgage Rates:** Starting at 6.25% APR*\n**Business Loans:** From Prime + 1%\n\n*Rates vary based on qualification. Would you like to speak with an advisor?",
        delay: 2000,
      },
      schedule: {
        response: "I can schedule a meeting with a financial advisor. Available times:\n\n📅 **Tomorrow** - 10:00 AM, 2:00 PM\n📅 **Wednesday** - 9:00 AM, 1:00 PM, 4:00 PM\n📅 **Friday** - 11:00 AM, 3:00 PM\n\nWhich time works for you?",
        delay: 1500,
      },
      confirm: {
        response: "Your appointment is confirmed for **Wednesday at 1:00 PM** with Financial Advisor David Chen.\n\n**Please have ready:**\n• Recent financial statements\n• Investment goals/timeline\n• Any existing account information\n\nIs there anything specific you'd like to discuss?",
        delay: 1800,
      },
    },
    prompts: [
      { text: "What services do you offer?", icon: Briefcase, flow: 'services' },
      { text: "Fees and rates", icon: DollarSign, flow: 'pricing' },
      { text: "Meet with an advisor", icon: Calendar, flow: 'schedule' },
    ],
  },
};

function SetupScreen({ onComplete }) {
  const [industry, setIndustry] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [step, setStep] = useState('industry'); // industry, company

  const handleIndustrySelect = (id) => {
    setIndustry(id);
    setStep('company');
  };

  const handleStart = () => {
    if (companyName.trim()) {
      onComplete({ industry, companyName: companyName.trim() });
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg mx-auto">
      <Card variant="glass" padding="lg">
        {step === 'industry' ? (
          <>
            <h3 className="text-lg font-semibold text-white mb-2 text-center">Select Your Industry</h3>
            <p className="text-gray-400 text-sm text-center mb-6">The chat will be customized for your industry</p>
            <div className="grid grid-cols-2 gap-3">
              {industries.map((ind) => (
                <motion.button
                  key={ind.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleIndustrySelect(ind.id)}
                  className="p-4 rounded-xl bg-a7-dark-700/50 border border-a7-dark-600 hover:border-a7-primary/50 transition-all group"
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${ind.color} flex items-center justify-center mx-auto mb-2`}>
                    <ind.icon size={20} className="text-white" />
                  </div>
                  <p className="text-sm font-medium text-white group-hover:text-a7-primary transition-colors">{ind.name}</p>
                </motion.button>
              ))}
            </div>
          </>
        ) : (
          <>
            <button onClick={() => setStep('industry')} className="text-gray-400 hover:text-white mb-4 text-sm flex items-center gap-1">
              <ArrowLeft size={14} /> Back
            </button>
            <h3 className="text-lg font-semibold text-white mb-2 text-center">Enter Your Company Name</h3>
            <p className="text-gray-400 text-sm text-center mb-6">The AI will represent your business</p>
            <Input
              placeholder="e.g., Acme Construction LLC"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              icon={<Building2 size={18} />}
              className="mb-6"
            />
            <Button size="lg" className="w-full" onClick={handleStart} disabled={!companyName.trim()} icon={<MessageSquare size={18} />}>
              Start Chat Demo
            </Button>
          </>
        )}
      </Card>
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.div key={i} className="w-2 h-2 bg-a7-primary rounded-full" animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
      ))}
    </div>
  );
}

function Message({ message, isBot }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }} className={`flex gap-3 ${isBot ? '' : 'flex-row-reverse'}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isBot ? 'bg-gradient-to-br from-a7-primary to-a7-secondary' : 'bg-gradient-to-br from-gray-600 to-gray-700'}`}>
        {isBot ? <Bot size={16} className="text-white" /> : <User size={16} className="text-white" />}
      </div>
      <div className={`max-w-[80%] px-4 py-3 rounded-2xl ${isBot ? 'bg-a7-dark-700 text-white rounded-tl-none' : 'bg-gradient-to-r from-a7-primary to-a7-secondary text-white rounded-tr-none'}`}>
        <p className="text-sm whitespace-pre-line">{message}</p>
      </div>
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
    <Modal isOpen={isOpen} onClose={onClose} title="Get Your AI Receptionist" size="md">
      <p className="text-gray-400 mb-6">Deploy an AI receptionist that works 24/7, qualifies leads instantly, and books appointments automatically.</p>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[{ icon: Clock, text: '24/7 Availability' }, { icon: MessageSquare, text: 'Instant Responses' }, { icon: Calendar, text: 'Auto Scheduling' }, { icon: Bot, text: 'Lead Qualification' }].map((feature, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
            <feature.icon size={14} className="text-a7-primary" />
            <span>{feature.text}</span>
          </div>
        ))}
      </div>
      <Button onClick={handleBookCall} size="lg" className="w-full" variant="primary" icon={<Bot size={18} />}>Book Your Demo</Button>
      <p className="text-center text-xs text-gray-500 mt-4">Free setup. Cancel anytime.</p>
    </Modal>
  );
}

export default function AIChat({ onBack }) {
  const [config, setConfig] = useState(null); // { industry, companyName }
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [currentPrompts, setCurrentPrompts] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Start chat when config is set
  useEffect(() => {
    if (config) {
      const industryData = industryFlows[config.industry];
      setCurrentPrompts(industryData.prompts);

      const timer = setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages([{ text: industryData.greeting(config.companyName), isBot: true }]);
        }, 1200);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [config]);

  // Check for common response patterns
  const checkCommonResponse = (input, companyName) => {
    const lower = input.toLowerCase();

    for (const [key, data] of Object.entries(commonResponses)) {
      if (key === 'fallback') continue; // Skip fallback, it's the default
      if (data.patterns && data.patterns.some(pattern => lower.includes(pattern))) {
        return {
          response: typeof data.response === 'function' ? data.response(companyName) : data.response,
          delay: data.delay,
          type: 'common',
          key,
        };
      }
    }
    return null;
  };

  // Check for industry-specific response patterns
  const checkIndustrySpecific = (input, industry) => {
    const lower = input.toLowerCase();
    const industryData = industryFlows[industry];

    if (industryData.specificResponses) {
      for (const [key, data] of Object.entries(industryData.specificResponses)) {
        if (data.patterns && data.patterns.some(pattern => lower.includes(pattern))) {
          return {
            response: data.response,
            delay: data.delay,
            type: 'specific',
            key,
          };
        }
      }
    }
    return null;
  };

  const detectFlow = (input) => {
    const lower = input.toLowerCase();
    if (lower.includes('service') || lower.includes('offer') || lower.includes('what do you') || lower.includes('help with')) return 'services';
    if (lower.includes('price') || lower.includes('cost') || lower.includes('fee') || lower.includes('rate') || lower.includes('quote') || lower.includes('$') || lower.includes('how much')) return 'pricing';
    if (lower.includes('schedule') || lower.includes('appointment') || lower.includes('book') || lower.includes('meet') || lower.includes('consult') || lower.includes('call me')) return 'schedule';
    if (lower.includes('tomorrow') || lower.includes('thursday') || lower.includes('wednesday') || lower.includes('friday') || lower.includes('pm') || lower.includes('am') || lower.match(/\d+\s*(am|pm|o'clock)/)) return 'confirm';
    return null; // Return null to trigger fallback
  };

  const handleSend = (text = inputValue, flowOverride = null) => {
    if (!text.trim() || !config) return;

    setMessages((prev) => [...prev, { text, isBot: false }]);
    setInputValue('');

    const industryData = industryFlows[config.industry];

    // Priority: 1) Flow override, 2) Common responses, 3) Industry-specific, 4) Main flows, 5) Fallback
    let responseData = null;
    let responseType = 'flow';

    if (flowOverride) {
      // Direct flow override from button clicks
      responseData = industryData.flows[flowOverride];
      responseType = flowOverride;
    } else {
      // Check common responses first (greetings, thanks, etc.)
      const commonMatch = checkCommonResponse(text, config.companyName);
      if (commonMatch) {
        responseData = commonMatch;
        responseType = commonMatch.key;
      } else {
        // Check industry-specific responses
        const specificMatch = checkIndustrySpecific(text, config.industry);
        if (specificMatch) {
          responseData = specificMatch;
          responseType = specificMatch.key;
        } else {
          // Try to detect standard flow
          const flow = detectFlow(text);
          if (flow) {
            responseData = industryData.flows[flow];
            responseType = flow;
          } else {
            // Use fallback
            responseData = {
              response: commonResponses.fallback.response(config.companyName),
              delay: commonResponses.fallback.delay,
            };
            responseType = 'fallback';
          }
        }
      }
    }

    setIsTyping(true);

    // Update prompts based on response type
    setTimeout(() => {
      if (responseType === 'services') {
        setCurrentPrompts([
          industryData.prompts.find(p => p.flow === 'pricing') || industryData.prompts[1],
          industryData.prompts.find(p => p.flow === 'schedule') || industryData.prompts[2],
        ].filter(Boolean));
      } else if (responseType === 'pricing') {
        setCurrentPrompts([{ text: "Schedule a consultation", icon: Calendar, flow: 'schedule' }]);
      } else if (responseType === 'schedule') {
        setCurrentPrompts([
          { text: "Tomorrow at 10 AM works", icon: Clock, flow: 'confirm' },
          { text: "Thursday at 2 PM", icon: Clock, flow: 'confirm' },
        ]);
      } else if (responseType === 'confirm') {
        setCurrentPrompts([]);
      } else if (['greeting', 'thanks', 'positive', 'negative', 'fallback', 'goodbye'].includes(responseType)) {
        // Keep current prompts or show initial prompts
        if (currentPrompts.length === 0) {
          setCurrentPrompts(industryData.prompts);
        }
      }
      // For other responses (common or specific), keep current prompts
    }, responseData.delay / 2);

    setTimeout(() => {
      setIsTyping(false);
      const responseText = responseData.response || responseData;
      setMessages((prev) => [...prev, { text: responseText, isBot: true }]);
      if (responseType === 'confirm') {
        setTimeout(() => setShowCTA(true), 1500);
      }
    }, responseData.delay);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const currentIndustry = config ? industries.find(i => i.id === config.industry) : null;

  return (
    <div className="min-h-screen bg-a7-dark-900 bg-grid">
      <div className="fixed inset-0 bg-gradient-radial from-a7-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-2xl mx-auto px-4 py-8 h-screen flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" onClick={config ? () => setConfig(null) : onBack} icon={<ArrowLeft size={18} />}>
            {config ? 'Change Setup' : 'Back'}
          </Button>
          {config && (
            <Button variant="secondary" size="sm" onClick={() => setShowCTA(true)}>
              Get This For Your Business
            </Button>
          )}
        </div>

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-a7-primary/10 border border-a7-primary/30 mb-3">
            <MessageSquare size={16} className="text-a7-primary" />
            <span className="text-sm text-a7-primary font-medium">AI Receptionist Demo</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">
            {config ? `Chat with ${config.companyName}'s AI` : 'Configure Your AI Assistant'}
          </h1>
          <p className="text-gray-400 text-sm">
            {config ? `Experience how AI handles ${currentIndustry?.name.toLowerCase()} inquiries 24/7` : 'Select your industry and company name to begin'}
          </p>
        </motion.div>

        {!config ? (
          <SetupScreen onComplete={setConfig} />
        ) : (
          <Card variant="glass" padding="none" className="flex-1 flex flex-col overflow-hidden">
            <div className="px-4 py-3 border-b border-a7-dark-600 flex items-center gap-3">
              <div className="relative">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${currentIndustry?.color} flex items-center justify-center`}>
                  {currentIndustry && <currentIndustry.icon size={20} className="text-white" />}
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-a7-success rounded-full border-2 border-a7-dark-800" />
              </div>
              <div>
                <p className="font-medium text-white">{config.companyName} AI</p>
                <p className="text-xs text-a7-success">Online • {currentIndustry?.name}</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <Message key={i} message={msg.text} isBot={msg.isBot} />
                ))}
              </AnimatePresence>
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${currentIndustry?.color} flex items-center justify-center`}>
                    {currentIndustry && <currentIndustry.icon size={16} className="text-white" />}
                  </div>
                  <div className="bg-a7-dark-700 rounded-2xl rounded-tl-none">
                    <TypingIndicator />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {currentPrompts.length > 0 && !isTyping && (
              <div className="px-4 pb-2">
                <div className="flex flex-wrap gap-2">
                  {currentPrompts.map((prompt, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => handleSend(prompt.text, prompt.flow)}
                      className="flex items-center gap-2 px-3 py-2 rounded-full bg-a7-dark-700/50 border border-a7-dark-500 text-sm text-gray-300 hover:border-a7-primary/50 hover:text-a7-primary transition-colors"
                    >
                      <prompt.icon size={14} />
                      {prompt.text}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            <div className="p-4 border-t border-a7-dark-600">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 rounded-xl bg-a7-dark-700/50 border border-a7-dark-500 text-white placeholder-gray-500 focus:outline-none focus:border-a7-primary transition-colors"
                />
                <Button variant="primary" onClick={() => handleSend()} disabled={!inputValue.trim() || isTyping} className="px-4">
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </Card>
        )}

        <p className="text-center text-xs text-gray-600 mt-4">
          {config ? 'This is a demo with pre-scripted responses. Real AI uses advanced NLP.' : ''}
        </p>
      </div>

      <CTAModal isOpen={showCTA} onClose={() => setShowCTA(false)} />
    </div>
  );
}
