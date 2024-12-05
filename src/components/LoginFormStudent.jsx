import { TextInput, PasswordInput, Button, Container } from "@mantine/core"; 
import { useState } from "react";
import { Link, useNavigate, useRouteContext } from "@tanstack/react-router"; 
import styles from "./LoginForm.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';  
import '../components/ButtonStyles.css'; 
import { createClient } from "@supabase/supabase-js"; 
import { SUPABASE_URL, PUBLIC_ANON_KEY } from "../supabase/getSupabaseClient"; 

// Opretter en instans af Supabase klienten
const supabase = createClient(SUPABASE_URL, PUBLIC_ANON_KEY);

export default function LoginForm() {
  // Henter kontekst for ruten, så vi kan få adgang til brugerinfo og navigation
  const context = useRouteContext({ from: "/loginStudent" });
  const navigate = useNavigate({from: "/loginStudent"}); 
  const [name, setName] = useState("");  // State til at håndtere brugerens navn
  const [emailError, setEmailError] = useState("");  // State til fejlmeddelelse for email
  const [passwordError, setPasswordError] = useState("");  // State til fejlmeddelelse for password
 
  // Funktion til at håndtere login
  async function handleLogin(event) {
    event.preventDefault();  // Forhindrer at siden opdateres ved formular indsendelse
    const formData = new FormData(document.querySelector("#login-form"));  // Henter form data
    const email = formData.get("email");  // Henter email fra form data
    const password = formData.get("password");  // Henter password fra form data

    // Tjekker om email er tom og om den indeholder et '@'-symbol
    if (email === '' || email.indexOf("@") === -1) {
      setEmailError("Forkert email")  // Sætter fejlmeddelelse for email
    }

    // Tjekker om password er tomt
    if (password === '') {
      setPasswordError("Forkert password")  // Sætter fejlmeddelelse for password
    }

    console.log(name);  // Udskriver navnet til konsol
    console.log(email);  // Udskriver email til konsol
    console.log(password);  // Udskriver password til konsol
    console.log(context.supabase);  // Udskriver Supabase kontekst

    // Forsøger at logge ind med Supabase authentication
    const { data, error } = await context.supabase.auth.signInWithPassword({
      email,
      password,
    });

    // Gemmer brugerinfo, hvis login lykkes
    const userInfo = {
      name,
      email: data.user.email,
    };

    console.log("login", data.user.email);  // Udskriver den indloggede brugers email

    context.setUserInfo(userInfo);  // Sætter brugerinfo i konteksten

    // Navigerer til booking side efter login
    navigate({to: "/booking"});  // Redirect til /booking

  }

  return (
    <div>
      {/* Container for Login-formularen */}
      <Container className={styles.container}>

        {/* Tilbage-knappen som navigerer til /studentTeacher */}
        <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: '',}}>
          <Link to="/studentTeacher">
            <Button size="lg" className='transparentBtn' onClick={() => context.navigate("/")}> 
              <FontAwesomeIcon icon={faChevronLeft}/>  {/* Venstre pil ikon */}
              Tilbage
            </Button>
          </Link>
        </div>

        {/* Overskrift på loginformularen */}
        <h1>Log ind</h1>
        
        {/* Formular til login */}
        <form onSubmit={handleLogin} id="login-form">
          {/* Email input felt */}
          <TextInput 
            style={{color: "white"}}  // Hvid tekstfarve
            label="Mail" 
            description="Skriv din skolemail"  // Beskrivelse af feltet
            placeholder="Mail" 
            name="email"  // Navn på inputfeltet
            withAsterisk  // Asterisk for obligatorisk felt
            size="lg"  // Størrelse på inputfeltet
            styles={{
              description: {
                color: 'white',  // Hvid farve på beskrivelsen
              },
            }}
          />
          {/* Fejlmeddelelse hvis email ikke er korrekt */}
          {emailError && <span style={{color: "red"}} className="error">Forkert email</span>}

          {/* Password input felt */}
          <PasswordInput 
            style={{padding: "40px 0px", color: "white"}}  // Hvid tekstfarve og padding for feltet
            label="Password"
            description="Skriv dit password"
            placeholder="Password"
            name="password"
            withAsterisk
            size="lg"
            styles={{
              description: {
                color: 'white',  // Hvid farve på beskrivelsen
              },
            }}
          />
          {/* Fejlmeddelelse hvis password ikke er korrekt */}
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
