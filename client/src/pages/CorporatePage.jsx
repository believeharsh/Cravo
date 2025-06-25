import React, { useState } from "react";
import {
  Building2,
  Users,
  Clock,
  Shield,
  TrendingUp,
  Award,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Truck,
  BarChart3,
  Settings,
  Globe,
  Star,
  Target,
  Zap,
  Heart,
  Coffee,
  Utensils,
  PieChart,
  FileText,
  Download,
  Play,
  ChevronRight,
  MapPin,
  CreditCard,
  Headphones,
  Briefcase,
  Gift,
  Users2,
  Building,
  Factory,
} from "lucide-react";
import Footer from "../components/Footer";
import CorporateNavigation from "../components/CorporatePage/CorporateNavigation";

const CorporatePage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPlan, setSelectedPlan] = useState("standard");
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    employeeCount: "",
    message: "",
  });

  const corporateFeatures = [
    {
      icon: Users,
      title: "Employee Management",
      description:
        "Easy employee onboarding with bulk invitations and role-based access controls.",
    },
    {
      icon: CreditCard,
      title: "Centralized Billing",
      description:
        "Single invoice for all orders with detailed reporting and expense tracking.",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description:
        "Comprehensive insights into ordering patterns, spending, and employee preferences.",
    },
    {
      icon: Settings,
      title: "Custom Policies",
      description:
        "Set spending limits, approved restaurants, and ordering time restrictions.",
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      description:
        "Enterprise-grade security with SOC 2 compliance and data protection.",
    },
    {
      icon: Headphones,
      title: "Dedicated Support",
      description:
        "24/7 priority support with dedicated account manager for enterprise clients.",
    },
  ];

  const pricingPlans = [
    {
      id: "starter",
      name: "Starter",
      price: "Free",
      description: "Perfect for small teams",
      employees: "Up to 25 employees",
      features: [
        "Basic employee management",
        "Monthly spending reports",
        "Email support",
        "Standard delivery",
        "Basic analytics",
      ],
      popular: false,
    },
    {
      id: "standard",
      name: "Standard",
      price: "$99",
      description: "Great for growing companies",
      employees: "Up to 100 employees",
      features: [
        "Advanced employee management",
        "Real-time analytics",
        "Priority support",
        "Custom spending limits",
        "Bulk ordering",
        "API access",
      ],
      popular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations",
      employees: "Unlimited employees",
      features: [
        "Everything in Standard",
        "Dedicated account manager",
        "Custom integrations",
        "Advanced reporting",
        "SLA guarantee",
        "White-label options",
      ],
      popular: false,
    },
  ];

  const testimonials = [
    {
      company: "TechCorp Inc.",
      logo: "/api/placeholder/80/40",
      testimonial:
        "Carve has transformed our office meal experience. The corporate dashboard gives us complete visibility into our food spending.",
      author: "Sarah Johnson",
      position: "HR Director",
      employees: "500+ employees",
      savings: "30% cost reduction",
    },
    {
      company: "StartupXYZ",
      logo: "/api/placeholder/80/40",
      testimonial:
        "The employee management features are fantastic. We can easily onboard new team members and track meal allowances.",
      author: "Mike Chen",
      position: "Operations Manager",
      employees: "150+ employees",
      savings: "25% time saved",
    },
    {
      company: "Global Solutions",
      logo: "/api/placeholder/80/40",
      testimonial:
        "Outstanding support and analytics. The insights help us make better decisions about our employee benefits program.",
      author: "Emily Rodriguez",
      position: "Benefits Manager",
      employees: "1000+ employees",
      savings: "40% efficiency gain",
    },
  ];

  const stats = [
    { label: "Corporate Clients", value: "500+", icon: Building2 },
    { label: "Employees Served", value: "50K+", icon: Users },
    { label: "Orders Delivered", value: "2M+", icon: Truck },
    { label: "Cost Savings", value: "35%", icon: TrendingUp },
  ];

  const useCases = [
    {
      icon: Coffee,
      title: "Daily Meals",
      description:
        "Provide breakfast, lunch, and dinner options for your employees with flexible meal allowances.",
    },
    {
      icon: Users2,
      title: "Team Events",
      description:
        "Order catering for meetings, celebrations, and team building events with bulk ordering features.",
    },
    {
      icon: Clock,
      title: "Late Night Work",
      description:
        "Support employees working late with extended ordering hours and priority delivery.",
    },
    {
      icon: Gift,
      title: "Employee Perks",
      description:
        "Enhance your benefits package with meal credits and special occasion treats.",
    },
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", contactForm);
    // Handle form submission
    setShowContactForm(false);
    setContactForm({
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      employeeCount: "",
      message: "",
    });
  };

  return (
    <>
        <CorporateNavigation/>
        {/* Main Section  */}
        <div className="min-h-screen bg-cream">
          {/* Hero */}
          <div className="relative bg-gradient-to-br from-charcoal via-gray-800 to-charcoal text-white overflow-hidden">
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10 container mx-auto px-4 py-20">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-yellow-400/20 text-yellow-300 px-4 py-2 rounded-full mb-6">
                  <Building2 className="w-5 h-5" />
                  <span className="font-semibold">Corporate Solutions</span>
                </div>

                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  Feed Your Team,{" "}
                  <span className="text-yellow-400">Fuel Success</span>
                </h1>

                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Streamline your corporate food ordering with our comprehensive
                  platform. Manage employees, track spending, and boost
                  productivity with delicious meals.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <button
                    onClick={() => setShowContactForm(true)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-charcoal font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    Get Started <ArrowRight className="w-5 h-5" />
                  </button>
                  <button className="border-2 border-white text-white hover:bg-white hover:text-charcoal font-semibold px-8 py-4 rounded-lg transition-all flex items-center gap-2">
                    <Play className="w-5 h-5" /> Watch Demo
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {stats.map((s, i) => (
                    <div key={i} className="text-center">
                      <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <s.icon className="w-6 h-6 text-yellow-400" />
                      </div>
                      <div className="text-3xl font-bold text-yellow-400 mb-1">
                        {s.value}
                      </div>
                      <div className="text-gray-300 text-sm">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-16">
            {/* Features */}
            <section className="mb-20">
              <header className="text-center mb-12">
                <h2 className="text-4xl font-bold text-charcoal mb-4">
                  Everything You Need for Corporate Food Management
                </h2>
                <p className="text-xl text-medium-gray max-w-2xl mx-auto">
                  Our platform is designed specifically for businesses to manage
                  employee meals efficiently and cost-effectively.
                </p>
              </header>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {corporateFeatures.map((f, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl shadow-lg border border-cream p-8 hover:shadow-xl transition-all group"
                  >
                    <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-yellow-200 transition-colors">
                      <f.icon className="w-8 h-8 text-yellow-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-charcoal mb-3">
                      {f.title}
                    </h3>
                    <p className="text-medium-gray leading-relaxed">
                      {f.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Use Cases */}
            <section className="mb-20">
              <header className="text-center mb-12">
                <h2 className="text-4xl font-bold text-charcoal mb-4">
                  Perfect for Every Occasion
                </h2>
                <p className="text-xl text-medium-gray max-w-2xl mx-auto">
                  From daily meals to special events, we've got your corporate
                  food needs covered.
                </p>
              </header>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {useCases.map((u, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl shadow-lg border border-cream p-6 text-center hover:shadow-xl transition-all"
                  >
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <u.icon className="w-8 h-8 text-yellow-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-charcoal mb-2">
                      {u.title}
                    </h3>
                    <p className="text-medium-gray text-sm leading-relaxed">
                      {u.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Pricing */}
            <section className="mb-20">
              <header className="text-center mb-12">
                <h2 className="text-4xl font-bold text-charcoal mb-4">
                  Choose Your Plan
                </h2>
                <p className="text-xl text-medium-gray max-w-2xl mx-auto">
                  Flexible pricing options to fit your company size and needs.
                </p>
              </header>

              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {pricingPlans.map((p) => (
                  <div
                    key={p.id}
                    className={`bg-white rounded-2xl shadow-lg border-2 p-8 relative hover:shadow-xl transition-all ${
                      p.popular ? "border-yellow-400" : "border-cream"
                    }`}
                  >
                    {p.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <span className="bg-yellow-400 text-white px-4 py-2 rounded-full text-sm font-semibold">
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-charcoal mb-2">
                        {p.name}
                      </h3>
                      <p className="text-medium-gray mb-4">{p.description}</p>
                      <div className="mb-4">
                        <span className="text-4xl font-bold text-charcoal">
                          {p.price}
                        </span>
                        {p.price !== "Free" && p.price !== "Custom" && (
                          <span className="text-medium-gray">/month</span>
                        )}
                      </div>
                      <p className="text-sm text-medium-gray">{p.employees}</p>
                    </div>

                    <ul className="space-y-4 mb-8">
                      {p.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-mint-green" />
                          <span className="text-medium-gray">{f}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => setSelectedPlan(p.id)}
                      className={`w-full py-3 rounded-lg font-semibold transition-all ${
                        p.popular
                          ? "bg-yellow-400 hover:bg-yellow-500 text-white shadow-lg hover:shadow-xl"
                          : "bg-gray-100 hover:bg-gray-200 text-charcoal"
                      }`}
                    >
                      {p.price === "Custom" ? "Contact Sales" : "Get Started"}
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Testimonials */}
            <section className="mb-20">
              <header className="text-center mb-12">
                <h2 className="text-4xl font-bold text-charcoal mb-4">
                  Trusted by Leading Companies
                </h2>
                <p className="text-xl text-medium-gray max-w-2xl mx-auto">
                  Join hundreds of satisfied HR and operations teams who rely on
                  us every day.
                </p>
              </header>

              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((t, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl shadow-lg border border-cream p-8 hover:shadow-xl transition-all flex flex-col"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={t.logo}
                        alt={t.company}
                        className="w-16 h-8 object-contain bg-gray-100 rounded-lg p-1"
                      />
                      <h3 className="font-semibold text-charcoal">
                        {t.company}
                      </h3>
                    </div>
                    <p className="text-medium-gray flex-1 mb-6">
                      “{t.testimonial}”
                    </p>
                    <div className="text-sm text-medium-gray">
                      <p className="font-semibold text-charcoal">{t.author}</p>
                      <p>{t.position}</p>
                      <p>{t.employees}</p>
                      <p className="text-mint-green font-medium">{t.savings}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="bg-yellow-400 rounded-2xl p-12 text-center shadow-lg mb-20">
              <h2 className="text-4xl font-bold text-charcoal mb-4">
                Ready to supercharge your team meals?
              </h2>
              <p className="text-xl text-charcoal mb-8">
                Get a personalized demo or start for free in minutes.
              </p>
              <button
                onClick={() => setShowContactForm(true)}
                className="bg-white hover:bg-gray-100 text-charcoal font-semibold px-10 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto"
              >
                Contact Sales <ArrowRight className="w-5 h-5" />
              </button>
            </section>
          </div>
        </div>

        {/* ───────── Contact Overlay ───────── */}
        {showContactForm && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 px-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-8 relative">
              <button
                onClick={() => setShowContactForm(false)}
                className="absolute top-4 right-4 text-medium-gray hover:text-charcoal text-2xl leading-none"
              >
                &times;
              </button>
              <h3 className="text-2xl font-bold text-charcoal mb-6">
                Talk to our team
              </h3>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <input
                  className="w-full px-4 py-3 border border-cream rounded-lg focus:ring-2 focus:ring-yellow-400"
                  placeholder="Company Name"
                  required
                  value={contactForm.companyName}
                  onChange={(e) =>
                    setContactForm({
                      ...contactForm,
                      companyName: e.target.value,
                    })
                  }
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    className="w-full px-4 py-3 border border-cream rounded-lg focus:ring-2 focus:ring-yellow-400"
                    placeholder="Contact Name"
                    required
                    value={contactForm.contactName}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        contactName: e.target.value,
                      })
                    }
                  />
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-cream rounded-lg focus:ring-2 focus:ring-yellow-400"
                    placeholder="Email"
                    required
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, email: e.target.value })
                    }
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    className="w-full px-4 py-3 border border-cream rounded-lg focus:ring-2 focus:ring-yellow-400"
                    placeholder="Phone"
                    value={contactForm.phone}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, phone: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    min="1"
                    className="w-full px-4 py-3 border border-cream rounded-lg focus:ring-2 focus:ring-yellow-400"
                    placeholder="Employees"
                    value={contactForm.employeeCount}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        employeeCount: e.target.value,
                      })
                    }
                  />
                </div>
                <textarea
                  rows="4"
                  className="w-full px-4 py-3 border border-cream rounded-lg focus:ring-2 focus:ring-yellow-400 resize-none"
                  placeholder="How can we help?"
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, message: e.target.value })
                  }
                />

                <button
                  type="submit"
                  className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-charcoal font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  Submit <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        )}
        <Footer/>
      </>
  );
};

export default CorporatePage;
