import React from "react";

const Header = ({ user }) => {
  return (
    <div style={styles.header}>
      <div style={styles.userInfo}>
        <img src={user.photoURL} alt="Perfil" style={styles.profilePic} />
        <span style={styles.userName}>{user.name}</span>
      </div>
    </div>
  );
};

const styles = {
  header: {
    width: "100%",
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "white",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
  },
  profilePic: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    marginRight: "10px",
  },
  userName: {
    fontSize: "1em",
  },
};

export default Header;
