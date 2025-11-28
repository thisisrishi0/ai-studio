import { Category, Product } from './types';

export const CURRENCY_FORMATTER = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export const PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'OnePlus 12R (Cool Blue, 8GB RAM, 128GB Storage)',
    category: Category.MOBILES,
    price: 39999,
    originalPrice: 42999,
    rating: 4.5,
    reviewCount: 1240,
    image: 'https://picsum.photos/id/1/400/400',
    isBestSeller: true,
    deliveryDate: 'Tomorrow, 11 AM',
    description: 'Smooth beyond belief. The OnePlus 12R features a massive battery and the latest Snapdragon processor.',
    bankOffers: ['Flat ₹1000 off on HDFC Bank Cards', 'No Cost EMI available'],
    limitedDeal: true,
    features: [
      'Processor: Snapdragon 8 Gen 2 Mobile Platform',
      'Display: 120 Hz ProXDR Display with LTPO 4.0',
      'Battery: 5500 mAh with 100W SUPERVOOC charging',
      'Camera: 50MP Sony IMX890 Main Camera'
    ]
  },
  {
    id: '2',
    title: 'Men\'s Ethnic Motifs Embroidered Kurta with Pajama',
    category: Category.FASHION,
    price: 1299,
    originalPrice: 2999,
    rating: 4.2,
    reviewCount: 85,
    image: 'https://picsum.photos/id/2/400/500', 
    description: 'Traditional wear for festive occasions. Cotton blend fabric for comfort.',
    bankOffers: ['5% Cashback on Amazon Pay ICICI Card'],
    limitedDeal: true,
    features: [
      'Fabric: Cotton Blend',
      'Pattern: Embroidered',
      'Sleeve Length: Long Sleeves',
      'Care Instructions: Dry Clean Only'
    ]
  },
  {
    id: '3',
    title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    category: Category.ELECTRONICS,
    price: 26990,
    originalPrice: 29990,
    rating: 4.8,
    reviewCount: 3200,
    image: 'https://picsum.photos/id/3/400/400',
    isBestSeller: true,
    deliveryDate: 'Tomorrow, 2 PM',
    description: 'Industry leading noise cancellation with 30 hours battery life.',
    bankOffers: ['₹2000 Instant Discount on SBI Cards'],
    isSponsored: true,
    features: [
      'Industry-leading noise cancellation optimized to you',
      'Magnificent Sound, engineered to perfection',
      'Crystal clear hands-free calling',
      'Up to 30-hour battery life with quick charging (3 min charge for 3 hours of playback)'
    ]
  },
  {
    id: '4',
    title: 'Jaipuri Printed Double Bed Sheet with 2 Pillow Covers',
    category: Category.HOME,
    price: 849,
    originalPrice: 1999,
    rating: 4.0,
    reviewCount: 450,
    image: 'https://picsum.photos/id/4/400/400',
    description: '100% Cotton traditional Jaipuri print bedsheet. Adds a royal look to your bedroom.',
    limitedDeal: true,
    features: [
      'Material: 100% Cotton',
      'Thread Count: 144 TC',
      'Size: Double Bed (90 x 100 inches)',
      'Package Contents: 1 Bedsheet and 2 Pillow Covers'
    ]
  },
  {
    id: '5',
    title: 'Tata Sampann Unpolished Toor Dal, 1kg',
    category: Category.GROCERY,
    price: 165,
    originalPrice: 190,
    rating: 4.6,
    reviewCount: 8900,
    image: 'https://picsum.photos/id/5/400/400',
    deliveryDate: 'Today, 6 PM',
    description: 'High protein unpolished dal. Farm fresh quality.',
    isBestSeller: true,
    features: [
      'Unpolished: Does not undergo any artificial polishing with water, oil or leather',
      'Chef Sanjeev Kapoor Recommended',
      '5-Step Purity process ensures that the dal grains are uniform',
      'Rich in Protein'
    ]
  },
  {
    id: '6',
    title: 'Samsung Galaxy S24 Ultra 5G AI Smartphone',
    category: Category.MOBILES,
    price: 129999,
    originalPrice: 144999,
    rating: 4.9,
    reviewCount: 500,
    image: 'https://picsum.photos/id/6/400/400',
    isBestSeller: true,
    description: 'Welcome to the era of mobile AI. With Circle to Search, Live Translate, and Note Assist.',
    bankOffers: ['₹5000 Exchange Bonus', 'No Cost EMI starts at ₹5200/mo'],
    isSponsored: true,
    features: [
      'Meet Galaxy S24 Ultra, the ultimate form of Galaxy Ultra with a new titanium exterior and a 17.25cm (6.8") flat display.',
      '200MP Wide-angle Camera & 100x Space Zoom',
      'Built-in S Pen writes a whole new chapter',
      'Snapdragon 8 Gen 3 for Galaxy'
    ]
  },
  {
    id: '7',
    title: 'Kanjivaram Art Silk Saree with Blouse Piece',
    category: Category.FASHION,
    price: 1899,
    originalPrice: 5499,
    rating: 4.1,
    reviewCount: 210,
    image: 'https://picsum.photos/id/7/400/500',
    description: 'Elegant silk saree with zari border work. Perfect for weddings and festivals.',
    limitedDeal: true,
    features: [
      'Saree Length: 5.5 m, Blouse Length: 0.8 m',
      'Fabric: Art Silk',
      'Type: Kanjivaram Style',
      'Occasion: Wedding, Party, Festival'
    ]
  },
  {
    id: '8',
    title: 'Prestige Iris 750 Watt Mixer Grinder',
    category: Category.HOME,
    price: 3299,
    originalPrice: 6195,
    rating: 4.3,
    reviewCount: 15000,
    image: 'https://picsum.photos/id/8/400/400',
    isBestSeller: true,
    description: 'Powerful 750W motor with 3 stainless steel jars and 1 juicer jar.',
    bankOffers: ['10% off on Axis Bank Credit Cards'],
    features: [
      'Wattage: 750 W; Voltage: 230 V',
      'Jar Safety Lock to ensure safety - Product won\'t start if not locked correctly',
      'Motor Warranty: 2 Years; Product Warranty: 2 Years',
      'Includes: Main Unit, 3 Stainless Steel Jars, 1 Juicer Jar'
    ]
  },
  {
    id: '9',
    title: 'Apple MacBook Air M2 Chip (13-inch, 8GB, 256GB)',
    category: Category.ELECTRONICS,
    price: 92900,
    originalPrice: 114900,
    rating: 4.7,
    reviewCount: 850,
    image: 'https://picsum.photos/id/9/400/400',
    description: 'Strikingly thin and fast. Redesigned around the next-generation M2 chip.',
    bankOffers: ['₹5000 Instant Savings on HDFC Bank'],
    features: [
      'STRIKINGLY THIN DESIGN — The redesigned MacBook Air is more portable than ever and weighs just 1.24 kg.',
      'SUPERCHARGED BY M2 — Get more done faster with a next-generation 8-core CPU, up to 10-core GPU and up to 24GB of unified memory.',
      'UP TO 18 HOURS OF BATTERY LIFE',
      'BIG, BEAUTIFUL LIQUID RETINA DISPLAY'
    ]
  },
  {
    id: '10',
    title: 'Organic India Tulsi Green Tea (25 Bags)',
    category: Category.GROCERY,
    price: 180,
    originalPrice: 200,
    rating: 4.5,
    reviewCount: 3400,
    image: 'https://picsum.photos/id/10/400/400',
    description: 'Stress relieving and energizing. 100% Organic certified.',
    deliveryDate: 'Tomorrow, 8 AM',
    features: [
      'Helps You Relax: Reduces Stress',
      'Boosts System Immunity',
      'Abundant in Antioxidants',
      'Improve Digestion & Metabolism'
    ]
  },
  {
    id: '11',
    title: 'Philips Air Fryer HD9200/90',
    category: Category.HOME,
    price: 6999,
    originalPrice: 9999,
    rating: 4.4,
    reviewCount: 1200,
    image: 'https://picsum.photos/id/11/400/400',
    description: 'Great tasting fries with up to 90% less fat. Rapid Air Technology.',
    limitedDeal: true,
    features: [
      'Technology: Rapid Air Technology',
      'Functions: Fry, Bake, Grill, Roast, Reheat',
      'Temperature Control: up to 200 °C',
      'Dishwasher safe parts'
    ]
  },
  {
    id: '12',
    title: 'Noise ColorFit Pro 4 Smartwatch',
    category: Category.ELECTRONICS,
    price: 2499,
    originalPrice: 5999,
    rating: 4.1,
    reviewCount: 5600,
    image: 'https://picsum.photos/id/12/400/400',
    description: 'Bluetooth calling, 1.72" display, 60Hz refresh rate.',
    bankOffers: ['5% Unlimited Cashback on Flipkart Axis Bank Card'],
    features: [
      'Advanced Bluetooth Calling',
      '1.72’’ TruView Display',
      'Digital Crown for Navigation',
      '60Hz Refresh Rate'
    ]
  }
];