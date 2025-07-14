import styled from "styled-components";
import SubmitButton from "./SubmitButton";
import CompanyStackItem from "./StackItem";
import { useNavigate } from "react-router-dom";

/**
 * props
 * - 년도
 * - ~일치율~
 * - 회사명
 * - 직군
 * - 위치
 * - 마감일
 * - 업무내용
 * - 필요 스택
 */
const CompanyItem = ({ Year, Name, Field, Location, Deadline, Work, id }) => {
  //   const StacksList = Stacks.split(",");
  const ComapanyId = id;
  const navigate = useNavigate();
  return (
    <>
      <Wrap>
        <CompanyYear>{Year}년</CompanyYear>
        <CompanyInforWrap style={{ marginBottom: "30px" }}>
          <CompanyNameWrap>
            <div>{Name}</div>
            <div>{Field}</div>
          </CompanyNameWrap>
          <CompnayLocationWrap>
            <div>
              <img
                src="../src/assets/images/CLocation.svg"
                alt="회사 위치 이미지"
              />
              <div>{Location}</div>
            </div>
            <div>
              <img
                src="../src/assets/images/CDeadline.svg"
                alt="회사 마감일 이미지"
              />
              <div>{Deadline}</div>
            </div>
            <div>
              <img
                src="../src/assets/images/CWork.svg"
                alt="회사 직무 이미지"
              />
              <div>{Work}</div>
            </div>
          </CompnayLocationWrap>
        </CompanyInforWrap>
        <ButtonWrap>
          <SubmitButton
            BackColor={"white"}
            TextColor={"#6C6C6C"}
            Text={"상세보기"}
            clickEvent={() =>
              navigate(`jobinfordetail?companyId=${ComapanyId}`)
            }
          />
          <SubmitButton
            BackColor={"#3449B4"}
            TextColor={"#FFFFFF"}
            Text={"지원하기"}
            clickEvent={() => navigate(`companyapply?companyId=${ComapanyId}`)}
          />
        </ButtonWrap>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 100%;
  padding: 20px;
  background-color: white;
  color: black;
  border-radius: 10px;
`;
const CompanyYear = styled.div`
  background-color: #4a89ff57;
  font-size: 16px;
  font-weight: 500;
  color: #2f3c7e;
  border-radius: 100px;
  padding: 5px 25px;
  display: inline-block;
`;
const CompanyInforWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
`;

const CompanyNameWrap = styled.div`
  margin: 20px 0px;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  gap: 15px;
  & > div:nth-child(1) {
    font-weight: bold;
    font-size: 30px;
  }
  & > div:nth-child(2) {
    font-weight: 500;
    font-size: 20px;
    word-break: keep-all;
  }
`;

const CompnayLocationWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  & > div {
    display: flex;
    justify-content: start;
    align-items: start;
    gap: 10px;
    color: #6c6c6c;
    width: 100%;
  }

  & > div > div {
    font-weight: 500;
    max-width: 100%; /* ✅ 최대 너비를 설정해야 ellipsis가 작동 */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  & > div {
    flex: 1;
    font-size: 20px;
  }
`;

export default CompanyItem;
