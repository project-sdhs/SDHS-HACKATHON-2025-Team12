import styled from "styled-components";

const StackItem = ({ Stack }) => {
  return (
    <>
      <Wrap>{Stack}</Wrap>
    </>
  );
};

const Wrap = styled.div`
  padding: 5px 20px;
  font-size: 12px;
  border: 1px solid #cccccc;
  color: #6c6c6c;
  border-radius: 1000px;
  font-weight: bold;
  z-index: 1;
`;

export default StackItem;
