# Contribute to @badaso/nuxt

@badaso/nuxt is an open-source project administered by [uasoft](https://soft.uatech.co.id). We appreciate your interest and efforts to contribute to @badaso/nuxt.

All efforts to contribute are highly appreciated, we recommend you talk to a maintainer prior to spending a lot of time making a pull request that may not align with the project roadmap.

## Open Development & Community Driven

@badaso/nuxt is an open-source project. See the [license](https://github.com/uasoft-indonesia/badaso-nuxt/blob/master/license) file for licensing information. All the work done is available on GitHub.

The core team and the contributors send pull requests which go through the same validation process.

## Feature Requests

Feature Requests by the community are highly encouraged. Please feel free to submit your ides on [github discussion](https://github.com/uasoft-indonesia/badaso-nuxt/discussions/categories/ideas)

## Code of Conduct

This project and everyone participating in it are governed by the [@badaso/nuxt code of conduct](code_of_conduct.md). By participating, you are expected to uphold this code. Please read the [full text](code_of_conduct.md) so that you can read which actions may or may not be tolerated.

## Bugs

We are using [GitHub Issues](https://github.com/uasoft-indonesia/badaso-nuxt/issues) to manage our public bugs. We keep a close eye on this so before filing a new issue, try to make sure the problem does not already exist.

---

## Before Submitting a Pull Request

The core team will review your pull request and will either merge it, request changes to it, or close it.

**Before submitting your pull request** make sure the following requirements are fulfilled:

To do : complete this section

## Contribution Prerequisites

- You are familiar with Git.
- You are familiar with Nuxt.
- Have valid badaso license key.

## Development Workflow

### Installation step

1. Clone the repo

```bash
git clone https://github.com/uasoft-indonesia/badaso-nuxt.git
```

2. `cd` into cloned repo

```bash
cd badaso-nuxt
```

3. Install dependencies using `npm install` or `yarn install`

```bash
npm install
#or
yarn install
```

4. Start development server using `npm run dev` or `yarn dev`

```bash
npm run dev
#or
yarn dev
```

## Running the tests

1. `cd` into the project
2. Start the testing using `npm run test` or `yarn test`

---

### Reporting an issue

Before submitting an issue you need to make sure:

- You are experiencing a concrete technical issue with @badaso/nuxt.
- You have already searched for related [issues](https://github.com/uasoft-indonesia/badaso-nuxt/issues), and found none open (if you found a related _closed_ issue, please link to it from your post).
- You are not asking a question about how to use @badaso/nuxt or about whether or not @badaso/nuxt has a certain feature. For general help using @badaso/nuxt, you may:
  - Ask a question on [github discussion](https://github.com/uasoft-indonesia/badaso-nuxt/discussions).
- Your issue title is concise, on-topic and polite.
- You can and do provide steps to reproduce your issue.
- You have tried all the following (if relevant) and your issue remains:
  - Make sure you have the right application started.
  - Make sure the [issue template](.github/ISSUE_TEMPLATE) is respected.
  - Make sure your issue body is readable and [well formatted](https://guides.github.com/features/mastering-markdown).
  - Make sure the application you are using to reproduce the issue has a clean `node_modules` or `vendor` directory, meaning:
    - that you haven't made any inline changes to files in the `node_modules` or `vendor` folder
    - that you don't have any weird global dependency loops. The easiest way to double-check any of the above, if you aren't sure, is to run: `$ rm -rf node_modules && npm cache clear && npm install`.