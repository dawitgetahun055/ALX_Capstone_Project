const HeroSection = ({ children }) => {
  return (
    <section className="hero">
      <div className="container p-0 m-0">{children}</div>
    </section>
  );
};

export default HeroSection;
