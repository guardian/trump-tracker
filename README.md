Guardian Explainers
========================

Want to find out about things? These things will explain other things to you

## Installation

Get dependencies by running `npm install`. 

If you don't have them added you'll need to add your s3 keys for the gdn-interactive s3 server to your `~/.aws/credentials` file.

## Usage

* `npm run local` to watch for changes and serve on [http://localhost:8080/main.html](http://localhost:8080/main.html).
* `npm run deploy -- NAME_OF_EXPLAINER BUILD` to deploy. With `NAME_OF_EXPLAINER` being the name set in `explainers.json` and `BUILD` being either the `live` or `preview` environments.
* `npm run deploy -- all BUILD` to deploy all explainers to your chosen environment.