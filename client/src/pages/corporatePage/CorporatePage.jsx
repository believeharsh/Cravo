import React, { useState } from 'react';
import {
  Users,
  CreditCard,
  BarChart3,
  Settings,
  Shield,
  Headphones,
  Coffee,
  UsersRound,
  Clock,
  Gift,
  CheckCircle,
  ArrowRight,
  Play,
  Building2,
  TrendingUp,
  Truck,
  X,
  Sparkles,
} from 'lucide-react';

const CorporatePage = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    employeeCount: '',
    message: '',
  });

  const corporateFeatures = [
    {
      icon: Users,
      title: 'Employee Management',
      description:
        'Easy employee onboarding with bulk invitations and role-based access controls.',
    },
    {
      icon: CreditCard,
      title: 'Centralized Billing',
      description:
        'Single invoice for all orders with detailed reporting and expense tracking.',
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description:
        'Comprehensive insights into ordering patterns, spending, and employee preferences.',
    },
    {
      icon: Settings,
      title: 'Custom Policies',
      description:
        'Set spending limits, approved restaurants, and ordering time restrictions.',
    },
    {
      icon: Shield,
      title: 'Security & Compliance',
      description:
        'Enterprise-grade security with SOC 2 compliance and data protection.',
    },
    {
      icon: Headphones,
      title: 'Dedicated Support',
      description:
        '24/7 priority support with dedicated account manager for enterprise clients.',
    },
  ];

  const pricingPlans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for small teams',
      employees: 'Up to 25 employees',
      features: [
        'Basic employee management',
        'Monthly spending reports',
        'Email support',
        'Standard delivery',
        'Basic analytics',
      ],
      popular: false,
    },
    {
      id: 'standard',
      name: 'Standard',
      price: '₹8,999',
      description: 'Great for growing companies',
      employees: 'Up to 100 employees',
      features: [
        'Advanced employee management',
        'Real-time analytics',
        'Priority support',
        'Custom spending limits',
        'Bulk ordering',
        'API access',
      ],
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations',
      employees: 'Unlimited employees',
      features: [
        'Everything in Standard',
        'Dedicated account manager',
        'Custom integrations',
        'Advanced reporting',
        'SLA guarantee',
        'White-label options',
      ],
      popular: false,
    },
  ];

  const testimonials = [
    {
      company: 'TechCorp Inc.',
      testimonial:
        'Carve has transformed our office meal experience. The corporate dashboard gives us complete visibility into our food spending.',
      author: 'Sarah Johnson',
      position: 'HR Director',
      employees: '500+ employees',
      savings: '30% cost reduction',
    },
    {
      company: 'StartupXYZ',
      testimonial:
        'The employee management features are fantastic. We can easily onboard new team members and track meal allowances.',
      author: 'Mike Chen',
      position: 'Operations Manager',
      employees: '150+ employees',
      savings: '25% time saved',
    },
    {
      company: 'Global Solutions',
      testimonial:
        'Outstanding support and analytics. The insights help us make better decisions about our employee benefits program.',
      author: 'Emily Rodriguez',
      position: 'Benefits Manager',
      employees: '1000+ employees',
      savings: '40% efficiency gain',
    },
  ];

  const stats = [
    { label: 'Corporate Clients', value: '500+', icon: Building2 },
    { label: 'Employees Served', value: '50K+', icon: Users },
    { label: 'Orders Delivered', value: '2M+', icon: Truck },
    { label: 'Cost Savings', value: '35%', icon: TrendingUp },
  ];

  const useCases = [
    {
      icon: Coffee,
      title: 'Daily Meals',
      description:
        'Provide breakfast, lunch, and dinner options for your employees with flexible meal allowances.',
    },
    {
      icon: UsersRound,
      title: 'Team Events',
      description:
        'Order catering for meetings, celebrations, and team building events with bulk ordering features.',
    },
    {
      icon: Clock,
      title: 'Late Night Work',
      description:
        'Support employees working late with extended ordering hours and priority delivery.',
    },
    {
      icon: Gift,
      title: 'Employee Perks',
      description:
        'Enhance your benefits package with meal credits and special occasion treats.',
    },
  ];

  const handleContactSubmit = e => {
    e.preventDefault();
    console.log('Contact submitted:', contactForm);
    setShowContactForm(false);
    setContactForm({
      companyName: '',
      contactName: '',
      email: '',
      phone: '',
      employeeCount: '',
      message: '',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary-hover/10 rounded-full blur-3xl"></div>
        </div>

        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          ></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-xl border border-border-focus/30 text-yellow-400 px-5 py-2.5 rounded-full text-sm font-bold mb-8 shadow-lg">
              <Building2 className="w-4 h-4" />
              Corporate Solutions
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Feed Your Team,</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-primary-hover">
                Fuel Success
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Streamline your corporate food ordering with our comprehensive
              platform. Manage employees, track spending, and boost
              productivity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                onClick={() => setShowContactForm(true)}
                className="group bg-primary hover:bg-primary-hover text-text-main font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
              >
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group border-2 border-white/30 backdrop-blur-xl text-white hover:bg-white hover:text-text-main font-bold px-8 py-4 rounded-2xl transition-all flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={i}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                  >
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-6 h-6 text-text-main" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-gray-400 text-sm font-medium">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-bold mb-4">
            <Sparkles className="w-4 h-4" />
            Powerful Features
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-text-main mb-4">
            Everything You Need for Corporate Food Management
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Our platform is designed specifically for businesses to manage
            employee meals efficiently and cost-effectively.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {corporateFeatures.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="group bg-white rounded-2xl border border-border p-8 hover:shadow-2xl hover:border-border-focus transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-primary-hover rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <Icon className="w-8 h-8 text-text-main" />
                </div>
                <h3 className="text-xl font-bold text-text-main mb-3">
                  {feature.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Use Cases */}
      <div className="bg-bg-subtle py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-main mb-4">
              Perfect for Every Occasion
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              From daily meals to special events, we've got your corporate food
              needs covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, i) => {
              const Icon = useCase.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-border p-6 text-center hover:shadow-xl transition-all"
                >
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-bold text-text-main mb-2">
                    {useCase.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {useCase.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-text-main mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Flexible pricing options to fit your company size and needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map(plan => (
            <div
              key={plan.id}
              className={`bg-white rounded-3xl border-2 p-8 relative hover:shadow-2xl transition-all ${
                plan.popular
                  ? 'border-border-focus shadow-xl scale-105'
                  : 'border-border'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-yellow-400 to-primary-hover text-text-main px-5 py-2 rounded-full text-sm font-bold shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-text-main mb-2">
                  {plan.name}
                </h3>
                <p className="text-text-secondary mb-6">{plan.description}</p>
                <div className="mb-4">
                  <span className="text-5xl font-bold text-text-main">
                    {plan.price}
                  </span>
                  {plan.price !== 'Free' && plan.price !== 'Custom' && (
                    <span className="text-text-secondary">/month</span>
                  )}
                </div>
                <p className="text-sm font-semibold text-text-secondary">
                  {plan.employees}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setShowContactForm(true)}
                className={`w-full py-4 rounded-2xl font-bold transition-all ${
                  plan.popular
                    ? 'bg-primary hover:bg-primary-hover text-text-main shadow-lg hover:shadow-xl'
                    : 'bg-gray-100 hover:bg-gray-200 text-text-main'
                }`}
              >
                {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-bg-subtle py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-main mb-4">
              Trusted by Leading Companies
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Join hundreds of satisfied HR and operations teams who rely on us
              every day.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-border p-8 hover:shadow-xl transition-all"
              >
                <div className="mb-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, idx) => (
                      <div
                        key={idx}
                        className="w-5 h-5 bg-primary rounded-full"
                      ></div>
                    ))}
                  </div>
                  <p className="text-text-secondary leading-relaxed mb-6">
                    "{testimonial.testimonial}"
                  </p>
                </div>

                <div className="border-t border-border pt-6">
                  <p className="font-bold text-text-main mb-1">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-text-secondary mb-1">
                    {testimonial.position}
                  </p>
                  <p className="text-sm font-semibold text-text-main">
                    {testimonial.company}
                  </p>
                  <div className="flex items-center justify-between mt-4 text-sm">
                    <span className="text-text-secondary">
                      {testimonial.employees}
                    </span>
                    <span className="text-green-600 font-semibold">
                      {testimonial.savings}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-yellow-400 to-primary-hover rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-bold text-text-main mb-6">
              Ready to Supercharge Your Team Meals?
            </h2>
            <p className="text-xl text-text-main mb-8 max-w-2xl mx-auto">
              Get a personalized demo or start for free in minutes.
            </p>
            <button
              onClick={() => setShowContactForm(true)}
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold px-10 py-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
            >
              Contact Sales
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowContactForm(false)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-text-secondary hover:text-text-main transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-3xl font-bold text-text-main mb-2">
              Let's Talk
            </h3>
            <p className="text-text-secondary mb-8">
              Fill out the form and our team will get back to you within 24
              hours.
            </p>

            <div className="space-y-5">
              <input
                className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                placeholder="Company Name"
                value={contactForm.companyName}
                onChange={e =>
                  setContactForm({
                    ...contactForm,
                    companyName: e.target.value,
                  })
                }
              />

              <div className="grid md:grid-cols-2 gap-5">
                <input
                  className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                  placeholder="Contact Name"
                  value={contactForm.contactName}
                  onChange={e =>
                    setContactForm({
                      ...contactForm,
                      contactName: e.target.value,
                    })
                  }
                />
                <input
                  type="email"
                  className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                  placeholder="Email"
                  value={contactForm.email}
                  onChange={e =>
                    setContactForm({ ...contactForm, email: e.target.value })
                  }
                />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <input
                  className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                  placeholder="Phone Number"
                  value={contactForm.phone}
                  onChange={e =>
                    setContactForm({ ...contactForm, phone: e.target.value })
                  }
                />
                <input
                  type="number"
                  className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                  placeholder="Number of Employees"
                  value={contactForm.employeeCount}
                  onChange={e =>
                    setContactForm({
                      ...contactForm,
                      employeeCount: e.target.value,
                    })
                  }
                />
              </div>

              <textarea
                rows={4}
                className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none transition-all"
                placeholder="How can we help your organization?"
                value={contactForm.message}
                onChange={e =>
                  setContactForm({ ...contactForm, message: e.target.value })
                }
              />

              <button
                onClick={handleContactSubmit}
                className="w-full py-4 bg-primary hover:bg-primary-hover text-text-main font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                Submit Request
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CorporatePage;
