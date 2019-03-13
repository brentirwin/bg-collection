# Board Game Collection
`bg-collection`

This app helps you and your friends decide the next board game to play. When you have friends over (who maybe don't play too many games) and you have a large collection, simply send your friends to this website, and they will be able to view your catalog. With a clean mobile-first design, your friends can filter your game collection via different criteria (number of players present, difficulty/weight, and amount of time available) without having to check the back of every box. This will allow them to know exactly which games in your collection are good choices to play right now. They can then tap on any game to expand its full details and learn what it might be about.

This app pulls from your Board Game Geek collection and assumes you keep your catalog updated on that site. Once it gets a list of your games via your username, it makes a second API call to get data about each of the games. Since the [BGG API](https://boardgamegeek.com/wiki/page/BGG_XML_API2) is technically in beta, the app occasionally requires a second try to load properly.

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
