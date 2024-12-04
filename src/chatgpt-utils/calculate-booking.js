/**
  Denne funktion har 3 input: 
   1. brugerens valgte rum (fx. Lokale 2.13)
   2. Start tidspunkt (fx. 9.00)
   3. Slut tidspunkt (fx. 12.00)
  
   Og vores ønskede output er:
   {
      "Lokale 2.13": [9, 10, 11],
      "Lokale 2.88": [],
      "Lokale 3.05": [],
      "Lokale 3.08": [],
      "Lokale 3.14": []
    }
 */

    export function calculateBooking(selectedRoom, startTime, endTime) {
        console.log(selectedRoom, startTime, endTime);
        const toReturn = {
        'Lokale 2.13 (4 pers.)': [],
        'Lokale 2.88 (3 pers.)': [],
        'Lokale 3.05 (8 pers.)': [],
        'Lokale 3.08 (4 pers.)': [],
        'Lokale 3.14 (6 pers.)': []
        };
    
        // Konverter start- og sluttider til heltal
        const start = parseInt(startTime);
        const end = parseInt(endTime);
    
        // Tjek at tiderne er valide
        if (isNaN(start) || isNaN(end) || start >= end) {
            throw new Error("Ugyldige start- eller sluttider.");
        }
    
        // Fyld tidspunkterne for det valgte lokale
        for (let hour = start; hour < end; hour++) {
            toReturn[selectedRoom].push(hour);
        }
    
        return toReturn;
    }
    
    // Test funktionen
    // const result = calculateBooking("Lokale 2.13", "9", "12");
    // console.log(result);