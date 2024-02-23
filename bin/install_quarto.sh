#!/bin/bash

wget https://github.com/quarto-dev/quarto-cli/releases/download/v1.4.550/quarto-1.4.550-linux-amd64.deb -O /tmp/quarto.deb
sudo dpkg -i /tmp/quarto.deb

sudo apt-get install r-base r-base-dev -y
quarto install tinytex

Rscript -e 'dir.create(Sys.getenv("R_LIBS_USER"), recursive = TRUE)'
Rscript -e '.libPaths(Sys.getenv("R_LIBS_USER"))'
Rscript -e 'install.packages("rmarkdown)'
