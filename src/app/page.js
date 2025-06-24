import Hero from "../components/Hero"
import Testimonials from "../components/Testimonials"
import { packageData } from "@/data/packages";
import PackagesSection from "../components/PackageSection";
import DubaiCityTourSection from "../components/DubaiCityTourSection";
import DiscoverSection from "../components/DiscoverSection";

export default function HomePage() {
  return (
    <>
      
      <Hero />
      {packageData.map((group) => (
        <PackagesSection
          key={group.id}
          id={group.id}
          title={group.title}
          cards={group.cards}
        />
      ))}
      <DubaiCityTourSection />
      <DiscoverSection />
      <Testimonials />
    </>
  );
}
