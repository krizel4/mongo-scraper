# mongo-scraper
This is a web app that lets users view and leave comments on the latest news using Mongoose and Cheerio to scrape news from another source.

## App Functions

To run the app, you'll need to first run a scrape by navigating to the /scrape. When you go back to the root, you'll be able to see a listing of the most recently scraped articles. Users can review articles, save them, and comment. There is also an option to remove comments or even scrape the news site again.

## Languages
* HTML
* CSS
* Javascript
* MongoDB

## Dependencies
* Mongoose
* Express
* Handlebars
* Axios

## Libraries
* Bootstrap
* jQuery

## Known Issues and Other Notes
After cloning this app onto your machine, you'll need to install the required dependencies. When you run `node server` to prompt open the page on a localhost, you'll be able to scrape the articles and view them under `http://localhost/headlines`. However, at this time, the articles are not generating on the main.handlebars page. Additionally, none of the buttons are yet functioning. This application is still in progress.

This was made for the UCLA Coding Bootcamp 2020.
