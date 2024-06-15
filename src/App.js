import Header from "./component/Header";
import Post from "./layout/Post";
import { MathJaxContext } from "better-react-mathjax";
import Footer from "./component/Footer";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Container = styled.div`
  flex: 1; /* This makes the main content area take up remaining space */
`;

const config = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"]
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"]
    ]
  }
};

function App() {
  return (
    <MathJaxContext config={config}>
    <Root>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={null} />
          <Route path="/post" element={null}>
            <Route path=":tag" element={<Post />} />
          </Route>
        </Routes>
      </Container>
      <Footer />
    </Root>
    </MathJaxContext>
  );
}

export default App;
