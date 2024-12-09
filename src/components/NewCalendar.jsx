import React from 'react'; 
import { DatePicker } from '@mantine/dates';  
import { Input } from '@mantine/core'; 
import './BookingStyles.css'; 

// NewCalendar komponenten, som tager 'date' og 'setDate' som props på booking
export default function NewCalendar({ date, setDate }) {
  return (
    // Wrapper til inputfeltet, som inkluderer et label og en dato-picker
    <Input.Wrapper
      id="date-picker"  
      label="Vælg dato"  
      withAsterisk  // Tilføjer en rød stjerne (*) for at indikere, at dette felt er obligatorisk
      className="calendar-container"  
    >
      {/* DatePicker komponenten til dato valg */}
      <DatePicker
        id="date-picker"  
        className="calendar"
        value={date}  // Sætter den nuværende værdi for datoen, som kommer fra state (date)
        onChange={setDate}  // Funktion der opdaterer datoen (setDate) når brugeren vælger en ny dato
        placeholder="Vælg dato"  // Pladsholdertekst der vises når der ikke er valgt en dato
      />
    </Input.Wrapper>
  );
}