# Java Optional in Typescript

- [Deprecated project](#deprecated-project)
- [Why was this project created?](#why-was-this-project-created)
- [Classes included in this project](#classes-included-in-this-project)
- [How can I include it in my Angular project?](#how-can-I-include-it-in-my-Angular-project)
- [Dependencies configuration](#dependencies-configuration)

## Deprecated project
This projects has been deprecated, use [Optional](https://github.com/doctore/AngularUtil/blob/master/src/app/core/types/optional.type.ts).
<br><br>


## Why was this project created?

With this functionality we will be able to develop in Typescript using the "null safe" way provided by Java. Avoiding to be worried about if the object we are using is **null**
and/or **undefined**.

## Classes included in this project

There are several ones included in this small project:
   
* **Optional**: main class of this project, contains the same methods included in the current Optional class of Java 10.
* **AssertUtil**: helper class used to verify several conditions should be fulfilled like: *notNull*, *notUndefined*, etc 
* **IllegalAccessError**: exception to notify when there is an invalid access to a method.
* **IllegalArgumentError**: indicates that a method has received an illegal or inappropriate argument.

## How can I include it in my Angular project?

Simply copy and paste the source and test files in your desired folders, that is all.
The tests files have been development using **Jasmine** functionality so, include them in an existing Angular project should not be a problem.

## Dependencies configuration

To allow us to use it in an existing Angular project, this one has not been included as an external *npm* package, developing the tests
using **Jasmine** instead of other external package. Then we will see the list of dependencies used to develop it. Taking into account
this functionality is included in a "bigger base project", most of them are not really "a must", only **Typescript** version could be
important. 

```json
  "devDependencies": {
    "@angular-devkit/build-angular": "~0.11.0",
    "@angular/cli": "~7.1.4",
    "@angular/compiler-cli": "~7.1.0",
    "@angular/language-service": "~7.1.0",
    "@types/jasmine": "~2.8.8",
    "@types/jasminewd2": "~2.0.3",
    "@types/node": "~8.9.4",
    "codelyzer": "~4.5.0",
    "jasmine-core": "~2.99.1",
    "jasmine-spec-reporter": "~4.2.1",
    "karma": "~3.1.1",
    "karma-chrome-launcher": "~2.2.0",
    "karma-coverage-istanbul-reporter": "~2.0.1",
    "karma-jasmine": "~1.1.2",
    "karma-jasmine-html-reporter": "^0.2.2",
    "protractor": "~5.4.0",
    "ts-node": "~7.0.0",
    "tslint": "~5.11.0",
    "typescript": "~3.1.6"
  }
```  

