# Advanced Issue Labeler

[![GitHub Marketplace](https://img.shields.io/badge/Marketplace-Advanced%20Issue%20Labeler-blue.svg?colorA=24292e&colorB=0366d6&style=flat&longCache=true&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAM6wAADOsB5dZE0gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAERSURBVCiRhZG/SsMxFEZPfsVJ61jbxaF0cRQRcRJ9hlYn30IHN/+9iquDCOIsblIrOjqKgy5aKoJQj4O3EEtbPwhJbr6Te28CmdSKeqzeqr0YbfVIrTBKakvtOl5dtTkK+v4HfA9PEyBFCY9AGVgCBLaBp1jPAyfAJ/AAdIEG0dNAiyP7+K1qIfMdonZic6+WJoBJvQlvuwDqcXadUuqPA1NKAlexbRTAIMvMOCjTbMwl1LtI/6KWJ5Q6rT6Ht1MA58AX8Apcqqt5r2qhrgAXQC3CZ6i1+KMd9TRu3MvA3aH/fFPnBodb6oe6HM8+lYHrGdRXW8M9bMZtPXUji69lmf5Cmamq7quNLFZXD9Rq7v0Bpc1o/tp0fisAAAAASUVORK5CYII=)](https://github.com/marketplace/actions/advanced-issue-labeler) [![Unit tests](https://github.com/redhat-plumbers-in-action/advanced-issue-labeler/actions/workflows/unit-tests.yml/badge.svg)](https://github.com/redhat-plumbers-in-action/advanced-issue-labeler/actions/workflows/unit-tests.yml) [![Linting suite](https://github.com/redhat-plumbers-in-action/advanced-issue-labeler/actions/workflows/lint.yml/badge.svg)](https://github.com/redhat-plumbers-in-action/advanced-issue-labeler/actions/workflows/lint.yml) [![CodeQL](https://github.com/redhat-plumbers-in-action/advanced-issue-labeler/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/redhat-plumbers-in-action/advanced-issue-labeler/actions/workflows/codeql-analysis.yml) [![Check dist/](https://github.com/redhat-plumbers-in-action/advanced-issue-labeler/actions/workflows/check-dist.yml/badge.svg)](https://github.com/redhat-plumbers-in-action/advanced-issue-labeler/actions/workflows/check-dist.yml) [![codecov](https://codecov.io/gh/redhat-plumbers-in-action/advanced-issue-labeler/branch/main/graph/badge.svg)](https://codecov.io/gh/redhat-plumbers-in-action/advanced-issue-labeler)

## How does it work

... TBD ...

## Features

* TBA ...

## Usage

Following example shows how to automatically label issues based on components, that user describes in issue form. In issue form, there is defined dropdown listing all components (**Important is to set correct id**):

```yml
- type: dropdown
  id: component
  attributes:
    label: Component
    description: Please chose component related to this issue.
    multiple: true
    options:
      - 'systemd-analyze'
      - 'systemd-ask-password'
      - 'systemd-binfmt'
      - 'systemd-cgtop'
      - 'systemd-cryptsetup'
      - 'systemd-delta'
      - 'systemd-env-generator'
      - '30-systemd-environment-d-generator'
      - 'other'
  validations:
    required: true
```

Github workflow that automaticly marks issues with componnent labels:

```yml
name: Issue labeler
on:
  issues:
    types: [ opened ]

jobs:
  label-component:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: '16'

      - name: Parse issue form
        uses: stefanbuck/github-issue-praser@v2
        id: issue-parser
        with:
          template-path: .github/ISSUE_TEMPLATE/bug.yml

      - name: Set labels based on component field
        uses: redhat-plumbers-in-action/advanced-issue-labeler@v1
        with:
          issue-form: ${{ steps.issue-parser.outputs.jsonString }}
          section: component
          block-list: |
            other
          token: ${{ secrets.GITHUB_TOKEN }}
```

## Configuration options

Action currently accept following options:

```yml
# ...

- uses: redhat-plumbers-in-action/advanced-issue-labeler@v1
  with:
    issue-form: <issue-form.json>
    section: <section-id>
    token: <GitHub token>

# ...
```

### issue-form

Issue form parsed into `JSON` file. Supported format is generated using [@stefanbuck/github-issue-parser](https://github.com/stefanbuck/github-issue-parser) GitHub action.

* default value: `undefined`
* requirements: `required`

### section

ID of dropdown section from issue form template.

* default value: `undefined`
* requirements: `required`

### block-list

List of forbiden labels. Theese labels won't be set.

* default value: `undefined`
* requirements: `optional`

_?????? Please notice the `|` in the example above ??????. That let's you effectively declare a multi-line yaml string. You can learn more about multi-line yaml syntax [here](https://yaml-multiline.info). This syntax is require when block-listing multiple labels._

### token

Token used to set labels

* default value: `undefined`
* requirements: `required`
* recomended value: `secrets.GITHUB_TOKEN`

## Policy

It's possible to define labeling policy to further customize the labeling process. Policy can be defined using `.github/advanced-issue-labeler.yml` configuration file. Structure needs to be as follows:

```yml
policy:
  analyze: ['systemd-analyze']
  ask-password: ['systemd-ask-password']
  binfmt: ['systemd-binfmt']
  cgtop: ['systemd-cgtop']
  cryptsetup: ['systemd-cryptsetup']
  delta: ['systemd-delta']
  env: ['systemd-env-generator', '30-systemd-environment-d-generator']
  # ...
```

Each keyword in the policy section represents the final label when one of keywords in the array will be chosen from the dropdown menu in issue form.

## Limitations

* ?????? Currently it's not possible to use strings containing `, ` in the dropdown menu. This pattern is used in the separation process when the dropdown option `multiple` is set to `true`.
