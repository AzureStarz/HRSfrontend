import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";
import { ServerStyles, createStylesServer } from '@mantine/next';

const stylesServer = createStylesServer();

export default class _Document extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    // Add your app specific logic here

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <ServerStyles html={initialProps.html} server={stylesServer} />
        </>
      ),
    };
  }

  render() {
    const setInitialTheme = `
      document.body.classList.add('white');
    `;
    return (
      <Html>
        <Head />
        <body>
          <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}