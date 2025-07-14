import styled from "styled-components";

export const SectionItemWrap = styled.div`
  /* height: 100px; */
  width: 100%;
  padding: 40px 30px;
  background-color: white;
  border-radius: 10px;
  color: black;
  margin-bottom: 30px !important;
`;

export const SectionTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const SectionSmallTtile = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #6c6c6c;
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

export const SectionSubTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #111111;
  margin-bottom: 10px;
  display: flex;
  gap: 10px;
`;

export const ProfileRecordWrap = styled.div`
  width: 100%;
  position: relative;
  padding: 0px 30px;
  margin-bottom: 30px;
  &::before {
    position: absolute;
    content: "";
    height: 100%;
    width: 5px;
    background-color: #057e00;
    top: 0;
    left: 0;
  }
`;

export const UserState = styled.div`
  font-size: 12px;
  background-color: ${(props) =>
    props.$State == "재학"
      ? "rgba(74, 137, 255, 0.33)"
      : (props) =>
          props.$State == "졸업"
            ? "rgba(0, 116, 0, 0.33)"
            : "rgba(113, 47, 170, 0.33)"};
  color: ${(props) =>
    props.$State == "재학"
      ? "#2F3C7E"
      : (props) => (props.$State == "졸업" ? "#1A3B19" : "#200A33")};
  padding: 5px 20px;
  font-weight: 600;
  border-radius: 1000px;
  margin: 10px 0px;
`;

export const UserCompanyState = styled.div`
  font-size: 14px;
  background-color: ${(props) =>
    props.$State ? "rgba(45, 88, 44, 0.1)" : "whtie"};
  border: 1px solid ${(props) => (props.$State ? "#2A5329" : "#B84000")};
  color: ${(props) => (props.$State ? "#0C250C" : "#692A00")};
  padding: 5px 20px;
  font-weight: 600;
  border-radius: 1000px;
  margin-bottom: 10px;
  cursor: pointer;
`;
