import { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { useAccount } from 'wagmi';

const Redeem = () => {
  const { address } = useAccount();
  const [userNeoPoints, setUserNeoPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    if (address) {
      loadUserPoints();
    }
  }, [address]);

  const loadUserPoints = () => {
    try {
      const userRewards = JSON.parse(localStorage.getItem(`neoflow_rewards_${address}`) || '{"points": 0}');
      setUserNeoPoints(userRewards.points || 0);
      setLoading(false);
    } catch (error) {
      console.error('Error loading user points:', error);
      setLoading(false);
    }
  };

  const products = [
    // Apparel
    {
      id: 1,
      name: 'NeoFlow Premium T-shirt',
      description: 'High-quality cotton t-shirt with exclusive NeoFlow branding',
      points: 2500,
      category: 'apparel',
      image: '👕',
      availability: 'In Stock',
      features: ['Premium cotton', 'Exclusive design', 'Limited edition']
    },
    {
      id: 2,
      name: 'NeoFlow Hoodie',
      description: 'Comfortable hoodie perfect for crypto enthusiasts',
      points: 4500,
      category: 'apparel',
      image: '🧥',
      availability: 'In Stock',
      features: ['Soft fleece interior', 'Kangaroo pocket', 'Embroidered logo']
    },
    {
      id: 3,
      name: 'NeoFlow Baseball Cap',
      description: 'Stylish cap for representing the community',
      points: 1800,
      category: 'apparel',
      image: '🧢',
      availability: 'In Stock',
      features: ['Adjustable strap', 'Breathable fabric', 'Classic design']
    },
    {
      id: 4,
      name: 'NeoFlow Beanie',
      description: 'Warm beanie for cold crypto winters',
      points: 1500,
      category: 'apparel',
      image: '🧢',
      availability: 'Limited Stock',
      features: ['Soft knit', 'One size fits all', 'Winter essential']
    },
    
    // Accessories
    {
      id: 5,
      name: 'NeoFlow Custom Mug',
      description: 'Start your day with NeoFlow inspiration',
      points: 1200,
      category: 'accessories',
      image: '☕',
      availability: 'In Stock',
      features: ['11oz capacity', 'Dishwasher safe', 'Heat-resistant']
    },
    {
      id: 6,
      name: 'NeoFlow Laptop Stickers',
      description: 'Pack of exclusive NeoFlow stickers',
      points: 800,
      category: 'accessories',
      image: '💻',
      availability: 'In Stock',
      features: ['Waterproof', 'Pack of 5', 'Various designs']
    },
    {
      id: 7,
      name: 'NeoFlow Tote Bag',
      description: 'Eco-friendly bag for daily use',
      points: 2000,
      category: 'accessories',
      image: '👜',
      availability: 'In Stock',
      features: ['Eco-friendly material', 'Large capacity', 'Strong handles']
    },
    {
      id: 8,
      name: 'NeoFlow Phone Case',
      description: 'Protect your phone with style',
      points: 1600,
      category: 'accessories',
      image: '📱',
      availability: 'In Stock',
      features: ['Multiple sizes', 'Drop protection', 'Wireless charging compatible']
    },
    
    // Digital & Special
    {
      id: 9,
      name: 'Mystery Reward Box',
      description: 'Surprise box with exclusive NeoFlow items',
      points: 3500,
      category: 'special',
      image: '🧧',
      availability: 'Limited Edition',
      features: ['Surprise items', 'Exclusive content', 'Collectors edition']
    },
    {
      id: 10,
      name: 'NeoFlow NFT Badge',
      description: 'Exclusive digital badge for your wallet',
      points: 5000,
      category: 'digital',
      image: '🏅',
      availability: 'Limited Supply',
      features: ['Digital ownership', 'Unique design', 'Blockchain verified']
    },
    {
      id: 11,
      name: 'VIP Community Access',
      description: '30-day access to exclusive NeoFlow community features',
      points: 3000,
      category: 'digital',
      image: '⭐',
      availability: 'Always Available',
      features: ['Priority support', 'Exclusive events', 'Early access']
    },
    {
      id: 12,
      name: 'NeoFlow Premium Badge',
      description: 'Show off your status with a premium profile badge',
      points: 2200,
      category: 'digital',
      image: '💎',
      availability: 'In Stock',
      features: ['Profile enhancement', 'Permanent badge', 'Status symbol']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', icon: '🛍️' },
    { id: 'apparel', name: 'Apparel', icon: '👕' },
    { id: 'accessories', name: 'Accessories', icon: '🎒' },
    { id: 'digital', name: 'Digital', icon: '💻' },
    { id: 'special', name: 'Special', icon: '✨' }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleRedeem = (product) => {
    if (userNeoPoints >= product.points) {
      // In a real implementation, this would trigger the redemption process
      alert(`Congratulations! You've redeemed ${product.name}. This is a demo - actual redemption would process the order and deduct ${product.points} NeoPoints.`);
    } else {
      alert(`You need ${product.points - userNeoPoints} more NeoPoints to redeem this item.`);
    }
  };

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'In Stock': return 'text-green-600 bg-green-100';
      case 'Limited Stock': return 'text-yellow-600 bg-yellow-100';
      case 'Limited Edition': return 'text-purple-600 bg-purple-100';
      case 'Limited Supply': return 'text-orange-600 bg-orange-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">🛍️ NeoPoints Store</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Redeem your NeoPoints for exclusive merchandise and digital rewards
          </p>
        </div>

        {!address ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔗</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Connect Your Wallet</h3>
            <p className="text-gray-600">Please connect your wallet to access the redemption store.</p>
          </div>
        ) : (
          <>
            {/* User Points Display */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 mb-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Your NeoPoints Balance</h2>
                  <div className="text-4xl font-bold">{userNeoPoints.toLocaleString()}</div>
                  <p className="text-indigo-100 mt-2">Ready to spend on amazing rewards!</p>
                </div>
                <div className="text-6xl">💎</div>
              </div>
            </div>

            {/* Category Filters */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-4 justify-center">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-indigo-600 text-white shadow-lg'
                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xl">{category.icon}</span>
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Product Image */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 text-center">
                    <div className="text-6xl mb-4">{product.image}</div>
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getAvailabilityColor(product.availability)}`}>
                      {product.availability}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                    
                    {/* Features */}
                    <div className="mb-4">
                      <ul className="space-y-1">
                        {product.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-xs text-gray-500">
                            <span className="text-green-500 mr-2">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Price and Action */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <span className="text-2xl font-bold text-indigo-600">{product.points.toLocaleString()}</span>
                        <span className="text-sm text-gray-500">NeoPoints</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRedeem(product)}
                      disabled={userNeoPoints < product.points}
                      className={`w-full mt-4 py-2 px-4 rounded-lg font-semibold transition-all duration-200 ${
                        userNeoPoints >= product.points
                          ? 'bg-indigo-600 text-white hover:bg-indigo-700 transform hover:scale-105'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {userNeoPoints >= product.points ? 'Redeem Now' : 'Insufficient Points'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Info Section */}
            <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">How Redemption Works</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <div className="text-center">
                    <div className="text-4xl mb-2">💎</div>
                    <h4 className="font-semibold text-gray-800">Earn Points</h4>
                    <p className="text-gray-600 text-sm">Donate to campaigns to earn NeoPoints</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">🛍️</div>
                    <h4 className="font-semibold text-gray-800">Choose Rewards</h4>
                    <p className="text-gray-600 text-sm">Browse and select your favorite items</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">🎁</div>
                    <h4 className="font-semibold text-gray-800">Enjoy Rewards</h4>
                    <p className="text-gray-600 text-sm">Receive your exclusive NeoFlow merchandise</p>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> This is a demo store. In the full implementation, redemptions would process orders and ship physical items to your address.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Redeem;
