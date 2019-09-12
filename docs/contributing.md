---
id: contributing
title: Contributing
---

## Prerequisites

- Make sure you have you have Node installed at v8.0.0+
- Use `npm` or `yarn`
- Be familiar with Git, how to [rebase](https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase), and how to fix conflicts if they arise

## Branch Organization

We'll try to keep the `master` branch as a reflection of what's in production. So you should _never_ push directly to `master`.

When sending a pull request, create a feature/fix branch and push that to `origin`. Then you can create a pull request to merge your changes into `master`.

## Sending a Pull Request

**Before submitting a pull request**, please make sure the following is done:

1. Fork the repository or checkout the `master` branch and `git pull` to fetch the latest and then create your branch from `master`
2. Run `yarn` or `npm i` to install dependencies
3. If you’ve fixed a bug or added code that should be tested, add tests!
4. Ensure that all tests pass. You can run `npm run test:watch` or `yarn test:watch` to run tests in watch mode.
5. Format your code with `prettier` and make things easier by installing an [Editor Integration](https://prettier.io/docs/en/editors.html)
6. Make sure your code lints by running `npm run lint` or `yarn lint`
7. Run the Flow typechecks using `npm run flow` or `yarn flow`

💡 If other PRs get merged, you may have to fetch those changed from `origin` and interactively rebase or merge in order to fix any conflicts.

## Adding or Upgrading any Packages

**Before adding or upgrading any modules**, please consider how the new package will affect the entire codebase. We want to keep our bundles small, so if you're adding all of `lodash`, that's not good. 🙅‍♂️

Whenever you do add or upgrade anything, make sure to [update `yarn.lock`](https://yarnpkg.com/lang/en/docs/yarn-lock/#toc-managed-by-yarn).

## Style Guide

We use an automatic code formatter called [Prettier](https://prettier.io/). Install an [Editor Integration](https://prettier.io/docs/en/editors.html) and format on save to make things magically easy. ✨

Linting and flow typechecking will try to catch most issues that may exist in your code. Check out [Airbnb's Style Guide](https://github.com/airbnb/javascript) if you need more help.

Please try to keep the codebase as consistent as possible, thanks!