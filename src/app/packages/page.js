import PackagesSection from "@/components/PackageSection"
import { newPackageData } from "@/data/packages";
import DubaiCityTourSection from "@/components/DubaiCityTourSection";
export default function Packages(){
    return (
        <>
        {newPackageData.map((section, index) => (
          <PackagesSection
            key={index}
            id={section.id}
            title={section.title}
            cards={section.cards}
          />
        ))}

          <DubaiCityTourSection />
        </>
    )
}