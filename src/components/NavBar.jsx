import { Link } from "@tanstack/react-router";  // Importerer Link komponenten fra React Router, som bruges til at navigere mellem sider uden at reloade hele siden
import { Avatar } from '@mantine/core';  // Importerer Avatar komponenten fra Mantine, som bruges til at vise et profilbillede eller en initial

// Definerer NavBar komponenten
export default function NavBar() {
    // Definerer stilen for selve navigationsbaren
    const navBarStyle = {
        display: "flex",  // Bruger flexbox for at arrangere elementerne horisontalt
        alignItems: "center",  // Justerer elementerne vertikalt centreret
        backgroundColor: "#efefef",  // Sætter baggrundsfarven til en lys grå
        paddingRight: "30px",  // Tilføjer lidt ekstra plads på højre side af navigationen
        fontSize: "20px",  // Sætter fontstørrelsen til 20px
        textDecoration: "none",  // Fjerner standard understregning fra links
        color: "black"  // Sætter tekstfarven til sort
    }
    
    // Definerer stilen for avataren
    const avatarStyle = {
        paddingRight: "15px",  // Tilføjer lidt ekstra plads på højre side af avataren
    }

    return(
        <div style={navBarStyle}>
            {/* Avatar komponenten, som viser et billede (kan bruges til at vise brugerens profilbillede) */}
            <Avatar style={avatarStyle} variant="transparent" radius="xl" size="xl" color="#6eb47e" src="" />

            {/* Link til 'Ny booking' siden */}
            <Link style={navBarStyle} to="/booking">Ny booking</Link>

            {/* Link til 'Mine bookinger' siden */}
            <Link style={navBarStyle} to="/myBookings">Mine bookinger</Link>

            {/* Div med marginLeft: auto for at skubbe "Log ud" linket til højre */}
            <div style={{marginLeft: "auto"}}>
                {/* Link til 'Log ud' siden */}
                <Link style={navBarStyle} to="/studentTeacher">Log ud</Link>
            </div>
        </div>
    )
}
