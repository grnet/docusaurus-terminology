# docusaurus-terminology

## Overview

This Docusaurus plugin allows you to use standout terms in your pages, which, when hovered over, display a short explanation, and, when clicked, navigate to the relevant page. The plugin parses all `*.mdx` files and replaces each pattern with an appropriate React component supporting a tooltip functionality and generates a glossary with all terms corresponding to the `*.md` files.

[gif]

## How it works
This plugin parses docs in two ways:

1. Parses all `*.mdx` files under `docs/` and replaces each pattern with an appropriate React component supporting a tooltip functionality.
2. Generates a glossary with all terms corresponding to the `*.md` files under `docs/terms/`.

Parses all markdown files and generates a glossary page with all the pattern terms found in the `.md` files.

In more details:

#### Terms

We have created a directory `docs/terms`, which contains all the terms you need for your website. We have a specific format for each term:

```
---
id: host
title: Host 
hoverText: A person responsible for guests at an event
---

A host is a person responsible for guests at an event or for providing [hospitality](./docs/terms/hospitality) during it.
```
where:

* `id`: the unique id of the docusaurus web page, this is docusaurus specific
* `title`: the visible title of the term, docusaurus specific as well
* `hoverText`: this text shows up when you hover over a term in a web page

After the markdown header, you can write your own text in markdown regarding that term.

#### Glossary

We also have a glossary page, which gathers all terms from the `docs/terms` directory, and compiles them to a single page, where you can overview each term along with the hoverText explanation of each term. You can also click on a term and go to the term page. To see this page, visit:

```
http://localhost:3000/docs/glossary
```

## Installation

To install the Docusaurus terminology tool, you will need to add it to your project as a npm package. You can do this by running the following command in your project's root directory:

```
npm i @digigov/docusaurus-terminology
```

## Usage

To use the terminology tool, simply add the markdown link format to your `*.mdx` file and reference it as a path. For example, if we have a term in `docs/terms/host`, all you need to do is add this markdown link in the page:

```
[host](./docs/terms/host)
```

This will render the text "host", and will add a link to the term, and when you hover it it will show the `hoverText` attribute of the text.

Then, the plugin will replace the pattern with a React component that displays the term and definition. By default, the component will display the term in bold and the hover text in normal text.

## Example

In order to give this a spin, you can use the [create-digigov-docs](https://www.npmjs.com/package/create-digigov-docs) by running the following command to generate your own docusaurus installation, which consists of our library and packages for terminology.

```
npx create-digigov-docs <docs_dir>
```
* The tool will ask you for a few options to customize the newly created codebase. For documentation theme you can choose `@docusaurus/theme-classic`
* This will create a directory named `<docs_dir>` and will install all dependencies required.
* Enter to `<docs_dir>` and start the execution (eg `npm run start`). After that, you will be greeted with a new docusaurus website, on http://localhost:3000

## Troubleshooting

If you encounter any issues with the Docusaurus terminology tool, please check the following:
* Ensure that you have installed the plugin correctly and added it to your site configuration file.
* Make sure that the pattern you are using to define the term is correct.
* If you are still encountering issues, please submit a bug report or contact the plugin maintainer for support.

## Contributing

If you would like to contribute to the development of the Docusaurus terminology tool, you can do so by submitting issues or pull requests on the GitHub repository.

## License
The Docusaurus terminology tool is released under the BSD-2-Clause.

