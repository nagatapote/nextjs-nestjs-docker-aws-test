import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import BookList from "../components/BookList";

export default function Home() {
  const client = new ApolloClient({
    uri: "http://localhost:5000/graphql",
  });
  return (
    <ApolloProvider client={client}>
      <BookList />
    </ApolloProvider>
  );
}
