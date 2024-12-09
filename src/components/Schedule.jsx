import React from "react";

// ChatGPT magic
const Schedule = ({ value }) => {
  // Tidsintervaller: 8:00 til 18:00
  // Opretter en array af timer fra 8 til 18 (11 tidsintervaller i alt)
  const times = Array.from({ length: 11 }, (_, i) => i + 8);

  // Inline-styling objekter til komponenten
  const styles = {
    container: {
      margin: "5px", 
      fontFamily: "Arial, sans-serif", 
      backgroundColor: "#F5F3F3",  
      color: "black", 
      fontWeight: 200,  
      fontSize: "14px",  
      width: "90%",  
      maxWidth: "500%",  
      borderRadius: "10px",
      overflow: "hidden", 
    },
    table: {
      borderCollapse: "collapse",  // Fjerner mellemrum mellem tabelcellerne
      width: "100%",  
      textAlign: "center",  
    },
    th: {
      backgroundColor: "#ffeb99",  
      position: "sticky",  // Gør headeren fastlåst ved scroll
      top: 0,  
      padding: "15px", 
      border: "1px solid #ddd", 
    },
    td: {
      border: "1px solid #ddd", 
      padding: "3px", 
      fontWeight: 200, 
    },
    busySlot: {
      backgroundColor: "#ff6b6b",
    },
  };

  return (
    <div style={styles.container}>
      <table style={styles.table}>
        {/* Tidspunkter */}
        <thead>
          <tr>
            <th style={styles.th}></th> {/* Table header til lokale kolonnen */}
            {times.map((time) => (
              // Mapper gennem 'times' og viser hver time som en header
              <th key={time} style={styles.th}>
                {time.toString().padStart(2, "0")}:00  {/* Formatér timen til HH:00 format */}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Lokaler/firkanter */}
          {/* Mapper gennem 'value' objektnøglerne for at vise lokaler */}
          {Object.keys(value).map((room) => (
            <tr key={room}>
              {/* td er tabeldata */}
              <td style={styles.td}>{room}</td> {/* Vist lokale navn i den første kolonne */}
              {times.map((time) => (
                // Mapper gennem 'times' og viser en celle for hvert tidsinterval
                <td
                  key={time}
                  style={{
                    ...styles.td,  // Standard tabel stil
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