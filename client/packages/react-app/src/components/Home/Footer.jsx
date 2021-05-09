import React from "react";
//Components
import { Link } from "react-router-dom";
import { FooterIcon } from "./HomeSharedComponents";
//Images
import github from "#Images/socials/github.svg";
import facebook from "#Images/socials/facebook.svg";
import linkedIn from "#Images/socials/linkedin.svg";
import personalWebsite from "#Images/socials/website.svg";

const Footer = (props) => {
  return (
    <footer>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand link-dark" to="/">
            Dapplu
          </Link>
          <div className="d-flex">
            <FooterIcon to="https://github.com/colinsteidtmann/Dapplu" icon={github} alt="github" />
            <FooterIcon to="https://www.facebook.com/colinsteidtmann" icon={facebook} alt="facebook" />
            <FooterIcon to="https://www.linkedin.com/in/colinsteidtmann/" icon={linkedIn} alt="linkedin" />
            <FooterIcon to="https://colinsteidtmann.com/" icon={personalWebsite} alt="personal website" />
            <p className="text-white my-auto">&copy; {new Date().getFullYear()}</p>
          </div>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
