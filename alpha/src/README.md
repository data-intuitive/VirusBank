
Convert these YAML files to JSON using:

```sh
yq -M -o=json alpha/src/annotations.yaml > alpha/annotations.json
yq -M -o=json '. *d load("alpha/src/toolbox.yaml")' _includes/toolbox.yaml > alpha/toolbox.json
```

