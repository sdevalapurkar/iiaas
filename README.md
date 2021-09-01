# iiaas

Increment Integer as a Service.

An application to provide a way to get integers that automatically increment. This can be used to generate identifiers from within code.

## Notes

### Date

September/01/2021

### Location of deployed application

This was not a stretch goal I attempted due to time constraints, so the only way to run the application currently is locally/using Docker.

### Time spent

- Core requirements: 5.5 hrs
- Stretch goals: 1.5 hrs
- QA and Documentation: 1 hr
- Total: 8 hrs

### Assumptions made

Use this section to tell us about any assumptions that you made when creating your solution.

### Shortcuts/Compromises made

If applicable. Did you do something that you feel could have been done better in a real-world
application? Please let us know.

### Stretch goals attempted

If applicable, use this area to tell us what stretch goals you attempted. What went well? What do you
wish you could have done better? If you didn't attempt any of the stretch goals, feel free to let us know
why.

The stretch goals I attempted and had time for were the following:

1. Adding a `/login` endpoint along with the `/register` endpoint to give users who have already registered the ability to login and view their integer details without having to register again.
2. Creating a web SPA that allows users to either login or register an account and also query the API for integer values.
3. Creating a Postman collection with all the endpoints pre-populated to allow for simpler testing and verification of the endpoint functionality.

### Instructions to run assignment locally

In order to make running the application locally simpler, all the components of the system (app, api, db) have been dockerized using a `docker-compose.yml` file. To run the application locally, follow the steps below:

#### Prerequisties

1. Install Git: https://git-scm.com/downloads
2. Install docker: https://www.docker.com/products/docker-desktop

#### Running the app

1. Clone the repository using the following command: `git clone https://github.com/sdevalapurkar/iiaas.git`.
2. In the root directory (where the `docker-compose.yml` file resides), create a `.env` file and paste in the contents of the `env.docker` file. You can modify the `API_SECRET` variable if need be, but for testing purposes this does not need to be changed.
3. From the root directory, run the following command: `docker-compose up -d`. This will start up all the containers (db, app, api) in daemon mode (background process) and will also run a database migration which will create the users table for immediate use/testing.
4. Once all containers are up and running, the app is ready to be interacted with using the frontend web interface at `localhost:3000` or through a tool like Postman by hitting the endpoints directly at `localhost:5000`.

### What did you not include in your solution that you want us to know about?

Were you short on time and not able to include something that you want us to know about? Please list
it here so that we know that you considered it.

### Other information about your submission that you feel it's important that we know if applicable.



### Your feedback on this technical challenge

Have feedback for how we could make this assignment better? Please let us know.
