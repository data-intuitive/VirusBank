# VirusBank Phylotree project

# Introduction

This repository contains the code *and* content for the PhyloViz part of
the VirusBank platform. The idea is that as much as possible of the site
is generated, either during pre-rendering or during a site visit. Next
to that, all functionality that is generic is handled as such and can be
found under `_js/`.

We use [Quarto]() for rendering the site from source code and content to
what you see on the internet. Quarto files have the `.qmd` extension and
typically contain a YAML header (the part between the `---` lines). By
using Quarto, it’s possible for instance to include files from `_js/`
into another file using a `{{< include … >}}` statement.

This can be illustrated using three situations that the site/app is
created for:

## A new tool is available for a virus

Adding a new tool for a virus should be extrememly easy, especially if
we keep in mind that developing tools is the core business of the
VirusBank.

## Adding a virus to an existing family

If tools are developed or made available for a virus that was not yet
listed, we should be able quickly add it this information and let this
be reflected where relevant.

## Adding a new virus family

Also this should be easy. The hard task should be collecting tools and
curated information about the viruses at hand, not updating the site and
visualization.

These scenarios (and others) have been taken into account for the design
of the site/app.

# Details

## Structure

Each virus family is stored in a *directory* or *folder*, for instance:
`flaviviridae/`. Inside this folder, there are a couple of files that
are required to bootstrap the family page:

- `tree.newick`: The newick-format tree file downloaded from the ICTV
  website
- `family.xlsx`: The Excel file containing annotations for the viruses
  of interest. The IDs should match those in the `tree.newick` file.

Based on these two files, the following files are generated using
`_js/update_family.js`:

- `index.qmd`: This will become the main family overview page. This page
  in turn *includes* all the virus page content
- `_details.qmd`: The part of the page where individual virus
  information is shown in tabs. This file is included in `index.qmd`
- For every virus in the family (say `VIR`), multiple files are
  generated:
  - `VIR.qmd`: the main virus page, basically a number of *includes* of
    the files below
  - `_VIR.qmd`: The content for the Virus page, also included in the
    virus family `_details.qmd` and displayed as tabs
  - `_VIR-symptoms.qmd`: The text description of the symptoms for `VIR`
  - `_VIR-symptoms.qmd`: A pointer to the symptoms figure, usually
    stored under `img/`
  - `_VIR-transmission.qmd`: A text description of the transmission of
    `VIR`. This is kept empty for now because the figure is
    self-explanatory.
  - `_VIR-transmission-fig.qmd`: A figure explaining the transmission of
    `VIR`. The image itself is usually stored under `img/`
  - `_VIR-relevance.qmd`: A text description of the medical relevance of
    `VIR`
  - `_VIR-relevance-fig.qmd`: A pointer to a figure for the medical
    relevance (and optionally a caption)

Graphically, the includes can be depicted as follows:

``` mermaid
graph LR
  
  subgraph _js/
    _js/_ojs_data.qmd
    _js/virus-breadcrumb.qmd
    _js/family-breadcrumb.qmd
  end

  _details.qmd --&gt; index.qmd
  _js/_ojs_data.qmd --&gt; index.qmd
  _js/_ojs_data.qmd --&gt; VIR.qmd
  _js/virus-breadcrumb.qmd --&gt; VIR.qmd
  _js/family-breadcrumb.qmd --&gt; index.qmd
  
  _VIR.qmd --&gt; _details.qmd
  _VIR.qmd --&gt; VIR.qmd

  _VIR-symptoms.qmd --&gt; _VIR.qmd
  _VIR-symptoms.qmd --&gt; _VIR.qmd
  _VIR-transmission.qmd --&gt; _VIR.qmd
  _VIR-transmission-fig.qmd --&gt; _VIR.qmd
  _VIR-relevance.qmd --&gt; _VIR.qmd
  _VIR-relevance-fig.qmd --&gt; _VIR.qmd
```

The includes themselves are not parametrized, but the YAML header
`VIR.qmd` is, for example `alphaviruses/CHIKV.qmd` contains the
following header:

``` yaml
---
params:
  family: alphaviruses
  virus: Chikungunya virus (CHIKV)
---
```

Based on this the correct toolbox entries are shown, for instance.

## Build and rendering

As mentioned already, different build stages are performed and each
generates different aspects of the site.

### Rendering step 1: Bootstrap

Remember that we start off with `family.xlsx` and `tree.newick` for ever
family. That’s all we need. The bootstrap step generates all the other
files mentioned above based on the information in `family.xlsx`:

- The `index.qmd` file as well as the `_details.qmd` for the family
- Per virus, it generates the different `_VIR-...` files.

Please note that this step also generates the content files itself, even
though we do not have content yet. Instead, placeholder text and figures
are inserted to be replaced later.

In order to build this step, one needs NodeJS installed and the `npm`
package manager. The package manager can be used to install two
packages:

``` sh
npm install xlsx liquid
```

This has to be done just once.

Next, we create a directory for the virus family, say
`virusbankviridae`:

``` sh
mkdir virusbankviridae
```

and store the correct `family.xlsx` and `tree.newick` in this directory.

The following steps are required to bootstrap the site for this
*family*:

``` sh
node _js/update_family.js -i virusbankviridae
```

**TODO**: Add a script to build *all* families that are available and
let the CI run these steps.

## How the site is built

# Development

## Requirements and setup

In order to *render* this site/app locally, the following are required:

0.  `wget`

1.  Quarto

2.  `yq`:

    ``` sh
    sudo wget -qO /usr/local/bin/yq https://github.com/mikefarah/yq/releases/latest/download/yq_linux_amd64
    sudo chmod a+x /usr/local/bin/yq
    ```

## Rendering

## Setup

### Toolbox page

The toolbox page is based on a YAML file.

### Virus family pages

Every virus family is contained in a *folder* of its own. Inside this
folder, everything related to this specific family can be found.

### Virus pages

## Various remarks

- `d3` is loaded by Quarto already, there is not need to load it again

## Things to add

- What is *including* what and why
- How to update *existing* info
- How to add new info
