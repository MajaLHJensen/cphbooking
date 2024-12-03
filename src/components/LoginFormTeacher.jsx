import { TextInput, PasswordInput, Button, Container } from "@mantine/core";
import { useState } from "react";
import { Link, useRouteContext } from "@tanstack/react-router";
import styles from "./LoginForm.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import '../components/ButtonStyles.css';

export default function LoginForm() {
  const context = useRouteContext({ from: "/loginTeacher" });
  const [name, setName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
 
  async function handleLogin(event) {
    event.preventDefault();
    const formData = new FormData(document.querySelector("#login-form"));
    const email = formData.get("email");
    const password = formData.get("password");

    // Tjekker om mail feltet er tomt og om der er blevet brugt @, hvis ikke kommer der en fejlbesked
    if (email === '' || email.indexOf("@") === -1) {
      setEmailError("Forkert email")
    }

    // Tjekker om password er tomt, og kommer med fejlbesked, hvis det er tomt. 
    if (password === '') {
      setPasswordError("Forkert password")
    }

    console.log(name);
    console.log(email);
    console.log(password);
    console.log(context.supabase);

    const { data, error } = await context.supabase.auth.signInWithPassword({
      email,
      password,
    });

    // 1. Gemme info på brugeren
    const userInfo = {
      name,
      email,
    };

    // context.setUserInfo(userInfo);

    // 2. Siden ændrer sig
    // Redirecter til /index
    // context.navigate("/booking");
  }

  return (
    <div>
        {/* Log ind formen, som vi kalder container */}
        <Container className={styles.container}>

            {/* Tilbage knappen på log ind formen */}
            <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: '',}}>
                <Link to="/studentTeacher">
                    <Button size="lg" className='transparentBtn' onClick={() => context.navigate("/")}> <FontAwesomeIcon icon={faChevronLeft}/> Tilbage</Button>
                </Link>
            </div>
        
            <h1>Log ind</h1>
            <form onSubmit={handleLogin} id="login-form">
                <TextInput style={{color: "white"}}
                  label="Mail" 
                  description = "Skriv din arbejdsmail" 
                  placeholder="Mail" 
                  name="email" 
                  withAsterisk
                  size="lg" 
                  styles={{
                      description: {
                        color: 'white',
                      },
                  }}
                />
                {emailError && <span style={{color: "red"}} className="error">Forkert email</span>}

                <PasswordInput style={{padding: "40px 0px", color: "white"}}
                  label="Password"
                  description="Skriv dit password"
                  placeholder="Password"
                  name="password"
                  withAsterisk
                  size="lg"
                  styles={{
                    description: {
                      color: 'white',
                      },
                  }}
                />
                {passwordError && <span style={{color: "red"}} className="error">Forkert password</span>}

                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
                    <Button size="lg" className='greenBtn' onClick={handleLogin}>Log ind</Button>
                </div>
            </form>
        </Container>
    </div>
  );
}