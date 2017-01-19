100 Days of Trump
========================

What's that Trump guy up to anyway

## Installation

Get dependencies by running `npm install`. 

If you don't have them added you'll need to add your s3 keys for the gdn-interactive s3 server to your `~/.aws/credentials` file.

## Usage

* `npm run local` to watch for changes and serve on [http://localhost:8080/main.html](http://localhost:8080/main.html).
* `npm run deploy -- NAME_OF_EXPLAINER BUILD` to deploy. With `NAME_OF_EXPLAINER` being the name set in `explainers.json` and `BUILD` being either the `live` or `preview` environments.
* `npm run deploy -- all BUILD` to deploy all explainers to your chosen environment.

## Production

The interactive is updated through [a good old spreadsheet](https://docs.google.com/spreadsheets/d/1TTV-g36nUE8uxVb882sC2lCeR8Yt8SGjIbJtN12yF0E/edit#gid=1722431313). The spreadsheet has three tabs for each part of the interactive.

### Data

First off is the data tab, which controls the data for the infographic strip at the top of the page. The numbers are fairly self-explanatory. For the list of insulted people, places and things you'll need to add a label, in `insulted1`, and an image in `insulted1image`. Read below for information on how to update images. The 1 being whatever slot you would like to change.

The `lastUpdated` field controls the last updated timestamp on the page and will update automatically.

### Days

The Days part of the spreadsheet contains all the entries. An entry will appear when text is present in the `copy` field for any given day. So please make sure the rest of the information has been added before publishing.

There are 4 different types of post. Text, image, graphic and embed.

* **text** - Just a plain text update. Should be used on less important days. Does not require `media` or `caption` fields.
* **image** - An update with an image above the text. Here the `media` field should be populated with an image (see section below on adding images) and a `caption` for the photo credit.
* **graphic** - If Graphics have supplied you with an embed, this is the one to use. The `media` field should be populated with the url to a graphic. For example `https://interactive.guim.co.uk/embed/2016/04/unemployment-rate/`
* **embed** - If you would like to use an external embed, like a YouTube video or a tweet, then grab the embed code and paste it into the `media` field.

### Related

This tab controls the related stories part of the interactive. Up to four stories can be added. For this you'll need a `url`, `headline` and an `image`. All urls should be page on `www.theguardian.com`. See below for how to add images.

### Images

Various parts of the spreadsheet require an image; related stories, a day that is an image entry type and the insulted section to the infographic. To do so you'll need to find an image on the grid. Then click Crop Image and make a crop of your chosen image. related stories and days require a `Landscape` crop while the insulted images should be a `Square` crop.

Once you've made your crop you'll need to take the url of the page. It should look like [`https://media.gutools.co.uk/images/362375be432982ba011f0cbbd9533218b0e4913e?crop=475_0_2697_1619`](https://media.gutools.co.uk/images/362375be432982ba011f0cbbd9533218b0e4913e?crop=475_0_2697_1619). Make sure you have the `?crop=475_0_2697_1619` part of the url otherwise it won't work. Paste that url into spreadsheet.

### Publishing

Once you've made your changes and you're ready to publish them. You'll need to visit the [Visuals Docs Tool](https://visuals.gutools.co.uk/docs/). Find the row with a title of 100 days of Trump and make sure the last modified timestamp reflects your changes. If it does. Hit that `Publish` button on the right hand side. Chill out for a while it updates. Visit the page on `www.theguardian.com`, sit back and appreciate the changes and what a fine job you've done. Well done you.

If that last bit didn't go to plan, or you have further questions. Contact your boy, Sam Morris.