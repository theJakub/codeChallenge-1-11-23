As part of our technical interview process, we ask that you complete this test within 2 days (by midnight) of the day you receive. Feel free to use any resources, UI libraries, or npm packages you wish along the way. When you are finished, please send a link to a github repo where it is hosted with a clear .readme file explaining how to run the project.

 

Using NextJS, CRA, or an equivalent React based framework, create a react application from scratch (no forking) which does the following:

 

- Fetches data from an external source https://github.com/public-apis/public-apis

  - Feel free to use any state management you want. If you want to flex your muscles with a specific library (redux/zustand), then go for it

- Renders the data to a list or table view (styling entirely up to you!) with buttons allowing users upvote or downvote each item (votes do not need to persist across browser refreshes)

- Above the item list/table, display a leaderboard of the most upvoted and downvoted items

- Add a button to reset all votes somewhere

- Is mobile/web responsive

- Add a debounced text input above your table/list which filters the items in your table or list

- Create a generic button component which, via its props, has the following configurations/use

  - Ensure to use this button throughout the application (no buttons from UI libraries)

  - Has at least 3 different types of buttons with different styling for each (cancel button, form submission button, link button, etc...)

  - Has a `isLoading` prop which renders the text "Loading" inside of the button or a loading spinner

  - Has a `isDisabled` prop which disables the button and adjusts the styling to indicate it is no longer clickable

  - Renders a native <button> tag