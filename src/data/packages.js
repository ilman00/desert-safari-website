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
        image: "/images/evening-desert-safari.jpg",
        title: "Evening Desert Safari",
        whatsappLink: "https://wa.me/971501234567",
        bookLink: "/book",
        variants: [
          {
            name: "Evening Desert Safari",
            btnVal: "Basic",
            price: "3 AED | Per Person",
            isGroupPackage: false,
            features: [...features],
          },
          {
            name: "VIP Evening Safari",
            btnVal: "VIP",
            price: "149 AED | Per Person",
            isGroupPackage: false,
            features: [...features, "💎 VIP Setting Area", "🍽️ Unlimited Buffet"],
          },
          {
            name: "Private Vahicle 4x4 Evening Desert Safari",
            btnVal: "Private",
            price: "950 AED | Upto 6 Person",
            isGroupPackage: true,
            maxPeople: 7,
            features: [...features],
          },
        ],
      },
      {
        image: "/images/quad-bikes.jpg",
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
        image: "/images/dune-buggy.png", // Default image
        title: "Desert Safari with Dune Buggy",
        whatsappLink: "https://wa.me/971501234567",
        bookLink: "/book",
        variants: [


          {
            name: "Evening Desert Safari With Dune Buggy",
            btnVal: "Dune Buggy",
            price: "799 AED | Per Two person",
            isGroupPackage: true,
            maxPeople: 2,
            features: [
              "🚗 Doorstep Pickup in shared 4×4",
              "🏜️ Red Dune Bashing in shared 4×4",
              "⏳ 25-60 min Adventure",
              "💧 Free Drinks (Water, Soft Drinks, Coffee, Tea)",
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
          {
            name: "Evening Desert Safari With Canam",
            btnVal: "Canam",
            price: "899 AED | Per Person",
            isGroupPackage: true,
            maxPeople: 4,
            features: [
              "🚗 Doorstep Pickup in shared 4×4",
              "🏜️ Red Dune Bashing in shared 4×4",
              "⏳ 25-60 min Adventure",
              "💧 Free Drinks (Water, Soft Drinks, Coffee, Tea)",
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
            isGroupPackage: false,
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

          {
            name: "Morning Safari With Quad Bike",
            btnVal: "Quad Bike",
            price: "249 AED | Per Person",
            isGroupPackage: false,
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
            name: "Private Vahicle 4x4 Morning Desert Safari",
            btnVal: "Private",
            price: "1149 AED | Upto 6 Persons",
            isGroupPackage: true,
            maxPeople: 6,
            features: [
              "🚙 Pickup from your location by a Private 4x4 Vahicle",
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
      {
        image: "/images/morning-pic-2.png",
        title: "Morning Desert Safari With Dune Bunny",
        whatsappLink: "https://wa.me/971501234567",
        bookLink: "/book",
        variants: [
          {
            name: "Morning Desert Safari With Dune Buggy",
            btnVal: "Dune Buggy",
            price: "1399 AED | Per Person",
            isGroupPackage: false,
            features: [
              "🚗 Doorstep Pickup in shared 4×4",
              "🏜️ Red Dune Bashing in shared 4×4",
              "⏳ 25-60 min Adventure",
              "💧 Free Drinks (Water, Soft Drinks, Coffee, Tea)",
              "🏄 Sandboarding",
              "🚙 30 mints 4-Seater Dune Buggy Ride",
              "🍪 Complimentary Snacks after sunset",
              "🚬 Separate Smoking Area",
              "🚻 Separate Toilets for Men & Women",
              "🚕 Drop-off at Designated Location",
              "👗 Arabic Costume for Photo Sessions",
              "🧑‍🏫 Trained Safari Guide for Assistance",
            ],
          },
          {
            name: "Morning Desert Safari With Canam",
            btnVal: "Canam",
            price: "1399 AED | Per Person",
            isGroupPackage: false,
            features: [
              "🚗 Doorstep Pickup in shared 4×4",
              "🏜️ Red Dune Bashing in shared 4×4",
              "⏳ 25-60 min Adventure",
              "💧 Free Drinks (Water, Soft Drinks, Coffee, Tea)",
              "🐪 Short Camel Ride",
              "🏄 Sandboarding",
              "🚙 30 mints 4-Seater Canam",
              "🍪 Complimentary Snacks after sunset",
              "🚬 Separate Smoking Area",
              "🚻 Separate Toilets for Men & Women",
              "🚕 Drop-off at Designated Location",
              "👗 Arabic Costume for Photo Sessions",
              "🧑‍🏫 Trained Safari Guide for Assistance",
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
        "bookingBtn": false,
        variants: [
          {
            name: "Sahara Fortness Dinner",
            // btnVal: "Sahara Dinner",
            // price: "2049 AED | Per Group",
            isGroupPackage: false,
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
        "bookingBtn": false,
        variants: [
          {
            name: "Bab Al Shams Resort",
            // btnVal: "Bab Al Shams",
            // price: "2450 AED | Per Group",
            features: [...features], // replace with actual features if available
          },
        ],
      },
      {
        image: "/images/private-desert-safari-3.png",
        title: "Desert Safari Show with Falconry & Dinner",
        whatsappLink: "https://wa.me/971501234567",
        bookLink: "/book",
        "bookingBtn": false,
        variants: [
          {
            name: "Falconry Show & Dinner",
            // btnVal: "Falcon Show",
            // price: "1999 AED | Per Person",
            features: [...features], // replace with actual features if available
          },
        ],
      },
    ],
  }
];


