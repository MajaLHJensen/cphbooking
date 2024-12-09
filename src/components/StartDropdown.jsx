import { Combobox, Input, InputBase, useCombobox } from '@mantine/core';
import classes from './DropdownPositionStyles.module.css';

// Definerer en liste af tider (sluttidspunkter), som skal vises i dropdown-menuen
const startTimeTable = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12.00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
];

export default function StartDropdown({startTime, setStartTime}) {
    // Opretter dropdown fra mantine
  const combobox = useCombobox({
    // Når dropdownen lukkes, nulstilles den valgte mulighed
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  // Går igennem starttidspunkt til dropdown component og skaber en ny option
  const options = startTimeTable.map((item) => (
    // V: Værdien, der bliver sendt, når brugeren vælger denne mulighed.
    // K: En unik nøgle, som React kræver for at optimere rendering af lister.
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    // Dropdown-komponenten
    <Combobox
      store={combobox} // Tilknyt dropdown-logikken
      withinPortal={false} // Gør, at dropdownen vises tæt på knappen
      offset={0} // Fjerner ekstra afstand mellem dropdownen og knappen
      onOptionSubmit={(val) => {
        setStartTime(val); // Gemmer det valgte tidspunkt
        combobox.closeDropdown(); // Lukker dropdown-menuen
      }}
    >
      {/* Knappen, som åbner dropdown-menuen */}
      <Combobox.Target>
        <InputBase
          component="button" 
          type="button"
          label="Vælg startstidspunkt" 
          withAsterisk // Tilføjer en lille stjerne for at vise, at det er vigtigt at vælge noget
          rightSection={<Combobox.Chevron />} // Tilføjer en pil, som viser, at der er en dropdown
          onClick={() => combobox.toggleDropdown()} // Åbner/lukker dropdownen, når du klikker
          rightSectionPointerEvents="none" // Sørger for, at pilen ikke kan klikkes på
          classNames={classes.input} 
        >
          {/* Viser enten det valgte tidspunkt eller "Vælg startstidspunkt", hvis ingen tid er valgt */}
          {startTime || <Input.Placeholder>Vælg startstidspunkt</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>

      {/* Dropdown-menuen, der viser tidspunkterne */}
      <Combobox.Dropdown className={classes.dropdown}>
        {/* Viser listen af muligheder */}
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}