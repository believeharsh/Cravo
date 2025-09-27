import React, { useState } from 'react';
import Footer from '../../components/Footer';
import Icon from '../../components/ui/Icon';

const OffersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedOfferType, setSelectedOfferType] = useState('all');
  const [copiedId, setCopiedId] = useState(null);

  const categories = [
    { key: 'all', label: 'All Offers', icon: 'tag' },
    { key: 'pizza', label: 'Pizza', icon: 'pizza' },
    { key: 'burgers', label: 'Burgers', icon: 'sandwich' },
    { key: 'asian', label: 'Asian', icon: 'egg-fried' },
    { key: 'desserts', label: 'Desserts', icon: 'cake' },
    { key: 'healthy', label: 'Healthy', icon: 'leaf' },
  ];

  const offerTypes = [
    { key: 'all', label: 'All Types' },
    { key: 'percentage', label: 'Percentage Off' },
    { key: 'fixed', label: 'Fixed Amount' },
    { key: 'bogo', label: 'Buy One Get One' },
    { key: 'free_delivery', label: 'Free Delivery' },
  ];

  const featuredOffers = [
    {
      id: 'f1',
      title: 'Get 50% Off on Your First Order!',
      description:
        'Applies to all menu items for new customers. Limited time offer!',
      image:
        'https://via.placeholder.com/400x250/FFD700/FFFFFF?text=PizzaOffer',
      discount: '50% OFF',
      code: 'WELCOME50',
      type: 'percentage',
      category: 'pizza',
      isNew: true,
      isTrending: true,
      minOrder: 20,
      maxDiscount: 15,
      validUntil: '2025-12-31',
      restaurant: {
        name: 'Pizza Hub',
        image: 'https://via.placeholder.com/100x100/FF5733/FFFFFF?text=PH',
        rating: 4.5,
        deliveryTime: '30-45 min',
      },
    },
    {
      id: 'f2',
      title: 'Buy One Get One Free on All Burgers!',
      description:
        'Double the deliciousness with this amazing BOGO deal. Grab it now!',
      image:
        'https://via.placeholder.com/400x250/FFA500/FFFFFF?text=BurgerOffer',
      discount: 'BOGO',
      code: 'BURGERBOGO',
      type: 'bogo',
      category: 'burgers',
      isNew: false,
      isTrending: true,
      minOrder: 15,
      maxDiscount: null,
      validUntil: '2025-11-15',
      restaurant: {
        name: 'Burger Bonanza',
        image: 'https://via.placeholder.com/100x100/FFC300/FFFFFF?text=BB',
        rating: 4.2,
        deliveryTime: '25-40 min',
      },
    },
    {
      id: 'f3',
      title: 'Free Delivery on Orders Over $25',
      description: 'Enjoy your favorite meals delivered to your door, on us!',
      image:
        'https://via.placeholder.com/400x250/87CEEB/FFFFFF?text=DeliveryOffer',
      discount: 'FREE',
      code: 'FREEDELIVERY',
      type: 'free_delivery',
      category: 'all',
      isNew: true,
      isTrending: false,
      minOrder: 25,
      maxDiscount: null,
      validUntil: '2025-10-31',
      restaurant: {
        name: 'Tasty Bites',
        image: 'https://via.placeholder.com0x100/581845/FFFFFF?text=TB',
        rating: 4.7,
        deliveryTime: '20-35 min',
      },
    },
  ];

  const regularOffers = [
    {
      id: 'r1',
      title: '$5 Off Your Next Sushi Order',
      description:
        'Craving sushi? Use this code for a discount on your next delicious meal.',
      image:
        'https://via.placeholder.com/400x250/9370DB/FFFFFF?text=SushiOffer',
      discount: '$5 OFF',
      code: 'SUSHI5',
      type: 'fixed',
      category: 'asian',
      isNew: false,
      isTrending: false,
      minOrder: 30,
      maxDiscount: 5,
      validUntil: '2025-09-30',
      restaurant: {
        name: 'Sakura Sushi',
        image: 'https://via.placeholder.com/100x100/4682B4/FFFFFF?text=SS',
        rating: 4.6,
        deliveryTime: '40-55 min',
      },
    },
    {
      id: 'r2',
      title: '10% Off All Healthy Salads',
      description:
        'Eat well and save! Get a discount on our fresh and healthy salad range.',
      image:
        'https://via.placeholder.com/400x250/8FBC8F/FFFFFF?text=SaladOffer',
      discount: '10% OFF',
      code: 'HEALTHY10',
      type: 'percentage',
      category: 'healthy',
      isNew: false,
      isTrending: false,
      minOrder: 10,
      maxDiscount: 7,
      validUntil: '2025-08-31',
      restaurant: {
        name: 'Green Eats',
        image: 'https://via.placeholder.com/100x100/3CB371/FFFFFF?text=GE',
        rating: 4.3,
        deliveryTime: '20-30 min',
      },
    },
    {
      id: 'r3',
      title: 'Dessert Duo Deal: 2 Desserts for $10',
      description: 'Treat yourself and a friend with our sweet dessert offer.',
      image:
        'https://via.placeholder.com/400x250/FF69B4/FFFFFF?text=DessertOffer',
      discount: '$10 DEAL',
      code: 'DUODEAL',
      type: 'fixed',
      category: 'desserts',
      isNew: false,
      isTrending: false,
      minOrder: 10,
      maxDiscount: null,
      validUntil: '2025-07-20',
      restaurant: {
        name: 'Sweet Tooth',
        image: 'https://via.placeholder.com/100x100/FF1493/FFFFFF?text=ST',
        rating: 4.8,
        deliveryTime: '15-25 min',
      },
    },
    {
      id: 'r4',
      title: 'Weekend Special: 20% Off All Orders',
      description:
        'Enjoy a delightful weekend with great savings on all your favorite meals.',
      image:
        'https://via.placeholder.com/400x250/FF6347/FFFFFF?text=WeekendOffer',
      discount: '20% OFF',
      code: 'WEEKEND20',
      type: 'percentage',
      category: 'all',
      isNew: true,
      isTrending: false,
      minOrder: 25,
      maxDiscount: 10,
      validUntil: '2025-07-21',
      restaurant: {
        name: 'Global Cuisine',
        image: 'https://via.placeholder.com/100x100/DC143C/FFFFFF?text=GC',
        rating: 4.4,
        deliveryTime: '35-50 min',
      },
    },
  ];
  const allOffers = [...featuredOffers, ...regularOffers];

  /* ────────────────────────── helpers ──────────────────────── */
  const handleCopyCode = offer => {
    navigator.clipboard.writeText(offer.code);
    setCopiedId(offer.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatDate = d =>
    new Date(d).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  const OfferIcon = ({ type }) => {
    let iconName;
    switch (type) {
      case 'percentage':
        iconName = 'percent';
        break;
      case 'fixed':
        iconName = 'tag';
        break;
      case 'bogo':
        iconName = 'gift';
        break;
      case 'free_delivery':
        iconName = 'truck';
        break;
      default:
        iconName = 'tag'; // Default icon
    }
    return <Icon name={iconName} className="w-5 h-5 text-yellow-600" />;
  };

  const filterFn = o => {
    const term = searchTerm.toLowerCase();
    const matches =
      o.title.toLowerCase().includes(term) ||
      o.description.toLowerCase().includes(term) ||
      o.restaurant.name.toLowerCase().includes(term);
    const cat = selectedCategory === 'all' || o.category === selectedCategory;
    const typ = selectedOfferType === 'all' || o.type === selectedOfferType;
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
              <Icon name="trending-up" className="w-3 h-3" />
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
            {offer.type.replace('_', ' ')}
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
              <Icon name="star" className="w-4 h-4" />
              <span>{offer.restaurant.rating}</span>
              <Icon name="clock" className="w-4 h-4 ml-2" />
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
                <Icon name="check" className="w-4 h-4" /> Copied
              </>
            ) : (
              <>
                <Icon name="clipboard" className="w-4 h-4" /> {offer.code}
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
              backgroundImage: 'url(/api/placeholder/1200/400)',
              backgroundBlendMode: 'overlay',
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
                  <Icon name="fire" className="w-5 h-5" /> {allOffers.length}+
                  Active Offers
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="users" className="w-5 h-5" /> 10K+ Happy Customers
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
                <Icon
                  name="search"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-medium-gray"
                />
                <input
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Search offers, restaurants, or food items..."
                  className="w-full pl-10 pr-4 py-3 border border-cream rounded-lg focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              {/* Category pills */}
              <div className="flex flex-wrap gap-2">
                {categories.map(c => (
                  <button
                    key={c.key}
                    onClick={() => setSelectedCategory(c.key)}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all border ${
                      selectedCategory === c.key
                        ? 'bg-yellow-400 text-white shadow-lg border-yellow-400'
                        : 'bg-white text-medium-gray border-cream hover:bg-gray-100'
                    }`}
                  >
                    <Icon name={c.icon} className="w-4 h-4" /> {c.label}
                  </button>
                ))}
              </div>

              {/* Type dropdown */}
              <select
                value={selectedOfferType}
                onChange={e => setSelectedOfferType(e.target.value)}
                className="px-4 py-3 border border-cream rounded-lg focus:ring-2 focus:ring-yellow-400 bg-white min-w-[180px]"
              >
                {offerTypes.map(t => (
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
                <Icon name="crown" className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-charcoal">
                Featured Offers
              </h2>
              <div className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-semibold">
                <Icon name="fire" className="w-3 h-3" /> Hot Deals
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {featuredOffers.filter(filterFn).map(o => (
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
                <Icon name="tag" className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-charcoal">More Offers</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularOffers.filter(filterFn).map(o => (
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
