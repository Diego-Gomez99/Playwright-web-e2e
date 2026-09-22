\# Playwright Web \& API E2E Automation Suite 🎭🚀



!\[Playwright Tests](https://github.com/Diego-Gomez99/Playwright-web-e2e/actions/workflows/playwright.yml/badge.svg)

!\[TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat\&logo=typescript\&logoColor=white)

!\[Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=flat\&logo=playwright\&logoColor=white)

!\[GitHub Actions](https://img.shields.io/badge/GitHub\_Actions-2088FF?style=flat\&logo=github-actions\&logoColor=white)



An end-to-end (E2E) automated testing framework built with \*\*Playwright\*\*, \*\*TypeScript\*\*, and \*\*GitHub Actions\*\* for API and Web applications. This repository demostrates

scalable test design using the \*\*Page Object Model (POM)\*\* pattern, dynamic API authenticacion handling, and continuous integration.



\---



\## ✨ Features \& Architecture



* \*\*Page Object Model (POM):\*\*\* Clean separation between HTTP request abstractions ('ReqresPage.ts') and test assertions ('reqres-e2e-.spec.ts').
* \*\*Dynamic API Chaining:\*\* Automatic token extraction from authentication endpoints ('POST/login') injected seamlessly into protected profile queries.
* \*\*CI/CD Pipeline:\*\* Fully automated workflow using GitHub Actions running headless test suites across multiple browser engines on every 'push' and 'pull\_request'.
* \*\*Test Reporting:\*\* Automatic artifact generation with detailed Playwright HTML reports attached to workflow runs.



\---



\## 🛠️ Tech Stack



* \*\*Language:\*\* TypeScript
* \*\*Test Runner:\*\* Playwright Test Framework
* \*\*Target Service:\*\* Reqres REST API ('reqres.in')
* \*\*CI/CD Orchestration:\*\* GitHub Actions
* \*\*Package Manager:\*\* npm



\---



\## 🚀 Getting Started



\### Prerequisites



* \*\*Node.js:\*\*\* v24
* \*\*npm:\*\* v9 or higher



\## Installation



1. Clone the repository:

&#x20;  ```bash

&#x20;  git clone \[https://github.com/Diego-Gomez99/Playwright-web-e2e.git](https://github.com/Diego-Gomez99/Playwright-web-e2e.git)

&#x20;  cd Playwright-web-e2e



2\. Install dependencies:

&#x20;  ```bash
     npm ci



3\. Install Playwright browsers:

&#x20;    ```bash
     npx playwright install --with-deps

