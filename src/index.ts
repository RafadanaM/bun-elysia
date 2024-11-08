import App from "./app";

try {
  const app = new App(8000);

  app.listen();
} catch (error) {
  console.log("Error Starting App");
  console.error(error);
}
