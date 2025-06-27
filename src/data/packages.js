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
  '🍖 BBQ & Buffet Dinner',
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
          features:features, // same icon + text array as before
          whatsappLink: "https://wa.me/971501234567",
          bookLink: "/book",
        },
        {
          image: "/images/Gallery-Image-1-2.png",
          title: "Safari With Quad Bikes",
          price: "199 AED | Per Person",
          features:[...features, "🚴‍♂️ 30 Minutes Quad Bike Ride"], // same icon + text array as before
          whatsappLink: "https://wa.me/971501234567",
          bookLink: "/book",
        },
        {
          image: "/images/Gallery-Image-1-1-1.png",
          title: "Basic Evening Safari",
          price: "149 AED | Per Person",
          features:[...features, "💎 VIP Table Service", "❄️ AC Seating Area", "🍽️ Unlimited Buffet"], // same icon + text array as before
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
          title: "Basic Morning Safari",
          price: "119 AED | Per Person",
          features: ["Pickup from your location", "🏨 Pick and drop from hotel/home", "📸 Photo opportunity on high dunes", "🐪 Camel Ride", "🚴‍♂️ Quad Bike", "🏄 Sand Boarding", "🏨 Drop back to hotel/residence", "🚗 Dune Bashing", "💎 Private Desert Safari", "💺 VIP seating with sunset views", "🍖 Luxury BBQ dinner under the stars", "📸 Professional photography services"],
          whatsappLink: "https://wa.me/971501234567",
          bookLink: "/book",
        },
        {
          image: "/images/morning-pic-2.png",
          title: "Morning Safari With Quad Bike",
          price: "249 AED | Per Person",
          features: ["Pickup from your location", "🏨 Pick and drop from hotel and home", "📸 Photo opportunity on high dunes", "🐪 Camel Ride", "🚴‍♂️ Quad Bike (30 Minutes)", "🏄 Sand Boarding", "🏨 Drop back to hotel/residence", "🚗 Dune Bashing", "💨 Hubbly Bubblee (Sheesha)", "🍽️ BBQ Dinner (Veg & Non-Veg Options)", "💺 VIP seating with sunset views", "🌸 Henna Painting", "🎭 Traditional Tanura Show"],
          whatsappLink: "https://wa.me/971501234567",
          bookLink: "/book",
        },
        {
          image: "/images/morning-pic-3.png",
          title: "VIP Morning Safari",
          price: "149 AED | Per Person",
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
    {
      id: "dune-buggy",
      title: "Desert safari with Dune Buggy",
      cards: [
        {
          image: "/images/private-desert-safari-1.png",
          title: "PRIVATE DESERT SAFARI WITH SAHARA FORTNESS DINNER",
          price: "699 AED | Per Group",
          features: features,
          whatsappLink: "https://wa.me/971501234567",
          bookLink: "/book",
        },
        {
          image: "/images/private-desert-safari-2.png",
          title: "PRIVATE DESERT SAFARI AT BAB AL SHAMS RESORT",
          price: "1049  AED | Per Group",
          features: features,
          whatsappLink: "https://wa.me/971501234567",
          bookLink: "/book",
        },
        {
          image: "/images/private-desert-safari-3.png",
          title: "DESERT SAFARI SHOW WITH FALCONRY WITH DINNER",
          price: "1399  AED | Per Person",
          features: features,
          whatsappLink: "https://wa.me/971501234567",
          bookLink: "/book",
        },
        
      ],
    },
    // Add more groups like VIP, Morning, Overnight, etc.
  ];
  