## How to contribute

1. Clone this repository

```sh
git clone https://github.com/chingu-voyages/v43-tier2-team-14.git
```

2. to see the list of all remote branches

```sh
git branch -r
```

3. switch to development branch

```sh
git checkout development
```

4. create your own working branch and switch to it

```sh
git checkout -b YOUR_BRANCH_NAME
```

## Branch name guides

Please name your branch with one of these options

- `feature/YOUR_BRANCH_NAME_HERE` - If you're making a new feature
- `fix/YOUR_BRANCH_NAME_HERE` - If you're making some bug fixes
- `hotfix/YOUR_BRANCH_NAME_HERE` - If you're making a quick fix that needs to merge quickly
- `refactor/YOUR_BRANCH_NAME_HERE` - If you're making some code refactoring

## P.S: Before starting a new feature/fix/bug, we have to

1. pull changes from development branch to make sure you are up to date.

```sh
Git pull origin development
```

2. create your working branch.
3. switch to your branch.

### Please don’t push any codes to main branch, instead,

1. push your code to your working branch
2. make pull request relative to development branch by clicking the compare & pull request button

Kindly carefully check this guide: [Git Workflow](https://www.notion.so/Git-Workflow-89fc4fd7ac98413e9f008bccdad2459a).
