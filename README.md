<center>
    <h1>
    🏎 Au-Ó Mobil 🚗</h1>
</center>

## 📝 Tartalomjegyzék

### ✅ A Typedoc által kiegészített fejlesztői dokumentáció a repo [Github Pages oldalán](https://bnolod.github.io/au-o_mobil/) található.

- [ 📚 Bevezetés](#-bevezetés)
- [ 🔖 Dokumentációs segítség](#-dokumentációs-segítség)
- [ 🔗 Hasznos linkek](#-hasznos-linkek)
- [ 💡 Termék leírása](#-termék-leírása)
- [ ✅ Telepítési útmutató](#-telepítési-útmutató)
- [ ❓ Használati útmutató](#-használati-útmutató)
- [ 💻 Felhasznált technológiák](#-felhasznált-technológiák)
- [ 📝 Tesztelések](#-tesztelések)

---

## 📚 Bevezetés

#### 👋 Üdvözlünk az Au-Ó családban!

Teszteld első kézből a vizsgára szeretettel készült közösségi média projektünket!

Kövesd az alább található **telepítési** valamint **használati** útmutatókat, és kezdd el használni az alkalmazásunkat!

## 🔖 Dokumentációs segítség

- A README-n kívül az összes dokumentáció manuálisan Typedoc segítségével lett megírva.
- A teljes dokumentációt a ./Au-O/docs/index.html fájl megnyitásával éri el.
- A Typedoc dokumentáció tartalmazza
  - ezt a README.md fájlt
  - API hívások funkció dokumentációját
  - Komponensek dokumentációját
  - Típusok, osztályok és interfészek dokumentációját
  - Alkalmazást lefedő kontextusok működését
  - Entitások tulajdonságait
  - Alkalmazásban előforduló események dokumentációit
  - Általános funkciók dokumentációit

Megjegyzés: a screenek ("oldalak") dokumentációi alább, a [✔ Featureök](#-featureok) címke alatt találhatók.


## 🔗 Hasznos linkek

📝 Ez a projekt **három** repóból áll, indítás előtt győződjön meg róla, hogy mindhárom komponens elérhető.

- [Frontend | Web](https://github.com/bnolod/au-o_frontend)
- [Backend](https://github.com/bnolod/au-o_backend)

💎 Az elsődleges design koncepciókat, valamint prezentációt Figma felületen terveztük, a külön oldalak alább elérhetők.

- [💻 Asztali web](https://www.figma.com/design/j9NffYp8ruYwC6iuz0Sgnp/Desktop?node-id=0-1&t=Eszh1sA2oioWKFlm-1)
- [📱 Mobil](https://www.figma.com/design/GDRSmJy5sZxZp7PKZ4rmtD/Mobil?t=QY6xjWNAz19yVUjy-1)
- [⚡ Koncepció](https://www.figma.com/board/7v2i3Ps0qUoqlQQjlErx8S/Koncepci%C3%B3?t=QY6xjWNAz19yVUjy-1)
- [🔏 Adatbázis séma](https://www.figma.com/design/ZMLoquJGEDi3lEhLdslQ9c/DB?t=QY6xjWNAz19yVUjy-0)
- [🗣 Prezentáció](https://www.figma.com/slides/9yKoTciIISnBTpzo4RTfS9/Prezent%C3%A1ci%C3%B3?node-id=54-236&t=QY6xjWNAz19yVUjy-1)

## 💡 Termék leírása

A projektünk **újragondolja** a közösségi média alkalmazások széles körű témaválasztékának szokásait, és biztosít egy felületet az olyanoknak, akiket kifejezetten érdekel minden, ami kerekeken gurul és belső égésű motor hajtja.

Felületünk sajátossága közé tartozik első sorban a felhasználói garázs funkció, amely lehetővé teszi a felhasználóinknak, hogy büszkén viseljék, hogy mit vezetnek.

A garázs funkció kiegészíti a többi funkciót a következőkkel:

- 😄 Színesíti a felhasználói profilt
  - A profilon az autóiddal osztozhatsz a reflektorfényen.
- 🚩 Hozzárendelheted egy autódat a posztokhoz, hogy tudja mindenki, hogy mit vezetsz.
- 📩 Elküldheted az autóidat ismerőseidnek a valós idejű chat funkcióval.

## ✅ Telepítési útmutató

> [!WARNING]
> Az alkalmazás API kulcsokat használ. Ezek nem kerültek fel nyilvánosan a repóba, a beadott .zip fájlban található környezeti változókat tartalmazó fájlban (.env & .env.example) meg vannak adva. Legyenek szívesek ne maxolják ki a kulcsaimat

#### Szükséges a futtatáshoz

- [Node.js](https://nodejs.org/en/download)
- [Expo Go mobil app](https://expo.dev/go)
- A backend sikeres futtatása, ami [ebben](https://github.com/bnolod/au-o_backend) a repóban található.


### FONTOS! KÖRNYEZETI VÁLTOZÓK!

- Git repóból történő klónozás esetén szükség van API kulcsokra és egyéb környezeti változókra.
- A beadott .zip fájl tartalmazza az előre bekonfigurált API kulcsokat, viszont módosítás nélkül **nem lesz elérhető a backend.**
- Megfelelő működés biztosítása érdekében szükség van egy **vezeték nélküli hálózatra, valamint egy mobil eszközre.**
- Lépések:
  - Fizikai mobil (iOS vagy Android) eszköz használatával
  - > ipconfig
    - -> Wireless LAN adapter Wi-Fi / IPv4 Address beállítása (továbbiakban IP)
    - .env 
        - EXPO_PUBLIC_AXIOS_BASE_URL = http://IP:8000/api/v1
        - EXPO_PUBLIC_WS_URL = http://IP:8000/ws
        - EXPO_PUBLIC_IMGUR_CLIENT_ID **NEM TALÁLHATÓ MEG EBBEN A REPÓBAN, KIZÁRÓLAG A BEADOTT .ZIP FÁJLBA TÖMÖRÍTETT KÖRNYEZETBEN!!!**
  - Fontos, hogy a mobil eszköz ugyanazon a vezeték nélküli hálózatra legyen kapcsolódva, mint a programot futtató számítógép.

> A lépések után elindul az app
>
> Parancssor:
>
> `cd /Au-O/`
>
> `npm i`
>
> `npx expo start -c`
>
> Bescanneljük a QR kódot, ami megnyitja az expo mobil appban.

#### Megjegyzés
Az Expo Go egy korlátozott sandbox környezet ami inkább tesztelésre alkalmas. Első indítás alkalmával előfordulhatnak layout shiftek. Ha Androidon futtatjuk, érdemesebb a csatolt .apk fájlt használni futtatásra. iOS esetén nincs lehetőség teljesen natív futtatásra az Expo Go-n kívül, mivel ahhoz fejlesztői jogosultság kell.
## ❓ Használati útmutató


### 🔐 Regisztráció és bejelentkezés

- A program elsőként egy regisztrációs bemutatkozási folyamaton viszi át. (`/onboarding/`)
  - Ez a részleg bemutatja az alkalmazásunkat, valamint annak különleges funkcióit.
- Ezután standard bejelentkezési/regisztrációs képernyők bejelentkezhet a felhasználó. (`/(auth)/[login vagy register]`)
  - Itt a felhasználónak meg kell adnia **érvényes** regisztrációs vagy bejelentkezési adatokat, hogy tovább engedje az alkalmazás.
  - A validációs módszerek definiálva vannak a backend repo root mappájában található Validációs szabályok.md fájlban.
    - Ezeket a szabályokat alkalmaztuk egységesen, itt az Au-O/lib/Validation mappában találjuk ezeket a szabályokat.
- Miután a felhasználó sikeresen, visszaigazoltan bejelentkezett, a kiszolgáló oldal érvényesíti az adatokat és hitelesített adatokkal átirányítja a felhasználói felület alap elrendezésére - **/(root)/ layout**
  - Ez a felület biztosít a felhasználónak navigációs lehetőségeket, egy alsó navigációs sáv formájában.
    - Ezekről az útvonalakról a [🔖 Felhasználói élmény](#🔖-felhasználói-élmény) szekcióban olvashat tovább.
  - Itt található az alkalmazás főoldala, itt találkozik a felhasználó posztokkal, amit a többi felhasználó tett közzé.
### 💯 Javasolt ellenőrzési UX flow
Tesztkörnyezeti indításnál (bemutatási builden standard) a kiszolgálói oldal DataLoader osztálya előre feltölti az adatbázist, hogy pontos felhasználói tapasztalatot tudjon szimulálni.
#### Általános funkciók
- Regisztráció
- Profil megtekintése
- Profil attribútumok szerkesztése (pl. profilkép, bio, hosszan letartva a szerkesztendő elemet)
- Feed böngészése
- Posztokra reagálás, hozzászólások illetve válaszok írása
- Néhány felhasználó bekövetése
- Jármű hozzáadása a profilhoz
- Felhasználói poszt(ok) létrehozása
---
#### Valós idejű funkciók
- Chat funkciók tesztelésénél ajánlott a **webes** felületen is beregisztrálni egy külön profillal, és a két saját felhasználóval üzengetni.
- Tesztelésre ajánlott chat funkciók
    - Szöveges üzenetek küldése
    - Poszt küldése
    - Csoport meghívás küldése
    - Autó küldése
    - Profil küldése


## 💻 Felhasznált technológiák

- Natív mobil felület nyelve: **React Native**
- Natív mobil keretrendszer: **Expo**
- Képfeltöltési API: **Imgur**
- Grafikák és design tervek létrehozása és megosztása: **Figma**

## 📝 Tesztelések
<center>Megjegyzés: ez a részleg csak a MOBIL felület tesztjeire vonatkozik, kivéve ahol kifejezetten ellenkezőleg van állítva. A többi rész tesztelése elérhető a stack részének külön repójában.</center>

### ⭕ Egységtesztek
- Az egységtesztelést Jesttel oldottuk meg.
- Teszteseteket írtunk a következő elemekre
  - Alap funkciók (functions.ts)
  - Többször felhasznált komponensek (components/ui-ból néhány)
### 🔜 Statikus tesztek
- A statikus tesztelésnek megfelel a TypeScript által biztosított type-safety, ami virtuálisan kizárja az érvénytelen típusok által dobott hibák lehetőségét.

### 🔧 Manuális tesztek
- Az alkalmazás felületét és cross-platform (Android & iOS) kompatibilitását (funkciók és kinézet egyaránt) kézzel teszteltük, biztosítva hogy a legtöbb modern eszközön gond nélkül tud futni.

### 📬 API tesztek
- Az API tesztek **megosztottak** a három komponens között. (web & mobil & backend) 
- A frontend és backend közötti kapcsolatot test-driven development koncepciók alapján fejlesztettük.
- Az API tesztek a Backend repóhoz csatolt Postman Collection exportjában található.

### 👴 Végfelhasználói tesztek
- Az alkalmazásunk beviteli mezőit ellenőrizzük közös validációs szabályokkal (a dokumentációját szintén a backend repóban találják)
- Ezekre a beállításokra készültek mock elemek és tesztesetek a hibakezelésekre.

# ✔ Featureok

## 🔖 Felhasználói élmény

### 🔽 Letöltéskor

- 3 lépésből állő, rövid szöveges bemutató

### 🔰 Regisztráció

- Felhasználó regisztálása a következő adatokkal:
  - Felhasználónév
  - Email cím
  - Jelszó
  - Születési dátum
  - Becenév
- Regisztrálás után egyből bejelentkeztet a felhasználódba.

### 🚪 Bejelentkezés

- Email vagy felhasználónév, és jelszó alapján.

---

`be van lépve felhasználó:`

## 🗺 Navigáció

- Felső és alsó sáv
  - Alapból megjelenik
  - Megjelenés/eltűnés természetes animációval
    - Lefele görgetésnél eltűnik
    - Felfele görgetésnél megjelenik
  - Csoportok fülben
    - Felső sávhoz hozzáragad a csoport név, és azon belüli fülek (posztok, események)

---

### 🏡 Kezdőlap

- Posztok böngészése, infinite scroll (Időrend alapján csökkenő)

### 📣 Csoportok

- Itt elérhető a felhasználók által létrehozott csoportok széles választéka.
- Megjelennek a csoportok, amelyeknek a felhasználó tagjai, valamint az eddig nem látott csoportok is.
- Itt egy kattintásra tud a felhasználó belépni, vagy éppen felvételi jelentkezést benyújtani egy csoportba.

### ✨ Új

- Minden hasonló alkalmazásban a felhasználó van a központban, ezért gyors elérésbe lett helyezve az új profil poszt funkció.
- Egy **űrlap** kitöltése után a felhasználó közzétesz a profiljára egy új bejegyzést
  - 1-10 kép
  - Közepes hosszúságú leírás
  - Rövid helyszín
  - Hozzárendelt autó

### 💬 Chat

- Az alkalmazásunk támogatja a valós idejű csevegést felhasználók között.
- Jobb felül a 💬 ikonra kattintva elérheti a legutóbbi üzeneteket, vagy új csevegés indításáért profil oldalról is lehet üzenni.
- A felhasználók megoszthatnak egymással **posztokat**, **csoport meghívásokat**, valamint **autókat**.
  - Megjegyzés: privát elemek esetén jogosultság szükséges.
- A média megosztás funkció az aktuális megosztandó elem menüjéből érhető el (**...** ikon vagy hosszan tartva.)

### 😀 Profil

- Saját felhasználói profil
  - Megnézése
  - Szerkesztése
- Saját posztok
- Követők (+ követő eltávolítása)
- Követéseim (+ követés eltávolítása)
- A felhasználói profilon négy fül található (👂)
  - Posztok
    - Kilistázza a felhasználó posztjait.
  - Csoportok
    - Kilistázza a felhasználó **nyilvános** csoportjait.
  - Garázs
    - Kilistázza a felhasználó összes közzétett járművét.
  - Mentett posztok
    - Ha nyilvános, kilistázza a felhasználó által elmentett bejegyzéseket.

## ‼ Egyéb funkciók

- Keresés
  - A felhasználó akármire rá tud keresni - profilra, csoportokra valamint posztokra.
- Más felhasználó profiljának megtekintése
  - profilképre kattintva, becenévre kattintva, felhasználónévre kattintva, keresésből
- Más felhasználó bekövetése, vagy követés törlése
  - Követés és törlés annak a felhasználónak a profiljáról, törlés a saját követéseknél is.
- Csoport oldal
  - Megtekintése: csoport nevére kattintva, csoportok fülből, keresésből
  - Belső posztok és események fül, tagok gomb amivel látjuk a tagokat
  - Csoportos csevegésben való részvétel
- Beállítások
  - Elérhető a Profil fülből, vagy hosszan nyomva az alsó navigációs sáv Profil ikonjára
