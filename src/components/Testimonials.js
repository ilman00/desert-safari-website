// components/Testimonials.js
export default function Testimonials() {
    return (
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-4">What Our Customers Say</h2>
          <div className="row">
            <div className="col-md-6">
              <blockquote className="blockquote">
                <p>"Absolutely the best experience in Dubai! Loved the dune bashing."</p>
                <footer className="blockquote-footer">Sarah M.</footer>
              </blockquote>
            </div>
            <div className="col-md-6">
              <blockquote className="blockquote">
                <p>"Great hospitality, amazing BBQ and shows. Highly recommended!"</p>
                <footer className="blockquote-footer">James K.</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>
    );
  }
  