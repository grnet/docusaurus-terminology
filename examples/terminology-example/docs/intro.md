---
sidebar_position: 1
---

import Link from '@docusaurus/Link';

# Plugin examples

### Examples for link:

| Link example                             | Description                                     |
|------------------------------------------|------------------------------------------|
|  [example link](./terms/example-term.mdx) | Using the @grnet/docusaurus-terminology plugin  |
|  [md link in documents](./tutorial-basics/congratulations) | Using the classic md link  |
|  <a href="https://www.example.com/">a tag example</a> | Using `<a>...</a>` tag  |
|  <Link to="https://www.example.com/">Link docusaurus example</Link> | Using the component Link from `@docusaurus/Link`  |
|  <Link to="./tutorial-basics/congratulations">Link docusaurus example relative</Link> | Using the component Link from `@docusaurus/Link` with a relative target  |


### Should be displayed without issues:

#### 1. Multiline links

* A multiline example with one newline:
[multiline
example 1](./terms/example-term.mdx)


* A multiline example with two newlines:

[multiline

example
2](./terms/example-term.mdx)

#### 2. Checklist

- [x] A Checklist item with an [example link](./terms/example-term.mdx)

#### 3. Image

![alt text](../static/img/docusaurus.png)

