import React from "react";
import type { LinkProps } from "../types";

const Nvbar = () => {
  return <div>
    <h1>Navbar</h1>
 <Link path="/" title="Home" />
 <Link path="/" title="Home" />
 <Link path="/" title="Home" />
  </div>;
};

export default Nvbar;



const Link = ({ path, title }: LinkProps) => {
  return (
    <li>
      <a href={path}> {title}</a>
    </li>
  );
};
