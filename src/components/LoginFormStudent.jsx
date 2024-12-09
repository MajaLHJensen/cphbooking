import { TextInput, PasswordInput, Button, Container } from "@mantine/core"; 
import { useState } from "react";
import { Link, useNavigate, useRouteContext, useRouter } from "@tanstack/react-router"; 
import styles from "./LoginForm.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';  
import '../components/ButtonStyles.css'; 
import { createClient } from "@supabase/supabase-js"; 
import { SUPABASE_URL, PUBLIC_ANON_KEY } from "../supabase/getSupabaseClient"; 

// Opretter en instans af Supabase klienten (man laver en kopi)
const supabase = createClient(SUPABASE_URL, PUBLIC_ANON_KEY);

export default function LoginForm() {
  // Henter kontekst for routen, så vi kan få adgang til brugerinfo og navigation
  const navigate = useNavigate();
  const context = useRouteContext({ from: "/loginStudent" });

  const [name, setName] = useState("");  // State til at håndtere brugerens navn
  const [emailError, setEmailError] = useState("");  // State til fejlmeddelelse for email
  const [passwordError, setPasswordError] = useState("");  // State til fejlmeddelelse for password
 
  // Funktion til at håndtere login
  async function handleLogin(event) {
    event.preventDefault(); // Forhindrer browseren i at opdatere siden ved formular indsendelse
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

    console.log(email);  // Udskriver email til konsol
    console.log(password);  // Udskriver password til konsol
    console.log(context.supabase);  // Udskriver Supabase kontekst

    // Forsøger at logge ind med Supabase authentication
    // Tjekker i supabasen om email og password er korrekt
    const { data, error } = await context.supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log("login", data.user.email);  // Udskriver den indloggede brugers email

    context.setUserInfo({
       
      email: data.user.email,
    })  // Sætter brugerinfo i konteksten/opsumeringen

    // Navigerer til booking side efter login
    setTimeout(() => {
      navigate({to: "/booking"});
    }, 500)
  }

  return (
    <div>
      {/* Container for Login-formularen */}
      <Container className={styles.container}>

        {/* Tilbage-knappen som navigerer til /studentTeacher */}
        <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: '',}}>
          <Link to="/studentTeacher">
            <Button size="lg" className='transparentBtn'> 
              <FontAwesomeIcon icon={faChevronLeft}/>  {/* Tilbage pil ikon */}
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
            style={{color: "white"}}
            label="Mail" 
            description="Skriv din skolemail"
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
            style={{paddingTop: "40px", color: "white"}}
            label="Password"
            description="Skriv dit password"
            placeholder="Password"
            name="password"
            withAsterisk // Stjerne for obligatorisk felt
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
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: "40px"}}>
            {/* Knap til at sende login-anmodningen */}
            <Button size="lg" className='greenBtn' onClick={handleLogin}>Log ind</Button>  
          </div>
        </form>
      </Container>
    </div>
  );
}