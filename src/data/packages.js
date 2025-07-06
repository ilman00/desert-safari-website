const features = [
  '🚙 Pickup & Drop off by 4×4 Vehicle',
  '⏰ Pickup Time: 3:00 – 3:30 pm',
  '🏨 Pick and Drop from Hotel/Home',
  '🚗 30–40 mins Dune Bashing',
  '🏄 Sand Boarding',
  '📸 Picture Point in Desert',
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

export const newPackageData = [
  {
    id: "evening",
    title: "Evening Desert Safari Dubai Deals",
    cards: [
      {
        image: "/images/basic-evening-safari.jpg",
        title: "Evening Desert Safari",
        whatsappLink: "https://wa.me/971501234567",
        bookLink: "/book",
        variants: [
          {
            name: "Evening Desert Safari",
            btnVal: "Basic",
            price: "89 AED | Per Person",
            features: [...features],
          },
          {
            name: "VIP Evening Safari",
            btnVal: "VIP",
            price: "149 AED | Per Person",
            features: [...features, "💎 VIP Setting Area", "🍽️ Unlimited Buffet"],
          },
        ],
      },
      {
        image: "/images/Gallery-Image-1-2.png",
        title: "Safari With Quad Bikes",
        whatsappLink: "https://wa.me/971501234567",
        bookLink: "/book",
        variants: [
          {
            name: "Safari With Quad Bikes",
            btnVal: "Quad Bikes",
            price: "199 AED | Per Person",
            features: [...features, "🚴‍♂️ 30 Minutes Quad Bike Ride"]
          }
        ],
      },
      {
        image: "/images/safari-dune-buggy-1.png", // Default image
        title: "Desert Safari with Dune Buggy",
        whatsappLink: "https://wa.me/971501234567",
        bookLink: "/book",
        variants: [
          {
            name: "Desert safari with Dune Buggy 1-Seater",
            price: "699 AED | Per Group",
            btnVal: "1-Seater",
            features: [
              "🚗 Doorstep Pickup in shared 4×4",
              "🏜️ Red Dune Bashing in shared 4×4",
              "⏳ 25-60 min Adventure",
              "💧 Free Drinks (Water, Soft Drinks, Coffee, Tea)",
              "🐪 Short Camel Ride",
              "🏄 Sandboarding",
              "🚙 1-Seater Dune Buggy Ride for 30 mints",
              "💃 Belly Dance Performance",
              "🕺 Tanoura Dance Performance",
              "🔥 Fire Show Performance",
              "🍪 Complimentary Snacks after sunset",
              "🍽️ BBQ Buffet (Vegetarian & Non-Veg)",
              "🚬 Separate Smoking Area",
              "🚻 Separate Toilets for Men & Women",
              "🚕 Drop-off at Designated Location",
              "🎨 Henna Painting on Hands",
              "👗 Arabic Costume for Photo Sessions",
              "🧑‍🏫 Trained Safari Guide for Assistance",
            ],
          },
          {
            name: "Desert safari with Dune Buggy 2-Seater",
            price: "1049 AED | Per Group",
            btnVal: "2-Seater",
            features: [
              "🚗 Doorstep Pickup in shared 4×4",
              "🏜️ Red Dune Bashing in shared 4×4",
              "⏳ 25-60 min Adventure",
              "💧 Free Drinks (Water, Soft Drinks, Coffee, Tea)",
              "🐪 Short Camel Ride",
              "🏄 Sandboarding",
              "🚙 30 mints 2-Seater Dune Buggy Ride",
              "🚙 1-Seater Dune Buggy Ride for 30 mints",
              "💃 Belly Dance Performance",
              "🕺 Tanoura Dance Performance",
              "🔥 Fire Show Performance",
              "🍪 Complimentary Snacks after sunset",
              "🍽️ BBQ Buffet (Vegetarian & Non-Veg)",
              "🚬 Separate Smoking Area",
              "🚻 Separate Toilets for Men & Women",
              "🚕 Drop-off at Designated Location",
              "🎨 Henna Painting on Hands",
              "👗 Arabic Costume for Photo Sessions",
              "🧑‍🏫 Trained Safari Guide for Assistance",
            ],
          },
          {
            name: "Desert safari with Dune Buggy 4-Seater",
            btnVal: "4-Seater",
            price: "1399 AED | Per Person",
            features: [
              "🚗 Doorstep Pickup in shared 4×4",
              "🏜️ Red Dune Bashing in shared 4×4",
              "⏳ 25-60 min Adventure",
              "💧 Free Drinks (Water, Soft Drinks, Coffee, Tea)",
              "🐪 Short Camel Ride",
              "🏄 Sandboarding",
              "🚙 30 mints 4-Seater Dune Buggy Ride",
              "💃 Belly Dance Performance",
              "🕺 Tanoura Dance Performance",
              "🔥 Fire Show Performance",
              "🍪 Complimentary Snacks after sunset",
              "🍽️ BBQ Buffet (Vegetarian & Non-Veg)",
              "🚬 Separate Smoking Area",
              "🚻 Separate Toilets for Men & Women",
              "🚕 Drop-off at Designated Location",
              "🎨 Henna Painting on Hands",
              "👗 Arabic Costume for Photo Sessions",
              "🧑‍🏫 Trained Safari Guide for Assistance",
            ],
          },
        ],
      }
    ],
  },



  {
    id: "morning",
    title: "Morning Desert Safari Tour Deals",
    cards: [
      {
        image: "/images/Morning-pic-1.png",
        title: "Morning Desert Safari",
        whatsappLink: "https://wa.me/971501234567",
        bookLink: "/book",
        variants: [
          {
            name: "Morning Desert Safari",
            btnVal: "Basic",
            price: "119 AED | Per Person",
            features: [
              "🚙 Pickup from your location",
              "🏨 Pick and drop from hotel/home",
              "📸 Photo opportunity on high dunes",
              "🏄 Sand Boarding",
              "🏨 Drop back to hotel/residence",
              "🚗 Dune Bashing",
              "📸 Professional photography services",
            ],
          },
        ],
      },
      {
        image: "/images/morning-pic-2.png",
        title: "Morning Desert Safari With Quad Bike",
        whatsappLink: "https://wa.me/971501234567",
        bookLink: "/book",
        variants: [
          {
            name: "Morning Safari With Quad Bike",
            btnVal: "Quad Bike",
            price: "249 AED | Per Person",
            features: [
              "🚙 Pickup from your location",
              "📅 Pickup Time: 8:00-8:30 AM",
              "🏨 Pick and drop from hotel and home",
              "📸 Photo opportunity on high dunes",
              "🚴‍♂️ Quad Bike (30 Minutes)",
              "🏄 Sand Boarding",
              "🏨 Drop back to hotel/residence",
              "🚗 Dune Bashing",
              "🧑‍🏫 With Professional Guide",
            ],
          },
        ],
      },
      {
        image: "/images/morning-pic-3.webp",
        title: "Private Morning Desert Safari",
        whatsappLink: "https://wa.me/971501234567",
        bookLink: "/book",
        variants: [
          {
            name: "Private Morning Safari",
            btnVal: "Private",
            price: "1149 AED | Per Person",
            features: [
              "🚙 Pickup from your location",
              "🏨 Pick and drop from hotel/home",
              "📸 Photo opportunity on high dunes",
              "🏄 Sand Boarding",
              "🐪 Camel Ride",
              "🚴‍♂️ Quad Bike (Extra Payment)",
              "🏨 Drop back to hotel/residence",
              "🚗 Dune Bashing",
              "📸 Professional photography services",
            ],
          },
        ],
      },
    ],
  },


  {
    id: "private",
    title: "Private Desert Safari",
    cards: [
      {
        image: "/images/private-desert-safari-1.png",
        title: "Private Desert Safari with Sahara Fortness Dinner",
        whatsappLink: "https://wa.me/971501234567",
        bookLink: "/book",
        variants: [
          {
            name: "Sahara Fortness Dinner",
            btnVal: "Sahara Dinner",
            price: "2049 AED | Per Group",
            features: [
              "🚗 Private pickup from your location",
              "🚙 4×4 SUV for thrilling safari & camp",
              "🏆 DTCM Approved Desert Safari Guide",
              "🏜️ 30-min Thrilling Dune Bashing",
              "📸 Photo stop at high dunes",
              "🏂 Sandboarding down the dunes",
              "🐪 Short Camel ride",
              "☕ Traditional welcome with Arabic Tea & Coffee",
              "✍️ Free Henna Tattoo",
              "👗 Arabic Dress Photography",
              "🥤 Unlimited Soft Drinks, Cold Water, Tea",
              "🍽️ 5-Star International & Arabian Cuisine",
              "💡 Light & Sound Show on Stage & Camp",
              "🎶 Oud Music Performance",
              "💃 Sufi Dance",
              "💃 Tanoura Dance",
              "🕺 Saidi & Belly Dance",
              "🔥 Live Fire Show",
              "🎶 Farewell Song by Mascot",
              "🚗 Private drop-off to your location",
            ],
          },
        ],
      },
      {
        image: "/images/private-desert-safari-2.png",
        title: "Private Desert Safari at Bab Al Shams Resort",
        whatsappLink: "https://wa.me/971501234567",
        bookLink: "/book",
        variants: [
          {
            name: "Bab Al Shams Resort",
            btnVal: "Bab Al Shams",
            price: "2450 AED | Per Group",
            features: [...features], // replace with actual features if available
          },
        ],
      },
      {
        image: "/images/private-desert-safari-3.png",
        title: "Desert Safari Show with Falconry & Dinner",
        whatsappLink: "https://wa.me/971501234567",
        bookLink: "/book",
        variants: [
          {
            name: "Falconry Show & Dinner",
            btnVal: "Falcon Show",
            price: "1999 AED | Per Person",
            features: [...features], // replace with actual features if available
          },
        ],
      },
    ],
  }
  


  // more sections...
];


export const packageData = [
  {
    id: "evening",
    title: "Evening Desert Safari Dubai Deals",
    cards: [
      {
        image: "/images/basic-evening-safari.jpg",
        title: "Evening Desert Safari",
        price: "89 AED | Per Person",
        features: features, // same icon + text array as before
        whatsappLink: "https://wa.me/971501234567",
        bookLink: "/book",
      },
      {
        image: "/images/Gallery-Image-1-2.png",
        title: "Safari With Quad Bikes",
        price: "199 AED | Per Person",
        features: [...features, "🚴‍♂️ 30 Minutes Quad Bike Ride"], // same icon + text array as before
        whatsappLink: "https://wa.me/971501234567",
        bookLink: "/book",
      },
      {
        image: "/images/Gallery-Image-1-1-1.png",
        title: "VIP Evening Safari",
        price: "149 AED | Per Person",
        features: [...features, "💎 VIP Setting Area", "🍽️ Unlimited Buffet"], // same icon + text array as before
        whatsappLink: "https://wa.me/971501234567",
        bookLink: "/book",
      },
      // more evening cards
    ],
  },
  {
    id: "Morning",
    title: "Morning Desert Safari Tour Deals",
    cards: [
      {
        image: "/images/Morning-pic-1.png",
        title: "Morning Desert Safari",
        price: "119 AED | Per Person",
        features: ["🚙 Pickup from your location", "🏨 Pick and drop from hotel/home", "📸 Photo opportunity on high dunes", "🏄 Sand Boarding", "🏨 Drop back to hotel/residence", "🚗 Dune Bashing", "📸 Professional photography services"],
        whatsappLink: "https://wa.me/971501234567",
        bookLink: "/book",
      },
      {
        image: "/images/morning-pic-2.png",
        title: "Morning Desert Safari With Quad Bike",
        price: "249 AED | Per Person",
        features: ["🚙 Pickup from your location", "Picup Time: 8:00-8:30 am", "🏨 Pick and drop from hotel and home", "📸 Photo opportunity on high dunes", "🚴‍♂️ Quad Bike (30 Minutes)", "🏄 Sand Boarding", "🏨 Drop back to hotel/residence", "🚗 Dune Bashing", "With Professional Guid"],
        whatsappLink: "https://wa.me/971501234567",
        bookLink: "/book",
      },
      {
        image: "/images/morning-pic-3.webp",
        title: "Private Morning Desert Safari",
        price: "1149 AED | Per Person",
        features: ["🚙 Pickup from your location", "🏨 Pick and drop from hotel/home", "📸 Photo opportunity on high dunes", "🏄 Sand Boarding", "🐪 Camel Ride", "🚴‍♂️ Quad Bike (Extra Payment) ", "🏨 Drop back to hotel/residence", "🚗 Dune Bashing", "📸 Professional photography services"],
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
        features: [
          "🚗 Private pickup from your location",
          "🚙 4×4 SUV for thrilling safari & camp",
          "🏆 DTCM Approved Desert Safari Guide",
          "🏜️ 30-min Thrilling Dune Bashing",
          "📸 Photo stop at high dunes",
          "🏂 Sandboarding down the dunes",
          "🐪 Short Camel ride",
          "☕ Traditional welcome with Arabic Tea & Coffee",
          "✍️ Free Henna Tattoo",
          "👗 Arabic Dress Photography",
          "🥤 Unlimited Soft Drinks, Cold Water, Tea",
          "🍽️ 5-Star International & Arabian Cuisine",
          "💡 Light & Sound Show on Stage & Camp",
          "🎶 Oud Music Performance",
          "💃 Sufi Dance",
          "💃 Tanoura Dance",
          "🕺 Saidi & Belly Dance",
          "🔥 Live Fire Show",
          "🎶 Farewell Song by Mascot",
          "🚗 Private drop-off to your location"
        ],
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
        image: "/images/safari-dune-buggy-1.png",
        title: "ONE SEATER DUNE BUUGY WITH DESERT SAFARI",
        price: "699 AED | Per Group",
        features: ["🚗 Doorstep Pickup in shared 4×4", "🏜️ Red Dune Bashing in shared 4×4", "⏳ 25-60 min Adventure", "💧 Free Drinks (Water, Soft Drinks, Coffee, Tea)", "🐪 Short Camel Ride", "🏄 Sandboarding", "🚙 1-Seater Dune Buggy Ride for 30 mints", "🚙 1-Seater Dune Buggy Ride for 30 mints", "💃 Belly Dance Performance", "🕺 Tanoura Dance Performance", "🔥 Fire Show Performance", "🍪 Complimentary Snacks after sunset", "🍽️ BBQ Buffet (Vegetarian & Non-Veg)", "🚬 Separate Smoking Area", "🚻 Separate Toilets for Men & Women", "🚕 Drop-off at Designated Location", "🎨 Henna Painting on Hands", "👗 Arabic Costume for Photo Sessions", "🧑‍🏫 Trained Safari Guide for Assistance"],
        whatsappLink: "https://wa.me/971501234567",
        bookLink: "/book",
      },
      {
        image: "/images/safari-dune-buggy-2.png",
        title: "TWO SEATER DUNE BUUGY WITH DESERT SAFARI",
        price: "1049  AED | Per Group",
        features: ["🚗 Doorstep Pickup in shared 4×4", "🏜️ Red Dune Bashing in shared 4×4", "⏳ 25-60 min Adventure", "💧 Free Drinks (Water, Soft Drinks, Coffee, Tea)", "🐪 Short Camel Ride", "🏄 Sandboarding", "🚙 30 mints 2-Seater Dune Buggy Ride", "🚙 1-Seater Dune Buggy Ride for 30 mints", "💃 Belly Dance Performance", "🕺 Tanoura Dance Performance", "🔥 Fire Show Performance", "🍪 Complimentary Snacks after sunset", "🍽️ BBQ Buffet (Vegetarian & Non-Veg)", "🚬 Separate Smoking Area", "🚻 Separate Toilets for Men & Women", "🚕 Drop-off at Designated Location", "🎨 Henna Painting on Hands", "👗 Arabic Costume for Photo Sessions", "🧑‍🏫 Trained Safari Guide for Assistance"],
        whatsappLink: "https://wa.me/971501234567",
        bookLink: "/book",
      },
      {
        image: "/images/safari-dune-buggy-3.png",
        title: "FOUR SEATER DUNE BUUGY WITH DESERT SAFARI",
        price: "1399  AED | Per Person",
        features: ["🚗 Doorstep Pickup in shared 4×4", "🏜️ Red Dune Bashing in shared 4×4", "⏳ 25-60 min Adventure", "💧 Free Drinks (Water, Soft Drinks, Coffee, Tea)", "🐪 Short Camel Ride", "🏄 Sandboarding", "🚙 30 mints 4-Seater Dune Buggy Ride", "💃 Belly Dance Performance", "🕺 Tanoura Dance Performance", "🔥 Fire Show Performance", "🍪 Complimentary Snacks after sunset", "🍽️ BBQ Buffet (Vegetarian & Non-Veg)", "🚬 Separate Smoking Area", "🚻 Separate Toilets for Men & Women", "🚕 Drop-off at Designated Location", "🎨 Henna Painting on Hands", "👗 Arabic Costume for Photo Sessions", "🧑‍🏫 Trained Safari Guide for Assistance"],
        whatsappLink: "https://wa.me/971501234567",
        bookLink: "/book",
      },

    ],
  },
  // Add more groups like VIP, Morning, Overnight, etc.
];
