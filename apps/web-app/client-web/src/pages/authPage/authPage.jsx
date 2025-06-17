import { useState } from "react";
import styles from "./authPage.module.css";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
function AuthPage() {
  const [view, setView] = useState("login");

  return (
    <>
      <header className={styles.header}>
        <a href="#" className={styles.backButton}>
          <Link to={"/"}>
            <span className={styles.backArrow}>
              <ArrowLeft />
            </span>
          </Link>
          <span className={styles.brandName}>
            SMART <span className={styles.small}>sa</span>FI
          </span>
        </a>
        <div className={styles.languageSelector}>
          <img src="/icons/kenyaFlag.svg" alt="kenya flag" />
          KE ▼
        </div>
      </header>

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
              <a
                href="#"
                className={styles.signupLink}
                onClick={() => setView("signup")}
              >
                Sign up here
              </a>
            </p>
          ) : (
            <p className={styles.loginSubtitle}>
              Already have an account?{" "}
              <a
                href="#"
                className={styles.signupLink}
                onClick={() => setView("login")}
              >
                Login here
              </a>
            </p>
          )}

          <form>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                className={styles.formInput}
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
                required
              />
            </div>
            {view === "login" && (
              <div className={styles.forgotPassword}>
                <a href="#">Forgotten your password?</a>
              </div>
            )}
            {view === "login" ? (
              <button type="submit" className={styles.signInButton}>
                Sign In
              </button>
            ) : (
              <button type="submit" className={styles.signInButton}>
                Register
              </button>
            )}
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
export { AuthPage };
