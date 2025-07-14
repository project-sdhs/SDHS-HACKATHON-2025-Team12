import styled from "styled-components";
import StackItem from "./StackItem";
import SubmitButton from "./SubmitButton";

const EmployeeItem = ({ name, work_start_date, work_end_date, skills }) => {
  const StacksList = skills ? skills.split(',').map(s => s.trim()) : [];
  return (
    <>
      <Wrap>
        <EmployeeInforWrap>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "black",
            }}
          >
            {name}
          </div>
          <div style={{ fontSize: "16px", color: "#6c6c6c" }}>
            {work_start_date} ~ {work_end_date ? work_end_date : "재직중"}
          </div>
        </EmployeeInforWrap>
        <CompanyStackWrap>
          {StacksList.map((text, index) => (
            <StackItem Stack={text} key={index} />
          ))}
        </CompanyStackWrap>
        <SubmitButton TextColor={"black"} Text={"재직 선배 프로필 보기"} />
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  & > div {
    width: 100%;
  }
`;

const EmployeeInforWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CompanyStackWrap = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
`;

export default EmployeeItem;