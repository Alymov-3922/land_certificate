import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";
import "./App.css";
import PageLayout from "./routes/pageLayout";

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://192.46.233.197:8087/v1/graphql',
    headers: {
      'x-hasura-admin-secret': 'RS0wqjDPes994GzytgYqoxeYkspM66f47FenuK6HSjpCdSGAGLxxEKmM8tB3vEra'
    }
  }),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <PageLayout />
      </ApolloProvider>
    </div>
  );
}

export default App;
