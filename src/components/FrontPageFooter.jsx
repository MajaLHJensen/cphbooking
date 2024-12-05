import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';

function FrontPageFooter() {
    // CSS styles object for the footer component
    const styles = {
      footer: {
        backgroundColor: "#002e6d",  
        color: "white",  
        fontFamily: "Arial, sans-serif", 
        padding: "20px 40px",  
        borderTop: "5px solid #fbb041", 
      },
      footerTop: {
        display: "flex", 
        flexWrap: "wrap", 
        justifyContent: "space-between",  
        alignItems: "flex-start",  
        paddingTop: "30px", 
      },
      footerLogoSection: {
        display: "flex",  
        alignItems: "center",  
        marginBottom: "20px", 
      },
      footerLogo: {
        width: 'auto', 
        height: '80px', 
      },
      iconContainer: {
        display: "flex", 
        alignItems: "center",  
        gap: "20px", 
      },
      icon: {
        color: "white", 
        width: "50%", 
        height: "auto", 
      },
      iconBox: {
        width: "40px", 
        height: "40px",  
        backgroundColor: "#fbb041",  
        display: "flex",  
        alignItems: "center",  
        justifyContent: "center", 
      }, 
      footerLinks: {
        display: "flex",  
        justifyContent: "center", 
        flex: 1, 
        gap: "40px",  
      },
      footerColumn: {
        flex: 1,  
      },
      footerColumnHeader: {
        fontSize: "18px", 
        marginBottom: "10px",  
        color: "#b6bfd4",  
      },
      footerColumnList: {
        listStyle: "disc",  
        margin: "0", 
        paddingLeft: "20px", 
      },
      footerColumnItem: {
        marginBottom: "8px",  
        fontWeight: "bold",  
      },
      footerHighlight: {
        fontSize: "14px",  
        color: "white",  
      },
      footerDivider: {
        border: "none", 
        height: "2px",  
        backgroundColor: "#fbb041",  
        margin: "20px 0",  
      },
      language:{
        fontSize: "18px", 
        paddingBottom: "30px",  
        textAlign: "center",  
      },
      footerBottomText: {
        textAlign: "center",  
      },
      footerBottomHighlight: {
        fontWeight: "bold", 
      },
      footerBottomLinks: {
        display: "flex",  
        flexDirection: "column", 
      },
    };
  
    return (
      <footer style={styles.footer}>
        {/* Top section with logo and social media icons */}
        <div style={styles.footerTop}>
            <div style={styles.footerLogoSection}>
                <img style={styles.footerLogo} src="/cphbooking/img/cphlogo.webp" alt="Cphbusiness logo" />
            </div>
            <div style={styles.iconContainer}>
                {/* Social media icons */}
                <div style={styles.iconBox}>
                <FontAwesomeIcon style={styles.icon} icon={faFacebook}/>
                </div>
                <div style={styles.iconBox}>
                <FontAwesomeIcon style={styles.icon} icon={faLinkedin}/>
                </div>
                <div style={styles.iconBox}>
                <FontAwesomeIcon style={styles.icon} icon={faYoutube}/>
                </div>
                <div style={styles.iconBox}>
                <FontAwesomeIcon style={styles.icon} icon={faInstagram}/>
                </div>
            </div>
        </div>
        <div style={styles.footerLinks}>
            {/* Quick access section */}
            <div style={styles.footerColumn}>
              <h4 style={styles.footerColumnHeader}>Hurtig adgang til:</h4>
              <ul style={styles.footerColumnList}>
                <li style={styles.footerColumnItem}>Bibliotek</li>
                <li style={styles.footerColumnItem}>
                  Manuel login <span style={styles.footerHighlight}>(til Moodle)</span>
                </li>
                <li style={styles.footerColumnItem}>Selvbetjening</li>
                <li style={styles.footerColumnItem}>
                  TimeEdit <span style={styles.footerHighlight}>(Skema)</span>
                </li>
                <li style={styles.footerColumnItem}>Webmail</li>
                <li style={styles.footerColumnItem}>
                  WISEflow <span style={styles.footerHighlight}>(Eksamen)</span>
                </li>
              </ul>
            </div>
            {/* Learning tools section */}
            <div style={styles.footerColumn}>
              <h4 style={styles.footerColumnHeader}>Læringsværktøjer:</h4>
              <ul style={styles.footerColumnList}>
                <li style={styles.footerColumnItem}>
                  LinkedIn Learning (Lynda.com)
                </li>
                <li style={styles.footerColumnItem}>Office365</li>
                <li style={styles.footerColumnItem}>OneDrive & SharePoint</li>
                <li style={styles.footerColumnItem}>Padlet</li>
                <li style={styles.footerColumnItem}>
                  Panopto <span style={styles.footerHighlight}>(Video værktøj)</span>
                </li>
                <li style={styles.footerColumnItem}>
                  Survey-Xact <span style={styles.footerHighlight}>(Opret spørgeskema)</span>
                </li>
                <li style={styles.footerColumnItem}>
                  Zoom <span style={styles.footerHighlight}>(Online møder)</span>
                </li>
                <li style={styles.footerColumnItem}>
                  <span style={styles.footerHighlight}>
                    Moodle app (OpenLMS)
                  </span> Google Play / App Store
                </li>
              </ul>
            </div>
            {/* Section for students */}
            <div style={styles.footerColumn}>
              <h4 style={styles.footerColumnHeader}>Specielt for studerende:</h4>
              <ul style={styles.footerColumnList}>
                <li style={styles.footerColumnItem}>
                  Information til nye studerende
                </li>
                <li style={styles.footerColumnItem}>
                  IT på Cphbusiness 
                  <span style={styles.footerHighlight}> (Vejledninger)</span>
                </li>
                <li style={styles.footerColumnItem}>
                  Cphbusiness' iværksættermiljø
                </li>
                <li style={styles.footerColumnItem}>Merit</li>
                <li style={styles.footerColumnItem}>Opslagstavlen</li>
                <li style={styles.footerColumnItem}>Studenterforeningen</li>
                <li style={styles.footerColumnItem}>Studierabatter</li>
                <li style={styles.footerColumnItem}>Studievejledning</li>
                <li style={styles.footerColumnItem}>SU og SPS</li>
                <li style={styles.footerColumnItem}>Webshop</li>
              </ul>
            </div>
        </div>
        <hr style={styles.footerDivider} />
        {/* Bottom section with language change option and additional links */}
        <div>
          <h3 style={styles.language}>Change Language</h3>
          <p style={styles.footerBottomText}>
            Designet med
            <span style={styles.footerBottomHighlight}> Moodlerooms</span>, bygget på
            <span style={styles.footerBottomHighlight}> Moodle</span>.
          </p>
          <div style={styles.footerBottomLinks}>
            <h3>Beskrivelse af dataopbevaring</h3>
            <h3>Hent mobilappen</h3>
          </div>
        </div>
      </footer>
    );
  }
  
  export default FrontPageFooter;
