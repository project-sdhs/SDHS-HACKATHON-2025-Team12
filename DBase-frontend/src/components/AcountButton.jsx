import styled from "styled-components";

const AcountButton = ({ LinkPath, Label }) => {
  return (
    <>
      <AcountWrap>
        <a href={LinkPath}>{Label}</a>
      </AcountWrap>
    </>
  );
};
const AcountWrap = styled.div`
  background-color: white;
  padding: 15px 20px;
  border-radius: 10px;
  & > a {
    font-weight: bold;
  }
`;
export default AcountButton;
