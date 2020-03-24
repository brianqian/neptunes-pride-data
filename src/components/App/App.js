import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  background-color: ${props => props.theme.primary};
  color: white;
  display: flex;
  flex-direction: column;
`;

class App extends Component {
  render() {
    return <Container>Hello World im in app</Container>;
  }
}

export default App;
