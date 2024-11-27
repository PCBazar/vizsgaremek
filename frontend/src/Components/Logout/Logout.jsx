import React, {  useState } from "react";
import CustomModal from "../Modal/Modal";

const Logout = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [message, setMessage] = useState(false);
  const handleLogout = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/logout/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": document.cookie.match(/csrftoken=([^;]+)/)[1],
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Logout response:", data);
        setMessage(data.message);
        setModalOpen(true);

        localStorage.removeItem("userId");
        localStorage.removeItem("authTokens");
        localStorage.removeItem("username");

      } else {
        const errorData = await response.json();
        setModalOpen(true);
        setMessage(`Hiba: ${errorData.message}`);
      }
    } catch (error) {
      setMessage(`Hiba történt a kijelentkezés közben: ${error.message}`);
      setModalOpen(true);
    }
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    window.location.href = "/";
  };
  return (
    <>
      <a href="#" onClick={handleLogout}>
        Kijelentkezés
      </a>
      <CustomModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        message={message}
     />
    </>
  );
};

export default Logout;
