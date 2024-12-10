import { Combobox, Input, InputBase, useCombobox } from '@mantine/core';
import classes from './DropdownPositionStyles.module.css';

// Definerer en liste af lokaler, som skal vises i dropdown-menuen
const lokaler = [
  'Lokale 2.13 (4 pers.)',
  'Lokale 2.88 (3 pers.)',
  'Lokale 3.05 (8 pers.)',
  'Lokale 3.08 (4 pers.)',
  'Lokale 3.14 (6 pers.)'
];

export default function Dropdown({ selectedRoom, setSelectedRoom }) {
  // Opretter dropdown fra mantine
  const combobox = useCombobox({
    // Når dropdownen lukkes, nulstilles den valgte mulighed
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  // Går igennem lokalerne til dropdown component og skaber en ny option
  const options = lokaler.map((item) => (
    // V: Værdien, der bliver sendt, når brugeren vælger denne mulighed.
    // K: En unik nøgle, som React kræver for at optimere rendering af lister.
    <Combobox.Option value={item} key={item}>
      {item} {/* Vist tekst for hver mulighed */}
    </Combobox.Option>
  ));

  // Returnerer hele dropdown-komponenten
  return (
    <Combobox
      store={combobox}  // Binder dropdownens tilstand til useCombobox (åben/lukket)
      withinPortal={false}  // Dropdown-menuen renderes indenfor komponenten
      offset={0}  // Ingen ekstra plads mellem knappen og dropdown-menuen
      // Når en valgmulighed er valgt, opdateres den valgte værdi og dropdownen lukkes
      onOptionSubmit={(val) => {
        setSelectedRoom(val); // Opdaterer den valgte værdi
        combobox.closeDropdown(); // Lukker dropdownen
      }}
    >
      {/* Target-komponenten bruges til at vise knappen, der åbner dropdownen */}
      <Combobox.Target>
        <InputBase
          component="button"  // Gør InputBase til en knap
          type="button"  
          pointer
          label="Vælg Lokale" 
          withAsterisk  
          rightSection={<Combobox.Chevron />}  // En pil-ikon til højre for input-knappen
          onClick={() => combobox.toggleDropdown()}  // Åbner/lukker dropdownen, når knappen klikkes
          rightSectionPointerEvents="none"  
          classNames={classes.input} 
        >
          {/* Hvis der er valgt et lokale, vises det; ellers vises en placeholder */}
          {selectedRoom || <Input.Placeholder>Vælg lokale</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>
      {/* Dropdown-menuen, der indeholder alle mulighederne */}
      <Combobox.Dropdown className={classes.dropdown}>
        {/* Går igennem de tidligere oprettede options til visning i dropdown-menuen */}
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}