import logo from "/assets/Images/LOGO_SVG.svg";
import caret from "/assets/Images/Caret.svg";
import vector from "/assets/Images/Vector.svg";
import burger from "/assets/Images/Burger_Menu.svg";

const Navigation = () => {
  return (
    <nav className="nav flex justify-between items-center">
      <div className="logo flex items-center">
        <img src={logo} alt="Logo" className="image" />
        <a href="#" className="flex items-center">
          <span>Category</span>
          <img src={caret} alt="Caret icon" />
        </a>
      </div>
      <div className="header-right flex">
        <img className="burger" src={burger} alt="Burger-menu" />
        <span>
          <img src={vector} alt="Search icon" />
        </span>
        <span>About</span>
        <span>Contact</span>
      </div>
    </nav>
  );
};

export default Navigation;
