# Flat White Theme

Flatwhite is a [JSON Resume](https://jsonresume.org/) theme based on the [Macchiato Theme](https://github.com/biosan/jsonresume-theme-macchiato).

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

This is intented for local development and it hasn't been published to npm.

First, update `kitchen-sink.json` with your resume

```sh
make
```

```sh
cp public/index.html {{your_project}}
```
  

## Customizations

The order of the different sections has changes with respect to americano theme, and the references section has been muted if there are none. Additionally, the certificates section has been removed from meta and certificates should be added as an award.


