import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import BookList from "../components/BookList";

export default function Home() {
  const client = new ApolloClient({
    uri:
      "http://ec2co-ecsel-bv5lgnwu77gz-227910838.ap-northeast-1.elb.amazonaws.com:5000/graphql",
  });
  return (
    <ApolloProvider client={client}>
      <BookList />
    </ApolloProvider>
  );
}
