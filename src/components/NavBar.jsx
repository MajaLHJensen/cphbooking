import { Link } from "@tanstack/react-router";
import { Avatar } from '@mantine/core';


export default function NavBar(){
    const navBarStyle = {
        display: "flex",
        alignItems: "center",
        backgroundColor: "#efefef",
        paddingRight: "30px",
        fontSize: "20px",
        textDecoration: "none",
        color: "black"
      }
      
      const avatarStyle = {
        paddingRight: "15px",
      }

    return(
        <div style={navBarStyle}>
      <Avatar style={avatarStyle} variant="transparent" radius="xl" size="xl" color="#6eb47e" src="" />

        <Link style={navBarStyle} to="/booking">Ny booking</Link>
        <Link style={navBarStyle} to="/myBookings">Mine bookinger</Link>

        <div style={{marginLeft: "auto"}}>
          <Link style={navBarStyle} to="/studentTeacher">Log ud</Link>
        </div>
      </div>
    )
}

