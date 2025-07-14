import styled from "styled-components";

const FeedbackModal = ({ isOpen, onClose, onSubmit }) => {
  const handleSubmit = () => {
    const feedback = document.getElementById("feedbackInput").value.trim();
    if (!feedback) return alert("피드백을 입력해 주세요.");
    onSubmit(feedback);
  };

  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalBox>
        <h3 style={{ marginBottom: "10px", color: "black", fontWeight: "500" }}>피드백을 작성해 주세요</h3>
        <StyledTextarea
          id="feedbackInput"
          rows="5"
          placeholder="예: 이력서 양식이 맞지 않습니다"
        />
        <ButtonWrap>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <SubmitButton onClick={handleSubmit}>확인</SubmitButton>
        </ButtonWrap>
      </ModalBox>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  width: 90%;
  max-width: 400px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  display:flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

`;

const StyledTextarea = styled.textarea`
  outline: none;
  width: 95%;
  height: 100px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: none;
  font-size: 16px;
`;

const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
  gap: 10px;
`;

const CancelButton = styled.button`
  background: #ccc;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  background: #3449b4;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
`;

export default FeedbackModal;
