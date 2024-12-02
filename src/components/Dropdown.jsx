import { Combobox, Input, InputBase, useCombobox } from '@mantine/core';
import classes from './DropdownPositionStyles.module.css';

const lokaler = [
  'Lokale 2.13',
  'Lokale 2.88',
  'Lokale 3.05',
  'Lokale 3.08',
  'Lokale 3.14',
];

export default function Dropdown({selectedRoom, setSelectedRoom}) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = lokaler.map((item) => (
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
        setSelectedRoom(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          pointer
          label="Vælg Lokale"
          withAsterisk
          rightSection={<Combobox.Chevron />}
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents="none"
          classNames={ classes.input }
        >
          {selectedRoom || <Input.Placeholder>Vælg lokale</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown className={classes.dropdown}>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
