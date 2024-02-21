# VirusBank Phylotree project


Update

## Introduction

This repository contains the code *and* content for the PhyloViz part of
the \[VirusBank platform\](https://virusbankplatform.be. The idea is
that as much as possible of the site is generated, either during
pre-rendering or page load. Next to that, all functionality that is
generic is handled as such and can be found under `_js/`.

We use [Quarto](https://quarto.org) for rendering the site from source
code and content to what you see on the internet. Quarto files have the
`.qmd` extension and typically contain a YAML header (the part between
the `---` lines). By using Quarto, it’s possible for instance to include
files from `_js/` into another file using a `` statement.

This can be illustrated using three situations that the site/app is
created for:

### A new tool is available for a virus

Adding a new tool for a virus should be easy, especially if we keep in
mind that developing tools is the core business of the VirusBank.

### Adding a virus to an existing family

If tools are developed or made available for a virus that was not yet
listed, we should be able to quickly add this information and let this
be reflected where relevant.

### Updating information about a virus

Next to structure information about a virus, we also store and show
semi-structured data: transmission and symptoms, for instance. This
information should be easy to add or update.

These scenarios (and others) have been taken into account for the design
of the site/app.

## Documentation

Documentation has been integrated in the app itself and [is stored onder
`docs/`](https://steady-beijinho-13360d.netlify.app//docs).
