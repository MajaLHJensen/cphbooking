import { TextInput, PasswordInput, Button, Container } from "@mantine/core";  
import { useState } from "react";  
import { Link, useRouteContext } from "@tanstack/react-router";  
import styles from "./LoginForm.module.css";  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';  
import '../components/ButtonStyles.css';  

export default function LoginForm() {
  // Opretter en instans af Supabase klienten (man laver en kopi)
  const context = useRouteContext({ from: "/loginTeacher" });

  // Henter kontekst for routen, så vi kan få adgang til brugerinfo og navigation
  const [name, setName] = useState("");  // State til at holde styr på brugerens navn
  const [emailError, setEmailError] = useState("");  // State til at håndtere fejlmeddelelse for email
  const [passwordError, setPasswordError] = useState("");  // State til at håndtere fejlmeddelelse for password

  // Funktion til at håndtere login
  async function handleLogin(event) {
    event.preventDefault();  // Forhindrer browseren i at opdatere siden ved formular indsendelse
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

    // Forsøger at logge ind med Supabase authentication
    // Tjekker i supabasen om email og password er korrekt
    const { data, error } = await context.supabase.auth.signInWithPassword({
      email,
      password,
    });

    // Gemmer brugerinfo, hvis login lykkes
    const userInfo = {
      name,
      email,
    };
  }

  return (
    <div>
      {/* Container for Login-formularen */}
      <Container className={styles.container}>
        
        {/* Tilbage-knappen som navigerer til /studentTeacher */}
        <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: ''}}>
          <Link to="/studentTeacher"> 
            <Button size="lg" className='transparentBtn'> 
              <FontAwesomeIcon icon={faChevronLeft}/>  {/* Tilbage pil ikon */}
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
            style={{color: "white"}}  
            label="Mail" 
            description="Skriv din arbejdsmail"  
            placeholder="Mail" 
            name="email"  
            withAsterisk  // Stjerne for obligatorisk felt
            size="lg"  
            styles={{
              description: {
                color: 'white',  
              }
            }}
          />
          {/* Fejlmeddelelse hvis email ikke er korrekt */}
          {emailError && <span style={{color: "red"}} className="error">Forkert email</span>}

          {/* Password input felt */}
          <PasswordInput 
            style={{padding: "40px 0px", color: "white"}}  
            label="Password"
            description="Skriv dit password"
            placeholder="Password"
            name="password"
            withAsterisk  // Stjerne for obligatorisk felt
            size="lg"  
            styles={{
              description: {
                color: 'white',  
              }
            }}
          />
          {/* Fejlmeddelelse hvis password ikke er korrekt */}
          {passwordError && <span style={{color: "red"}} className="error">Forkert password</span>}

          {/* Log ind knap */}
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            {/* Knap til at sende login-anmodningen */}
            <Button size="lg" className='greenBtn' onClick={handleLogin}>Log ind</Button>
          </div>
        </form>
      </Container>
    </div>
  );
}