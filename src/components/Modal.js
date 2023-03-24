import styled from 'styled-components';

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
`;

export default function Modal({ setShowModal }) {
  return (
    <div>
      <Overlay onClick={() => setShowModal(false)} />
      <ModalContainer>modal</ModalContainer>
    </div>
  );
}
