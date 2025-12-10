import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  MapPin,
  Search,
  Zap,
  User,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  Sparkles,
  TrendingUp,
  Target,
  Clock,
  Building2,
  Stethoscope,
  HardHat,
  Shield,
  Scale,
  Landmark,
  Home,
  Briefcase,
  DollarSign,
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

// Industry-specific mock leads
const industryLeads = {
  'real-estate': [
    { id: 1, name: 'Sarah Johnson', email: 'sarah.j@email.com', phone: '(555) 123-4567', source: 'Zillow', score: 94, interest: 'Buying', value: '$450K - $550K', timeline: '1-2 months', status: 'Hot Lead' },
    { id: 2, name: 'Michael Chen', email: 'm.chen@email.com', phone: '(555) 234-5678', source: 'Facebook Ads', score: 87, interest: 'Buying', value: '$300K - $400K', timeline: '3-6 months', status: 'Qualified' },
    { id: 3, name: 'Emily Rodriguez', email: 'e.rodriguez@email.com', phone: '(555) 345-6789', source: 'Realtor.com', score: 92, interest: 'Selling', value: 'Est. $680K', timeline: 'ASAP', status: 'Hot Lead' },
    { id: 4, name: 'James Wilson', email: 'j.wilson@email.com', phone: '(555) 456-7890', source: 'Google Ads', score: 78, interest: 'Buying', value: '$250K - $350K', timeline: '6+ months', status: 'Nurturing' },
    { id: 5, name: 'Amanda Foster', email: 'a.foster@email.com', phone: '(555) 567-8901', source: 'Instagram', score: 89, interest: 'Investment', value: '$500K - $700K', timeline: '1-2 months', status: 'Qualified' },
    { id: 6, name: 'David Park', email: 'd.park@email.com', phone: '(555) 678-9012', source: 'Referral', score: 96, interest: 'Selling', value: 'Est. $425K', timeline: 'ASAP', status: 'Hot Lead' },
  ],
  'healthcare': [
    { id: 1, name: 'Dr. Patricia Moore', email: 'p.moore@medclinic.com', phone: '(555) 123-4567', source: 'LinkedIn', score: 91, interest: 'New Practice Setup', value: '$150K Budget', timeline: '1-2 months', status: 'Hot Lead' },
    { id: 2, name: 'Valley Medical Group', email: 'admin@valleymed.com', phone: '(555) 234-5678', source: 'Google Ads', score: 88, interest: 'Equipment Upgrade', value: '$80K - $120K', timeline: '3-6 months', status: 'Qualified' },
    { id: 3, name: 'Sunrise Senior Care', email: 'ops@sunrisecare.com', phone: '(555) 345-6789', source: 'Healthcare Directory', score: 94, interest: 'Staffing Solutions', value: '$200K/year', timeline: 'ASAP', status: 'Hot Lead' },
    { id: 4, name: 'Dr. Robert Kim', email: 'r.kim@dentalpro.com', phone: '(555) 456-7890', source: 'Facebook Ads', score: 76, interest: 'Practice Expansion', value: '$300K - $500K', timeline: '6+ months', status: 'Nurturing' },
    { id: 5, name: 'CareFirst Clinic', email: 'info@carefirst.com', phone: '(555) 567-8901', source: 'Referral', score: 89, interest: 'Software Solutions', value: '$50K - $80K', timeline: '1-2 months', status: 'Qualified' },
    { id: 6, name: 'Metro Health Partners', email: 'partners@metrohealth.com', phone: '(555) 678-9012', source: 'Industry Event', score: 95, interest: 'Full Service Contract', value: '$500K+', timeline: 'ASAP', status: 'Hot Lead' },
  ],
  'construction': [
    { id: 1, name: 'BuildRight Construction', email: 'projects@buildright.com', phone: '(555) 123-4567', source: 'Google Ads', score: 93, interest: 'Commercial Project', value: '$2.5M - $4M', timeline: 'Q2 2025', status: 'Hot Lead' },
    { id: 2, name: 'Marcus Thompson', email: 'm.thompson@email.com', phone: '(555) 234-5678', source: 'HomeAdvisor', score: 85, interest: 'Home Renovation', value: '$75K - $120K', timeline: '2-3 months', status: 'Qualified' },
    { id: 3, name: 'Apex Development Corp', email: 'bids@apexdev.com', phone: '(555) 345-6789', source: 'LinkedIn', score: 91, interest: 'Multi-unit Residential', value: '$8M - $12M', timeline: 'Q1 2025', status: 'Hot Lead' },
    { id: 4, name: 'Green Valley HOA', email: 'manager@gvhoa.org', phone: '(555) 456-7890', source: 'Referral', score: 79, interest: 'Community Repairs', value: '$200K - $350K', timeline: '6+ months', status: 'Nurturing' },
    { id: 5, name: 'TechSpace Inc', email: 'facilities@techspace.io', phone: '(555) 567-8901', source: 'Facebook Ads', score: 88, interest: 'Office Buildout', value: '$500K - $750K', timeline: '1-2 months', status: 'Qualified' },
    { id: 6, name: 'City of Riverside', email: 'procurement@riverside.gov', phone: '(555) 678-9012', source: 'Government Portal', score: 97, interest: 'Infrastructure', value: '$5M+', timeline: 'ASAP', status: 'Hot Lead' },
  ],
  'insurance': [
    { id: 1, name: 'Jennifer Adams', email: 'j.adams@email.com', phone: '(555) 123-4567', source: 'Google Ads', score: 92, interest: 'Life Insurance', value: '$500K Policy', timeline: 'This month', status: 'Hot Lead' },
    { id: 2, name: 'Summit LLC', email: 'admin@summitllc.com', phone: '(555) 234-5678', source: 'LinkedIn', score: 86, interest: 'Business Insurance', value: '$25K/year', timeline: '1-2 months', status: 'Qualified' },
    { id: 3, name: 'The Martinez Family', email: 'carlos.m@email.com', phone: '(555) 345-6789', source: 'Facebook Ads', score: 90, interest: 'Home + Auto Bundle', value: '$3.5K/year', timeline: 'ASAP', status: 'Hot Lead' },
    { id: 4, name: 'Coastal Properties Inc', email: 'risk@coastalprops.com', phone: '(555) 456-7890', source: 'Referral', score: 77, interest: 'Commercial Property', value: '$50K/year', timeline: '3-6 months', status: 'Nurturing' },
    { id: 5, name: 'Dr. Susan Park', email: 's.park@medoffice.com', phone: '(555) 567-8901', source: 'Industry Directory', score: 88, interest: 'Malpractice Coverage', value: '$15K/year', timeline: '1-2 months', status: 'Qualified' },
    { id: 6, name: 'FleetMax Logistics', email: 'ops@fleetmax.com', phone: '(555) 678-9012', source: 'Google Ads', score: 95, interest: 'Fleet Insurance', value: '$120K/year', timeline: 'ASAP', status: 'Hot Lead' },
  ],
  'legal': [
    { id: 1, name: 'Robert Chen', email: 'r.chen@email.com', phone: '(555) 123-4567', source: 'Google Ads', score: 94, interest: 'Personal Injury', value: 'Contingency Case', timeline: 'Immediate', status: 'Hot Lead' },
    { id: 2, name: 'TechStart Inc', email: 'legal@techstart.io', phone: '(555) 234-5678', source: 'LinkedIn', score: 87, interest: 'Corporate Formation', value: '$5K - $15K', timeline: '1-2 months', status: 'Qualified' },
    { id: 3, name: 'Maria Gonzalez', email: 'm.gonzalez@email.com', phone: '(555) 345-6789', source: 'Avvo', score: 91, interest: 'Family Law', value: '$8K - $12K', timeline: 'ASAP', status: 'Hot Lead' },
    { id: 4, name: 'Downtown Restaurant Group', email: 'owner@dtrg.com', phone: '(555) 456-7890', source: 'Referral', score: 78, interest: 'Contract Review', value: '$3K - $5K', timeline: '3-6 months', status: 'Nurturing' },
    { id: 5, name: 'Amanda Foster', email: 'a.foster@email.com', phone: '(555) 567-8901', source: 'Facebook Ads', score: 89, interest: 'Estate Planning', value: '$4K - $8K', timeline: '1-2 months', status: 'Qualified' },
    { id: 6, name: 'Williams Construction', email: 'disputes@williamsc.com', phone: '(555) 678-9012', source: 'Google Ads', score: 96, interest: 'Business Litigation', value: '$50K+ Case', timeline: 'ASAP', status: 'Hot Lead' },
  ],
  'finance': [
    { id: 1, name: 'David & Sarah Miller', email: 'd.miller@email.com', phone: '(555) 123-4567', source: 'Google Ads', score: 93, interest: 'Wealth Management', value: '$750K Portfolio', timeline: '1-2 months', status: 'Hot Lead' },
    { id: 2, name: 'NexGen Software', email: 'cfo@nexgen.io', phone: '(555) 234-5678', source: 'LinkedIn', score: 86, interest: 'Business Loan', value: '$500K - $1M', timeline: '2-3 months', status: 'Qualified' },
    { id: 3, name: 'Dr. James Wong', email: 'j.wong@email.com', phone: '(555) 345-6789', source: 'Referral', score: 92, interest: 'Retirement Planning', value: '$1.2M Assets', timeline: 'ASAP', status: 'Hot Lead' },
    { id: 4, name: 'Fresh Bites Restaurant', email: 'owner@freshbites.com', phone: '(555) 456-7890', source: 'Facebook Ads', score: 77, interest: 'Equipment Financing', value: '$80K - $120K', timeline: '6+ months', status: 'Nurturing' },
    { id: 5, name: 'Thompson Family Trust', email: 'trustee@thompson.fam', phone: '(555) 567-8901', source: 'Referral', score: 89, interest: 'Trust Services', value: '$2M+ Estate', timeline: '1-2 months', status: 'Qualified' },
    { id: 6, name: 'Apex Manufacturing', email: 'finance@apexmfg.com', phone: '(555) 678-9012', source: 'Industry Event', score: 95, interest: 'Commercial Lending', value: '$3M Line of Credit', timeline: 'ASAP', status: 'Hot Lead' },
  ],
};

// Industry-specific scanning messages
const industryScanMessages = {
  'real-estate': [
    'Connecting to lead sources...', 'Scanning Zillow listings...', 'Analyzing Facebook audience...',
    'Processing Google Ads data...', 'Checking Realtor.com inquiries...', 'Qualifying prospects...',
    'Scoring lead intent...', 'Matching with your criteria...',
  ],
  'healthcare': [
    'Connecting to healthcare networks...', 'Scanning medical directories...', 'Analyzing LinkedIn profiles...',
    'Processing Google Ads data...', 'Checking industry databases...', 'Qualifying prospects...',
    'Scoring lead intent...', 'Matching with your criteria...',
  ],
  'construction': [
    'Connecting to contractor networks...', 'Scanning project databases...', 'Analyzing bid requests...',
    'Processing Google Ads data...', 'Checking HomeAdvisor leads...', 'Qualifying prospects...',
    'Scoring project viability...', 'Matching with your criteria...',
  ],
  'insurance': [
    'Connecting to lead sources...', 'Scanning quote requests...', 'Analyzing demographics...',
    'Processing Google Ads data...', 'Checking referral networks...', 'Qualifying prospects...',
    'Scoring policy potential...', 'Matching with your criteria...',
  ],
  'legal': [
    'Connecting to legal networks...', 'Scanning case inquiries...', 'Analyzing Avvo profiles...',
    'Processing Google Ads data...', 'Checking referral sources...', 'Qualifying prospects...',
    'Scoring case potential...', 'Matching with your criteria...',
  ],
  'finance': [
    'Connecting to financial networks...', 'Scanning investment profiles...', 'Analyzing LinkedIn data...',
    'Processing Google Ads data...', 'Checking referral networks...', 'Qualifying prospects...',
    'Scoring asset potential...', 'Matching with your criteria...',
  ],
};

// Industry-specific field labels
const industryFieldLabels = {
  'real-estate': { interest: 'Interest', value: 'Budget/Value' },
  'healthcare': { interest: 'Service Need', value: 'Budget' },
  'construction': { interest: 'Project Type', value: 'Project Value' },
  'insurance': { interest: 'Coverage Type', value: 'Policy Value' },
  'legal': { interest: 'Case Type', value: 'Case Value' },
  'finance': { interest: 'Service Need', value: 'Asset Value' },
};

function IndustrySelector({ onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto"
    >
      <Card variant="glass" padding="lg">
        <h3 className="text-lg font-semibold text-white mb-2 text-center">Select Your Industry</h3>
        <p className="text-gray-400 text-sm text-center mb-6">Choose the industry to see relevant lead examples</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {industries.map((industry) => (
            <motion.button
              key={industry.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(industry.id)}
              className="p-4 rounded-xl bg-a7-dark-700/50 border border-a7-dark-600 hover:border-a7-primary/50 transition-all group"
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${industry.color} flex items-center justify-center mx-auto mb-2`}>
                <industry.icon size={20} className="text-white" />
              </div>
              <p className="text-sm font-medium text-white group-hover:text-a7-primary transition-colors">
                {industry.name}
              </p>
            </motion.button>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}

function ScanningAnimation({ message }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full h-64 md:h-80 rounded-2xl bg-a7-dark-800/50 border border-a7-dark-600/50 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid opacity-50" />
      <motion.div
        className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-a7-primary to-transparent"
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full border border-a7-primary/30"
            animate={{ scale: [1, 2, 3], opacity: [0.5, 0.2, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4, ease: 'easeOut' }}
          />
        ))}
        <motion.div
          className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-a7-primary to-a7-secondary flex items-center justify-center"
          animate={{
            scale: [1, 1.1, 1],
            boxShadow: ['0 0 20px rgba(99, 102, 241, 0.3)', '0 0 40px rgba(99, 102, 241, 0.6)', '0 0 20px rgba(99, 102, 241, 0.3)'],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Search size={32} className="text-white" />
        </motion.div>
      </div>
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <motion.p
          key={message}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-a7-primary font-medium"
        >
          {message}
        </motion.p>
      </div>
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-a7-primary/50" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-a7-primary/50" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-a7-primary/50" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-a7-primary/50" />
    </motion.div>
  );
}

function LeadCard({ lead, index, fieldLabels }) {
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-a7-primary bg-a7-primary/10 border-a7-primary/30';
    if (score >= 80) return 'text-a7-secondary bg-a7-secondary/10 border-a7-secondary/30';
    return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Hot Lead': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Qualified': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-a7-primary/20 text-a7-primary border-a7-primary/30';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.15, type: 'spring', stiffness: 100 }}
    >
      <Card variant="glass" padding="md" className="relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-a7-primary/0 via-a7-primary/5 to-a7-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-a7-primary/20 to-a7-secondary/20 flex items-center justify-center border border-a7-primary/30">
                <User size={20} className="text-a7-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-white">{lead.name}</h4>
                <p className="text-sm text-gray-400">{lead.source}</p>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full border text-sm font-medium ${getScoreColor(lead.score)}`}>
              {lead.score}%
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <Mail size={14} />
              <span className="truncate">{lead.email}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Phone size={14} />
              <span>{lead.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Briefcase size={14} />
              <span className="truncate">{lead.interest}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <DollarSign size={14} />
              <span className="truncate">{lead.value}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full border text-xs font-medium ${getStatusColor(lead.status)}`}>
                {lead.status}
              </span>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Clock size={12} />
                {lead.timeline}
              </span>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.15 + 0.3, type: 'spring' }}
            >
              <CheckCircle size={20} className="text-a7-success" />
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function ResultsSummary({ leads, marketArea, industry }) {
  const hotLeads = leads.filter(l => l.status === 'Hot Lead').length;
  const qualified = leads.filter(l => l.status === 'Qualified').length;
  const avgScore = Math.round(leads.reduce((acc, l) => acc + l.score, 0) / leads.length);
  const industryName = industries.find(i => i.id === industry)?.name || 'your industry';

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
      <Card variant="gradient" padding="lg" className="border-a7-primary/30">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-a7-primary/20">
            <Sparkles size={24} className="text-a7-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Discovery Complete</h3>
            <p className="text-gray-400">{industryName} leads in {marketArea}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 rounded-xl bg-a7-dark-700/50">
            <p className="text-3xl font-bold text-white">{leads.length}</p>
            <p className="text-sm text-gray-400">Leads Found</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-a7-dark-700/50">
            <p className="text-3xl font-bold text-red-400">{hotLeads}</p>
            <p className="text-sm text-gray-400">Hot Leads</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-a7-dark-700/50">
            <p className="text-3xl font-bold text-green-400">{qualified}</p>
            <p className="text-sm text-gray-400">Qualified</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-a7-dark-700/50">
            <p className="text-3xl font-bold text-a7-primary">{avgScore}%</p>
            <p className="text-sm text-gray-400">Avg Score</p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-4 rounded-xl bg-a7-success/10 border border-a7-success/30">
          <TrendingUp size={20} className="text-a7-success" />
          <p className="text-sm text-a7-success">
            <span className="font-semibold">AI Insight:</span> {hotLeads} leads show high intent signals and are ready for immediate outreach.
          </p>
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
    <Modal isOpen={isOpen} onClose={onClose} title="Get Started with A7 Agents" size="md">
      <p className="text-gray-400 mb-6">Ready to discover real leads in your market? Book a call to see a personalized demo.</p>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { icon: Zap, text: 'Real-time Discovery' },
          { icon: Target, text: 'Auto Qualification' },
          { icon: TrendingUp, text: 'Smart Scoring' },
          { icon: Calendar, text: 'Auto Scheduling' },
        ].map((feature, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
            <feature.icon size={14} className="text-a7-primary" />
            <span>{feature.text}</span>
          </div>
        ))}
      </div>
      <Button onClick={handleBookCall} size="lg" className="w-full" icon={<Calendar size={18} />}>Book Your Demo</Button>
      <p className="text-center text-xs text-gray-500 mt-4">No commitment required. See real results in 15 minutes.</p>
    </Modal>
  );
}

export default function LeadActivation({ onBack }) {
  const [industry, setIndustry] = useState(null);
  const [marketArea, setMarketArea] = useState('');
  const [phase, setPhase] = useState('industry'); // industry, input, scanning, results
  const [scanMessage, setScanMessage] = useState('');
  const [discoveredLeads, setDiscoveredLeads] = useState([]);
  const [showCTA, setShowCTA] = useState(false);

  const handleIndustrySelect = (selectedIndustry) => {
    setIndustry(selectedIndustry);
    setPhase('input');
  };

  const startDiscovery = useCallback(() => {
    if (!marketArea.trim() || !industry) return;

    const messages = industryScanMessages[industry];
    setScanMessage(messages[0]);
    setPhase('scanning');
    setDiscoveredLeads([]);

    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length;
      setScanMessage(messages[messageIndex]);
    }, 800);

    setTimeout(() => {
      clearInterval(messageInterval);
      setPhase('results');
      const leads = industryLeads[industry];
      leads.forEach((lead, index) => {
        setTimeout(() => {
          setDiscoveredLeads(prev => [...prev, lead]);
        }, index * 400);
      });
    }, 4000);
  }, [marketArea, industry]);

  const resetDemo = () => {
    setPhase('industry');
    setIndustry(null);
    setMarketArea('');
    setDiscoveredLeads([]);
  };

  const currentIndustry = industries.find(i => i.id === industry);
  const fieldLabels = industry ? industryFieldLabels[industry] : {};

  return (
    <div className="min-h-screen bg-a7-dark-900 bg-grid">
      <div className="fixed inset-0 bg-gradient-radial from-a7-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="relative max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={phase === 'input' ? () => setPhase('industry') : onBack} icon={<ArrowLeft size={18} />}>
            Back
          </Button>
          {phase === 'results' && (
            <Button variant="secondary" onClick={resetDemo}>Try Another Industry</Button>
          )}
        </div>

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-a7-primary/10 border border-a7-primary/30 mb-4">
            <Zap size={16} className="text-a7-primary" />
            <span className="text-sm text-a7-primary font-medium">AI Lead Activation Simulator</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {phase === 'industry' ? 'Discover Leads in Any Industry' : `Discover ${currentIndustry?.name || ''} Leads`}
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            {phase === 'industry'
              ? 'Select your industry to see how our AI finds and qualifies leads from multiple sources.'
              : 'Enter your target market and watch our AI scan multiple sources to find qualified leads.'}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {phase === 'industry' && (
            <IndustrySelector key="industry" onSelect={handleIndustrySelect} />
          )}

          {phase === 'input' && (
            <motion.div key="input" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-md mx-auto">
              <Card variant="glass" padding="lg">
                <div className="flex items-center gap-2 mb-4 justify-center">
                  {currentIndustry && (
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${currentIndustry.color}`}>
                      <currentIndustry.icon size={18} className="text-white" />
                    </div>
                  )}
                  <span className="text-white font-medium">{currentIndustry?.name}</span>
                </div>
                <Input
                  label="Target Market / Area"
                  placeholder="e.g., Los Angeles, CA or Southwest Region"
                  value={marketArea}
                  onChange={(e) => setMarketArea(e.target.value)}
                  icon={<MapPin size={18} />}
                  className="mb-6"
                />
                <Button size="lg" className="w-full" onClick={startDiscovery} disabled={!marketArea.trim()} icon={<Search size={18} />}>
                  Start Discovery
                </Button>
                <p className="text-center text-xs text-gray-500 mt-4">This is a simulation with mock data for demonstration purposes.</p>
              </Card>
            </motion.div>
          )}

          {phase === 'scanning' && (
            <motion.div key="scanning" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}>
              <ScanningAnimation message={scanMessage} />
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center text-gray-400 mt-4">
                Analyzing {currentIndustry?.name.toLowerCase()} leads in <span className="text-white font-medium">{marketArea}</span>...
              </motion.p>
            </motion.div>
          )}

          {phase === 'results' && (
            <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence>
                  {discoveredLeads.map((lead, index) => (
                    <LeadCard key={lead.id} lead={lead} index={index} fieldLabels={fieldLabels} />
                  ))}
                </AnimatePresence>
              </div>
              {discoveredLeads.length === industryLeads[industry]?.length && (
                <>
                  <ResultsSummary leads={discoveredLeads} marketArea={marketArea} industry={industry} />
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="text-center">
                    <Button size="xl" onClick={() => setShowCTA(true)} icon={<Target size={20} />} className="shadow-lg shadow-a7-primary/30">
                      Get Real Leads Like These
                    </Button>
                    <p className="text-gray-500 text-sm mt-3">See how A7 Agents can find leads in your actual market</p>
                  </motion.div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <CTAModal isOpen={showCTA} onClose={() => setShowCTA(false)} />
    </div>
  );
}
