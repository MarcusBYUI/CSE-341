const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Contacts API",
    description:
      "This is the API documentation for the Contacts API application",
  },
  host: "cse341-personal-assignment1.herokuapp.com",
  schemes: ["https"],
};

const outputFile = "./routes/swagger-output.json";
const endpointsFiles = ["./routes/index.js"];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
