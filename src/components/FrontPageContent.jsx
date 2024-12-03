import React from "react";
import NewCalendar from "./NewCalendar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';

function FrontPageContent() {
    const styles = {
        container: {
            fontFamily: "Arial, sans-serif",
            color: "#333",
        },
        backgroundImage: {
            width: "100%",
            height: "auto",
            display: "block",
            marginBottom: "20px",
        },
        contentContainer: {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            padding: "20px",
        },
        sectionTitle: {
            fontSize: "18px",
            marginBottom: "15px",
            color: "#444",
            paddingBottom: "5px",
        },
        calendarLink: {
            color: "#0073e6",
            textDecoration: "none",
        },
        flowsList: {
            listStyleType: "none",
            padding: 0,
            margin: 0,
            fontSize: "14px",
            lineHeight: "1.5",
        },
        flowsListItem: {
            marginBottom: "8px",
            color: "#002e6d",
        },
        icon: {
            color: "#999999",
        }
    };

    return (
        <div style={styles.container}>
            <img
                src="/cphbooking/img/h.webp"
                alt="Cphbusiness baggrund"
                style={styles.backgroundImage}
            />
            <div style={styles.contentContainer}>
                {/* Calendar Section */}
                <div>
                    <h4 style={styles.sectionTitle}>Kalender</h4>
                    <NewCalendar />
                </div>

                {/* Upcoming Events Section */}
                <div style={styles.section}>
                    <h4 style={styles.sectionTitle}>Kommende begivenheder</h4>
                </div>

                {/* Flows Section */}
                <div style={styles.section}>
                    <h4 style={styles.sectionTitle}>Mine flows</h4>
                    <ul style={styles.flowsList}>
                        <li style={styles.flowsListItem}><FontAwesomeIcon style={styles.icon} icon={faGraduationCap}/> Generall (18i2016V2) Cphbusiness - General Information</li>
                        <li style={styles.flowsListItem}><FontAwesomeIcon style={styles.icon} icon={faGraduationCap}/> Bibliote (19i2023V2) Bibliotek / Library</li>
                        <li style={styles.flowsListItem}><FontAwesomeIcon style={styles.icon} icon={faGraduationCap}/> Info Lyngby (17Info1005I) Cphbusiness Lyngby - Information</li>
                        <li style={styles.flowsListItem}><FontAwesomeIcon style={styles.icon} icon={faGraduationCap}/> Eksamen (23m14603Vn3) Eksamen (FTU)</li>
                        <li style={styles.flowsListItem}><FontAwesomeIcon style={styles.icon} icon={faGraduationCap}/> Frontend (24aI16819Vn3) Frontend Developer, E24</li>
                        <li style={styles.flowsListItem}><FontAwesomeIcon style={styles.icon} icon={faGraduationCap}/> HelloFlo (23m14720Vn3) Hello Flow - Lyngby (Sommerstart 2023)</li>
                        <li style={styles.flowsListItem}><FontAwesomeIcon style={styles.icon} icon={faGraduationCap}/> Multimed (23as14664Vn3) Multimediedesign 1. semester E23</li>
                        <li style={styles.flowsListItem}><FontAwesomeIcon style={styles.icon} icon={faGraduationCap}/> Multimed (23as15756Vn3) Multimediedesign 2. semester E24</li>
                        <li style={styles.flowsListItem}><FontAwesomeIcon style={styles.icon} icon={faGraduationCap}/> Praktikf (21m10265V2) Praktikkontoret - Lyngby</li>
                        <li style={styles.flowsListItem}><FontAwesomeIcon style={styles.icon} icon={faGraduationCap}/> Studieve (21m11608Vn3) Studievejledningen</li>
                        <li style={styles.flowsListItem}><FontAwesomeIcon style={styles.icon} icon={faGraduationCap}/> Visuelid (24av16823Vn3) Visuelt identitet og grafisk design, E24</li>
                        <li style={styles.flowsListItem}>Alle flows ... </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default FrontPageContent;
