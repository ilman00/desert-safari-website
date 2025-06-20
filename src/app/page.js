import Hero from "../components/Hero"
import Testimonials from "../components/Testimonials"
import CTA from "../components/CTA"
import TopNavbar from "@/components/Topnavbar"
import SecondNavbar from "../components/SecondNavbar";
import { packageData } from "@/data/packages";
import PackagesSection from "../components/PackageSection";

export default function HomePage() {
  return (
    <>
      <TopNavbar />
      <SecondNavbar />  
      <Hero />
      {packageData.map((group) => (
        <PackagesSection
          key={group.id}
          id={group.id}
          title={group.title}
          cards={group.cards}
        />
      ))}
      <Testimonials />
      <CTA />
    </>
  );
}
