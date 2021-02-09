import { useContext, useState } from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Header from "./pages/components/Header";
import Home from "./pages/Home";
import Footer from "./pages/components/Footer";
import Sidebar from "./pages/components/Sidebar";
import { AuthContext } from "./pages/context/authContext";
import "./App.scss";

function App() {
  const [grid, setGrid] = useState("hide-sidebar-mode");
  const { state } = useContext(AuthContext);
  const { user } = state;

  const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
    headers: {
      authtoken: user ? user.token : "",
    },
  });

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Sidebar grid={grid} setGrid={setGrid} />
        <Header setGrid={setGrid} />
        <Home />
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
