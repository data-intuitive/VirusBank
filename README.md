

## Requirements and setup

In order to *render* this site/app locally, the following are required:

0.  `wget`: install using the package manager available for your
    platform.

1.  [Quarto](https://quarto.org/docs/get-started/)

2.  `yq`:

    ``` sh
    sudo wget -qO /usr/local/bin/yq https://github.com/mikefarah/yq/releases/latest/download/yq_linux_amd64
    sudo chmod a+x /usr/local/bin/yq
    ```

Rendering the site locally is as simple as running:

``` sh
quarto render
```

While working on the text/code, the following may come in handy:

``` sh
quarto preview
```

## Automation

Github Actions is configured as follows:

- For every PR: the site is built and deployed to
  [Netlify](https://www.netlify.com/). The correct URL to point to is
  mentioned in the PR.
- When a PR to `main` is merged, the site is not only rendered to
  Netflify but also the VirusPlatform itself.

**Caveat**: We don’t currently have a test environment for the VirusBank
main website. As a consequence we can not test how the site will render
in an iFrame.

## Setup

### Toolbox page

The toolbox page is based on a YAML file.

### Virus family pages

Every virus family is contained in a *folder* of its own. Inside this
folder, everything related to this specific family can be found.

### Virus pages

## Various remarks

- `d3` is loaded by Quarto already, there is not need to load it again
