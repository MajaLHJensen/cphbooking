import React from 'react';  // Importerer React, som er nødvendigt for at definere komponenten
import { DatePicker } from '@mantine/dates';  // Importerer DatePicker komponenten fra Mantine, som bruges til at vælge datoer
import { Input } from '@mantine/core';  // Importerer Input komponenten fra Mantine, som bruges til at gruppere inputfelter og labels
import './BookingStyles.css';  // Importerer CSS-stilen for kalenderen og inputfeltet

// NewCalendar komponenten, som tager 'date' og 'setDate' som props
export default function NewCalendar({ date, setDate }) {
  return (
    // Wrapper til inputfeltet, som inkluderer et label og en dato-picker
    <Input.Wrapper
      id="date-picker"  // ID for wrapperen, som kan bruges til at referere til inputfeltet
      label="Vælg dato"  // Label for inputfeltet, som informerer brugeren om, hvad de skal vælge
      withAsterisk  // Tilføjer en rød stjerne (*) for at indikere, at dette felt er obligatorisk
      className="calendar-container"  // CSS-klasse til wrapperen for at kunne style det i CSS
    >
      {/* DatePicker komponenten til dato valg */}
      <DatePicker
        id="date-picker"  // ID for selve datepicker inputfeltet
        className="calendar"  // CSS-klasse til styling af datepickeren
        value={date}  // Sætter den nuværende værdi for datoen, som kommer fra state (date)
        onChange={setDate}  // Funktion der opdaterer datoen (setDate) når brugeren vælger en ny dato
        placeholder="Vælg dato"  // Pladsholdertekst der vises når der ikke er valgt en dato
      />
    </Input.Wrapper>
  );
}
