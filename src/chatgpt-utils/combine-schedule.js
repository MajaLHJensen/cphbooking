// Denne funktion kombinerer flere objekters skemaer og samler tiderne for hvert rum
export function combineSchedules(objects) {
  // Opretter et tomt objekt til det samlede skema
  const combinedSchedule = {};

  // Går igennem hvert objekt i listen
  objects.forEach((obj) => {
    const schedule = obj.schedule; // Henter skemaet fra objektet
    for (const room in schedule) {
      // Tjekker, om rummet allerede findes i det kombinerede skema
      if (!combinedSchedule[room]) {
        // Hvis rummet ikke findes, opretter vi et nyt Set med tiderne
        combinedSchedule[room] = new Set(schedule[room]);
      } else {
        // Hvis rummet allerede findes, tilføjer vi tiderne til Set'et
        schedule[room].forEach((time) => combinedSchedule[room].add(time));
      }
    }
  });

  // Konverterer alle Set's tilbage til arrays og sorterer tiderne
  for (const room in combinedSchedule) {
    combinedSchedule[room] = Array.from(combinedSchedule[room]).sort((a, b) => a - b);
  }

  // Returnerer det samlede skema
  return combinedSchedule;
}