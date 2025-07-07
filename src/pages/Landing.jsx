import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import FloatingChatbot from "../components/FloatingChatbot";





const Landing = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="bg-secondary text-gray-800 scroll-smooth">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/50 shadow px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-primary flex items-center gap-2">
          <img src="/src/assets/medical-team.png" className="w-8 h-8 md:w-10 md:h-10" alt="Logo" />
          ENTNT Dental Craft
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <a href="#home" className="hover:underline">Home</a>
          <a href="#about" className="hover:underline">About</a>
          <a href="#services" className="hover:underline">Services</a>
          <a href="#doctors" className="hover:underline">Doctors</a>
          <a href="#testimonials" className="hover:underline">Testimonials</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </nav>
        <Link
          to="/login"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Book Appointment
        </Link>
      </header>

      {/* Hero */}
      <section
        id="home"
        className="pt-5 scroll-mt-20 min-h-[100vh] flex flex-col items-center justify-center text-center px-6 md:px-12 lg:px-24 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/src/assets/Hero_Section.png')",
        }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4" data-aos="fade-up">
          Your Smile, Our Passion
        </h1>
        <p className="text-lg md:text-xl mb-6" data-aos="fade-up" data-aos-delay="200">
          Affordable and Trusted Dental Care for the Whole Family
        </p>
        <div className="flex flex-wrap justify-center gap-4" data-aos="fade-up" data-aos-delay="400">
          <Link to="/login" className="bg-primary text-white px-6 py-3 rounded hover:bg-blue-700 transition">
            Book an Appointment
          </Link>
          <a href="#services" className="bg-white border border-primary text-primary px-6 py-3 rounded hover:bg-primary hover:text-white transition">
            View Services
          </a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 px-6 text-center scroll-mt-20" data-aos="fade-right">
        <h2 className="text-3xl font-bold text-primary mb-4">About Us</h2>
        <p className="max-w-3xl mx-auto text-gray-700">
          Founded in 2015, ENTNT Dental Center offers compassionate, high-tech dental care. Our mission is to brighten lives one smile at a time.
        </p>
        <img
          src="src/assets/ENTNTdc.jpg"
          alt="clinic"
          className="mt-6 mx-auto rounded-lg shadow-lg max-w-xlg"
        />
      </section>

      {/* Services */}
      <section id="services" className="py-16 px-6 bg-white scroll-mt-20" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-center text-primary mb-10">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto text-center">
          {[
            { name: "Teeth Cleaning", img: "src/assets/toothCleaning.png" },
            { name: "Dental Implants", img: "src/assets/dentalImplant.png" },
            { name: "Braces & Aligners", img: "src/assets/bracesAligners.png" },
            { name: "Root Canal", img: "src/assets/rootCanal.png" },
            { name: "Pediatric Dentistry", img: "src/assets/pediatric dentistry.png" },
            { name: "Cosmetic Dentistry", img: "src/assets/cosmeticDentistry.png" },
            { name: "Wisdom Tooth Removal", img: "src/assets/wisdomToothRemoval.png" },
            { name: "Emergency Dental Care", img: "src/assets/emergencyDentalCare.png" },
          ].map((service, index) => (
            <div
              key={index}
              className="bg-secondary p-4 rounded shadow hover:shadow-lg transition"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <img
                src={service.img}
                alt={service.name}
                className="w-30 h-30 mx-auto mb-3 object-contain "
              />
              <h3 className="font-semibold text-sm md:text-base">{service.name}</h3>
            </div>
          ))}
        </div>
      </section>


      {/* Why Choose Us */}
      <section className="py-16 px-6 bg-secondary scroll-mt-20" data-aos="fade-left">
        <h2 className="text-3xl font-bold text-center text-primary mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto text-center">
          {[
            { title: "Certified Professionals", img: "src/assets/certifiedProffesionals.png" },
            { title: "Latest Equipment", img: "src/assets/latestEquipment.png" },
            { title: "Hygienic Environment", img: "src/assets/hygenic.png" },
            { title: "Affordable Pricing", img: "src/assets/affordable.png" },
            { title: "24/7 Emergency Care", img: "src/assets/24-7.png" },
            { title: "Free First Consultation", img: "src/assets/free.png" },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded shadow hover:shadow-xl transition"
              data-aos="flip-up"
            >
              <img
                src={feature.img}
                alt={feature.title}
                className="w-20 h-20 mx-auto mb-3 object-contain"
              />
              <h4 className="font-medium text-sm md:text-base">{feature.title}</h4>
            </div>
          ))}
        </div>
      </section>


      {/* Doctors */}
      <section id="doctors" className="py-16 px-6 bg-white scroll-mt-20" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-center text-primary mb-10">Meet Our Dentists</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto text-center">
          {["Dr. Kavitha", "Dr. Ram Kumar", "Dr. Priya"].map((doc, index) => (
            <div key={index} className="bg-secondary p-6 rounded-lg shadow hover:shadow-lg transition" data-aos="zoom-in">
              <img src={`https://i.pravatar.cc/150?img=${index + 15}`} alt="doctor" className="w-24 h-24 rounded-full mx-auto mb-4" />
              <h4 className="text-lg font-semibold">{doc}</h4>
              <p className="text-sm text-gray-600">General Dentist</p>
              <p className="mt-2 italic">"Making every smile count!"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 px-6 bg-secondary text-center scroll-mt-20" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-primary mb-10">What Our Patients Say</h2>
        <div className="max-w-4xl mx-auto space-y-6">
          {[
            { name: "Anjali", text: "They helped me conquer my fear of the dentist!" },
            { name: "Vikram", text: "Best root canal experience ever!" },
            { name: "Sneha", text: "My smile has never looked better." }
          ].map((review, index) => (
            <div key={index} className="bg-white p-6 rounded shadow" data-aos="fade-up" data-aos-delay={index * 200}>
              <p className="text-gray-700 italic">"{review.text}"</p>
              <p className="mt-2 font-semibold text-primary">- {review.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 px-6 bg-white scroll-mt-20" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">Before & After Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <img src="/src/assets/before.png" alt="Before" className="rounded shadow-lg hover:scale-105 transition" />
          <img src="/src/assets/after.png" alt="After" className="rounded shadow-lg hover:scale-105 transition" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-6 bg-primary text-white text-center scroll-mt-20" data-aos="zoom-in">
        <h2 className="text-3xl font-bold mb-4">Ready for a Healthier Smile?</h2>
        <p className="mb-6">Book your appointment with our expert team today!</p>
        <Link to="/login" className="bg-white text-primary px-6 py-3 rounded hover:bg-gray-100 transition">
          Book Appointment
        </Link>
      </section>

      {/* FAQs */}
      <section className="py-16 px-6 bg-secondary scroll-mt-20" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-primary text-center mb-10">FAQs</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {[
            { q: "Is dental treatment painful?", a: "Most treatments are done under anesthesia and are painless." },
            { q: "Do you accept insurance?", a: "Yes, we work with most major dental insurance plans." },
            { q: "How long does a check-up take?", a: "Usually about 20–30 minutes." },
            { q: "Are walk-ins allowed?", a: "Yes, but appointments are preferred." }
          ].map((faq, i) => (
            <div key={i} className="bg-white p-4 rounded shadow">
              <h4 className="font-semibold">{faq.q}</h4>
              <p className="text-sm text-gray-600 mt-1">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <footer id="contact" className="bg-white px-6 py-10 text-center border-t border-gray-300 scroll-mt-20">
        <h2 className="text-2xl font-bold text-primary mb-4">Contact Us</h2>
        <p>📍 123 Smile Street, Chennai, India</p>
        <p>📞 +91 98765 43210</p>
        <p>✉️ entntclinic@gmail.com</p>
        <div className="flex justify-center gap-4 mt-4 text-primary text-xl">
          <a href="#"><i className="fab fa-facebook"></i>👍</a>
          <a href="#"><i className="fab fa-instagram"></i>📸</a>
          <a href="#"><i className="fab fa-whatsapp"></i>💬</a>
        </div>
        <p className="text-sm text-gray-500 mt-4">&copy; 2025 ENTNT Dental Center. All rights reserved.</p>
      </footer>
      <FloatingChatbot />
    </div>
  );
};

export default Landing;
