import DubaiCityTourCard from "./DubaiCityTourCard"; // Make sure this path matches your file structure
import Image from "next/image";
export default function CardsSection() {
  const cardsData = [

    {
      title: "Dubai City Tour",
      image: "/images/dubai-city-tours-2.webp",
      price: "AED 125 | PER PERSON",
      description:
        "Let us guide you on a Desert Safari Dubai City Tour. Dubai, known for its glitz and glamour, offers unforgettable Desert Safari experiences along with a fascinating history you won’t believe.",
      buttonText: "Book Now",
      buttonLink: "https://wa.me/971500000000",
    },

    {
      title: "Abu Dhabi City Tour",
      image: "/images/abu-dhabi-city-tours.webp",
      price: "AED 150 | PER PERSONs",
      description:
        "A city tour will show you Abu Dhabi’s changes, but a desert safari Dubai experience will reveal the true essence of Arabian culture. This UAE city tour blends old and modern traditions, life, and people. On the city trip, we’ll visit Sheik Zayed and explore the breathtaking desert landscapes, offering a unique blend of adventure and culture in Dubai’s heart.",
      buttonText: "Book Now",
      buttonLink: "https://wa.me/971500000000",
    },

    {
      title: "Museum Of Future",
      image: "/images/museum-of-future.webp",
      price: "140 AED | PER PERSON",
      description:
        "A city tour will show you Abu Dhabi’s changes, but a desert safari Dubai experience will reveal the true essence of Arabian culture. This UAE city tour blends old and modern traditions, life, and people. On the city trip, we’ll visit Sheik Zayed and explore the breathtaking desert landscapes, offering a unique blend of adventure and culture in Dubai’s heart.",
      buttonText: "Book Now",
      buttonLink: "https://wa.me/971500000000",
    }, {
      title: "Ferrari World Abu Dhabi",
      image: "/images/ferrari-world-abu-dhabi.webp",
      price: "265 AED | PER PERSON",
      description:
        "Ferrari World Abu Dhabi, located on Yas Island in Abu Dhabi, UAE, is the first Ferrari-branded theme park in the world and boasts the largest space frame structure ever created. This iconic park features the thrilling Formula Rossa, the world’s fastest roller coaster. Ferrari World Abu Dhabi offers an unforgettable experience for adrenaline seekers and Ferrari enthusiasts alike, making it a must-visit destination in the UAE.",
      buttonText: "Book Now",
      buttonLink: "https://wa.me/971500000000",
    },
    {
      title: "Museum Of Future",
      image: "/images/img-world-of-adventure.webp",
      price: "195 AED | PER PERSON",
      description:
        "IMG Worlds of Adventure is the world’s largest indoor theme and amusement park in Dubai, UAE. As Dubai's first mega themed entertainment destination, IMG Worlds of Adventure offers an exciting desert safari experience with six epic adventure zones in one location. Explore thrilling rides, attractions, and unique desert adventures that promise an unforgettable experience for visitors from around the world. Immerse yourself in the best indoor theme park experience in Dubai and create lasting memories with your loved ones at IMG Worlds of Adventure.",
      buttonText: "Book Now",
      buttonLink: "https://wa.me/971500000000",
    }

  ];

  return (
    <section className="container-fluid py-5" style={{ backgroundColor: "#eeeeee" }}>
      <div className="row">
        {/* Left Text/Image Column */}
        <div className="col-12 col-lg-3 mb-4">
          <p>Best City tour in UAE</p>
          <h2>UAE CITY TOURS</h2>
          <p>
            We dedicate the experts of qualified and skilled tour guides at Dubai Guide Tours to presenting the best
            <strong> Dubai tour</strong>. Here is the unlock why choose <strong>Safari Desert AE</strong>.
          </p>
          <Image
            src="/images/dubai-city-tours-1.jpg"
            alt="Dubai City Tour"
            width={800} // adjust based on actual image size or desired ratio
            height={500}
            className="img-fluid rounded"
          />
        </div>

        {/* Cards Grid */}
        <div className="col-12 col-lg-9">
          <div className="row g-4">
            {cardsData.map((card, index) => (
              <div key={index} className="col-12 col-md-6">
                <DubaiCityTourCard {...card} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

  );
}
