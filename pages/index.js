import Head from "next/head";
import App from "../src/components/App/App";

function IndexPage() {
  return (
    <div>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <App />
    </div>
  );
}

export default IndexPage;
