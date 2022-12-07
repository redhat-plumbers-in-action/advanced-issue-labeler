<!-- markdownlint-disable MD033 MD041 -->
<p align="center">
  <img src="https://github.com/redhat-plumbers-in-action/team/blob/70f67465cc46e02febb16aaa1cace2ceb82e6e5c/members/pink-plumber.png" width="100" />
  <h1 align="center">Advanced Issue Labeler</h1>
</p>

[![GitHub Marketplace][market-status]][market] [![Lint Code Base][linter-status]][linter] [![Unit Tests][test-status]][test] [![CodeQL][codeql-status]][codeql] [![Check dist/][check-dist-status]][check-dist] [![codecov][codecov-status]][codecov] [![Mergify Status][mergify-status]][mergify]

<!-- Status links -->

[market]: https://github.com/marketplace/actions/advanced-issue-labeler
[market-status]: https://img.shields.io/badge/Marketplace-Advanced%20Issue%20Labeler-blue.svg?colorA=24292e&colorB=0366d6&style=flat&longCache=true&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAM6wAADOsB5dZE0gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAERSURBVCiRhZG/SsMxFEZPfsVJ61jbxaF0cRQRcRJ9hlYn30IHN/+9iquDCOIsblIrOjqKgy5aKoJQj4O3EEtbPwhJbr6Te28CmdSKeqzeqr0YbfVIrTBKakvtOl5dtTkK+v4HfA9PEyBFCY9AGVgCBLaBp1jPAyfAJ/AAdIEG0dNAiyP7+K1qIfMdonZic6+WJoBJvQlvuwDqcXadUuqPA1NKAlexbRTAIMvMOCjTbMwl1LtI/6KWJ5Q6rT6Ht1MA58AX8Apcqqt5r2qhrgAXQC3CZ6i1+KMd9TRu3MvA3aH/fFPnBodb6oe6HM8+lYHrGdRXW8M9bMZtPXUji69lmf5Cmamq7quNLFZXD9Rq7v0Bpc1o/tp0fisAAAAASUVORK5CYII=

[linter]: https://github.com/redhat-plumbers-in-action/advanced-issue-labeler/actions/workflows/lint.yml
[linter-status]: https://github.com/redhat-plumbers-in-action/advanced-issue-labeler/actions/workflows/lint.yml/badge.svg

[test]: https://github.com/redhat-plumbers-in-action/advanced-issue-labeler/actions/workflows/unit-tests.yml
[test-status]: https://github.com/redhat-plumbers-in-action/advanced-issue-labeler/actions/workflows/unit-tests.yml/badge.svg

[codeql]: https://github.com/redhat-plumbers-in-action/advanced-issue-labeler/actions/workflows/codeql-analysis.yml
[codeql-status]: https://github.com/redhat-plumbers-in-action/advanced-issue-labeler/actions/workflows/codeql-analysis.yml/badge.svg

[check-dist]: https://github.com/redhat-plumbers-in-action/advanced-issue-labeler/actions/workflows/check-dist.yml
[check-dist-status]: https://github.com/redhat-plumbers-in-action/advanced-issue-labeler/actions/workflows/check-dist.yml/badge.svg

[codecov]: https://codecov.io/gh/redhat-plumbers-in-action/advanced-issue-labeler
[codecov-status]: https://codecov.io/gh/redhat-plumbers-in-action/advanced-issue-labeler/branch/main/graph/badge.svg

[mergify]: https://mergify.com
[mergify-status]: https://img.shields.io/endpoint.svg?url=https://api.mergify.com/v1/badges/redhat-plumbers-in-action/advanced-issue-labeler&style=flat

<!-- -->

Advanced Issue Labeler is a GitHub Action that can automatically label issues based on user input. The idea for this project came from and was first introduced in [@systemd/systemd](https://github.com/systemd/systemd). Systemd repository has a very active community with many issues to process. Automatic labeling helps with issue triaging.

## How does it work

Advanced Issue Labeler takes advantage of GitHub [issue forms](https://github.blog/changelog/2021-06-23-issues-forms-beta-for-public-repositories) (special kind of issue templates) to provide a better developer experience by labeling issues based on provided input. It is currently possible to label issues based only on [dropdowns](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-githubs-form-schema#dropdown).

Advanced Issue Labeler is expected to work in cooperation with [@stefanbuck/github-issue-parser](https://github.com/stefanbuck/github-issue-parser) GitHub Action. Parser action provides JSON representation of the submitted issue, where KEYs represent IDs described in the issue-form YAML configuration. Issue labeler understands it and can label issues based on selected values from dropdown. Dropdown values could directly represent labels or be mapped to policy configuration for more complex labeling requirements.

## Features

* Ability to label issues based on issue form dropdown values
* Ability to specify [policy](#policy) for mapping specific keywords to labels
* Ability to exclude certain words from the labeling process ([`block-list`](#block-list))

## Usage

### Simple usecase

The following example shows how to automatically label issues based on the severity that the user describes in issue form. In issue form, there is a defined dropdown listing all severity levels:

```yml
# ...

- type: dropdown
  id: severity
  attributes:
    label: Severity impact
    description: Please choose the severity of the impact of this issue.
    multiple: false
    options:
      - 'None'
      - 'Low'
      - 'Medium'
      - 'High'
      - 'Urgent'
      - 'Other'
  validations:
    required: true

# ...
```

> **Note**: It's essential to set the correct ID in issue-form

GitHub workflow that automatically marks issues with severity labels:

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

      - name: Parse issue form
        uses: stefanbuck/github-issue-parser@v2
        id: issue-parser
        with:
          template-path: .github/ISSUE_TEMPLATE/bug.yml

      - name: Set labels based on severity field
        uses: redhat-plumbers-in-action/advanced-issue-labeler@v2
        with:
          issue-form: ${{ steps.issue-parser.outputs.jsonString }}
          section: severity
          block-list: |
            None
            Other
          token: ${{ secrets.GITHUB_TOKEN }}
```

### More complex usecase

The following example shows how to automatically label issues based on animal types. In issue form, there is a defined dropdown listing all animals:

```yml
# ...

- type: dropdown
  id: animals
  attributes:
    label: Animals
    description: Please pick all animals you like.
    multiple: true
    options:
      - 'None'
      - '🦍 Gorilla'
      - '🐶 Dog'
      - '🐺 Wolf'
      - '🦊 Fox'
      - '🐴 Horse'
      - '🐓 Rooster'
      - '🐦 Bird'
      - '🐧 Penguin'
      - '🐸 Frog'
      - '🐬 Dolphin'
      - '🐟 Fish'
      - '🐛 Bug'
      - '🕷️ Spider'
      - '🐊 Crocodile'
      - 'other'
  validations:
    required: true

# ...
```

> **Note**: It's essential to set the correct ID in issue-form

Let's define a policy that will allow us to map animals to their types. Policy needs to be stored in `.github/advanced-issue-labeler.yml`.

```yml
policy:
  - section:
      - id: [animals]
        block-list: ['None', 'Other']
        label:
          - name: 'kind: amphibians'
            keys: ['🐸 Frog']
          - name: 'kind: birds'
            keys: ['🐓 Rooster', '🐦 Bird', '🐧 Penguin']
          - name: 'kind: fish'
            keys: ['🐬 Dolphin', '🐟 Fish']
          - name: 'kind: mammals'
            keys: ['🦍 Gorilla', '🐶 Dog', '🐺 Wolf', '🦊 Fox', '🐴 Horse']
          - name: 'kind: reptiles'
            keys: ['🐊 Crocodile']
          - name: 'invertebrates'
            keys: ['🐛 Bug', '🕷️ Spider'] 
```

GitHub workflow that automatically marks issues with animal types labels:

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

      - name: Parse issue form
        uses: stefanbuck/github-issue-parser@v2
        id: issue-parser
        with:
          template-path: .github/ISSUE_TEMPLATE/bug.yml

      - name: Set labels based on animals field
        uses: redhat-plumbers-in-action/advanced-issue-labeler@v2
        with:
          issue-form: ${{ steps.issue-parser.outputs.jsonString }}
          token: ${{ secrets.GITHUB_TOKEN }}
```

### Real-life examples

* [`systemd/systemd`](https://sourcegraph.com/search?q=context:global+repo:%5Egithub%5C.com/systemd/systemd%24+file:%5E%5C.github/workflows+redhat-plumbers-in-action/advanced-issue-labeler&patternType=literal) [![GitHub Repo stars](https://img.shields.io/github/stars/systemd/systemd?style=social)](https://github.com/systemd/systemd)
* [`blueedgetechno/win11React`](https://sourcegraph.com/search?q=context:global+repo:%5Egithub%5C.com/blueedgetechno/win11React%24+file:%5E%5C.github/workflows+redhat-plumbers-in-action/advanced-issue-labeler&patternType=literal) [![GitHub Repo stars](https://img.shields.io/github/stars/blueedgetechno/win11React?style=social)](https://github.com/blueedgetechno/win11React)

Feel free to try `advanced-issue-labeler` in template repository - [`@redhat-plumbers-in-action/issue-forms-automation`](https://github.com/redhat-plumbers-in-action/issue-forms-automation)

## Configuration options

Action currently accepts the following options:

```yml
# ...

- uses: redhat-plumbers-in-action/advanced-issue-labeler@v2
  with:
    issue-form: <issue-form.json>
    template:   <template-name.yml>
    section:    <section-id>
    block-list: <block-list>
    token:      <GitHub token>

# ...
```

### issue-form

Issue-form parsed into `JSON` file. Supported format is generated using [@stefanbuck/github-issue-parser](https://github.com/stefanbuck/github-issue-parser) GitHub action.

* default value: `undefined`
* requirements: `required`

### template

Each issue form can have a defined different labeling policy, and this option is used to specify which policy should be used.

* default value: `undefined`
* requirements: `optional`

### section

The ID of the dropdown section from the issue form template.

* default value: `undefined`
* requirements: `required`

### block-list

List of forbidden labels. These labels won't be set.

* default value: `undefined`
* requirements: `optional`

> **Note**: _Please notice the `|` in the example above ☝️. That lets you effectively declare a multi-line YAML string. You can learn more about multi-line YAML syntax [here](https://yaml-multiline.info). This syntax is required when block-listing multiple labels._

### token

Token used to set labels

* default value: `undefined`
* requirements: `required`
* recomended value: `secrets.GITHUB_TOKEN`

## Policy

It's possible to define a labeling policy to further customize the labeling process. The policy can be defined using `.github/advanced-issue-labeler.yml` configuration file. The structure needs to be as follows:

```yml
policy:
  - template: ['bug.yml', 'feature.yml']
    section:
      - id: ['severity', 'priority']
        block-list: []
        label:
          - name: 'Low'
            keys: ['Low', 'None']
          - name: 'Medium'
            keys: ['Medium']
          - name: 'High'
            keys: ['High']
          - name: 'Urgent'
            keys: ['Urgent']
      - id: [animals]
        block-list: ['None', 'Other']
        label:
          - name: 'amphibians'
            keys: ['🐸 Frog']
          - name: 'birds'
            keys: ['🐓 Rooster', '🐦 Bird', '🐧 Penguin']
          - name: 'fish'
            keys: ['🐬 Dolphin', '🐟 Fish']
          - name: 'mammals'
            keys: ['🦍 Gorilla', '🐶 Dog', '🐺 Wolf', '🦊 Fox', '🐴 Horse']
          - name: 'reptiles'
            keys: ['🐊 Crocodile']
          - name: 'invertebrates'
            keys: ['🐛 Bug', '🕷️ Spider']
# - template: ...
```

### `template` keyword

Array of issue-forms (e.g. `['bug-report.yml']`). This section is used to determine the correct labeling policy when multiple policies are defined. Works in cooperation with [template option](#template).

* requirements: `optional`

### `section.id` keyword

Equivalent of [section](#section) option. An array of IDs of dropdowns. These IDs need to point to dropdowns in the issue-form template.

* requirements: `required`

### `section.block-list` keyword

Equivalent of [block-list](#block-list) option. An array of forbidden keywords. These keywords will be excluded when applying labeling policy.

* requirements: `required`

### `section.label` keyword

Section of policy describing labeling policy. `label` section of the policy is expected to have the following properties:

* `name` - Name of label
* `keys` - Array of keywords corresponding to values from `issue-form` dropdown

* requirements: `required`

## Limitations

* Currently it's not possible to use strings containing `,␣` in the dropdown menu. This pattern is used in the separation process when the dropdown option `multiple` is set to `true`.
