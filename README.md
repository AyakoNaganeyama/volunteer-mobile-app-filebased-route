# Volunteer Seeking Mobile App

## About

This documentation outlines the design and development of a Volunteer Opportunity Mobile Application prototype for Project Compassion Ministry at Every Nation Auckland City (ENAC), a Christian church and non-profit organisation based in Auckland. The app aims to connect the ENAC church members with Project Compassion’s partner charities by providing a central platform to discover and manage volunteer opportunities.. <br />

## Prerequisites

1. **Install Expo Go (you do no need to register to use the app)**:
   - **iOS**: [Download Expo Go from the App Store](https://apps.apple.com/us/app/expo-go/id982107779).
   - **Android**: [Download Expo Go from Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent).<br />

## Running the App

1. **How to view the app**:
   - Scan the QR code displayed below using the **Expo Go** app on your phone or by scanning it with your camera.
     The app hosted live and can be viewed by downloading the **Expo Go** app from your app store and scanning the following QR code below:

[Scan this QR code to view the app](https://expo.dev/preview/update?message=Fix+bug+in+login+screen&updateRuntimeVersion=1.0.0&createdAt=2025-08-10T09%3A59%3A33.583Z&slug=exp&projectId=ba97eb8d-f733-4ac9-b817-975a16122842&group=80ae8c98-d873-4f64-b566-1754e83e5d33https://expo.dev/preview/update?message=SDK+updated&updateRuntimeVersion=1.0.0&createdAt=2025-09-28T23%3A58%3A48.422Z&slug=exp&projectId=18eb286a-729b-4319-ab6f-e037c849b6a1&group=1a5f38ae-f4e5-4d87-a45b-074c13452d75).

### If link is not working can scan here

![QR code](./QRcode.jpg)<br />

## High Level File Structure

The below is high level overview of the app’s folder structure. Orange represents UI layer, green represents business logic layer, purple is the folder for reusable UI components, and blue is folder to store global state management files. Here I considered separation of concerns by keeping those layers in its folder. As I mentioned in the project proposal, my goal was to design and develop a working application that is expandable, this folder structure design will make it easier to update the application later.

![alt text](./folderStructure.jpg)<br />

## Database Diagram

The blow shows databse design implemeted.

![alt text](./databaseDiagram.jpg)<br /><br/>

## Firebase Service

Below explains how I used Firebase services. I used Firebase Authentication Service to store user’s authentication information (email and password) for all user types (volunteer, organisation, ENAC church admin). Firebase Authentication service is only for purpose of authenticate users, it allows them to signup, login, and logout. I used Firestore to store all other information like volunteers, organisations, ENAC admin, opportunities, applications. \*currently chaning to Supabase

![alt text](./firebaseService.jpg)<br /><br/>

## Architecture Diagram

Below is the high level architecture of the application.

![alt text](./archtectureDiagram.jpg)<br /><br/>
