import styled from "styled-components";

const EditModal = ({ title, children, onClose }) => {
  return (
    <ModalBackdrop>
      <ModalBox>
        <ModalHeader>
          <div>{title}</div>
          <CloseButton onClick={onClose}>X</CloseButton>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalBox>
    </ModalBackdrop>
  );
};

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.div`
  width: 400px;
  background: white;
  border-radius: 12px;
  padding: 20px;
  color: black;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 10px;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

export default EditModal;
