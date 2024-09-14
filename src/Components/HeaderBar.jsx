import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AuthContext from "./Authentication/AuthContext";

const HeaderBar = ({ open, dispatchDrawer }) => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const name = currentUser.displayName || currentUser.email.split("@")[0];
  const [openOptions, setOpenOptions] = useState(false);
  const showOptions = () => setOpenOptions(true);
  const hideOptions = () => setOpenOptions(false);

  const handleDrawer = () => {
    dispatchDrawer({ type: "clickSlide" });
  };
  // console.log(currentUser)
  return (
    <div
      className="shadow-lg h-[4.5rem] sticky top-0 flex items-center gap-4 px-4 py-2"
      open={open}
    >
      <button
        onClick={handleDrawer}
        className="text-[#5F6368] hover:bg-[#dae6ed] p-2 rounded-full focus:outline-none"
      >
        <MenuIcon fontSize="medium" style={{ margin: "0px 1px" }} />
      </button>
      <div className=" w-full flex justify-between items-center">
        <h1 className="text-3xl font-Kaushan">Note Notify</h1>
        <h3
          className="mr-5 mt-1 sm:mt-0 text-center cursor-pointer"
          onMouseEnter={showOptions}
          onMouseLeave={hideOptions}
        >
          Hello! {name}
          <ul
            className={
              openOptions
                ? "overflow-hidden absolute max-h-16 sm:max-h-20 text-sm sm:text-base flex flex-col gap-4 justify-evenly rounded-xl py-2 bg-white w-1/3 sm:w-1/6 right-16 sm:right-5 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]"
                : "hidden"
            }
          >
            <li>
              <button className="hover:text-blue-400" onClick={logout}>
                Logout
              </button>
            </li>
            {!currentUser.emailVerified && (
              <li>
                <button onClick={()=>navigate('/user/change-password')} className="hover:text-blue-400">Change Password</button>
              </li>
            )}
          </ul>
        </h3>
      </div>
    </div>
  );
};

export default HeaderBar;
