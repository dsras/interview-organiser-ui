# Interview-Organiser-UI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.3.

## Running the angular front-end on local machine

The application can be run from the base directory in a terminal by executing the following commands:

1. `npm install`

2. `ng serve`

*Requires NVM install, follow steps below on linux*

1. `sudo apt install curl`

2. `curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash`

3. Restart terminal

4. `nvm install --lts`

From this point follow the application shoulda be available to run by following the first set of instructions

## Source Map errors on compile

In the case of an error when trying to serve the application again clear the .angular directory using

- Unix `rm -rf .angular`

- Powershell `rm -r \.angular`

## Documentation Generation

The documentation can be created for the app by running `npm run compodoc` to generate documentation which will appear
in ./doucementation directory

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
