import PackageCard from "./PackageCard";

export default function PackagesSection({ title, id, cards }) {
  return (
    <section className="py-5 bg-light" id={id}>
      <div className="container">
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
