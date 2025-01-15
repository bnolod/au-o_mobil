<center>
    <h1>
    🏎 Au-Ó Mobil 🚗</h1>
</center>

## 📝 Tartalomjegyzék
- [ 📚 Bevezetés](#bevezetés)
- [ 💡 Termék leírása](#-termék-leírása)
- [ ✅ Telepítési útmutató]( #-telepítési-útmutató)
- [ ❓ Használati útmutató](#-használati-útmutató)
- [ 💻 Felhasznált technológiák](#-felhasznált-technológiák)
- [ 📝 Tesztelések](#-tesztelések)

---
## 📚 Bevezetés

## 💡 Termék leírása

## ✅ Telepítési útmutató

Szükséges a futtatáshoz

- [NodeJs](https://nodejs.org/en/download)
- [Expo Go mobil app](https://expo.dev/go)
- A backend futtatása, ami [ebben](https://github.com/bnolod/au-o_backend) a repóban található.

> A lépések után elindul az app
>
> Parancssor:
>
> `git clone <repo_link>`
>
> `cd /Au-O/`
>
> `npm i`
>
> `npx expo start -c`
>
> Bescanneljük a QR kódot, ami megnyitja az expo mobil appban.


## ❓ Használati útmutató

### Regisztráció és bejelentkezés
- A program elsőként egy regisztrációs bemutatkozási folyamaton viszi át. (`/onboarding/index`)
- Ezután standard bejelentkezési/regisztrációs képernyők bejelentkezhet a felhasználó. (`/(auth)/[login vagy register]`)
- Miután a felhasználó sikeresen, visszaigazoltan bejelentkezett, a program átirányítja a felhasználói felület főoldalára (`/(root)/feed`)

## 💻 Felhasznált technológiák
- Natív mobil felület nyelve: **React Native**
- Natív mobil keretrendszer: **Expo**
- Grafikák és design tervek létrehozása és megosztása: **Figma**

## 📝 Tesztelések

# Featureok

## Felhasználói élmény

`nincs belépve felhasználó:`

### Letöltéskor

- 3 lépésből állő, rövid szöveges "bemutató"?

### Regisztráció

- Felhasználó regisztálása a következő adatokkal:
    - Felhasználónév
    - Email cím
    - Jelszó
    - Születési dátum
    - Becenév
- Regisztrálás után egyből bejelentkeztet a felhasználódba.

### Bejelentkezés

- Email vagy felhasználónév, és jelszó alapján.

---

`be van lépve felhasználó:`

## Navigáció

- Felső és alsó sáv
    - Alapból megjelenik
    - Megjelenés/eltűnés természetes animációval
        - Lefele görgetésnél eltűnik
        - Felfele görgetésnél megjelenik
    - Csoportok fülben
        - Felső sávhoz hozzáragad a csoport név, és azon belüli fülek (posztok, események)

---

## Alsó navigációs sáv gombok

### Kezdőlap

- Posztok, események böngészése, infinite scroll (Időrend alapján csökkenő, reakciók száma alapján csökkenő)

### Csoportok

- Csoportok, aminek tagja a felhasználó
- (csoportok, amiben nem tagja, recommendation)?
- Innen IS megnyitható egy csoport oldala.

### Új

- Új létrehozása valamelyik közül:
    - Poszt 
    - Csoport
    - Poszt csoportban (csoport kiválasztása)
    - Esemény csoportban (csoport kiválasztása)
 
### Események

- Ha a felhasználó tagja eseményeknek, akkor ebben a fülben látszanak.
- (a múltban történt eseményeket már ne lássa)?

### Profil

- Saját felhasználói profil
    - Megnézése
    - Szerkesztése
- Saját posztok
- Követők (+ követő eltávolítása)
- Követéseim (+ követés eltávolítása)
- (Csoportok)??


## Egyéb funkciók

- Más felhasználó profiljának megtekintése
    - profilképre kattintva, becenévre kattintva, felhasználónévre kattintva, keresésből
- Más felhasználó bekövetése, vagy követés törlése
    - Követés és törlés annak a felhasználónak a profiljáról, törlés a saját követéseknél is.
- Csoport oldal
    - Megtekintése: csoport nevére kattintva, csoportok fülből, keresésből
    - Belső posztok és események fül, tagok gomb amivel látjuk a tagokat
- Események megtekintése
    - Esemény nevére kattintva, események fül, csoportok -> események részleg, keresésből
- Üzenetek?
    - Más felhasználó profiljáról
    - Felső sáv üzenetek ikonról
- Beállítások
    - Profil fülből?
    - Külön gomb valahol?

