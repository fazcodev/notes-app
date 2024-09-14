import NavList from "./NavList";
import {PropTypes} from "prop-types";

export default function SwipeDrawer({ dispatchDrawer, drawerState }) {
  const handleDrawer = () => {
    dispatchDrawer({ type: "slide" });
  };

  return (
    <nav
      onMouseEnter={handleDrawer}
      onMouseLeave={handleDrawer}
      className={`h-full fixed transition-all ${drawerState.open ? (drawerState.buttonOpen ? 'w-60': 'w-60 z-30 bg-white shadow-xl') :'w-20'}`}
    >
      <NavList open={drawerState.open} />
    </nav>
  );
}

SwipeDrawer.propTypes = {
  dispatchDrawer: PropTypes.func.isRequired,
  drawerState: PropTypes.object.isRequired,
};




