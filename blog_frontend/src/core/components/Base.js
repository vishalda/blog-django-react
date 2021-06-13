//This file will act as the base field for every page on the website
import Menu from "./Navbar";
import "../../SCSS/base.scss";

const Base = () =>{
  return (
    <div className="base">
      <Menu />
      <div className="top-right-circle"></div>
      <div className="top-left-circle"></div>
    </div>
  );
};

export default Base;