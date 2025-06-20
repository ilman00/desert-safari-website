const features = [
  '🚙 Pickup & Drop off by 4×4 Vehicle',
  '⏰ Pickup Time: 3:00 – 3:30 pm',
  '🏨 Pick and Drop from Hotel/Home',
  '🚗 30–40 mins Dune Bashing',
  '🏄 Sand Boarding',
  '📸 Picture Point in Desert',
  '🐪 Camel Ride',
  '☕ Arabic Coffee & Fresh Dates',
  '💨 Hubbly Bubblee (Sheesha)',
  '👗 Traditional Costumes',
  '🥤 Unlimited Soft Drinks, Tea, Coffee, & Water',
  '🌸 Henna Painting',
  '💃 Belly Dance',
  '🔥 Fire Show',
  '🎭 Tanura Show',
  '🍖 BBQ & Buffet Dinner (Veg & Non-Veg)',
  '⏰ Dropoff Time: 9:30 – 9:45 pm'
];

const privateFeatures= [
  '🚗 Private pickup from your location',
  '🚙 4×4 SUV for thrilling safari & camp',
  '🏆 DTCM Approved Desert Safari Guide',
  '🏜️ 30-min Thrilling Dune Bashing',
  '📸 Photo stop at high dunes',
  '🏂 Sandboarding down the dunes',
  '🐪 Short Camel ride',
  '☕ Traditional welcome with Arabic Tea & Coffee',
  '✍️ Free Henna Tattoo',
  '👗 Arabic Dress Photography',
  '🥤 Unlimited Soft Drinks, Cold Water, Tea',
  '🍽️ 5-Star International & Arabian Cuisine',
  '💡 Light & Sound Show on Stage & Camp',
  '🎶 Oud Music Performance',
  '💃 Sufi Dance',
  '💃 Tanoura Dance',
  '🕺 Saidi & Belly Dance',
  '🔥 Live Fire Show',
  '🎶 Farewell Song by Mascot',
  '🚗 Private drop-off to your location'
]



export const packageData = [
    {
      id: "evening",
      title: "Evening Desert Safari Dubai Deals",
      cards: [
        {
          image: "/images/Liwa-Oasis-A-Desert-Escape-by-tripscpae-tourism-1-3.png",
          title: "Basic Evening Safari",
          price: "89 AED | Per Person",
          features:privateFeatures, // same icon + text array as before
          whatsappLink: "https://wa.me/971501234567",
          bookLink: "/book",
        },
        {
          image: "/images/Gallery-Image-1-2.png",
          title: "Basic Evening Safari",
          price: "89 AED | Per Person",
          features:privateFeatures, // same icon + text array as before
          whatsappLink: "https://wa.me/971501234567",
          bookLink: "/book",
        },
        {
          image: "/images/Gallery-Image-1-1-1.png",
          title: "Basic Evening Safari",
          price: "89 AED | Per Person",
          features:privateFeatures, // same icon + text array as before
          whatsappLink: "https://wa.me/971501234567",
          bookLink: "/book",
        },
        // more evening cards
      ],
    },
    {
      id: "Morning",
      title: "Morning Desert Safari Tour Deals 2025",
      cards: [
        {
          image: "/images/Morning-pic-1.png",
          title: "Safari with Quad Bike",
          price: "199 AED | Per Person",
          features: features,
          whatsappLink: "https://wa.me/971501234567",
          bookLink: "/book",
        },
        {
          image: "/images/morning-pic-2.png",
          title: "Safari with Quad Bike",
          price: "199 AED | Per Person",
          features: features,
          whatsappLink: "https://wa.me/971501234567",
          bookLink: "/book",
        },
        {
          image: "/images/morning-pic-3.png",
          title: "Safari with Quad Bike",
          price: "199 AED | Per Person",
          features: features,
          whatsappLink: "https://wa.me/971501234567",
          bookLink: "/book",
        },
      ],
    },
    {
      id: "private",
      title: "Private Desert Safari",
      cards: [
        {
          image: "/images/private-desert-safari-1.png",
          title: "PRIVATE DESERT SAFARI WITH SAHARA FORTNESS DINNER",
          price: "2049 AED | Per Group",
          features: features,
          whatsappLink: "https://wa.me/971501234567",
          bookLink: "/book",
        },
        {
          image: "/images/private-desert-safari-2.png",
          title: "PRIVATE DESERT SAFARI AT BAB AL SHAMS RESORT",
          price: "2450 AED | Per Group",
          features: features,
          whatsappLink: "https://wa.me/971501234567",
          bookLink: "/book",
        },
        {
          image: "/images/private-desert-safari-3.png",
          title: "DESERT SAFARI SHOW WITH FALCONRY WITH DINNER",
          price: "1999 AED | Per Person",
          features: features,
          whatsappLink: "https://wa.me/971501234567",
          bookLink: "/book",
        },
      ],
    },
    // Add more groups like VIP, Morning, Overnight, etc.
  ];
  