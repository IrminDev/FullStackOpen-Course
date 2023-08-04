# CI setup
This text was written for the exercise 11.1 for the FullStackOpen 2023 course.
## Situation
For this case, we have an application that will be released soon and it's coded with Python. The team in charge of the development is about of 6 people.
## What tools will we use?
In this case, we have three important steps in the CI process, for each step we select the next tools for the ecosystem according the language that in this case is Python:

 - **Linting**: For linting, we'll use Flake8, this tool is very usefull and is faster than Pylint that is other popular tool for linting in python, and its quality according the calculated and provited by Lumnify is the highest.
 - **Testing**: By far, Pytest is the best option to test a Python application. It has a lot of benefits compared to other frameworks like DocTest, Testify and Robot. Pytest have benefits like many plugins available, a large community support, among others.
 - **Building**: PyBuilder is the best option for this project because its mainly targetting Python applications and for this case we assume that this application will be enterily coded in Python.

## Options for the CI
One of the best option for the CI/CD process is  [Circle CI](https://circleci.com/) this because Circle CI is focused in small projects where the company maybe doesn't have a department or team in charge of the CI process, for this reason Circle CI is the best option for us.
## What setup would be better for te application?
This question is a little bit hard to answer because we need more information about what will do the application and if its required specific hardware to deploy it. Assuming that is a basic application for a client who doesn't need a lot of tools of hardware, our best option is a cloud-based option, this because we only need basic hardware and we can buy this easily in a web site dedicated to the cloud-bassed enviroment.