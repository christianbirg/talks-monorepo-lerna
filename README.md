# Techtalk: Monorepos - Lerna Example

This is a demo app for my Techtalk on "Monorepos" and includes a demo with lerna

## Setup

First run `npm i -g lerna@3.2.1` to install lerna with the version specified in this project's [package.json](./package.json).

Now on the top level (where this readme is located), run `npm i` and now you can run `lerna bootstrap`, this will install all the dependencies and link dependent packages.

## Demo
And now that everything is setup you can run `lerna run test`, which will execute the npm script `test` in all packages that define this.

Also you can add [nsp](https://github.com/nodesecurity/nsp) (this is as of now 05. Sept. 2018 deprecated and replaced by a the builtin "npm audit"-command, but its still a good usage example because it is/was useful for every package) with `lerna add nsp`.

And run `lerna publish` or `lerna version` respectively. While `version` will bump the version and create a git commit, `publish` will also publish it to npm (as of now there is no defined way for lerna to include npm's 2-Factor-Authentication, but to run `NPM_CONFIG_OTP=123456 lerna publish`).

## Slides

[Slideshare](https://www.slideshare.net/RomanMinchyn/master-the-monorepo-113064925)
