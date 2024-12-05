import React from "react";

const Schedule = ({ value }) => {
  // Tidsintervaller: 8:00 til 18:00
  // Opretter en array af timer fra 8 til 18 (11 tidsintervaller i alt)
  const times = Array.from({ length: 11 }, (_, i) => i + 8);

  // Inline-styling objekter til komponenten
  const styles = {
    container: {
      margin: "5px",  // Margin omkring containeren
      fontFamily: "Arial, sans-serif",  // Sætter skrifttypen
      backgroundColor: "#F5F3F3",  // Baggrundsfarve
      color: "black",  // Tekstfarve
      fontWeight: 200,  // Sætter fontens vægt (tykkelse)
      fontSize: "14px",  // Skrifttype størrelse
      width: "90%",  // Sætter bredden på containeren til 90% af forældreelementet
      maxWidth: "500%",  // Maksimal bredde af containeren (kan justeres efter behov)
      borderRadius: "10px", // Afrundede hjørner
      overflow: "hidden", // Beskær overflødig indhold, så det ikke går ud over containeren
    },
    table: {
      borderCollapse: "collapse",  // Fjerner mellemrum mellem tabelcellerne
      width: "100%",  // Tabelbredden skal være 100% af containerens bredde
      textAlign: "center",  // Centrerer teksten i tabelcellerne
    },
    th: {
      backgroundColor: "#ffeb99",  // Baggrundsfarve for tabelens header
      position: "sticky",  // Gør headeren fastlåst ved scroll
      top: 0,  // Sikrer at headeren forbliver øverst, når man scroller
      padding: "15px",  // Indvendig margin i headeren
      border: "1px solid #ddd",  // Giver headeren en lys kant
    },
    td: {
      border: "1px solid #ddd",  // Kant omkring cellerne
      padding: "5px",  // Indvendig margin i cellerne
      fontWeight: 200,  // Skrifttypens vægt
    },
    busySlot: {
      backgroundColor: "#ff6b6b",  // Farven der vises, når et tidsinterval er optaget (rød)
    },
  };

  return (
    <div style={styles.container}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}></th> {/* Tom header til lokale kolonnen */}
            {times.map((time) => (
              // Mapper gennem 'times' og viser hver time som en header
              <th key={time} style={styles.th}>
                {time.toString().padStart(2, "0")}:00  {/* Formatér timen til HH:00 format */}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(value).map((room) => (
            // Mapper gennem 'value' objektnøglerne for at vise lokaler
            <tr key={room}>
              <td style={styles.td}>{room}</td> {/* Vist lokale navn i den første kolonne */}
              {times.map((time) => (
                // Mapper gennem 'times' og viser en celle for hvert tidsinterval
                <td
                  key={time}
                  style={{
                    ...styles.td,  // Standard cellestil
                    ...(value[room].includes(time) ? styles.busySlot : {}),  // Hvis tidsintervallet er optaget, tilføj 'busySlot' stil
                  }}
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Schedule;
