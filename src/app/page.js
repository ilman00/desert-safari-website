import Hero from "../components/Hero"
import Testimonials from "../components/Testimonials"
import { packageData } from "@/data/packages";
import PackagesSection from "../components/PackageSection";
import DubaiCityTourSection from "../components/DubaiCityTourSection";
import DiscoverSection from "../components/DiscoverSection";
import { newPackageData } from "@/data/packages";

export default function HomePage() {
  return (
    <>
      
      <Hero />
      {newPackageData.map((section, index) => (
        <PackagesSection
          key={index}
          id={section.id}
          title={section.title}
          cards={section.cards}
        />
      ))}
     
      <DubaiCityTourSection />
      <DiscoverSection />
      <Testimonials />
    </>
  );
}
