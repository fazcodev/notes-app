import { useState, useContext } from "react";
import AuthContext from "../Authentication/AuthContext";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { Alert } from "@mui/material";

const ChangePassword = () => {
  const { currentUser: user } = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to reauthenticate user
  const reauthenticateUser = (currentPassword) => {
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return reauthenticateWithCredential(user, credential);
  };

  // Function to handle password update
  const handlePasswordChange = async (e) => {
    setLoading(true);
    e.preventDefault();

    setError(false);
    setAlertMsg("");

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    try {
      // Reauthenticate user before updating password
      await reauthenticateUser(currentPassword);

      // Update password
      await updatePassword(user, newPassword);

      setAlertMsg("Password has been updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setError(true);
      setAlertMsg(error.message);
    }
    setLoading(false);
  };
  const handleInputChange = (e) => {
    setAlertMsg("");
    setError(false);
    const { name, value } = e.target;
    if (name === "currPassword") setCurrentPassword(value);
    if (name === "newPassword") setNewPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  }
  return (
    <form
      className="bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-1/3 flex flex-col items-center 4 gap-4"
      onSubmit={handlePasswordChange}
    >
        <h2 className="text-2xl font-bold my-4">Change Password</h2>
      {alertMsg && (
        <Alert severity={error ? "error" : "success"}>{alertMsg}</Alert>
      )}
      <div className="flex justify-between items-center">
        <label className="inline-block" htmlFor="currPassword">Current Password</label>
        <input
          type="password"
          id="currPassword"
          name="currPassword"
          value={currentPassword}
          onChange={handleInputChange}
          className="shadow inline-block appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Current Password"
        />
      </div>
      <div className="flex justify-between items-center">
        <label className="inline-block" htmlFor="newPassword">New Password</label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={newPassword}
          onChange={handleInputChange}
          className="shadow inline-block appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="New Password"
        />
      </div>
      <div className="flex justify-between items-center">
        <label className="inline-block" htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleInputChange}
          className="shadow inline-block appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Retype New Password"
        />
      </div>
      <button
        disabled={loading}
        className="bg-red-500 disabled:opacity-50 hover:bg-red-700 text-white font-bold py-2 px-4 my-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Change Password
      </button>
    </form>
  );
};

export default ChangePassword;
