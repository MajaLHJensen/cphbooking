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
    <Combobox
      store={combobox}
      withinPortal={false}
      offset={0}
      onOptionSubmit={(val) => {
        setStartTime(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          pointer
          label="Vælg startstidspunkt"
          withAsterisk
          rightSection={<Combobox.Chevron />}
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents="none"
          classNames={ classes.input }
        >
          {startTime || <Input.Placeholder>Vælg startstidspunkt</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown className={classes.dropdown}>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
