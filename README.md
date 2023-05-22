### Chuck Norris Jokes App
This application is a single page React application that fetches and displays random Chuck Norris jokes. The jokes are fetched from an external API and displayed in a user-friendly manner.

#### Features
- Fetches random jokes from the Chuck Norris jokes API.
- Shows the list of jokes and automatically adds a new joke every 5 seconds, maintaining a buffer size of 10.
- Users can favorite and unfavorite jokes. Favorited jokes are stored in the browser's local storage.
- The application supports up to 10 favorite jokes at a time. An attempt to add more than 10 favorites will trigger an alert asking the user to remove existing favorites.
- Provides a separate page to view all favorited jokes.

##### Project Structure
```
.
├── README.md
├── package-lock.json
├── package.json
├── public
│ ├── index.html
│ └── ...
├── src
│ ├── App.tsx
│ ├── assets
│ ├── consts
│ ├── library
│ ├── utils
│ ├── index.tsx
│ ├── library
│ ├── pages
│ └── types
└── tsconfig.json

#### Installation and Setup
Clone this repository.
Run npm install to install the dependencies.
Run npm start to start the application.
Open http://localhost:3000 in your browser.

#### Testing
To run the tests, execute the following command: npm test
