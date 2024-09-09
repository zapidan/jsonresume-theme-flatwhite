# Americano Theme

Americano is a [JSON Resume](https://jsonresume.org/) theme based on the [Macchiato Theme](https://github.com/biosan/jsonresume-theme-macchiato).

![](https://github.com/NuclearRedeye/jsonresume-theme-americano/blob/master/preview.gif)

## Prerequisites

* You have a Linux or OSX machine. Windows should be supported via WSL 2 but has not been tested.
* You have installed a recent version of [GNU Make](https://www.gnu.org/software/make/).

## Quick Start

You can get up and running quickly with...

```sh
make
```

Then open http://localhost:8080 in your browser.

## Using in your own Project

1. Create a new project.
  ```sh
  npm init
  ```

2. Install [JSON Resume CLI](https://jsonresume.org/) and the theme.
  ```sh
  npm install --save-dev resume-cli jsonresume-theme-americano
  ```

3. Use [JSON Resume CLI](https://jsonresume.org/) to render your resume using the theme
  ```sh
  npx resume export resume.html --theme americano
  ```

## Customizations

This theme supports some additional properties on certain objects, see below for specifics and take a look at the [Kitchen Sink](./test/kitchen-sink.json) to see sample JSON. 

#### Company Logos

A `work` entry can optionally have company logo via the `image` property which will be displayed in the header section for each company.

```json
"work": [
  {
    "image": "company-logo.jpg",
  }
]
```

## License

Licensed under [MIT](https://choosealicense.com/licenses/mit/).

