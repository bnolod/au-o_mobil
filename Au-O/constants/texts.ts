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
export const HomeTexts = {
  search: {
    placeholder: {
      HU: "Keress akármire",
      EN: "Search for anything",
    },
  },
  post: {
    comment_1: {
      HU: "Szólj hozzá",
      EN: "Say something about"
    },
    comment_2: {
      HU: " posztjához",
      EN: "'s post!"
    },
    nocomments: {
      HU: "Nincsenek hozzászólások",
      EN: "No comments yet",
    },
    addcomment: {
      HU: "Légy te az első!",
      EN: "Be the first!",
    }
  }
}
export const boros_manifesto = {
  EN: "Mikor a szüleiddel ezt az iskolát választottátok, egyik legfontosabb szempont az lehetett, hogy végzés után könnyen el tudj helyezkedni, könnyen tudj tovább haladni. Az átlagostól jobb tovább lépési lehetőséget a Petrikben eddig végzett diákok tudása miatt biztosítják mind a munkáltatók, mind a felsőoktatás dolgozói. És most az osztályotokban vannak, akik még az adatbáziskezelőt is alig indították el és szinte semmit sem tanultak az elmúlt hónapokban. Helyette a többieket szórakoztatják órán és szünetben is. És nekem jó, sőt jeles jegyet kell adnom nekik, mert a beadott munkáik alapján csak ilyet adhatok. Miért nem tudom a tudásuk alapján értékelni őket? Mert a 'jó fej' osztálytársak tálcán kínálják a kiadott feladatokra a megoldást. Sajnos néha még erről a tálcáról sem tudnak választani, mert annyira csekély a tudásuk. Őket nem érdekli mi lesz másfél év múlva. Most akarják jól érezni magukat. Akik most a mások tudásából élnek elfeledkeznek arról, hogy ki fognak lépni az iskolából és amit itt kellett volna megtanulniuk azt máshol nem fogják megkapni! Akik segítenek nekik, valójában tudatlanságban tartják őket és ezzel a leggonoszabb dolgot teszik velük. Most elhitetik velük, hogy így minden rendben, de nem lesznek velük ott, amikor a tudás hiányukkal szembesítik majd őket. Arra sem gondolnak, hogy jól fizető állást bukhatnak az általuk megsegített társaik segítségével, mert futótűzként terjed majd a hír, hogy már a Petrik sem a régi, tudatlanul is elvégezhető. A munkáltatók inkább máshol végzettet fognak helyettük választani. És még egy mondat a tiszteletről. Tudom tisztelni azokat, akik az érdemtelenül gyenge jegy miatt felemelik a szavukat, de azokat már kevésbé, akik szemet hunynak akkor, ha érdemtelenül kapnak jó jegyet. Tudom tisztelni azokat, akik segítenek társaiknak a problémák megoldásában, de nem tudom tisztelni azokat, akik tudatlanságban tartják társaikat, hogy jó fejnek tűnjenek. Boldog új évet!",
  HU: "Mikor a szüleiddel ezt az iskolát választottátok, egyik legfontosabb szempont az lehetett, hogy végzés után könnyen el tudj helyezkedni, könnyen tudj tovább haladni. Az átlagostól jobb tovább lépési lehetőséget a Petrikben eddig végzett diákok tudása miatt biztosítják mind a munkáltatók, mind a felsőoktatás dolgozói. És most az osztályotokban vannak, akik még az adatbáziskezelőt is alig indították el és szinte semmit sem tanultak az elmúlt hónapokban. Helyette a többieket szórakoztatják órán és szünetben is. És nekem jó, sőt jeles jegyet kell adnom nekik, mert a beadott munkáik alapján csak ilyet adhatok. Miért nem tudom a tudásuk alapján értékelni őket? Mert a 'jó fej' osztálytársak tálcán kínálják a kiadott feladatokra a megoldást. Sajnos néha még erről a tálcáról sem tudnak választani, mert annyira csekély a tudásuk. Őket nem érdekli mi lesz másfél év múlva. Most akarják jól érezni magukat. Akik most a mások tudásából élnek elfeledkeznek arról, hogy ki fognak lépni az iskolából és amit itt kellett volna megtanulniuk azt máshol nem fogják megkapni! Akik segítenek nekik, valójában tudatlanságban tartják őket és ezzel a leggonoszabb dolgot teszik velük. Most elhitetik velük, hogy így minden rendben, de nem lesznek velük ott, amikor a tudás hiányukkal szembesítik majd őket. Arra sem gondolnak, hogy jól fizető állást bukhatnak az általuk megsegített társaik segítségével, mert futótűzként terjed majd a hír, hogy már a Petrik sem a régi, tudatlanul is elvégezhető. A munkáltatók inkább máshol végzettet fognak helyettük választani. És még egy mondat a tiszteletről. Tudom tisztelni azokat, akik az érdemtelenül gyenge jegy miatt felemelik a szavukat, de azokat már kevésbé, akik szemet hunynak akkor, ha érdemtelenül kapnak jó jegyet. Tudom tisztelni azokat, akik segítenek társaiknak a problémák megoldásában, de nem tudom tisztelni azokat, akik tudatlanságban tartják társaikat, hogy jó fejnek tűnjenek. Boldog új évet!"
}
export const PostCreationTexts = {
  publicPostIndicator : {
    HU: "Nyilvános",
    EN: "Public"
  },
  noEventSpecified: {
    HU: "Nincs",
    EN: "None"
  },
  cancel: {
    HU: "Mégse",
    EN: "Cancel"
  },
  uploadPrompt: {
    HU: "Tölts fel képeket az eszközödről!",
    EN: "Upload photos from your device!"
  },
  selectedImages: {
    HU: "kiválasztva a 10-ből",
    EN: "of 10 selected"
  },
  clearImages: {
    HU: "Képek Visszaállítása",
    EN: "Clear Selection"
  },
  form: {
    description: {
      label: {

        HU: "Leírás",
        EN: "Description"
      },
      placeholder: {
        HU: "Írj valamit a poszthoz!",
        EN: "Write something about your post!"
      }
    },
    group: {
      HU: "Csoport",
      EN: "Group" 
    },
    event: {
      HU: "Esemény",
      EN: "Event"
    },
    location: {
      label: {
        EN: "Location",
        HU: "Hely"
      },
      placeholder: {
        HU: "Mesélj a kép helyéről!",
        EN: "Tell us where you took the picture"
      }
    },
    next: {
      HU: "Tovább",
      EN: "Next"
    }
  },
  upload: {
    HU: "Képfeltöltés",
    EN: "Upload photos"
  },
  noImageFoundAlert: {
    HU: "Nem található kép!",
    EN: "No image found!"
  },
  noImageFoundAlertMessage: {
    HU: "Kérlek válassz ki legalább egy képet a feltöltéshez!",
    EN: "Please select at least one image to upload!"
  },
  confirmPost: {
    HU: "Közzététel",
    EN: "Post"
  },
  cancelPreview: {
    HU: "Vissza",
    EN: "Back"
  }
}