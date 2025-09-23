import DubaiCityTourCard from "./DubaiCityTourCard"; // Make sure this path matches your file structure
import Image from "next/image";
import PackageOptionsCard from "./PackageOptionsCard";


export default function CardsSection() {
  const cardsData = [
    // { 
    //   id: "hot-air-ballon",
    //   title: "Hot Air Balloon Ride",
    //   image: "/images/hot-air-balloon-tour.webp",
    //   price: "AED 1050 | PER PERSON",
    //   description:
    //     "Experience the magic of Dubai from the sky with our Hot Air Balloon Ride. Witness a breathtaking sunrise over the desert and enjoy panoramic views that will leave you speechless.",
    //   buttonText: "Book Now",
    //   buttonLink: "https://wa.me/971500000000",
    // },


    {
      id: "bubai-city-tour",
      title: "Dubai City Tour",
      image: "/images/dubai-city-tours-2.webp",
      price: "AED 125 | PER PERSON",
      description:
        "Discover the best of Dubai with our immersive City Tour. From iconic landmarks like the Burj Khalifa and Palm Jumeirah to the vibrant souks and historic Al Fahidi district, experience the perfect blend of modern marvels and rich cultural heritage. Ideal for first-time visitors and explorers alike!",
      buttonText: "Book Now",
      buttonLink: "https://wa.me/+971504247436",
    },

    {
      id: "abu-dhabi-city-tour",
      title: "Abu Dhabi City Tour",
      image: "/images/abu-dhabi-city-tours.webp",
      price: "AED 150 | PER PERSONs",
      description:
        "A city tour through Abu Dhabi unveils the perfect blend of tradition and modernity, showcasing the heart of the UAE’s capital. From the architectural marvel of Sheikh Zayed Grand Mosque to the elegant Corniche and cultural landmarks, this journey reflects the city’s transformation while honoring its deep-rooted heritage. Discover how Abu Dhabi gracefully balances its historical charm with futuristic ambition.",
      buttonText: "Book Now",
      buttonLink: "https://wa.me/+971504247436",
    },

    {
      id: "Museum-of-future",
      title: "Museum Of Future",
      image: "/images/museum-of-future.webp",
      price: "140 AED | PER PERSON",
      description:
        "A city tour will show you Dubai’s remarkable transformation, but a visit to the Museum of the Future reveals the city's vision for what lies ahead. This iconic landmark embodies the UAE’s fusion of innovation, culture, and imagination. As part of the tour, we’ll explore this architectural marvel and discover exhibitions that blend science, technology, and heritage—offering a glimpse into the future from the heart of Dubai.",
      buttonText: "Book Now",
      buttonLink: "https://wa.me/+971504247436",
    },
    {
      id: "ferrari-world-abu-dhabi",
      title: "Ferrari World Abu Dhabi",
      image: "/images/ferrari-world-abu-dhabi.webp",
      price: "265 AED | PER PERSON",
      description:
        "Ferrari World Abu Dhabi, situated on Yas Island, is the world’s first Ferrari-branded theme park and home to the largest space frame structure ever built. This iconic destination features Formula Rossa — the fastest roller coaster on the planet — delivering an adrenaline rush like no other. Whether you're a thrill-seeker or a devoted Ferrari fan, Ferrari World promises an unforgettable experience and is a must-visit attraction in the UAE.",
      buttonText: "Book Now",
      buttonLink: "https://wa.me/+971504247436",
    },
    {
      id: "img-world-of-adventure",
      title: "IMG Worlds Of Adventure",
      image: "/images/img-world-of-adventure.webp",
      price: "195 AED | PER PERSON",
      description:
        "IMG Worlds of Adventure is the world’s largest indoor theme and amusement park, located in Dubai, UAE. As Dubai's first mega-themed entertainment destination, it features six immersive adventure zones packed with thrilling rides, beloved cartoon characters, and adrenaline-pumping attractions. From Marvel superheroes to dinosaur adventures, IMG Worlds offers unforgettable fun for families and thrill-seekers alike — all under one climate-controlled roof. Step into a world of excitement and create lasting memories at Dubai’s premier indoor theme park.",
      buttonText: "Book Now",
      buttonLink: "https://wa.me/+971504247436",
    },
    {
      id: "burj-khalifa-tour",
      title: "Burj Khalifa Tour",
      image: "/images/burj-khalifa-dubai-tour.jpeg",
      price: "AED 180 | PER PERSON",
      description:
        "Step into the clouds with our Burj Khalifa Tour and enjoy breathtaking views from the world’s tallest building. Ride the high-speed elevator to the observation deck, capture unforgettable photos, and take in the panoramic skyline from the iconic 'At The Top' experience. A must-visit for every traveler!",
      buttonText: "Book Now",
      buttonLink: "https://wa.me/+971504247436",
    }


  ];

  return (
    <section className="container-fluid py-5" style={{ backgroundColor: "#eeeeee" }} id="UAE-city-tours">
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
            <div id="hot-air-balloon" className="col-12 col-md-6">
              <PackageOptionsCard
                id="hot-air-balloon"
                title="Hot Air Balloon Ride"
                image="/images/hot-air-balloon-tour.webp"
                description="Soar above the golden dunes with our Hot Air Balloon Ride. Take off at sunrise for a peaceful flight over the vast desert landscape, witnessing breathtaking views and serene silence you’ll never forget."
                options={[
                  { label: "Without Breakfast", price: "AED 950 | PER PERSON" },
                  { label: "With Breakfast", price: "AED 1050 | PER PERSON" },
                ]}
              />
            </div>
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
