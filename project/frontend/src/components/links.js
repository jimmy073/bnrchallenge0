import { NavLink } from "react-router-dom";

export const HeaderLink = function (props) {
  const checkActive = (match, location) => {
    if (match) {
      const { pathname } = location;
      const { url } = match;
      return pathname === url || props.indicator === url;
    } else {
      if (props.indicator) return true;
    }
  };
  const totgling = (e) => {
    e.preventDefault();
    document.querySelector("body").classList.remove("mobile-nav-active");
  };
  return (
    <div onClick={totgling}>
      <NavLink
        to={props.page}
        isActive={checkActive}
        activeClassName="active"
        className=""
      >
        {props.name}
      </NavLink>
    </div>
  );
};
