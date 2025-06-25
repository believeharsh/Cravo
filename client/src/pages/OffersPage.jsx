import React, { useState } from "react";
import Footer from "../components/Footer";
import {
  Percent,
  Clock,
  Star,
  MapPin,
  Search,
  Tag,
  Gift,
  Truck,
  //   Fire,
  Users,
  Crown,
  TrendingUp,
  ShoppingCart,
  Clipboard,
  Check,
} from "lucide-react";

const OffersPage = () => {
  /* ────────────────────────── state ────────────────────────── */
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedOfferType, setSelectedOfferType] = useState("all");
  const [copiedId, setCopiedId] = useState(null);

  /* ────────────────────────── data ─────────────────────────── */
  const categories = [
    { key: "all", label: "All Offers", icon: Tag },
    { key: "pizza", label: "Pizza", icon: Gift },
    { key: "burgers", label: "Burgers", icon: Gift },
    { key: "asian", label: "Asian", icon: Gift },
    { key: "desserts", label: "Desserts", icon: Gift },
    { key: "healthy", label: "Healthy", icon: Gift },
  ];

  const offerTypes = [
    { key: "all", label: "All Types" },
    { key: "percentage", label: "Percentage Off" },
    { key: "fixed", label: "Fixed Amount" },
    { key: "bogo", label: "Buy One Get One" },
    { key: "free_delivery", label: "Free Delivery" },
  ];

  const featuredOffers = [
    /* … unchanged … */
  ];
  const regularOffers = [
    /* … unchanged … */
  ];
  const allOffers = [...featuredOffers, ...regularOffers];

  /* ────────────────────────── helpers ──────────────────────── */
  const handleCopyCode = (offer) => {
    navigator.clipboard.writeText(offer.code);
    setCopiedId(offer.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const OfferIcon = ({ type }) => {
    const Icon =
      type === "percentage"
        ? Percent
        : type === "fixed"
        ? Tag
        : type === "bogo"
        ? Gift
        : Truck;
    return <Icon className="w-5 h-5 text-yellow-600" />;
  };

  const filterFn = (o) => {
    const term = searchTerm.toLowerCase();
    const matches =
      o.title.toLowerCase().includes(term) ||
      o.description.toLowerCase().includes(term) ||
      o.restaurant.name.toLowerCase().includes(term);
    const cat = selectedCategory === "all" || o.category === selectedCategory;
    const typ = selectedOfferType === "all" || o.type === selectedOfferType;
    return matches && cat && typ;
  };

  /* ────────────────────────── card component ───────────────── */
  const OfferCard = ({ offer }) => (
    <div className="bg-white rounded-2xl shadow-lg border border-cream overflow-hidden hover:shadow-xl transition-all group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={offer.image}
          alt={offer.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          {offer.isNew && (
            <span className="px-3 py-1 bg-mint-green text-white text-xs font-semibold rounded-full">
              New
            </span>
          )}
          {offer.isTrending && (
            <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Trending
            </span>
          )}
        </div>
        <div className="absolute top-4 right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
          {offer.discount}
        </div>
      </div>

      {/* Body */}
      <div className="p-6 space-y-3">
        {/* Header */}
        <div className="flex items-center gap-2">
          <OfferIcon type={offer.type} />
          <span className="text-sm font-medium text-yellow-600 capitalize">
            {offer.type.replace("_", " ")}
          </span>
        </div>
        <h3 className="font-semibold text-charcoal line-clamp-2">
          {offer.title}
        </h3>
        <p className="text-sm text-medium-gray line-clamp-3">
          {offer.description}
        </p>

        {/* Restaurant */}
        <div className="flex items-center gap-3 mt-3">
          <img
            src={offer.restaurant.image}
            alt={offer.restaurant.name}
            className="w-10 h-10 rounded-lg object-cover bg-gray-200"
          />
          <div>
            <p className="text-sm font-medium text-charcoal">
              {offer.restaurant.name}
            </p>
            <div className="flex items-center gap-1 text-xs text-medium-gray">
              <Star className="w-4 h-4" />
              <span>{offer.restaurant.rating}</span>
              <Clock className="w-4 h-4 ml-2" />
              <span>{offer.restaurant.deliveryTime}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-xs text-medium-gray">
            Min&nbsp;${offer.minOrder} • max&nbsp;${offer.maxDiscount}
            <br />
            Valid till&nbsp;{formatDate(offer.validUntil)}
          </div>
          <button
            onClick={() => handleCopyCode(offer)}
            className="flex items-center gap-1 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg text-sm font-semibold transition-colors"
          >
            {copiedId === offer.id ? (
              <>
                <Check className="w-4 h-4" /> Copied
              </>
            ) : (
              <>
                <Clipboard className="w-4 h-4" /> {offer.code}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  /* ────────────────────────── render ────────────────────────── */
  return (
    <>
      <div className="min-h-screen bg-cream">
        {/* ── Hero ──────────────────────────────────────────────── */}
        <div className="relative h-96 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">
          <div className="absolute inset-0 bg-black/20" />
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage: "url(/api/placeholder/1200/400)",
              backgroundBlendMode: "overlay",
            }}
          />
          <div className="relative z-10 container mx-auto h-full flex items-center px-4">
            <div className="max-w-2xl text-white space-y-4">
              <h1 className="text-5xl font-bold">Delicious Deals Await! 🍕</h1>
              <p className="text-xl text-yellow-100">
                Discover amazing offers from your favorite restaurants. Save big
                on every order!
              </p>
              <div className="flex gap-6 text-yellow-100 text-sm font-semibold">
                <div className="flex items-center gap-2">
                  {/* <Fire className="w-5 h-5" /> {allOffers.length}+ Active Offers */}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" /> 10K+ Happy Customers
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Filters ───────────────────────────────────────────── */}
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg border border-cream p-6 mb-8 space-y-4">
            {/* Search */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-medium-gray" />
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search offers, restaurants, or food items..."
                  className="w-full pl-10 pr-4 py-3 border border-cream rounded-lg focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              {/* Category pills */}
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c.key}
                    onClick={() => setSelectedCategory(c.key)}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all border ${
                      selectedCategory === c.key
                        ? "bg-yellow-400 text-white shadow-lg border-yellow-400"
                        : "bg-white text-medium-gray border-cream hover:bg-gray-100"
                    }`}
                  >
                    <c.icon className="w-4 h-4" /> {c.label}
                  </button>
                ))}
              </div>

              {/* Type dropdown */}
              <select
                value={selectedOfferType}
                onChange={(e) => setSelectedOfferType(e.target.value)}
                className="px-4 py-3 border border-cream rounded-lg focus:ring-2 focus:ring-yellow-400 bg-white min-w-[180px]"
              >
                {offerTypes.map((t) => (
                  <option key={t.key} value={t.key}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ── Featured Offers ─────────────────────────────────── */}
          <section className="mb-12 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-charcoal">
                Featured Offers
              </h2>
              <div className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-semibold">
                {/* <Fire className="w-3 h-3" /> Hot Deals */}
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {featuredOffers.filter(filterFn).map((o) => (
                <OfferCard key={o.id} offer={o} />
              ))}
              {featuredOffers.filter(filterFn).length === 0 && (
                <p className="text-medium-gray">
                  No featured offers match your filters.
                </p>
              )}
            </div>
          </section>

          {/* ── More Offers ─────────────────────────────────────── */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                <Tag className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-charcoal">More Offers</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularOffers.filter(filterFn).map((o) => (
                <OfferCard key={o.id} offer={o} />
              ))}
              {regularOffers.filter(filterFn).length === 0 && (
                <p className="text-medium-gray">
                  No offers found for your current filters.
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OffersPage;
