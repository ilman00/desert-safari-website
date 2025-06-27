import PackageCard from "./PackageCard";

export default function PackagesSection({ title, id, cards }) {

  return (
    <section
      id={id}
      className="py-5 bg-light"
      
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
