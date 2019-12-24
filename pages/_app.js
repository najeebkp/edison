import React from "react";
// NEXT IMPORTS
import App from "next/app";
import withRedux from "next-redux-wrapper";
// REDUX
import { Provider } from "react-redux";
// STORE
import configureStore from "lib/store";
// APOLLO PROVIDER AND APOLLO CLIENT
import { ApolloProvider } from "@apollo/react-hooks";
import withData from "services/ApolloClient";

// BOOTSTRAP STYLESHEETS, FONT AWESOME AND CUSTOM SCSS STYLES
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "assets/styles/sass/main.scss";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}
    };
  }

  render() {
    const { Component, pageProps, store, apollo } = this.props;
    return (
      <ApolloProvider client={apollo}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ApolloProvider>
    );
  }
}

export default withData(withRedux(configureStore)(MyApp));
