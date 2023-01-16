## Jakub's code challenge
I created this project using NextJS (create-next-app)
Other technologies used are react-query, Material UI, and Typescript.

I found it somewhat tedious to find an endpoint to use. The public-apis project hasn't been updated in several months and I found many of the endpoints were out of date in one way or another. I also wanted to find something I had some interest in. Due to these requirements I put on the api I went with the first one I found that actually worked. The returned data was a very small set, but I wanted to get going on the logic. I do have another branch that I worked on at the very end that had a slightly bigger data set to work with. You can see that in the PR section of this repo.

## Getting Started
Just pull, install packages, and then start dev.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Requirements
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
- Renders a native tag