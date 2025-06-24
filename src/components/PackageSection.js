// "use client";

// import { useInView } from "react-intersection-observer";
// import { useEffect, useState } from "react";
import PackageCard from "./PackageCard";

export default function PackagesSection({ title, id, cards }) {
  // const { ref, inView } = useInView({
  //   threshold: 0.2,
  //   triggerOnce: true,
  // });

  // const [hasAnimated, setHasAnimated] = useState(false);

  // useEffect(() => {
  //   if (inView) setHasAnimated(true);
  // }, [inView]);

  return (
    <section
      id={id}
      // ref={ref}
      className="py-5 bg-light"
      // style={{
      //   transform: hasAnimated ? "translateX(0)" : "translateX(-200px)",
      //   opacity: hasAnimated ? 1 : 0.0,
      //   transition: "all 0.8s ease-out",
      // }}
    >
      <div className="container-fluid">
        <h2 className="text-center mb-5">{title}</h2>
        <div className="row">
          {cards.map((card, index) => (
            <div key={index} className="col-md-4 mb-4">
              <PackageCard {...card} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
