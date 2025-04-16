<center>
    <h1>
    🏎 Au-o Mobile 🚗</h1>
</center>

## 📝 Table of Contents

### ✅ Developer Documentation - You can find the developer documentation, extended by Typedoc, on the Github Pages site of [this repository](https://bnolod.github.io/au-o_mobil/).

- [ 📚 Introduction](#-introduction)
- [ 🔖 Documentation Helper](#-documentation-helper)
- [ 🔗 Useful links](#-useful-links)
- [ 💡 Product description](#-product-description)
- [ ✅ Installation Guide](#-installation-guide)
- [ ❓ User Manual](#-user-manual)
- [ 💻 Utilized technologies](#-utilized-technologies)
- [ 📝 Testing Documentation](#-testing-documentation)

---

## 📚 Introduction

#### 👋 Welcome to the Au-O Family!

Become a first-hand production tester for our new social media application project, made with love 

Be sure to follow the **installation guide**, alongside the **user manual** provided below before you start using our application!

## 🔖 Documentation Helper

- All pieces of documentation, excluding the developer documentation, has been written manually.
- This file includes the developer documentation, user manual, and testing documentation.
- You can either access the developer documentation from ./Au-O/docs/index.html, or by visiting the Github Pages link listed above.
- The Typedoc documentation includes
  - the README file in Hungarian
  - API call function documentation
  - Individiual component documentation
  - Documentation of all types, classes and interfaces
  - Application-wide context documentation
  - Entity property documentation
  - Event function documentation
  - General function documentation

Note: Detailed documentation of screens (pages) can be found below, under [✔ Features](#-features)

## 🔗 Useful links

📝 This project consists of **three** distinct repositories, please make sure you have all other components in an operational state.

- [Frontend | Web](https://github.com/bnolod/au-o_frontend)
- [Backend](https://github.com/bnolod/au-o_backend)

💎 Initial interface design concepts were created in Figma, alongside the presentation. You can find the individual pages below.  

- [📈 Projects table](https://github.com/users/bnolod/projects/4/views/1)
- [💻 Web application](https://www.figma.com/design/j9NffYp8ruYwC6iuz0Sgnp/Desktop?node-id=0-1&t=Eszh1sA2oioWKFlm-1)
- [📱 Mobile application](https://www.figma.com/design/GDRSmJy5sZxZp7PKZ4rmtD/Mobil?t=QY6xjWNAz19yVUjy-1)
- [⚡ Concept](https://www.figma.com/board/7v2i3Ps0qUoqlQQjlErx8S/Koncepci%C3%B3?t=QY6xjWNAz19yVUjy-1)
- [🔏 Database scheme](https://www.figma.com/design/ZMLoquJGEDi3lEhLdslQ9c/DB?t=QY6xjWNAz19yVUjy-0)
- [🗣 Presentation](https://www.figma.com/slides/9yKoTciIISnBTpzo4RTfS9/Prezent%C3%A1ci%C3%B3?node-id=54-236&t=QY6xjWNAz19yVUjy-1)

## 💡 Product Description

A projektünk **újragondolja** a közösségi média alkalmazások széles körű témaválasztékának szokásait, és biztosít egy felületet az olyanoknak, akiket kifejezetten érdekel minden, ami kerekeken gurul és belső égésű motor hajtja.
Our social media application rethinks the conventions of a regular community platform; instead of providing little for a broad scale of communities, we took the approach of specifying a niche group, in this case - car enthusiasts, and providing them with a specialized platform that allows them to express their interests in all things on wheels.
We have given our users extra functionalities for their profiles to make this platform stand out. 

The garage functionality improves the user experience by

- 😄 Diversifying a person's profile
  - You can finally share the limelight with your cars.
- 🚩 Ability to assign a vehicle to a post, to let everyone know what you're driving.
- 📩 Users may also share their vehicles amongst eachother.

## ✅ Installation Guide

> [!WARNING]
> Az alkalmazás Imgur API kliens ID-t használ. Ez nem került fel nyilvánosan a repóba, saját kliens ID igényléséről alább olvashatnak.
> This app uses Imgur API Client ID. This variable was not included in this repository, please refer to the guide below to acquire your own Client ID

#### Pre-requisites

- [Node.js](https://nodejs.org/en/download)
- [Expo Go mobile application](https://expo.dev/go)
- Backend server on standby, which you can find [here](https://github.com/bnolod/au-o_backend)


# IMPORTANT ‼

- Cloning from a Git repository removes all environment variables and API keys.
- Az .apk fájl elérhető a Releases tab alatt, és tartalmazza az applikáció teljes funkcionalitását, viszont IP problémák miatt **nem fog tudni kommunikálni a backenddel.**
- The .apk file is available under the Releases tab, and contains a production build of the application, however due to IP mismatches, the application **will not be able to communicate with the backend**
- We strongly recommend you run the application through Expo Go.
- **General steps** 
    - Acquire API Client ID
        - Create an Imgur account and log in
        - https://api.imgur.com/oauth2/addclient -> register new application (e.g AuO)
        - Copy Client ID, and paste after `EXPO_PUBLIC_IMGUR_CLIENT_ID=` in the .env file
    - Configure IP Addresses
        -  - > ipconfig
        - -> In case of **Wi-Fi** `Wireless LAN adapter Wi-Fi / IPv4 Address`, in case of Ethernet `Ethernet adapter Ethernet -> IPv4 Address` (to be refered to as IP)
    - .env 
        - EXPO_PUBLIC_AXIOS_BASE_URL=http://IP:8000/api/v1
        - EXPO_PUBLIC_WS_URL=http://IP:8000/ws
        - EXPO_PUBLIC_IMGUR_CLIENT_ID=(lásd: fentebb)
- **Using a physical device**
- In order to make sure the application works with physical devices, the user requires a **wireless connection, a computer that can connect to wireless networks, and a physical device running Android or iOS**
- It is important to check if the mobile device is connected to the same wireless network as the hosting computer

> When configured, start the application
>
> Command line:
>
> `cd /Au-O/`
>
> `npm i`
>
> `npx expo start -c`
>
> Scan the QR code, that opens Expo Go.

- **Using an Android emulator**
- Open project in Android Studio
- Follow the General Steps
- A wireless connection is **not** required here.
- Boot virtual device (ideally API 35 or above)
> When configured, start the application
>
> Command line:
>
> `cd /Au-O/`
>
> `npm i`
>
> `npx expo start -c --android`
>
#### Note
Expo Go is a limited sandbox environment, commonly used for prototyping. Layout shifts may occour on a fresh install.
## ❓ User Manual


### 🔐 Authentication

- The program presents the user with an onboarding process (`/onboarding`)
  - This section is meant to introduce the unique selling points of the application to the user.
- Afterwards, the user is presented with a standard login/register screen (`/(auth)/[login or register]`)
  - The user must provide **valid** authentication data in order to proceed.
  - The validation rules have been specified in the "Validációs szabályok.md" file, found in the root directory of the Backend repository.
    - These rules are used universally across the three repositories, and you can find an instance of it in the Au-O/lib/Validation directory
- After successfully authenticating, the user is redirected to the home layout of the application - **/(root)/ layout**
  - This layout provides a display space for browsing and navigation
    - Ezekről az útvonalakról a  szekcióban olvashat tovább.
    - You can read more about these screens in [🔖 User Documentation/UX](#🔖-user-documentation/ux) 
  - This is where the user can find the main functionalities the app provides.
### 💯 Recommended UX flow

#### General Functions
- Registration
- View Profile
- Edit profile attributes (e.g profile image, bio)
- Browse feed
- React to post, write comments and replies
- Follow a few users
- Add vehicles to user profile
- Create a few user posts
---
#### Real-time functions
- Proceed with testing chat functionalty using a **web application** client, and chatting between the two profiles.
- Actions recommended for real-time testing
    - Send text messages
    - Send posts
    - Send group invite
    - Send car details


## 💻 Utilized technologies

- Native mobile development library: **React Native**
- Native mobile development framework: **Expo**
- Image storage API: **Imgur**
- Sharing graphics and UI elements: **Figma**

## 📝 Testing Documentation
<center>Note: this section only applies to the MOBILE test cases, except where stated otherwise. Other test cases may be accessible in other repositories.</center>

### ⭕ Unit Tests
- Unit testing has been conducted with Jest
- Test suites have been written for the following:
  - General functions (functions.ts)
  - Commonly reused components (components/ui)
      - **Result:** 100% pass 
### 🔜 Static tests
- Static testing has been covered by the type safety provided by TypeScript, which virtually closes out the possibility of a type mismatch.
    - **Result:** The application is completely type-safe.

### 🔧 Manual tests
- The application has been manually tested for compatibility on both iOS and Android system - for UI and functionality alike, providing precise responsivity.
    - **Result:** it's cool 👌

### 📬 API tests
- API test suites are **shared** between all three repositories. 
- The connection between the frontend and backend has been developed using test-driven development.
- API tests can be found in the Postman report in the Backend repository.
    - **Result:** all utilized endpoints have valid returns and exception handling.
  
### 👴 Production tests
- Our application uses strong validation principles to ensure unified inputs across all components.
- We have created mock data for most of these cases.
    - **Result:** all validated fields have a filter, and the user is notified of any errors.

### 🔃 End-to-end tests
- The application uses manual E2E tests, utilizing test-driven development principles.
    - responsivity across multiple screen sizes
    - cross-platform functionality
    - valid UX across multiple devices
    - communication with backend server
    - testing valid and bad requests
- We utilized manual E2E testing instead of the conventional automatic E2E testing, because of the application's scope and scale, and the unbeatable precision of manual reviewers.
    - **Result:** test-driven development with strong UX foundations 

# ✔ Features

## 🔖 User Documentaion/UX

### 🔽 After downloading

- Three-part short application introduction

### 🔰 Registration

- User registration with the following attributes:
  - Username
  - E-mail address
  - Password
  - Date of birth
  - Nickname
- The newly created user is immediately logged in upon registration.

### 🚪 Login

- With e-mail or username, and a password 

---

### 🏡 Home screen

- Endlessly browse posts, with infinite scroll pagination, in descending order of date of creation

### 📣 Groups

- The user can access the wide selection of user-generated groups
- New and joined groups appear alike.
- The user can join a group with a click of a button

### ✨ New

- In an user-centered application, creating user posts is accessible from every page.
- After filling out a **form** the user can publish a post to their profile
  - 1-10 images
  - Medium-length description
  - Short location
  - Assigned vehicle

### 💬 Chat

- This app supports fully real-time chat between users
- Clicking the 💬 icon, the user can access their latest messages, and they can start a new chat from a user profile.
- A felhasználók megoszthatnak egymással **posztokat**, **csoport meghívásokat**, valamint **autókat**.
- Users can share **posts, group invites** and **cars**.
  - Note: private elements may require authorization.
- Media sharing is available through an options menu in a selected media type.

### 😀 Profile

- Own user profile
  - Reading
  - Editing
- Own posts
- Followers (+ removing follower)
- Following (+ unfollowing)
- The user profile presents the user with 4 tabs:
  - Posts
    - Lists all posts of a user, in descending order.
  - Groups
    - Lists all groups of a user.
  - Garage
    - Lists all vehicles of a user.
  - Saved posts
    - If saved posts are public, it is presented in a list.

## ‼ Miscellaneous functions
- Bilingual interface
    - Every UI element is available in both Hungarian and English. 100% coverage.
- Color scheme
    - The application starts with the user's prefered color scheme, and has the option to change it later.
- Search
  - Users can query for other users.
- Check other users' profiles
  - by clicking on a profile image or other attribute
- Following
  - Users can follow and unfollow eachother, with an option to remove a follower from your own profile
- Group page
  - Reading: by pressing a group card
  - Group post tab: see the posts of this group
  - Group chat tab: engage in a conversation limited to that group alone
  - Group members tab: view your group's members, and power users can use authorized actions over them.
  - Group applications tab: review user applications to join your private group
  - Group edit: edit the group details
- Settings
  - Available from the Profile tab, it contains miscellaneous functions, mostly static pages.
