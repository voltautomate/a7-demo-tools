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

// Industry-specific conversation flows
const industryFlows = {
  'real-estate': {
    greeting: (company) => `Hi there! I'm the AI Assistant for ${company}. I can help you find properties, schedule viewings, or answer questions about the local market. What can I help you with today?`,
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

function CTAModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => { onClose(); setSubmitted(false); setEmail(''); }, 2000);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={submitted ? null : "Get Your AI Receptionist"} size="md">
      {submitted ? (
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-8">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }} className="w-16 h-16 mx-auto mb-4 rounded-full bg-a7-success/20 flex items-center justify-center">
            <Sparkles size={32} className="text-a7-success" />
          </motion.div>
          <h3 className="text-xl font-bold text-white mb-2">Request Received!</h3>
          <p className="text-gray-400">We'll set up your demo within 24 hours.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit}>
          <p className="text-gray-400 mb-6">Deploy an AI receptionist that works 24/7, qualifies leads instantly, and books appointments automatically.</p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[{ icon: Clock, text: '24/7 Availability' }, { icon: MessageSquare, text: 'Instant Responses' }, { icon: Calendar, text: 'Auto Scheduling' }, { icon: Bot, text: 'Lead Qualification' }].map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
                <feature.icon size={14} className="text-a7-primary" />
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
          <Input label="Work Email" type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} icon={<Mail size={18} />} className="mb-6" />
          <Button type="submit" size="lg" className="w-full" variant="primary" icon={<Bot size={18} />}>Get My AI Receptionist</Button>
          <p className="text-center text-xs text-gray-500 mt-4">Free setup. Cancel anytime.</p>
        </form>
      )}
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

  const detectFlow = (input) => {
    const lower = input.toLowerCase();
    if (lower.includes('service') || lower.includes('offer') || lower.includes('what do you') || lower.includes('help')) return 'services';
    if (lower.includes('price') || lower.includes('cost') || lower.includes('fee') || lower.includes('rate') || lower.includes('quote') || lower.includes('$')) return 'pricing';
    if (lower.includes('schedule') || lower.includes('appointment') || lower.includes('book') || lower.includes('meet') || lower.includes('consult') || lower.includes('call')) return 'schedule';
    if (lower.includes('tomorrow') || lower.includes('thursday') || lower.includes('wednesday') || lower.includes('friday') || lower.includes('pm') || lower.includes('am') || lower.includes('time')) return 'confirm';
    return 'services';
  };

  const handleSend = (text = inputValue, flowOverride = null) => {
    if (!text.trim() || !config) return;

    setMessages((prev) => [...prev, { text, isBot: false }]);
    setInputValue('');

    const flow = flowOverride || detectFlow(text);
    const industryData = industryFlows[config.industry];
    const response = industryData.flows[flow] || industryData.flows.services;

    setIsTyping(true);

    // Update prompts based on flow
    setTimeout(() => {
      if (flow === 'services') {
        setCurrentPrompts([
          industryData.prompts.find(p => p.flow === 'pricing') || industryData.prompts[1],
          industryData.prompts.find(p => p.flow === 'schedule') || industryData.prompts[2],
        ].filter(Boolean));
      } else if (flow === 'pricing') {
        setCurrentPrompts([{ text: "Schedule a consultation", icon: Calendar, flow: 'schedule' }]);
      } else if (flow === 'schedule') {
        setCurrentPrompts([
          { text: "Tomorrow at 10 AM works", icon: Clock, flow: 'confirm' },
          { text: "Thursday at 2 PM", icon: Clock, flow: 'confirm' },
        ]);
      } else if (flow === 'confirm') {
        setCurrentPrompts([]);
      }
    }, response.delay / 2);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { text: response.response, isBot: true }]);
      if (flow === 'confirm') {
        setTimeout(() => setShowCTA(true), 1500);
      }
    }, response.delay);
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
