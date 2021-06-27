//This file will act as the base field for every page on the website
import React from 'react';
import Menu from "./Navbar";
import "../../SCSS/base.scss";

const Base = () =>{
  return (
    <div className={localStorage.getItem('dark')==='true' ?"base dark-theme-base" : "base"}>
      <Menu />
      <div className="top-right-circle"></div>
      <div className="top-left-circle"></div>
    </div>
  );
};

export default Base;