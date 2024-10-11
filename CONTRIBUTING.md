# Contributing to Knexpresso

First off, thank you for considering contributing to Knexpresso! Your support and involvement are greatly appreciated.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Submitting Changes](#submitting-changes)
- [Development Setup](#development-setup)
- [Style Guidelines](#style-guidelines)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Community](#community)
- [License](#license)

---

## Code of Conduct

This project and everyone participating in it is governed by the [Knexpresso Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [maintainer@example.com](mailto:maintainer@example.com).

## How Can I Contribute?

### Reporting Bugs

If you encounter any bugs or issues, please:

- **Ensure the issue hasn't been reported yet** by searching the [issue tracker](https://github.com/signetic-foss/knexpresso/issues).
- **Open a new issue** if it hasn't been reported.
  - Use a clear and descriptive title.
  - Provide as much relevant information as possible.
  - Include steps to reproduce the issue.

### Suggesting Enhancements

We welcome suggestions to improve Knexpresso! To suggest an enhancement:

- **Check the roadmap** in [ROADMAP.md](./ROADMAP.md) and existing [issues](https://github.com/signetic-foss/knexpresso/issues) to see if your idea is already being discussed.
- **Open a new issue** with the `enhancement` label.
  - Describe the feature you'd like to see.
  - Explain why it would be beneficial.
  - Include any examples or mockups if applicable.

### Submitting Changes

- **Fork the repository** and create your branch from `main`.
- **Work on an open issue**: If there's an existing issue that matches your contribution, comment on it to let others know you're working on it.
- **Write clear code**: Ensure your code follows the project's style guidelines.
- **Include tests**: For new features or bug fixes, include appropriate tests.
- **Document your changes**: Update the documentation in the `docs/` folder and the `README.md` if necessary.

## Development Setup

### Prerequisites

- **Node.js** (v18+ recommended)
- **pnpm** (package manager)
  ```bash
  npm install -g pnpm
  ```
- **PostgreSQL** (or another supported database)

### Steps

1. **Fork and Clone the Repository**

   ```bash
   git clone https://github.com/your-username/knexpresso.git
   cd knexpresso
   ```

2. **Install Dependencies**

   ```bash
   pnpm install
   ```

3. **Set Up the Database**

    - Configure your database settings in `knexpresso.json` or use the provided SQLite configuration.

4. **Run the Application**

   ```bash
   pnpm start
   ```

5. **Run Tests**

   ```bash
   pnpm test
   ```

## Style Guidelines

- **Language**: All code should be written in **TypeScript**.
- **Formatting**: Use the provided `.editorconfig` and respect existing code style.
- **Linting**: Ensure your code passes linting checks.

## Commit Messages

- **Format**: Use the [Conventional Commits](https://www.conventionalcommits.org/) style.
    - Example: `feat: add authentication middleware`
- **Structure**:
    - **feat**: A new feature
    - **fix**: A bug fix
    - **docs**: Documentation only changes
    - **style**: Changes that do not affect the meaning of the code (white-space, formatting, etc.)
    - **refactor**: A code change that neither fixes a bug nor adds a feature
    - **test**: Adding missing tests or correcting existing tests
    - **chore**: Changes to the build process or auxiliary tools

## Pull Request Process

1. **Ensure your work is up-to-date** with the main repository.

   ```bash
   git checkout main
   git pull upstream main
   ```

2. **Push your feature branch** to your fork.

   ```bash
   git push origin feature/your-feature
   ```

3. **Open a Pull Request**:

    - Go to the original repository on GitHub.
    - Click on **New pull request**.
    - Select your feature branch.
    - Provide a clear and descriptive title.
    - In the description, explain the changes and reference any related issues.

4. **Wait for Review**:

    - Be responsive to feedback.
    - Make changes if requested.
    - Ensure all checks pass before merging.

## Community

- **Questions and Discussions**: Use the [Discussions](https://github.com/signetic-foss/knexpresso/discussions) tab for general questions or to start a conversation.
- **Chat**: Join our community chat on [Discord](#) (if available) for real-time discussions.
- **Stay Updated**: Watch the repository to stay informed about new releases and updates.

## License

By contributing to Knexpresso, you agree that your contributions will be licensed under the [MIT License](./LICENSE).

---

Thank you for your contributions!

