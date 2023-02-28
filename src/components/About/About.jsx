import React from "react";
import "./About.scss";

const About = () => {
  return (
    <div className="about-page">
      <div className="layout">
        <h1 className="about-page-title">About Us</h1>
        <p className="about-page-text">
          Welcome to Kinetix, where we offer the latest and
          greatest in technology. Our passion for innovation drives us to curate
          a collection of top-notch tech products that will enhance your daily
          life.
        </p>
        <p className="about-page-text">
          We specialize in headphones, smart watches, wireless earbuds, and
          wireless speakers, but we offer a wide variety of other tech products
          as well. Whether you're an audiophile or a fitness enthusiast, we have
          something that will suit your needs.
        </p>
        <p className="about-page-text">
          We believe that technology should be accessible to everyone, which is
          why we offer competitive pricing and fast shipping. We want to make it
          easy for you to get the products you need without breaking the bank.
        </p>
        <p className="about-page-text">
          Thank you for choosing our ecommerce website as your go-to source for
          high-quality tech products. We look forward to helping you find the
          perfect accessory to enhance your life.
        </p>
      </div>
    </div>
  );
};

export default About;
