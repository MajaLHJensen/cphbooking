import React from "react";

// More comments

// ChatGPT Magic
const Schedule = ({value}) => {
  // Sample data for busy slots

  const styles = {
    container: {
      margin: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#F5F3F3',
      color: 'black',
      fontWeight: 200,
      fontSize: '14px',
      width: '70%',
    },
    table: {
      borderCollapse: 'collapse',
      width: '100%',
      textAlign: 'center',
    },
    tableCell: {
      border: '0.5px solid black',
      padding: '15px',
      fontWeight: 200,
    },
    tableHeader: {
      backgroundColor: '#ffeb99',
      position: 'sticky',
      top: 0,
      padding: '15px',
    },
    busySlot: {
      backgroundColor: '#ff6b6b',
    },
  }; 
  

  // Generate table rows dynamically
  const times = Array.from({ length: 11 }, (_, i) => i + 8); // 8:00 to 18:00

  return (
    <div style={styles.container}>
      {/* Containeren til skemaet med afrundede hjørner og styling */}
      <table style={styles.table}>
        <thead>
          {/* Tabelrow, der indeholder tidslabels */}
          <tr>
            {/* Tabel Header */}
            <th></th> 
            {/* Tom header til den første kolonne (lokalenavne) */}
            {times.map((time) => (
              <th key={time}>
                {time.toString().padStart(2, "0")}
                {/* Viser tidsrum (8 til 18), formateret med to cifre (fx 08, 09) */}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Tabelkrop, der indeholder rækker for hvert lokale */}
          {Object.keys(value).map((room) => (
            <tr key={room}>
                {/* Tabeldata, firkanterne med indhold */}
              <td>{room}</td>
              {/* Første celle i hver række indeholder lokalets navn */}
              {times.map((time) => (
                <td
                  key={time}
                  style={value[room].includes(time) ? styles.busySlot : undefined}
                
                  /* Tilføjer klassen "busy-slot", hvis lokalet er optaget på dette tidspunkt */
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