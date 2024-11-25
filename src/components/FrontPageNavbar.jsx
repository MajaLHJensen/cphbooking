import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBell, faMagnifyingGlass, faComment, faBookOpenReader } from '@fortawesome/free-solid-svg-icons';
import { Link } from "@tanstack/react-router";
import { useState } from "react"; 

function FrontPageNavbar() {
  const [isHovered, setIsHovered] = useState(false);

  const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#002e6d',
        padding: '10px 20px',
        color: 'white',
        width: '100%',
        height: '100px',
        borderBottom: '5px solid #fbb041',
      },
    logo: {
        width: 'auto',
        height: '80px',
      },
    separator: {
        width: '1px',
        height: '24px',
        backgroundColor: '#fff',
      },
    mineFlowsButton: {
        backgroundColor: '#fbb041',
        border: 'none',
        borderRadius: '5px',
        padding: '8px 16px',
        color: 'black',
        fontWeight: 'bold',
        cursor: 'pointer',
      },
    BookLokaleButton: {
        backgroundColor: 'Transparent',
        border: 'none',
        borderRadius: '5px',
        padding: '8px 16px',
        color: 'white',
        cursor: 'pointer',
        textDecoration: isHovered ? "underline" : "none",
      },
    rightSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
      },
    dropdownArrow: {
        fontSize: '12px',
        marginLeft: '5px',
      },
    profileDropdown: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
      },
    profileCircle: {
        backgroundColor: '#eaecf0',
        color: '#003366',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
      },
    icons: {
        display: 'flex',
        gap: '10px',
      },
    icon: {
        fontSize: '20px',
        cursor: 'pointer',
      },
  }

    return (
        <nav style={styles.navbar}>
            <div>
                <img style={styles.logo} src="/cphbooking/img/cphlogo.webp" alt="Cphbusiness logo" />
            </div>

            <div style={styles.rightSection}>
            <Link to={"/studentTeacher"}>
            <button
            style={styles.BookLokaleButton}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            >Book Lokale
            </button>
            </Link>
            <div>
                <span>Links</span>
                <span style={styles.dropdownArrow}><FontAwesomeIcon icon={faChevronDown}/></span>
            </div>
            <div style={styles.separator}></div>
            <button style={styles.mineFlowsButton}>Mine Flows</button>
            <div style={styles.profileDropdown}>
                <div style={styles.profileCircle}>LK</div>
                <span style={styles.dropdownArrow}><FontAwesomeIcon icon={faChevronDown}/></span>
            </div>
            <div style={styles.icons}>
                <span style={styles.icon}><FontAwesomeIcon icon={faComment}/></span>
                <span style={styles.icon}><FontAwesomeIcon icon={faBell}/></span>
                <span style={styles.icon}><FontAwesomeIcon icon={faMagnifyingGlass}/></span>
                <span style={styles.icon}><FontAwesomeIcon icon={faBookOpenReader}/></span>
            </div>
            </div>
        </nav>
    );
}

export default FrontPageNavbar;