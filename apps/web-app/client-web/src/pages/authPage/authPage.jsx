import { useState } from "react";
import styles from "./authPage.module.css";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../utilites/authContextapi";

function Header() {
  return (
    <header className={styles.header}>
      <Link to={"/"}>
        <img src="/smart-safi(main-logo).jpg" className={styles.brandLogo} />
      </Link>
    </header>
  );
}
function AuthPage() {
  const [view, setView] = useState("login");
  const { signUp, login } = useAuth();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const userData = await login(email, password);
      console.log(userData);
      navigate("/");
    } catch (err) {
      setError(err.message || "Something went wrong during login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const signUpUserData = await signUp(email, password);
      navigate("/clientRegistration");
    } catch (e) {
      setError(e.message || "Sign up failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className={styles.mainContent}>
        <div className={styles.loginContainer}>
          {view === "login" ? (
            <h1 className={styles.loginTitle}>Log in to your account</h1>
          ) : (
            <h1 className={styles.loginTitle}>Create a new account</h1>
          )}
          {view === "login" ? (
            <p className={styles.loginSubtitle}>
              Don't have one?{" "}
              <button
                type="button"
                className={styles.buttonLink}
                onClick={() => setView("signup")}
              >
                Sign up here
              </button>
            </p>
          ) : (
            <p className={styles.loginSubtitle}>
              Already have an account?{" "}
              <button
                type="button"
                className={styles.buttonLink}
                onClick={() => setView("login")}
              >
                Login here
              </button>
            </p>
          )}

          <form onSubmit={view === "login" ? handleLogin : handleSignUp}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                className={styles.formInput}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.formLabel}>
                Password *
              </label>
              <input
                type="password"
                id="password"
                className={styles.formInput}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {view === "login" && (
              <div className={styles.forgotPassword}>
                <a href="#">Forgotten your password?</a>
              </div>
            )}
            {view === "login" ? (
              <button
                type="submit"
                className={styles.signInButton}
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            ) : (
              <button
                type="submit"
                className={styles.signInButton}
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Register"}
              </button>
            )}
            {error && <div className={styles.errorMessage}>{error}</div>}
          </form>
          <div className={styles.divider}>this or continue with</div>
          {view === "login" ? (
            <button className={`${styles.socialButton} ${styles.appleButton}`}>
              <img src="./icons/apple.svg" alt="apple logo" />
              Sign in with Apple
            </button>
          ) : (
            <button className={`${styles.socialButton} ${styles.appleButton}`}>
              <img src="./icons/apple.svg" alt="apple logo" />
              Sign up with Apple
            </button>
          )}

          {view === "login" ? (
            <button className={`${styles.socialButton} ${styles.googleButton}`}>
              <img src="./icons/google.svg" alt="google logo" />
              Sign in with Google
            </button>
          ) : (
            <button className={`${styles.socialButton} ${styles.googleButton}`}>
              <img src="./icons/google.svg" alt="google logo" />
              Sign up with Google
            </button>
          )}
          <p className={styles.termsText}>
            By signing up you agree to the{" "}
            <a href="#" className={styles.termsLink}>
              General Terms and Conditions
            </a>{" "}
            (AGB) and{" "}
            <a href="#" className={styles.termsLink}>
              Privacy Policy
            </a>
            . As a customer of SMARTsaFI, you will receive information about our
            platform and your booking by email. If you no longer wish to receive
            these, you can unsubscribe at any time via the link at the end of
            the emails.
          </p>
        </div>
      </main>
    </>
  );
}
export { AuthPage, Header };
