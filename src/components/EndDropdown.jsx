import { Combobox, Input, InputBase, useCombobox } from '@mantine/core';
import classes from './DropdownPositionStyles.module.css';

// Definerer en liste af tider (sluttidspunkter), som skal vises i dropdown-menuen
const endTimeTable = [
  '09:00',
  '10:00',
  '11:00',
  '12.00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18.00',
];

export default function EndDropdown({ endTime, setEndTime }) {
  // Opretter dropdown fra mantine
  const combobox = useCombobox({
    // Når dropdownen lukkes, nulstilles den valgte mulighed
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  // Går igennem sluttiderne til dropdown component og skaber en ny option
  const options = endTimeTable.map((item) => (
    // V: Værdien, der bliver sendt, når brugeren vælger denne mulighed.
    // K: En unik nøgle, som React kræver for at optimere rendering af lister.
    <Combobox.Option value={item} key={item}>
      {item} {/* Vist tekst for hver stuttids mulighed */}
    </Combobox.Option>
  ));

  // Returnerer dropdown-komponenten, der bruges til at vælge et sluttidspunkt
  return (
    <Combobox
      store={combobox}  // Binder Comboboxens tilstand til useCombobox hooken
      withinPortal={false} // Sikrer, at dropdown-menuen vises indenfor komponentens område
      offset={0} // Ingen ekstra afstand mellem knappen og dropdown-menuen
      // Når en valgmulighed er valgt, opdateres den valgte værdi og dropdownen lukkes
      onOptionSubmit={(val) => {
        setEndTime(val); // Gemmer det valgte sluttidspunkt
        combobox.closeDropdown(); // Lukker dropdownen
      }}
    >
      {/* Knappen, som brugeren klikker på for at åbne dropdown-menuen */}
      <Combobox.Target>
        <InputBase
          component="button"  // Gør InputBase til en knap
          type="button"  
          pointer  
          label="Vælg slutstidspunkt"  
          withAsterisk  
          rightSection={<Combobox.Chevron />} // En pil-ikon til højre for input-knappen
          onClick={() => combobox.toggleDropdown()}  // Åbner/lukker dropdown-menuen, når knappen klikkes
          rightSectionPointerEvents="none"  
          classNames={classes.input}  
        >
          {/* Hvis der er valgt en slutid, vises den; ellers vises en placeholder */}
          {endTime || <Input.Placeholder>Vælg slutstidspunkt</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>
      
      {/* Dropdown-menuen, der indeholder alle mulighederne */}
      <Combobox.Dropdown className={classes.dropdown}>
        {/* Går igennem de tidligere oprettede options (tider) til visning i dropdown-menuen */}
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}