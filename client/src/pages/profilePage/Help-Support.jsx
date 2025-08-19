import React, { useState } from 'react';
import Icon from '../../components/ui/Icon';

const HelpSupport = () => {
  /* --------------------------- local state --------------------------- */
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
    attachments: [],
  });

  /* ------------------------------- data ------------------------------ */
  const faqCategories = [
    { key: 'all', label: 'All Topics', icon: 'book' },
    { key: 'orders', label: 'Orders & Delivery', icon: 'package' },
    { key: 'payments', label: 'Payments & Billing', icon: 'credit-card' },
    { key: 'account', label: 'Account & Profile', icon: 'user' },
    { key: 'technical', label: 'Technical Issues', icon: 'settings' },
    { key: 'restaurants', label: 'Restaurants', icon: 'truck' },
  ];

  const faqs = [
    {
      id: 1,
      category: 'orders',
      question: 'How can I track my order?',
      answer:
        'You can track your order in real-time by going to "My Orders" section in your profile. You\'ll see live updates including when your food is being prepared, picked up, and on its way to you. You\'ll also receive push notifications for major status updates.',
      helpful: 45,
      notHelpful: 3,
    },
    {
      id: 2,
      category: 'orders',
      question: 'What should I do if my order is late?',
      answer:
        'If your order is significantly delayed beyond the estimated delivery time, please contact our support team immediately. We can track your order, contact the restaurant or driver, and provide updates. In case of excessive delays, we may offer compensation or help you reorder.',
      helpful: 38,
      notHelpful: 2,
    },
    {
      id: 3,
      category: 'orders',
      question: 'Can I modify or cancel my order after placing it?',
      answer:
        'You can cancel your order within the first few minutes after placing it, before the restaurant starts preparing it. To cancel, go to your active orders and click "Cancel Order". Modifications are generally not possible once the order is confirmed, but you can contact support for urgent changes.',
      helpful: 52,
      notHelpful: 8,
    },
    {
      id: 4,
      category: 'payments',
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit cards (Visa, Mastercard, American Express), debit cards, PayPal, Apple Pay, Google Pay, and digital wallets. You can save multiple payment methods in your account for faster checkout.',
      helpful: 67,
      notHelpful: 1,
    },
    {
      id: 5,
      category: 'payments',
      question: 'Why was I charged twice for the same order?',
      answer:
        "Double charges are usually temporary authorization holds that will be released within 3-5 business days. If you see two actual charges after this period, please contact our billing support team with your order details, and we'll investigate and resolve the issue immediately.",
      helpful: 29,
      notHelpful: 4,
    },
    {
      id: 6,
      category: 'payments',
      question: 'How do refunds work?',
      answer:
        "Refunds are processed back to your original payment method within 5-7 business days. For cancelled orders, you'll receive a full refund. For issues with delivered orders, refunds are evaluated case-by-case based on our refund policy.",
      helpful: 41,
      notHelpful: 6,
    },
    {
      id: 7,
      category: 'account',
      question: 'How do I reset my password?',
      answer:
        'Click "Forgot Password" on the login page, enter your email address, and we\'ll send you a password reset link. Follow the instructions in the email to create a new password. Make sure to check your spam folder if you don\'t see the email.',
      helpful: 73,
      notHelpful: 2,
    },
    {
      id: 8,
      category: 'account',
      question: 'How can I delete my account?',
      answer:
        'To delete your account, go to Settings > Account > Delete Account. Please note that this action is permanent and will remove all your order history, saved addresses, and payment methods. You can also contact support if you need assistance.',
      helpful: 34,
      notHelpful: 5,
    },
    {
      id: 9,
      category: 'technical',
      question: 'The app is not working properly. What should I do?',
      answer:
        'First, try closing and reopening the app. If issues persist, check if you have the latest app version and update if needed. Clear the app cache or restart your device. If problems continue, contact our technical support team.',
      helpful: 56,
      notHelpful: 7,
    },
    {
      id: 10,
      category: 'restaurants',
      question: 'Why is a restaurant showing as closed when it should be open?',
      answer:
        'Restaurant hours can change due to various factors like holidays, staff shortages, or temporary closures. We update this information as quickly as possible, but there might be brief delays. You can try contacting the restaurant directly or choose an alternative.',
      helpful: 28,
      notHelpful: 9,
    },
  ];

  const supportTickets = [
    {
      id: 'TKT-2024-001',
      subject: 'Order never arrived',
      category: 'orders',
      priority: 'high',
      status: 'resolved',
      createdAt: '2024-01-20T10:30:00Z',
      updatedAt: '2024-01-20T14:45:00Z',
      messages: 3,
    },
    {
      id: 'TKT-2024-002',
      subject: 'Refund request for cancelled order',
      category: 'payments',
      priority: 'medium',
      status: 'in_progress',
      createdAt: '2024-01-19T16:20:00Z',
      updatedAt: '2024-01-21T09:15:00Z',
      messages: 5,
    },
    {
      id: 'TKT-2024-003',
      subject: 'App crashes when placing order',
      category: 'technical',
      priority: 'low',
      status: 'open',
      createdAt: '2024-01-18T14:10:00Z',
      updatedAt: '2024-01-18T14:10:00Z',
      messages: 1,
    },
  ];

  const quickActions = [
    {
      title: 'Track Order',
      description: 'Check current order status',
      icon: 'package',
    },
    {
      title: 'Report Issue',
      description: 'Report a problem with your order',
      icon: 'alert-circle',
    },
    {
      title: 'Account Help',
      description: 'Manage account settings',
      icon: 'user',
    },
    {
      title: 'Payment Issues',
      description: 'Fix billing problems',
      icon: 'credit-card',
    },
  ];

  const contactMethods = [
    {
      type: 'Live Chat',
      description: 'Chat with our support team',
      availability: 'Available 24/7',
      responseTime: 'Typically replies in 2-3 min',
      icon: 'message-circle',
      color: 'bg-mint-green',
      action: () => console.log('Open live chat'),
    },
    {
      type: 'Phone Support',
      description: 'Call us directly',
      availability: 'Mon-Sun • 8 AM-10 PM',
      responseTime: '+1 (555) 123-FOOD',
      icon: 'phone',
      color: 'bg-blue-500',
      action: () => window.open('tel:+15551234663'),
    },
    {
      type: 'Email Support',
      description: 'Send us an email',
      availability: 'We reply within 4-6 h',
      responseTime: 'support@example.com',
      icon: 'mail',
      color: 'bg-purple-500',
      action: () => setShowContactForm(true),
    },
  ];

  /* ---------------------------- helpers ------------------------------ */
  const filteredFaqs = faqs.filter(f => {
    const term = searchTerm.toLowerCase();
    const matches =
      f.question.toLowerCase().includes(term) ||
      f.answer.toLowerCase().includes(term);
    const cat = selectedCategory === 'all' || f.category === selectedCategory;
    return matches && cat;
  });

  const toggleFaq = id => setExpandedFaq(expandedFaq === id ? null : id);

  const handleFeedback = (id, good) =>
    console.log(`FAQ ${id} marked ${good ? 'helpful' : 'not helpful'}`);

  const handleFileAttach = e =>
    setContactForm(f => ({
      ...f,
      attachments: [...f.attachments, ...e.target.files],
    }));

  const handleSubmitTicket = () => {
    console.log('Submit ticket', contactForm);
    setShowContactForm(false);
    setContactForm({
      subject: '',
      category: 'general',
      priority: 'medium',
      message: '',
      attachments: [],
    });
  };

  const statusColor = s =>
    ({
      open: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      in_progress: 'text-blue-600 bg-blue-50 border-blue-200',
      resolved: 'text-mint-green bg-green-50 border-green-200',
    })[s] || 'text-medium-gray bg-gray-50 border-gray-200';

  const priorityBg = p =>
    ({
      high: 'text-red-600 bg-red-50',
      medium: 'text-yellow-600 bg-yellow-50',
      low: 'text-mint-green bg-green-50',
    })[p];

  /* -------------------------- Tab components ------------------------- */
  const FAQTab = () => (
    <div className="space-y-6">
      {/* Quick actions grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map(a => (
          <button
            key={a.title}
            onClick={() => {
              if (a.title === 'Report Issue') setShowContactForm(true);
              if (a.title === 'Account Help') setSelectedCategory('account');
              if (a.title === 'Payment Issues') setSelectedCategory('payments');
              console.log(a.title);
            }}
            className="p-4 bg-white rounded-xl border border-cream hover:border-yellow-400 hover:shadow-lg transition-all text-left group"
          >
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-yellow-200 transition-colors">
              <Icon name={a.icon} className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="font-semibold text-charcoal mb-1">{a.title}</h3>
            <p className="text-sm text-medium-gray">{a.description}</p>
          </button>
        ))}
      </div>

      {/* Search + category filter */}
      <div className="bg-white rounded-2xl shadow-lg border border-cream p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Icon
              name="search"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-medium-gray"
            />
            <input
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search frequently asked questions..."
              className="w-full pl-10 pr-4 py-3 border border-cream rounded-lg focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {faqCategories.map(c => (
              <button
                key={c.key}
                onClick={() => setSelectedCategory(c.key)}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-all border ${
                  selectedCategory === c.key
                    ? 'bg-yellow-400 text-white shadow-lg border-yellow-400'
                    : 'bg-white text-medium-gray border-cream hover:bg-gray-100'
                }`}
              >
                <Icon name={c.icon} className="w-4 h-4" />
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ list */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-cream p-12 text-center">
            <Icon
              name="help-circle"
              className="w-16 h-16 text-medium-gray mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-charcoal mb-2">
              No FAQs found
            </h3>
            <p className="text-medium-gray">
              Try different keywords or another category.
            </p>
          </div>
        ) : (
          filteredFaqs.map(f => (
            <div
              key={f.id}
              className="bg-white rounded-2xl shadow-lg border border-cream overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(f.id)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-medium text-charcoal">{f.question}</h3>
                {expandedFaq === f.id ? (
                  <Icon
                    name="chevron-up"
                    className="w-5 h-5 text-medium-gray"
                  />
                ) : (
                  <Icon
                    name="chevron-down"
                    className="w-5 h-5 text-medium-gray"
                  />
                )}
              </button>
              {expandedFaq === f.id && (
                <div className="px-6 pb-6 space-y-4">
                  <p className="text-medium-gray">{f.answer}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-medium-gray">Was this helpful?</span>
                    <button
                      onClick={() => handleFeedback(f.id, true)}
                      className="flex items-center gap-1 px-3 py-1 bg-mint-green/20 text-mint-green rounded-lg hover:bg-mint-green/30 transition-colors"
                    >
                      <Icon name="thumbs-up" className="w-4 h-4" /> {f.helpful}
                    </button>
                    <button
                      onClick={() => handleFeedback(f.id, false)}
                      className="flex items-center gap-1 px-3 py-1 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-colors"
                    >
                      <Icon name="thumbs-down" className="w-4 h-4" />{' '}
                      {f.notHelpful}
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
      {/* Contact methods */}
      <div className="grid md:grid-cols-3 gap-4">
        {contactMethods.map(m => (
          <button
            key={m.type}
            onClick={m.action}
            className="p-6 bg-white rounded-xl border border-cream hover:border-yellow-400 hover:shadow-lg transition-all text-left"
          >
            <div
              className={`w-12 h-12 ${m.color} rounded-lg flex items-center justify-center mb-3`}
            >
              <Icon name={m.icon} className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-charcoal mb-1">{m.type}</h3>
            <p className="text-sm text-medium-gray">{m.description}</p>
            <p className="text-xs text-medium-gray mt-1">{m.availability}</p>
            <p className="text-xs text-medium-gray">{m.responseTime}</p>
          </button>
        ))}
      </div>

      {/* Contact form modal / inline */}
      {showContactForm && (
        <div className="bg-white rounded-2xl shadow-lg border border-cream p-6 space-y-6">
          <h3 className="text-xl font-bold text-charcoal">Send us a message</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-coffee mb-2">
                Subject
              </label>
              <input
                value={contactForm.subject}
                onChange={e =>
                  setContactForm(f => ({ ...f, subject: e.target.value }))
                }
                className="w-full px-4 py-3 border border-cream rounded-lg focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-coffee mb-2">
                Category
              </label>
              <select
                value={contactForm.category}
                onChange={e =>
                  setContactForm(f => ({ ...f, category: e.target.value }))
                }
                className="w-full px-4 py-3 border border-cream rounded-lg focus:ring-2 focus:ring-yellow-400"
              >
                <option value="general">General</option>
                <option value="orders">Orders</option>
                <option value="payments">Payments</option>
                <option value="technical">Technical</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-coffee mb-2">
                Priority
              </label>
              <select
                value={contactForm.priority}
                onChange={e =>
                  setContactForm(f => ({ ...f, priority: e.target.value }))
                }
                className="w-full px-4 py-3 border border-cream rounded-lg focus:ring-2 focus:ring-yellow-400"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-coffee mb-2">
                Message
              </label>
              <textarea
                value={contactForm.message}
                onChange={e =>
                  setContactForm(f => ({ ...f, message: e.target.value }))
                }
                rows={5}
                className="w-full px-4 py-3 border border-cream rounded-lg focus:ring-2 focus:ring-yellow-400 resize-none"
              />
            </div>
            <div className="md:col-span-2 flex flex-wrap gap-2 items-center">
              <label className="inline-flex items-center gap-2 cursor-pointer text-sm text-coffee">
                <Icon name="paperclip" className="w-4 h-4" />
                <span>Attach files</span>
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileAttach}
                />
              </label>
              {contactForm.attachments.length > 0 && (
                <span className="text-xs text-medium-gray">
                  {contactForm.attachments.length} file(s) attached
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSubmitTicket}
              className="flex items-center gap-2 px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg transition-colors"
            >
              <Icon name="send" className="w-4 h-4" />
              Submit
            </button>
            <button
              onClick={() => setShowContactForm(false)}
              className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const TicketsTab = () => (
    <div className="space-y-4">
      {supportTickets.map(t => (
        <div
          key={t.id}
          className="bg-white rounded-2xl shadow-lg border border-cream p-6 hover:shadow-xl transition-all"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-charcoal flex items-center gap-2">
                {t.subject}
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full border ${statusColor(
                    t.status
                  )}`}
                >
                  {t.status.replace('_', ' ')}
                </span>
              </h3>
              <p className="text-sm text-medium-gray mt-0.5">
                Created: {new Date(t.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-medium-gray">
                Updated: {new Date(t.updatedAt).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <span
                className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${priorityBg(
                  t.priority
                )}`}
              >
                {t.priority}
              </span>
              <p className="text-sm text-medium-gray mt-2">
                {t.messages} messages
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const GuidesTab = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            title: 'Getting Started',
            desc: 'A quick overview of the app features',
            icon: 'file-text',
          },
          {
            title: 'How to Order',
            desc: 'Step-by-step guide to place orders',
            icon: 'video',
          },
          {
            title: 'Manage Payments',
            desc: 'Add, edit, or remove payment methods',
            icon: 'credit-card',
          },
          {
            title: 'Account Security',
            desc: 'Keep your account safe',
            icon: 'shield',
          },
          {
            title: 'App Settings',
            desc: 'Customize your experience',
            icon: 'settings',
          },
          {
            title: 'FAQ Video Playlist',
            desc: 'Watch quick tutorial videos',
            icon: 'video',
          },
        ].map(g => (
          <a
            key={g.title}
            href="#!"
            className="p-6 bg-white rounded-xl border border-cream hover:border-yellow-400 hover:shadow-lg transition-all block group"
          >
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-3">
              <Icon name={g.icon} className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="font-semibold text-charcoal mb-1">{g.title}</h3>
            <p className="text-sm text-medium-gray">{g.desc}</p>
            <Icon
              name="external-link"
              className="w-4 h-4 text-medium-gray mt-3 opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </a>
        ))}
      </div>
    </div>
  );

  /* ------------------------- main component -------------------------- */
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-charcoal">Help & Support</h1>
          <p className="text-medium-gray mt-1">We’re here to help you 24 / 7</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-white rounded-lg p-1 border border-cream">
        {[
          { id: 'faq', label: 'FAQs' },
          { id: 'contact', label: 'Contact Us' },
          { id: 'tickets', label: 'My Tickets' },
          { id: 'guides', label: 'Guides' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === t.id
                ? 'bg-yellow-400 text-white'
                : 'text-medium-gray hover:bg-gray-100'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'faq' && <FAQTab />}
      {activeTab === 'contact' && <ContactTab />}
      {activeTab === 'tickets' && <TicketsTab />}
      {activeTab === 'guides' && <GuidesTab />}
    </div>
  );
};

export default HelpSupport;
