# YouIn? App
Event organization made painless

## Group member

- [Stephen Chiang](https://github.com/skhchiang)
- [Brad Wong](https://github.com/)
- [Lucas Ng](https://github.com/LucasNG521)
- [Jacob Chan](https://github.com/CHA0173)


## Project Map and Notes



## Technology used

- React-Native 
- Bootstrap
- Typescript
- PostgreSQL
- Knex
- Axios

--- 

## version 0.1 May 24, 2018 (Stephen)

Created database and related tables via knex migrations 

### Added

- yarn installed
    - pg
- database created
    - knexfile created
    - migration file for tables created
- Github repository created
  - README file created

### Changed

---

## version 0.11 June 7, 2018 (Stephen)

Created database and related tables via knex migrations 

### Added

- Added migration file
- Added seed file
- Separated frontend and backend

### Changed

---

## version 0.1 May 24, 2018 (Stephen)

Created database and related tables via knex migrations 

### Added

- yarn installed
    - pg
- database created
    - knexfile created
    - migration file for tables created
- Github repository created
  - README file created

### Changed

---

## version 0.11 June 8, 2018 (Lucas)

Upload the Front-End file (NavigationApp) 

### Added

- Added NavigationApp file

### Changed

---

## version 0.11 June 9, 2018 (Lucas)

Changed some Front-End file, and will start to writting the event pages.

### Added

- 

### Changed

- Start.tsx 
    - combine the LandingPage and StartPage to one page (start.tsx) 
    - make ads more smooth (show up 2s than go to StartPage[Login/SignUp] )
    
---

## version 0.11 June 11, 2018 (Lucas)

 Added PhotoPicker . now you can choose the photo from your phone and maybe you can use the camera to select photo( didn't tested ). but still have some problem , i can't save the photo maybe need to combine to store. And remove store for now make the first page err gone( if you added some action to store you will fix the err ).

### Added

- PlueIn for pick phote
    - react-native-image-picker

### Changed

- store.ts 
    - hide all the code 

- Navigator.ts
    - hide all about the store
    
---

## version 0.11 June 12, 2018 (Lucas)

 Added VectorIcon . Now we have the Facebook buttom and changed tab icon ('./img/xxx.png')

### Added

- PlueIn for icon 
    - react-native-vector-icon

### Changed

- login.ts
    - added Facebook buttom
    - changed tab with icon
    
---

## version 0.3 June 12, 2018 (Stephen)

 Added routes for profile information, event search, and upcoming events list, currently progressing on event create route (inserting new events and items)
 
### Added

- Search Event GET Route
- User Profile GET Route for volunteered items and (past) events
- Upcoming events GET Route

### Changed

- added route initialization for app.ts and apirouter.ts
- changed migrate file: removed categories table and relationships, added discussion table and relationships
- added more sample data
    
---

## version 0.3 June 15, 2018 (Lucas)

 Added search and changed search/profile contant

### Added

- search.tsx

### Changed

- search.tsx
    - changed some code and stylesheet

- profile.tsx
    - changed some contant and stylesheet 
    - added some fake data to test
    
---


## version 0.3 June 17, 2018 (Stephen)

Completed create and save event route (except for photo)

### Added

- createService.saveNewEvent()

### Changed


    
---


## version 0.3 June 18, 2018 (Lucas)

Created Notification page with fakedata, StyleSheet and contant of Search and Profile

### Added

- Notification.tsx
    - look like facebook notification page ( only have created event note )

### Changed

- Profile.tsx 
    - changed some style and isActive using <Switch> (have some problem)
    - { fakedata } move to dakeData.tsx
    - event history require from Brad event data

- Search.tsx
    - now can show all the events 
    - changed canel and time-cirle button contant
    - changed fakedata to fix the yellow box

---


## version 0.3 June 20, 2018 (Jacob)

Working Local Login

## Added

### Changed
- AuthRouter.ts
    - changed the localLogin() to be able to send the id,email and password into jwt payload

---
    
## version 0.3 June 21, 2018 (Lucas)

Created todo list but still have a problem, merga the Attendees and Discussion page, changed some rount( navigator.push... )

### Added

- CreateEventComponents > ToDoList.tsx
    - Added TextInput to input the item and quantity ( only can add one item)
    - Added a form to display the item (ItemName and Quantity)

### Changed

- Profile.tsx / Search.tsx / Notification.tsx
    - changed navigator.push to ViewEvent page

- Attendees.tsx
    - Added the FlatList to display the attendees ( bug: can't display img)

- Discussion.tsx 
    - Added a discussion page 
    - Added a TextInput to input the massage, but still have a problem like Create ToDoList


---

## version 0.3 June 24, 2018 (Lucas)

Fix yellow box key problem , but still have one key problem in view event page !!
And create ViewEventComponents ToDoList page

### Added

- ViewEventComponents > ToDoList.tsx
    - UI and fakeData to display ToDoItem


### Changed
-   Changed all pages when using <FlatList /> 
    - using keyExtractor to fix the yellow box problem

---