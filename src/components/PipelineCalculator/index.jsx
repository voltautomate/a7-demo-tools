import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calculator,
  DollarSign,
  Users,
  TrendingUp,
  Calendar,
  Target,
  Sparkles,
  ChevronDown,
  Mail,
  Home,
  Stethoscope,
  HardHat,
  Shield,
  Scale,
  Landmark,
} from 'lucide-react';
import { Button, Card, Modal, Input } from '../common';

// Industry data with conversion rates
const industries = [
  { id: 'real-estate', name: 'Real Estate', icon: Home, reactivationRate: 0.12, conversionRate: 0.08 },
  { id: 'healthcare', name: 'Healthcare', icon: Stethoscope, reactivationRate: 0.14, conversionRate: 0.10 },
  { id: 'construction', name: 'Construction', icon: HardHat, reactivationRate: 0.11, conversionRate: 0.09 },
  { id: 'insurance', name: 'Insurance', icon: Shield, reactivationRate: 0.15, conversionRate: 0.07 },
  { id: 'legal', name: 'Legal', icon: Scale, reactivationRate: 0.10, conversionRate: 0.12 },
  { id: 'finance', name: 'Finance', icon: Landmark, reactivationRate: 0.13, conversionRate: 0.11 },
];

function EditableSlider({ label, value, onChange, min, max, step = 1, format = (v) => v, parse, icon: Icon }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value.toString());
  const percentage = ((value - min) / (max - min)) * 100;

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    let parsed = parse ? parse(inputValue) : parseInt(inputValue.replace(/[^0-9]/g, ''), 10);
    if (isNaN(parsed)) parsed = min;
    parsed = Math.max(min, Math.min(max, parsed));
    // Round to nearest step
    parsed = Math.round(parsed / step) * step;
    onChange(parsed);
    setInputValue(parsed.toString());
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleInputBlur();
    }
    if (e.key === 'Escape') {
      setInputValue(value.toString());
      setIsEditing(false);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {Icon && <Icon size={18} className="text-a7-primary" />}
          <span className="text-sm font-medium text-gray-300">{label}</span>
        </div>
        {isEditing ? (
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            autoFocus
            className="w-32 px-2 py-1 text-lg font-bold text-white text-right bg-a7-dark-700 border border-a7-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-a7-primary"
          />
        ) : (
          <button
            onClick={() => {
              setInputValue(value.toString());
              setIsEditing(true);
            }}
            className="text-lg font-bold text-white hover:text-a7-accent transition-colors cursor-text border-b border-transparent hover:border-a7-accent"
          >
            {format(value)}
          </button>
        )}
      </div>
      <div className="relative">
        <div className="h-2 bg-a7-dark-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-a7-primary to-a7-secondary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-lg shadow-a7-primary/30 border-2 border-a7-primary pointer-events-none"
          style={{ left: `calc(${percentage}% - 10px)` }}
        />
      </div>
      <div className="flex justify-between mt-1 text-xs text-gray-500">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}

function SelectDropdown({ label, value, onChange, options, icon: Icon }) {
  const [isOpen, setIsOpen] = useState(false);
  const selected = options.find((o) => o.id === value);

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        {Icon && <Icon size={18} className="text-a7-primary" />}
        <span className="text-sm font-medium text-gray-300">{label}</span>
      </div>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 rounded-xl bg-a7-dark-700/50 border border-a7-dark-500 text-white text-left flex items-center justify-between hover:border-a7-primary/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            {selected?.icon && <selected.icon size={18} className="text-gray-400" />}
            <span>{selected?.name || 'Select...'}</span>
          </div>
          <ChevronDown size={18} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute z-10 w-full mt-2 py-2 bg-a7-dark-700 border border-a7-dark-500 rounded-xl shadow-xl max-h-64 overflow-y-auto"
          >
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  onChange(option.id);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-left hover:bg-a7-dark-600 transition-colors flex items-center gap-2 ${
                  option.id === value ? 'text-a7-primary' : 'text-gray-300'
                }`}
              >
                {option.icon && <option.icon size={16} />}
                {option.name}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

function ResultCard({ label, value, subtitle, icon: Icon, color = 'primary', delay = 0 }) {
  const colors = {
    primary: 'from-a7-primary/20 to-a7-secondary/20 border-a7-primary/30',
    success: 'from-a7-success/20 to-emerald-400/20 border-a7-success/30',
    accent: 'from-a7-accent/20 to-cyan-400/20 border-a7-accent/30',
    warning: 'from-a7-warning/20 to-orange-400/20 border-a7-warning/30',
  };

  const iconColors = {
    primary: 'text-a7-primary',
    success: 'text-a7-success',
    accent: 'text-a7-accent',
    warning: 'text-a7-warning',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 200 }}
    >
      <Card variant="glass" padding="md" className={`bg-gradient-to-br ${colors[color]} text-center`}>
        <div className={`inline-flex p-2 rounded-lg bg-a7-dark-800/50 mb-3 ${iconColors[color]}`}>
          <Icon size={20} />
        </div>
        <p className="text-2xl md:text-3xl font-bold text-white mb-1">{value}</p>
        <p className="text-sm text-gray-400">{label}</p>
        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
      </Card>
    </motion.div>
  );
}

function AnimatedBar({ label, value, maxValue, color, delay = 0 }) {
  const percentage = Math.min((value / maxValue) * 100, 100);

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay }} className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm text-gray-400">{label}</span>
        <span className="text-sm font-medium text-white">{value.toLocaleString()}</span>
      </div>
      <div className="h-3 bg-a7-dark-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ delay: delay + 0.2, duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}

const BOOKING_URL = 'https://calendly.com/team-a7agents/30min';

function CTAModal({ isOpen, onClose, projectedRevenue }) {
  const handleBookCall = () => {
    window.open(BOOKING_URL, '_blank');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Unlock Your Pipeline's Potential" size="md">
      <div className="text-center mb-6">
        <p className="text-3xl font-bold text-a7-primary mb-2">{projectedRevenue}</p>
        <p className="text-gray-400">in potential recovered revenue</p>
      </div>
      <p className="text-gray-400 mb-6 text-center">See how A7 Agents can reactivate your dormant leads and turn them into closed deals.</p>
      <Button onClick={handleBookCall} size="lg" className="w-full" icon={<Calendar size={18} />}>Book Strategy Call</Button>
      <p className="text-center text-xs text-gray-500 mt-4">Free 15-min consultation. No commitment required.</p>
    </Modal>
  );
}

export default function PipelineCalculator({ onBack }) {
  const [databaseSize, setDatabaseSize] = useState(2500);
  const [avgDealValue, setAvgDealValue] = useState(15000);
  const [industry, setIndustry] = useState('real-estate');
  const [showCTA, setShowCTA] = useState(false);

  const selectedIndustry = industries.find((i) => i.id === industry);

  const calculations = useMemo(() => {
    const { reactivationRate, conversionRate } = selectedIndustry;

    const dormantLeads = Math.round(databaseSize * 0.7);
    const reactivatedLeads = Math.round(dormantLeads * reactivationRate);
    const qualifiedLeads = Math.round(reactivatedLeads * 0.6);
    const closedDeals = Math.round(qualifiedLeads * conversionRate);
    const projectedRevenue = closedDeals * avgDealValue;
    const monthlyRevenue = Math.round(projectedRevenue / 12);

    return {
      dormantLeads,
      reactivatedLeads,
      qualifiedLeads,
      closedDeals,
      projectedRevenue,
      monthlyRevenue,
      reactivationRate: Math.round(reactivationRate * 100),
      conversionRate: Math.round(conversionRate * 100),
    };
  }, [databaseSize, avgDealValue, selectedIndustry]);

  const formatCurrency = (value) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value.toLocaleString()}`;
  };

  const formatNumber = (value) => value.toLocaleString();

  return (
    <div className="min-h-screen bg-a7-dark-900 bg-grid">
      <div className="fixed inset-0 bg-gradient-radial from-a7-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack} icon={<ArrowLeft size={18} />}>Back</Button>
        </div>

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-a7-primary/10 border border-a7-primary/30 mb-4">
            <Calculator size={16} className="text-a7-primary" />
            <span className="text-sm text-a7-primary font-medium">Pipeline Reactivation Calculator</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Calculate Your Hidden Revenue</h1>
          <p className="text-gray-400 max-w-xl mx-auto">See how much revenue is sitting dormant in your database and how A7 Agents can help you recover it.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Card variant="glass" padding="lg">
              <h3 className="text-lg font-semibold text-white mb-2">Your Numbers</h3>
              <p className="text-sm text-gray-500 mb-6">Click on values to edit directly</p>

              <EditableSlider
                label="Database Size (Contacts)"
                value={databaseSize}
                onChange={setDatabaseSize}
                min={500}
                max={50000}
                step={500}
                format={formatNumber}
                icon={Users}
              />

              <EditableSlider
                label="Average Deal Value"
                value={avgDealValue}
                onChange={setAvgDealValue}
                min={1000}
                max={500000}
                step={1000}
                format={(v) => `$${v.toLocaleString()}`}
                parse={(v) => parseInt(v.replace(/[^0-9]/g, ''), 10)}
                icon={DollarSign}
              />

              <SelectDropdown
                label="Industry"
                value={industry}
                onChange={setIndustry}
                options={industries}
                icon={Target}
              />

              <div className="mt-6 p-4 rounded-xl bg-a7-dark-700/50 border border-a7-dark-600">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={16} className="text-a7-warning" />
                  <span className="text-sm font-medium text-white">Industry Benchmarks</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Reactivation Rate</p>
                    <p className="text-white font-medium">{calculations.reactivationRate}%</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Conversion Rate</p>
                    <p className="text-white font-medium">{calculations.conversionRate}%</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-6">
            <Card variant="gradient" padding="lg" className="border-a7-primary/30 text-center">
              <p className="text-gray-400 mb-2">Projected Annual Revenue Recovery</p>
              <motion.p key={calculations.projectedRevenue} initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-4xl md:text-5xl font-bold text-a7-primary mb-2">
                {formatCurrency(calculations.projectedRevenue)}
              </motion.p>
              <p className="text-gray-500">~{formatCurrency(calculations.monthlyRevenue)}/month</p>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <ResultCard label="Dormant Leads" value={calculations.dormantLeads.toLocaleString()} subtitle="In your database" icon={Users} color="primary" delay={0.1} />
              <ResultCard label="Reactivated" value={calculations.reactivatedLeads.toLocaleString()} subtitle="Re-engaged contacts" icon={TrendingUp} color="primary" delay={0.2} />
              <ResultCard label="Qualified" value={calculations.qualifiedLeads.toLocaleString()} subtitle="Sales-ready leads" icon={Target} color="primary" delay={0.3} />
              <ResultCard label="Closed Deals" value={calculations.closedDeals.toLocaleString()} subtitle="Projected conversions" icon={DollarSign} color="primary" delay={0.4} />
            </div>

            <Card variant="glass" padding="md">
              <h4 className="text-sm font-medium text-gray-400 mb-4">Pipeline Funnel</h4>
              <AnimatedBar label="Total Database" value={databaseSize} maxValue={databaseSize} color="bg-gray-500" delay={0} />
              <AnimatedBar label="Dormant Leads" value={calculations.dormantLeads} maxValue={databaseSize} color="bg-a7-primary/60" delay={0.1} />
              <AnimatedBar label="Reactivated" value={calculations.reactivatedLeads} maxValue={databaseSize} color="bg-a7-primary/80" delay={0.2} />
              <AnimatedBar label="Qualified" value={calculations.qualifiedLeads} maxValue={databaseSize} color="bg-a7-primary" delay={0.3} />
              <AnimatedBar label="Projected Closes" value={calculations.closedDeals} maxValue={databaseSize} color="bg-a7-secondary" delay={0.4} />
            </Card>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-center mt-10">
          <Button size="xl" variant="primary" onClick={() => setShowCTA(true)} icon={<TrendingUp size={20} />} className="shadow-lg shadow-a7-primary/30">
            Start Recovering This Revenue
          </Button>
          <p className="text-gray-500 text-sm mt-3">Get a custom analysis for your specific database</p>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-center text-xs text-gray-600 mt-8">
          * Projections based on industry averages. Actual results may vary based on data quality and engagement history.
        </motion.p>
      </div>

      <CTAModal isOpen={showCTA} onClose={() => setShowCTA(false)} projectedRevenue={formatCurrency(calculations.projectedRevenue)} />
    </div>
  );
}
