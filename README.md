## GitHub Action for huff-neo

GitHub Action that installs [huff-neo](https://github.com/cakevm/huff-neo).


### Example workflow

```yml
on: [push]

name: test

jobs:
  check:
    name: Huff project
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: recursive

      - name: Install huff-neo
        uses: cakevm/huff-neo-toolchain@v1
        with:
          version: latest

      - name: Compile
        run: huff-neo . -b
```


### Inputs

| **Name**  | **Required** | **Description**                               | **Type** |
|-----------|--------------|-----------------------------------------------|----------|
| `version` | Yes          | Version to install, e.g. `latest` or `1.0.0`  | string   |


### Summaries

You can add the output of `hnc` to GitHub step summaries. The summaries support GitHub flavored Markdown.

See the official [GitHub docs](https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary) for more information.


### Contributing

All contributions are welcome.

Make sure to install [ncc](https://github.com/vercel/ncc) in order to generate the build:
```bash
npm i -g @vercel/ncc
```


### Acknowledgements

Thank you very much to the original [huff-toolchain](https://github.com/huff-language/huff-toolchain) for the initial version. And many thanks to [foundry-toolchain](https://github.com/foundry-rs/foundry-toolchain) for the foundation of this action.
