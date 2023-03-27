import styled from 'styled-components';
import Header from './Header';
import Calendar from './Calendar';

const HomeContainer = styled.div``;

export default function Home() {
  return (
    <HomeContainer>
      <Header />
      <Calendar />
    </HomeContainer>
  );
}
