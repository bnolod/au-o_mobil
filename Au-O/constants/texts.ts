export const OnboardingTexts = {
  slide1: {
    HU: "Csatlakozz a leggyorsabban növekedő autós közösséghez!",
    EN: "Become a part of the largest automotive community today!",
  },
  slide2: {
    HU: "Csatlakozz egy hozzád közeli csoportba, vagy kezeld saját tökéletes csoportod!",
    EN: "Join a group that suits you best, or manage your own perfect group!",
  },
  slide3: {
    HU: "Vegyél részt emlékezetes eseményeken vagy szervezz sajátokat!",
    EN: "Attend or organize events and make new memories!",
  },
};
export const CallToActionTexts = {
  1: {
    HU: "Tovább",
    EN: "Next",
  },
  2: {
    HU: "Tovább",
    EN: "Next",
  },
  3: {
    HU: "Kezdjük!",
    EN: "Let's Go!",
  },
};

export const ButtonTexts = {
  back: {
    HU: "Vissza",
    EN: "Back",
  },
  skip: {
    HU: "Kihagyás",
    EN: "Skip",
  },
};
export const AuthTexts = {
  signup: {
    confirm: {
      HU: "Regisztrálok",
      EN: "Sign Up",
    },
    haveAccount: {
      HU: "Van már fiókod? ",
      EN: "Already have an account?",
    },
    confirmTabSwitch: {
      HU: "Jelentkezz Be!",
      EN: "Log In!",
    },
    placeholders: {
      email: {
        HU: "pelda@auo.com",
        EN: "example@auo.com",
      },
      password: {
        HU: "Jelszó",
        EN: "Password",
      },
      confirmPassword: {
        HU: "Jelszó megerősítése",
        EN: "Confirm password",
      },
      username: {
        HU: "auo-felhasznalo",
        EN: "auo-user",
      },
      nickname: {
        HU: "Becenév",
        EN: "Nickname",
      }
    },
    labels: {
      email: {
        HU: "E-mail cím",
        EN: "E-mail address",
      },
      password: {
        HU: "Jelszó",
        EN: "Password",
      },
      confirmPassword: {
        HU: "Jelszó megerősítése",
        EN: "Confirm password",
      },
      username: {
        HU: "Felhasználónév",
        EN: "Username",
      },
      nickname: {
        HU: "Becenév",
        EN: "Nickname",
      }
    },
    heroText: {
      HU: "Csatlakozz hozzánk!",
      EN: "Join us!",
    },
  },
  login: {
    confirm: {
      HU: "Bejelentkezés",
      EN: "Sign In",
    },
    notRegistered: {
      HU: "Nincs még fiókod?",
      EN: "Don't have an account yet?",
    },
    confirmTabSwitch: {
      HU: "Regisztrálj!",
      EN: "Create your Account!",
    },
    placeholders: {
      email: {
        HU: "pelda@auo.com",
        EN: "example@auo.com",
      },
      password: {
        HU: "Jelszó",
        EN: "Password",
      },
    },
    labels: {
      email: {
        HU: "E-mail cím",
        EN: "E-mail address",
      },
      password: {
        HU: "Jelszó",
        EN: "Password",
      },
    },
    heroText: {
      HU: "Üdv újra!",
      EN: "Welcome back!",
    },
  },
};

export const UIErrorTexts = {
    email: {

        invalidEmail: {
            HU: "Érvénytelen e-mail cím.",
            EN: "Invalid e-mail address",
        },
    },
    password: {
        minCharacters: {
            HU: `A jelszó minimum ${process.env.EXPO_PUBLIC_MIN_PASSWORD_CHARACTER_LENGTH} karakterből kell, hogy álljon.`,
            EN: `Your password must be at least ${process.env.EXPO_PUBLIC_MIN_PASSWORD_CHARACTER_LENGTH} characters.`
        },
        noCapitalLetters: {
            HU: "A jelszóban szerepelnie kell minimum 1 nagybetűs karakternek.",
            EN: "Your password must contain at least 1 capital character."
        },
        noSmallLetters: {
            HU: "A jelszóban szerepelnie kell minimum 1 kisbetűs karakternek.",
            EN: "Your password must contain at least 1 non-capital character"
        },
        noNumbers: {
            HU: "A jelszóban szerepelnie kell minimum 1 numerikus karakternek",
            EN: "Your password must contain at least 1 numeric character."
        },
        noSpecialCharacters: {
            HU: "A jelszónak tartalmaznia kell minimum 1 különleges karaktert.",
            EN: "Your password must include a special character."
        },
        passwordsDoNotMatch: {
            HU: "A jelszavak nem egyeznek.",
            EN: "Passwords do not match."
        },
    },
    username: {
        invalidUsername: {
            HU: "A felhasználónévnek legalább 3 karakterből kell állnia.",
            EN: "Username must be at least 3 characters long."
        }
    },
    dateOfBirth: {
      ageRestriction: {
        HU: "A felhasználónak legalább 16 évesnek kell lennie.",
        EN: "User must be at least 16 years old."
      },
      invalidDoB: {
        HU: "A megadott születési dátum nem megfelelő.",
        EN: "Invalid date of birth."
      }
    },
    authentication: {
        loginFailed: {
            HU: "Sikeretelen bejelentkezés. Ellenőrizd az adataidat.",
            EN: "Failed to log in. Check your credentials."
        },
        loginSuccess: {
            HU: "Sikeres bejelentkezés.",
            EN: "Successfully logged in."
        },
        registrationFailed: {
            HU: "Sikertelen regisztráció. Ellenőrizd a beviteli mezőket.",
            EN: "Failed to sign up. Check your input fields."
        },
        registrationSuccess: {
            HU: "Sikeres regisztráció.",
            EN: "Successfully signed up."
        }
    }

};

export const HttpErrorTexts = {
  400: {
    HU: "Hibás kérés",
    EN: "Bad request",
  },
  401: {
    HU: "Nincs jogosultság",
    EN: "Unauthorized",
  },
  403: {
    HU: "Tiltott hozzáférés",
    EN: "Forbidden",
  },
  404: {
    HU: "Nem található",
    EN: "Not found",
  },
  405: {
    HU: "Nem megengedett metódus",
    EN: "Method not allowed",
  },
  408: {
    HU: "Kérési időtúllépés",
    EN: "Request timeout",
  },
  500: {
    HU: "Szerver hiba",
    EN: "Internal server error",
  },
  501: {
    HU: "Implementációs hiba",
    EN: "Not implemented",
  },
  502: {
    HU: "Rossz kapcsolat",
    EN: "Bad gateway",
  },
  503: {
    HU: "Szolgáltatás nem elérhető",
    EN: "Service unavailable",
  },
  504: {
    HU: "Kapcsolati időtúllépés",
    EN: "Gateway timeout",
  },
  505: {
    HU: "HTTP verzió nem támogatott",
    EN: "HTTP version not supported",
  },
};
