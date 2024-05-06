<p align="center">
  <a href="https://dab.jooo.tech/">
    <img src="https://github.com/joseph-gerald/data-app-base/assets/73967013/bb8ffae5-7814-45af-8daf-627b7e5a959b" alt="Data App Base Logo">
  </a>
</p>

# data-app-base

Simple, efficient and clean express/vanilla data app base. Greatly reduce the time needed to build data apps with this versatile base. Originally made for an [AI Detector](https://detect.thisisadomain.lol/) (collects verdicts from multiple sources) and stripped down into this repository

## Examples
- [demo](https://dab.jooo.tech/)
- [OSINT Base](https://osint.thisisadomain.lol/)
- [AI Detectur](https://detect.thisisadomain.lol/)

## Getting Started
### Installation
```bash
# Create you own repo using this as a template by using the "Use this template" button
git clone %your templated repo%.git
npm i
npm i nodemon -g # optional
npm run start/dev
```
### Guide
1. Delete index.html in src/public/index.html
2. Rename single.html or multi.html as index.html
3. Delete the other page
4. Go to src/script/base/ (multi.js or single.js depending on which one you selected)
5. Modify the script to do what you want (by default just fetches random text from [baconipsum.com](https://baconipsum.com/) and images from [thedogapi.com](https://www.thedogapi.com/)

## Features
### Simple
The code is made to be as simple as possible allowing only requiring a prerequisite on basic html, css and js.
### Responsive
My base is made with responsivity and compatibility in mind. The base support mobile devices and all popular screen dimensions straight out of the box without any extra work needed.
### SEO optimized
###### PageSpeed Results
| Report URL | Performance (%) | Accessibility (%) | Best Practices (%) | SEO (%) |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| [Demo Landing Page](https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fdab.jooo.tech%2F)  | 100% | 100% | 100% | 100% |
| [Demo Single Line](https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fdab.jooo.tech%2Fsingle.html)  | 100% | 100% | 100% | 100% |
| [Demo Multi Line](https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fdab.jooo.tech%2Fmulti.html)  | 100% | 100% | 100% | 100% |
### Performant
The base was made to be as performant as possible minimizing work needed on page load.
### Visual
The base was made to look minimal and take and look the most visually pleasing as possible. The base features 2 themes out of the box light and dark mode.
