import Header from "./component/Header";
import Post from "./layout/Post";
import Footer from "./component/Footer";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Home from "./layout/Home";
import Posts from "./layout/Posts";
import Tags from "./layout/Tags";
import TagGroup from "./layout/TagGroup";
import NotFound from "./layout/NotFound";
import "./App.css";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Container = styled.div`
  flex: 1; /* This makes the main content area take up remaining space */
`;

function App() {
  return (
    <Root>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<Posts />} />
          <Route path="/post/:tag" element={<Post />} />
          <Route path="/tags" element={<Tags />}>
            <Route path=":groupName" element={<TagGroup />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
    </Root>
  );
}

export default App;
