# Playwright Web & API E2E Automation Suite 🎭🚀

![Playwright Tests](https://github.com/Diego-Gomez99/Playwright-web-e2e/actions/workflows/playwright.yml/badge.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=flat&logo=playwright&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=githubactions&logoColor=white)

An end-to-end (E2E) automated testing framework built with **Playwright**, **TypeScript**, and **GitHub Actions** for API and Web applications. This repository demonstrates scalable test design using the **Page Object Model (POM)** pattern, dynamic API authentication handling, and continuous integration.

---

## ✨ Features & Architecture

* **Page Object Model (POM):** Clean separation between HTTP request abstractions (`ReqresPage.ts`) and test assertions (`regres-e2e.spec.ts`).
* **Dynamic API Chaining:** Automatic token extraction from authentication endpoints (`POST /login`) injected seamlessly into protected profile queries.
* **CI/CD Pipeline:** Fully automated workflow using GitHub Actions running headless test suites across multiple browser engines on every `push` and `pull_request`.
* **Test Reporting:** Automatic artifact generation with detailed Playwright HTML reports attached to workflow runs.

---

## 🛠️ Tech Stack

* **Language:** TypeScript
* **Test Runner:** Playwright Test Framework
* **Target Service:** Reqres REST API (`reqres.in`)
* **CI/CD Orchestration:** GitHub Actions
* **Package Manager:** npm

---

## 🚀 Getting Started

### Prerequisites

* **Node.js:** v24
* **npm:** v9 or higher

### Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/Diego-Gomez99/Playwright-web-e2e.git](https://github.com/Diego-Gomez99/Playwright-web-e2e.git)
   cd Playwright-web-e2e
2. Install dependencies:
   ```bash
      npm ci
3. Install Playwright browsers:
    ```bash
       npx playwright install --with-deps
---

## 🧪 Running Tests
* Run all test (Headless):
    ```bash
       npx playwright test
* Run specific test file:
    ```bash
       npx playwright test tests/regres-e2e.spec.ts
* Run tests in headed mode:
    ```bash
       npx playwright test --headed
* Generate & open HTML execution report:
    ```bash
       npx playwright show-report

---

## 🔃 CI/CD Pipeline Workflow
The repository uses GitHub Actions (`.github/workflows/playwright.yml`) to automatically execute the test suite:
1. Triggers on `push` and `pull_request` to the `main` or `master` branch.
2. Sets up a Node.js enviroment and restores cached dependencies.
3. Installs Playwright browser binaries with system dependencies.
4. Executes test in parallel across browser projects.
5. Uploads test execution reports (`playwright-reports`) as workflow artifacts accessible for 30 days.

---

## 🧑‍💻 Author
## Diego Gomez
- SR. QA Engineer / SDET
- GitHub: @Diego-Gomez99
