import { useDisclosure } from '@mantine/hooks';  // Importerer useDisclosure hook fra Mantine, som hjælper med at styre modalens åbning og lukning
import { Modal, Button } from '@mantine/core';  // Importerer Modal og Button komponenterne fra Mantine, som bruges til at vise en modal og en knap

// Funktion der opretter en modal komponent
function createModal() {
  return function Modal() {
    // useDisclosure hook bruges til at kontrollere om modal skal være åben eller lukket
    // 'opened' holder styr på om modal er åben (true) eller lukket (false)
    // 'open' og 'close' er funktioner der bruges til henholdsvis at åbne og lukke modal
    const [opened, { open, close }] = useDisclosure(false);

    return (
      <>
        {/* Modal komponenten, som vises når 'opened' er true */}
        <Modal 
          opened={opened}  // Binder modalens åbningsstatus til 'opened' state
          onClose={close}  // 'onClose' sørger for at lukke modal når brugeren klikker udenfor eller på luk-knappen
          title="Authentication"  // Titel på modal
          centered  // Sørger for at modal er centreret på skærmen
        >
          {/* Indhold af modal, kan fyldes med formularer, tekst eller andre komponenter */}
        </Modal>

        {/* Button der åbner modal når den bliver klikket */}
        <Button onClick={open}>Open centered Modal</Button>
      </>
    );
  };
}

// Skaber Modal komponenten ved at kalde createModal funktionen og eksportere den
export const Modal = createModal();  // Modal er nu en funktion, som returnerer den faktiske Modal komponent
export default Modal;  // Eksporterer Modal komponenten som standard eksport
