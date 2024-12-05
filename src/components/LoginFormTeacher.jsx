import { TextInput, PasswordInput, Button, Container } from "@mantine/core";  // Importerer Mantine komponenter for inputfelter, knapper og container
import { useState } from "react";  // Importerer useState hook fra React til at håndtere state
import { Link, useRouteContext } from "@tanstack/react-router";  // Importerer funktioner fra React Router til navigation og rutehåndtering
import styles from "./LoginForm.module.css";  // Importerer CSS-modul til styling af LoginForm
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  // Importerer FontAwesome til ikoner
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';  // Importerer et venstre pil ikon til tilbage-knappen
import '../components/ButtonStyles.css';  // Importerer yderligere styling for knapper

export default function LoginForm() {
  // Henter konteksten for ruten, så vi kan bruge oplysninger som supabase og navigation
  const context = useRouteContext({ from: "/loginTeacher" });

  // useState hooks til at håndtere navn, fejlmeddelelser og brugerinput
  const [name, setName] = useState("");  // State til at holde styr på brugerens navn
  const [emailError, setEmailError] = useState("");  // State til at håndtere fejlmeddelelse for email
  const [passwordError, setPasswordError] = useState("");  // State til at håndtere fejlmeddelelse for password

  // Funktion til at håndtere login-processen
  async function handleLogin(event) {
    event.preventDefault();  // Forhindrer formularen i at opdatere siden
    const formData = new FormData(document.querySelector("#login-form"));  // Henter form data
    const email = formData.get("email");  // Henter email fra formularen
    const password = formData.get("password");  // Henter password fra formularen

    // Tjekker om email er tom eller ikke indeholder '@', og viser fejlmeddelelse hvis nødvendigt
    if (email === '' || email.indexOf("@") === -1) {
      setEmailError("Forkert email");  // Sætter fejlmeddelelse for email
    }

    // Tjekker om password er tomt og viser en fejlmeddelelse
    if (password === '') {
      setPasswordError("Forkert password");  // Sætter fejlmeddelelse for password
    }

    // Logger brugerens data til konsollen (kan bruges til fejlfinding)
    console.log(name);
    console.log(email);
    console.log(password);
    console.log(context.supabase);  // Logger supabase instansen

    // Forsøger at logge brugeren ind med Supabase's autentificeringsmetode
    const { data, error } = await context.supabase.auth.signInWithPassword({
      email,
      password,
    });

    // Gemmer brugerinfo i en objekt
    const userInfo = {
      name,
      email,
    };

    // Dette kunne bruges til at sætte brugerinfo i global state (for nu er det kommenteret ud)
    // context.setUserInfo(userInfo); 

    // Kommentarer til senere brug:
    // 1. Hvis login lykkedes, kan du redirecte brugeren til en ny side
    // context.navigate("/index");  // Navigerer til index-siden
  }

  return (
    <div>
      {/* Containeren, der indeholder loginformularen */}
      <Container className={styles.container}>
        
        {/* Tilbage-knappen, som leder brugeren til en anden side */}
        <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: ''}}>
          <Link to="/studentTeacher">  {/* Link til "/studentTeacher" siden */}
            <Button size="lg" className='transparentBtn' onClick={() => context.navigate("/")}> 
              <FontAwesomeIcon icon={faChevronLeft}/>  {/* Venstre pil ikon */}
              Tilbage
            </Button>
          </Link>
        </div>
        
        {/* Overskrift på loginformularen */}
        <h1>Log ind</h1>

        {/* Login-formularen */}
        <form onSubmit={handleLogin} id="login-form">
          {/* Email input felt */}
          <TextInput 
            style={{color: "white"}}  // Gør tekstfarven hvid
            label="Mail" 
            description="Skriv din arbejdsmail"  // Beskrivelse af feltet
            placeholder="Mail" 
            name="email"  // Angiver navnet på inputfeltet
            withAsterisk  // Angiver at feltet er obligatorisk
            size="lg"  // Sætter størrelsen på inputfeltet
            styles={{
              description: {
                color: 'white',  // Gør beskrivelsen hvid
              },
            }}
          />
          {/* Vist fejlmeddelelse, hvis email-input er forkert */}
          {emailError && <span style={{color: "red"}} className="error">Forkert email</span>}

          {/* Password input felt */}
          <PasswordInput 
            style={{padding: "40px 0px", color: "white"}}  // Gør teksten hvid og tilføjer padding
            label="Password"
            description="Skriv dit password"
            placeholder="Password"
            name="password"
            withAsterisk  // Angiver at feltet er obligatorisk
            size="lg"  // Sætter størrelsen på inputfeltet
            styles={{
              description: {
                color: 'white',  // Gør beskrivelsen hvid
              },
            }}
          />
          {/* Vist fejlmeddelelse, hvis password-input er forkert */}
          {passwordError && <span style={{color: "red"}} className="error">Forkert password</span>}

          {/* Log ind knap */}
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Button size="lg" className='greenBtn' onClick={handleLogin}>Log ind</Button>  {/* Knap til at sende login-anmodningen */}
          </div>
        </form>
      </Container>
    </div>
  );
}
