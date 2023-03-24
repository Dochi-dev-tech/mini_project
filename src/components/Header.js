import styled from 'styled-components';

const Container = styled.header`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  display: flex;
  background-color: white;
  border-radius: 9999px;
  padding: 5px 10px;
  outline: none;
  border: 2px solid lightgrey;
  -moz-box-shadow: 0 0 3px lightgrey;
  -webkit-box-shadow: 0 0 3px lightgrey;
  box-shadow: 0 0 3px lightgrey;
  cursor: pointer;
  &:hover {
    -moz-box-shadow: 0 0 6px lightgrey;
    -webkit-box-shadow: 0 0 6px lightgrey;
    box-shadow: 0 0 6px lightgrey;
  }
`;

const Span = styled.span`
  font-size: large;
  font-weight: bold;
`;

const Bar = styled.div`
  width: 1px;
  background-color: grey;
  height: 100%;
  margin: 0 10px;
`;

export default function Header() {
  return (
    <Container>
      <Button>
        <Span>연차/당직</Span>
        <Bar></Bar>
        <Span>기간</Span>
      </Button>
    </Container>
  );
}
