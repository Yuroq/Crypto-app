import Logo from "./assets/Logo.png";

const Footer = () => {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content">
      <aside>
        <img src={Logo} />
      </aside>
      <nav>
        <header className="footer-title">About Us</header>
      </nav>
      <nav>
        <header className="footer-title">Contributors</header>
        <p>Jamal Kayed</p>
      </nav>
    </footer>
  );
};
export default Footer;
