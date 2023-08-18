# VirusBank Phylotree project

## Requirements and setup

In order to *render* this site/app, the following are required:

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
