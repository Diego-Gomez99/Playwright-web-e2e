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

* **Node.js:** v18 or higher
* **npm:** v9 or higher

### Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/Diego-Gomez99/Playwright-web-e2e.git](https://github.com/Diego-Gomez99/Playwright-web-e2e.git)
   cd Playwright-web-e2e