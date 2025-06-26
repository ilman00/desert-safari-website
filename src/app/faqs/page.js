// app/faq/page.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import faqData from './faqdata';

export const metadata = {
  title: "FAQ | Desert Safari Dubai",
  description: "Get answers to the most frequently asked questions about our desert safari experiences.",
};

export default function FAQPage() {
  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Frequently Asked Questions</h1>
      <p className="text-center text-muted mb-5">
        Find answers to common questions about our desert safari services.
      </p>

      <div className="accordion" id="faqAccordion">
        {faqData.map((item, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header" id={`heading${index}`}>
              <button
                className={`accordion-button ${index !== 0 ? 'collapsed' : ''}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${index}`}
                aria-expanded={index === 0 ? 'true' : 'false'}
                aria-controls={`collapse${index}`}
              >
                {item.question}
              </button>
            </h2>
            <div
              id={`collapse${index}`}
              className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
              aria-labelledby={`heading${index}`}
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">{item.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
