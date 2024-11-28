import React from "react";

const Schedule = ({ value }) => {
  // Tidsintervaller: 8:00 til 18:00
  const times = Array.from({ length: 11 }, (_, i) => i + 8);

  // Inline-styling objekter
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
      borderRadius: "10px", // Afrundede hjørner
      overflow: "hidden", // Beskær overflow
    },
    table: {
      borderCollapse: "collapse",
      width: "100%",
      textAlign: "center",
    },
    th: {
      backgroundColor: "#ffeb99",
      position: "sticky",
      top: 0,
      padding: "15px",
      border: "1px solid #ddd",
    },
    td: {
      border: "1px solid #ddd",
      padding: "5px",
      fontWeight: 200,
    },
    busySlot: {
      backgroundColor: "#ff6b6b",
    },
  };

  return (
    <div style={styles.container}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}></th> {/* Tom header til lokale kolonnen */}
            {times.map((time) => (
              <th key={time} style={styles.th}>
                {time.toString().padStart(2, "0")}:00
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(value).map((room) => (
            <tr key={room}>
              <td style={styles.td}>{room}</td> {/* Lokalenavn */}
              {times.map((time) => (
                <td
                  key={time}
                  style={{
                    ...styles.td,
                    ...(value[room].includes(time) ? styles.busySlot : {}),
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