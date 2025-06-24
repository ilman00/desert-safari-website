import PackagesSection from "@/components/PackageSection"
import { packageData } from "@/data/packages";
import DubaiCityTourSection from "@/components/DubaiCityTourSection";
export default function(){
    return (
        <>
        {packageData.map((group) => (
            <PackagesSection
              key={group.id}
              id={group.id}
              title={group.title}
              cards={group.cards}
            />
          ))}

          <DubaiCityTourSection />
        </>
    )
}