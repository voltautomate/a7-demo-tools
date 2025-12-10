import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  Calculator,
  MessageSquare,
  Video,
  ArrowRight,
  Play,
} from 'lucide-react';
import LeadActivation from './components/LeadActivation';
import PipelineCalculator from './components/PipelineCalculator';
import AIChat from './components/AIChat';
import ContentEngine from './components/ContentEngine';

// UPDATE THIS WITH YOUR ACTUAL BOOKING LINK
const BOOKING_URL = 'https://calendly.com/team-a7agents/30min';

const demos = [
  {
    id: 'lead-activation',
    number: '01',
    title: 'AI Lead Activation',
    subtitle: 'Simulator',
    description: 'Watch AI discover and qualify leads in real-time. See how our intelligent system finds, engages, and books appointments automatically.',
    icon: Zap,
    features: ['Real-time lead discovery', 'Automatic qualification', 'Smart appointment booking'],
  },
  {
    id: 'pipeline-calculator',
    number: '02',
    title: 'Pipeline Reactivation',
    subtitle: 'Calculator',
    description: 'Calculate your potential ROI from dormant leads. Discover how much revenue is hiding in your existing database.',
    icon: Calculator,
    features: ['ROI calculation', 'Revenue projection', 'Lead value analysis'],
  },
  {
    id: 'ai-chat',
    number: '03',
    title: 'AI Receptionist',
    subtitle: 'Chat Widget',
    description: 'Experience our intelligent assistant that handles inquiries 24/7. Never miss a lead, even while you sleep.',
    icon: MessageSquare,
    features: ['24/7 availability', 'Instant responses', 'Lead capture'],
  },
  {
    id: 'content-engine',
    number: '04',
    title: 'Content Engine',
    subtitle: 'Demo',
    description: 'Transform long-form content into social assets. One video becomes clips, captions, and image cards automatically.',
    icon: Video,
    features: ['Video clipping', 'Caption generation', 'Social graphics'],
  },
];

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-[#2a2a2a]/50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-white tracking-tight">A7</span>
          <span className="text-xs text-gray-500 uppercase tracking-widest">Agents</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#demos" className="text-sm text-gray-400 hover:text-white transition-colors">Demos</a>
          <a href="#how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors">How It Works</a>
        </div>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#C45308] text-white px-5 py-2 text-sm font-semibold hover:bg-white hover:text-[#C45308] border border-[#C45308] transition-colors"
        >
          Book a Call
        </a>
      </div>
    </nav>
  );
}

function HeroSection({ onSelectDemo }) {
  return (
    <section className="pt-32 pb-16 md:pb-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-heading text-2xl md:text-3xl lg:text-4xl tracking-wide uppercase mb-6"
        >
          Experience the Power of
          <br />
          <span className="text-[#C45308]">Advanced AI</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8"
        >
          Interactive demos that show exactly how A7 Agents can transform your business.
          <br />
          <span className="text-white font-medium">Select a demo below to get started.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button
            onClick={() => onSelectDemo('lead-activation')}
            className="inline-flex items-center gap-3 bg-black border border-white/20 hover:border-[#C45308] text-white px-8 py-4 text-sm font-medium tracking-wide transition-all group"
          >
            <Play size={18} className="text-[#C45308]" />
            Start First Demo
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function DemoTabs({ activeTab, onTabChange }) {
  return (
    <div className="border-b border-[#2a2a2a] mb-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-1">
          {demos.map((demo) => (
            <button
              key={demo.id}
              onClick={() => onTabChange(demo.id)}
              className={`px-4 md:px-6 py-3 text-xs md:text-sm font-medium tracking-wider uppercase transition-all border-b-2 ${
                activeTab === demo.id
                  ? 'text-white border-[#C45308] bg-[#141414]/50'
                  : 'text-gray-500 border-transparent hover:text-gray-300 hover:bg-[#141414]/30'
              }`}
            >
              {demo.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function DemoCard({ demo, onLaunch }) {
  const IconComponent = demo.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-6"
    >
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
        {/* Number */}
        <div className="flex-shrink-0">
          <span className="font-mono text-6xl md:text-8xl font-extralight text-[#2a2a2a]">
            {demo.number}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#C45308]/10 border border-[#C45308]/30 flex items-center justify-center">
              <IconComponent size={20} className="text-[#C45308]" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-white">{demo.title}</h3>
              <p className="text-sm text-gray-500">{demo.subtitle}</p>
            </div>
          </div>

          <p className="text-gray-400 mb-6 leading-relaxed">
            {demo.description}
          </p>

          {/* Features */}
          <ul className="space-y-2 mb-8">
            {demo.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C45308]" />
                {feature}
              </li>
            ))}
          </ul>

          {/* Launch Button */}
          <button
            onClick={onLaunch}
            className="inline-flex items-center gap-3 bg-black border-2 border-white hover:bg-white hover:text-black text-white px-8 py-4 font-medium tracking-wide transition-all group"
          >
            Launch Demo
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function DemoSelector({ onSelect }) {
  const [activeTab, setActiveTab] = useState('lead-activation');
  const activeDemo = demos.find((d) => d.id === activeTab);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <HeroSection onSelectDemo={onSelect} />

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#2a2a2a] to-transparent" />
      </div>

      {/* Demo Selection Section */}
      <section id="demos" className="py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="font-mono text-xl md:text-2xl tracking-wide uppercase mb-4">
            Select a <span className="text-[#C45308]">Demo</span>
          </h2>
          <p className="text-gray-500 text-sm">Choose an interactive demo to explore</p>
        </div>

        <DemoTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <AnimatePresence mode="wait">
          <DemoCard
            key={activeTab}
            demo={activeDemo}
            onLaunch={() => onSelect(activeTab)}
          />
        </AnimatePresence>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24 bg-[#0a0a0a]/50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-mono text-xl md:text-2xl tracking-wide uppercase text-center mb-16">
            How It <span className="text-[#C45308]">Works</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { num: '01', title: 'Select Demo', desc: 'Choose from our suite of interactive AI demonstrations' },
              { num: '02', title: 'Experience AI', desc: 'See real-time AI in action with your own inputs' },
              { num: '03', title: 'Get Results', desc: 'Understand the potential impact on your business' },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <span className="font-mono text-4xl font-extralight text-gray-600 block mb-4">
                  {step.num}
                </span>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 md:py-24 border-t border-[#1f1f1f]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-mono text-xl md:text-2xl tracking-wide uppercase mb-6">
            Ready to <span className="text-[#C45308]">Get Started</span>?
          </h2>
          <p className="text-gray-400 mb-8">
            Book a free consultation to see how A7 Agents can transform your lead generation.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#C45308] text-white px-10 py-4 font-semibold text-lg hover:bg-white hover:text-[#C45308] border border-[#C45308] transition-colors"
          >
            Book Your Free Call
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-[#141414]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-white">A7 AGENTS</span>
            <span className="text-gray-600">+</span>
            <span className="text-sm text-gray-500">AUTOMATION</span>
          </div>
          <p className="text-gray-600 text-sm">
            &copy; 2024 A7 Agents. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  const [activeDemo, setActiveDemo] = useState(null);

  const handleBack = () => {
    setActiveDemo(null);
  };

  const renderDemo = () => {
    switch (activeDemo) {
      case 'lead-activation':
        return <LeadActivation onBack={handleBack} />;
      case 'pipeline-calculator':
        return <PipelineCalculator onBack={handleBack} />;
      case 'ai-chat':
        return <AIChat onBack={handleBack} />;
      case 'content-engine':
        return <ContentEngine onBack={handleBack} />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!activeDemo ? (
        <motion.div
          key="selector"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <DemoSelector onSelect={setActiveDemo} />
        </motion.div>
      ) : (
        <motion.div
          key={activeDemo}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          {renderDemo()}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
