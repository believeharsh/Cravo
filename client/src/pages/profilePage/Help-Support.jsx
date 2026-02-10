import React, { useState } from 'react';
import {
  Search,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Phone,
  Mail,
  Package,
  AlertCircle,
  User,
  CreditCard,
  Send,
  X,
  HelpCircle,
  FileText,
  Video,
  Shield,
  Settings,
  ExternalLink,
  Paperclip,
} from 'lucide-react';

const HelpSupport = () => {
  const [activeTab, setActiveTab] = useState('faq');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    subject: '',
    category: 'general',
    priority: 'medium',
    message: '',
  });

  const faqCategories = [
    { key: 'all', label: 'All Topics', icon: FileText },
    { key: 'orders', label: 'Orders', icon: Package },
    { key: 'payments', label: 'Payments', icon: CreditCard },
    { key: 'account', label: 'Account', icon: User },
    { key: 'technical', label: 'Technical', icon: Settings },
  ];

  const faqs = [
    {
      id: 1,
      category: 'orders',
      question: 'How can I track my order?',
      answer:
        'You can track your order in real-time by going to "My Orders" section. You\'ll see live updates and receive notifications for major status changes.',
      helpful: 45,
      notHelpful: 3,
    },
    {
      id: 2,
      category: 'orders',
      question: 'What should I do if my order is late?',
      answer:
        'If your order is delayed beyond the estimated time, contact our support team. We can track your order and provide updates or compensation if needed.',
      helpful: 38,
      notHelpful: 2,
    },
    {
      id: 3,
      category: 'orders',
      question: 'Can I modify or cancel my order?',
      answer:
        'You can cancel within the first few minutes after placing it. Go to active orders and click "Cancel Order". Modifications aren\'t possible once confirmed.',
      helpful: 52,
      notHelpful: 8,
    },
    {
      id: 4,
      category: 'payments',
      question: 'What payment methods do you accept?',
      answer:
        'We accept credit/debit cards, UPI, net banking, and digital wallets. You can save multiple payment methods for faster checkout.',
      helpful: 67,
      notHelpful: 1,
    },
    {
      id: 5,
      category: 'payments',
      question: 'How do refunds work?',
      answer:
        'Refunds are processed to your original payment method within 5-7 business days. Cancelled orders get full refunds.',
      helpful: 41,
      notHelpful: 6,
    },
    {
      id: 6,
      category: 'account',
      question: 'How do I reset my password?',
      answer:
        'Click "Forgot Password" on the login page, enter your email, and we\'ll send you a reset link. Check spam if you don\'t see it.',
      helpful: 73,
      notHelpful: 2,
    },
    {
      id: 7,
      category: 'technical',
      question: 'The app is not working properly',
      answer:
        'Try closing and reopening the app. Check for updates and clear the cache. If issues persist, contact our support team.',
      helpful: 56,
      notHelpful: 7,
    },
  ];

  const quickActions = [
    { title: 'Track Order', description: 'Check order status', icon: Package },
    {
      title: 'Report Issue',
      description: 'Report a problem',
      icon: AlertCircle,
    },
    { title: 'Account Help', description: 'Manage settings', icon: User },
    {
      title: 'Payment Issues',
      description: 'Fix billing problems',
      icon: CreditCard,
    },
  ];

  const contactMethods = [
    {
      type: 'Live Chat',
      description: 'Chat with our team',
      availability: 'Available 24/7',
      time: '2-3 min response',
      icon: MessageCircle,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      type: 'Phone Support',
      description: 'Call us directly',
      availability: 'Mon-Sun • 8 AM-10 PM',
      time: '+91 555-1234-FOOD',
      icon: Phone,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      type: 'Email Support',
      description: 'Send us an email',
      availability: 'Reply within 4-6 hours',
      time: 'support@carve.com',
      icon: Mail,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
  ];

  const supportTickets = [
    {
      id: 'TKT-001',
      subject: 'Order never arrived',
      category: 'orders',
      status: 'resolved',
      priority: 'high',
      createdAt: '2024-01-20',
      messages: 3,
    },
    {
      id: 'TKT-002',
      subject: 'Refund request',
      category: 'payments',
      status: 'in_progress',
      priority: 'medium',
      createdAt: '2024-01-19',
      messages: 5,
    },
  ];

  const guides = [
    {
      title: 'Getting Started',
      desc: 'Quick overview of features',
      icon: FileText,
    },
    { title: 'How to Order', desc: 'Step-by-step guide', icon: Video },
    {
      title: 'Manage Payments',
      desc: 'Add/edit payment methods',
      icon: CreditCard,
    },
    { title: 'Account Security', desc: 'Keep your account safe', icon: Shield },
    {
      title: 'App Settings',
      desc: 'Customize your experience',
      icon: Settings,
    },
    { title: 'Video Tutorials', desc: 'Watch quick tutorials', icon: Video },
  ];

  const filteredFaqs = faqs.filter(f => {
    const term = searchTerm.toLowerCase();
    const matches =
      f.question.toLowerCase().includes(term) ||
      f.answer.toLowerCase().includes(term);
    const cat = selectedCategory === 'all' || f.category === selectedCategory;
    return matches && cat;
  });

  const getStatusStyle = status => {
    const styles = {
      open: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-blue-100 text-blue-800',
      resolved: 'bg-green-100 text-green-800',
    };
    return styles[status] || 'bg-gray-100 text-text-main';
  };

  const getPriorityStyle = priority => {
    const styles = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800',
    };
    return styles[priority] || 'bg-gray-100 text-text-main';
  };

  const FAQTab = () => (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map(action => {
          const Icon = action.icon;
          return (
            <button
              key={action.title}
              onClick={() => {
                if (action.title === 'Report Issue') setShowContactForm(true);
              }}
              className="p-4 bg-white rounded-2xl border border-border hover:border-border-focus hover:shadow-lg transition-all text-left group"
            >
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-3 group-hover:bg-yellow-200 transition-colors">
                <Icon className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-bold text-text-main text-sm mb-1">
                {action.title}
              </h3>
              <p className="text-xs text-text-secondary">{action.description}</p>
            </button>
          );
        })}
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl border border-border p-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search frequently asked questions..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {faqCategories.map(cat => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                  selectedCategory === cat.key
                    ? 'bg-primary text-text-main shadow-lg'
                    : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* FAQ List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-border p-12 text-center">
            <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-text-main mb-2">
              No FAQs found
            </h3>
            <p className="text-text-secondary">
              Try different keywords or another category
            </p>
          </div>
        ) : (
          filteredFaqs.map(faq => (
            <div
              key={faq.id}
              className="bg-white rounded-2xl border border-border overflow-hidden"
            >
              <button
                onClick={() =>
                  setExpandedFaq(expandedFaq === faq.id ? null : faq.id)
                }
                className="w-full p-5 flex items-center justify-between text-left hover:bg-bg-subtle transition-colors"
              >
                <h3 className="font-semibold text-text-main pr-4">
                  {faq.question}
                </h3>
                {expandedFaq === faq.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>

              {expandedFaq === faq.id && (
                <div className="px-5 pb-5 border-t border-gray-100">
                  <p className="text-text-secondary mt-4 leading-relaxed">
                    {faq.answer}
                  </p>
                  <div className="flex items-center gap-3 mt-4">
                    <span className="text-sm text-text-secondary">
                      Was this helpful?
                    </span>
                    <button className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium">
                      <ThumbsUp className="w-4 h-4" />
                      {faq.helpful}
                    </button>
                    <button className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium">
                      <ThumbsDown className="w-4 h-4" />
                      {faq.notHelpful}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );

  const ContactTab = () => (
    <div className="space-y-6">
      {/* Contact Methods */}
      <div className="grid md:grid-cols-3 gap-4">
        {contactMethods.map(method => {
          const Icon = method.icon;
          return (
            <button
              key={method.type}
              onClick={() =>
                method.type === 'Email Support' && setShowContactForm(true)
              }
              className="p-6 bg-white rounded-2xl border border-border hover:border-border-focus hover:shadow-lg transition-all text-left"
            >
              <div
                className={`w-14 h-14 ${method.bgColor} rounded-xl flex items-center justify-center mb-4`}
              >
                <Icon className={`w-7 h-7 ${method.iconColor}`} />
              </div>
              <h3 className="font-bold text-text-main mb-2">{method.type}</h3>
              <p className="text-sm text-text-secondary mb-3">{method.description}</p>
              <p className="text-xs text-text-muted">{method.availability}</p>
              <p className="text-xs font-semibold text-text-main mt-1">
                {method.time}
              </p>
            </button>
          );
        })}
      </div>

      {/* Contact Form */}
      {showContactForm && (
        <div className="bg-white rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-text-main">
              Send us a message
            </h3>
            <button
              onClick={() => setShowContactForm(false)}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5 text-text-secondary" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-text-main mb-2">
                Subject
              </label>
              <input
                value={contactForm.subject}
                onChange={e =>
                  setContactForm({ ...contactForm, subject: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                placeholder="Brief description of your issue"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-text-main mb-2">
                  Category
                </label>
                <select
                  value={contactForm.category}
                  onChange={e =>
                    setContactForm({ ...contactForm, category: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                >
                  <option value="general">General</option>
                  <option value="orders">Orders</option>
                  <option value="payments">Payments</option>
                  <option value="technical">Technical</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-main mb-2">
                  Priority
                </label>
                <select
                  value={contactForm.priority}
                  onChange={e =>
                    setContactForm({ ...contactForm, priority: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-main mb-2">
                Message
              </label>
              <textarea
                value={contactForm.message}
                onChange={e =>
                  setContactForm({ ...contactForm, message: e.target.value })
                }
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
                placeholder="Describe your issue in detail..."
              />
            </div>

            <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-text-main font-bold rounded-xl transition-colors">
              <Send className="w-4 h-4" />
              Submit Request
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const TicketsTab = () => (
    <div className="space-y-4">
      {supportTickets.map(ticket => (
        <div
          key={ticket.id}
          className="bg-white rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-text-main">{ticket.subject}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(ticket.status)}`}
                >
                  {ticket.status.replace('_', ' ')}
                </span>
              </div>
              <p className="text-sm text-text-secondary">
                Created: {new Date(ticket.createdAt).toLocaleDateString()} •{' '}
                {ticket.messages} messages
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityStyle(ticket.priority)}`}
            >
              {ticket.priority}
            </span>
          </div>
        </div>
      ))}

      {supportTickets.length === 0 && (
        <div className="bg-white rounded-2xl border border-border p-12 text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-text-main mb-2">
            No support tickets
          </h3>
          <p className="text-text-secondary">
            You haven't created any support tickets yet
          </p>
        </div>
      )}
    </div>
  );

  const GuidesTab = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {guides.map(guide => {
        const Icon = guide.icon;
        return (
          <a
            key={guide.title}
            href="#"
            className="group p-6 bg-white rounded-2xl border border-border hover:border-border-focus hover:shadow-lg transition-all"
          >
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-yellow-200 transition-colors">
              <Icon className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="font-bold text-text-main mb-2">{guide.title}</h3>
            <p className="text-sm text-text-secondary mb-3">{guide.desc}</p>
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-yellow-600 transition-colors" />
          </a>
        );
      })}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-main">Help & Support</h1>
        <p className="text-text-secondary mt-1">We're here to help you 24/7</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { id: 'faq', label: 'FAQs' },
          { id: 'contact', label: 'Contact Us' },
          { id: 'tickets', label: 'My Tickets' },
          { id: 'guides', label: 'Guides' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2.5 rounded-xl font-semibold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-primary text-text-main shadow-lg'
                : 'bg-white text-text-secondary border border-border hover:bg-bg-subtle'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'faq' && <FAQTab />}
      {activeTab === 'contact' && <ContactTab />}
      {activeTab === 'tickets' && <TicketsTab />}
      {activeTab === 'guides' && <GuidesTab />}
    </div>
  );
};

export default HelpSupport;
