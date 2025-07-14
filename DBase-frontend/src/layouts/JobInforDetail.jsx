import styled from "styled-components";
import SubmitButton from "../components/SubmitButton";
import {
  SectionItemWrap,
  SectionSmallTtile,
  SectionTitle,
} from "../style/SectionLayoutStyle";
import KakaoMapMini from "./KakaoMapMini";
import CompanyInfor from "../components/CompanyInfor";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const JobInforDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);

  const queryParams = new URLSearchParams(location.search);
  const companyId = queryParams.get("companyId");

  useEffect(() => {
    if (!companyId) return;

    setLoading(true);

    axios
      .get(`http://localhost:4433/job/company?id=${companyId}`)
      .then((res) => {
        setCompanyData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API 호출 에러:", err);
        setLoading(false);
      });
  }, [companyId]);

  if (loading) return <div>로딩 중...</div>;
  if (!companyData) return <div>데이터가 없습니다.</div>;

  // jobs 배열 중 첫 번째 job을 기본으로 사용
  const job =
    companyData.jobs && companyData.jobs.length > 0
      ? companyData.jobs[0]
      : null;

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
          <div style={{ fontSize: "20px" }}>
            {job?.job_title || "직군 정보 없음"}
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <span style={{ color: "#ffffffcc" }}>{companyData.address}</span>
            <span style={{ color: "#ffffffcc" }}>{companyData.deadline}</span>
          </div>
        </div>
        <SubmitButton
          clickEvent={() =>
            navigate(`/jobinfor/companyapply?companyId=${companyId}`)
          }
          BackColor={"white"}
          TextColor={"black"}
          Text={"지원하기"}
        />
      </div>
      <CompanyInforAlign>
        <div>
          <SectionItemWrap>
            <CompanyApplicationSection>
              <SectionTitle style={{ marginBottom: "10px" }}>
                {job?.job_title || "직군 정보 없음"}
              </SectionTitle>
              <ul style={{ marginBottom: "20px" }}>
                <li>{job?.job_description || "직무 설명 없음"}</li>
              </ul>

              <CompanyApplicationSalaryWrap>
                <div>
                  <div>급여 (정규직 채용 시)</div>
                  <CompanySectionSubTitle>
                    {job?.salary || "-"}
                  </CompanySectionSubTitle>
                </div>
                <div>
                  <div>실습 수당 (현장실습 시)</div>
                  <CompanySectionSubTitle>
                    {job?.internship_pay || "-"}
                  </CompanySectionSubTitle>
                </div>
                <div>
                  <div>근무 형태</div>
                  <CompanySectionSubTitle>
                    {job?.work_type || "-"}
                  </CompanySectionSubTitle>
                </div>
                <div>
                  <div>모집인원</div>
                  <CompanySectionSubTitle>
                    {job?.recruitment_count || "-"}
                  </CompanySectionSubTitle>
                </div>
              </CompanyApplicationSalaryWrap>
            </CompanyApplicationSection>
            <hr />
            <CompanyWorkInforSection>
              <CompanyApplicationRequirementsWrap>
                <CompanySectionSubTitle>
                  요구조건(우대사항)
                </CompanySectionSubTitle>
                <div>{job?.qualifications || "-"}</div>
              </CompanyApplicationRequirementsWrap>
              <div>
                <CompanySectionSubTitle>근무시간</CompanySectionSubTitle>
                <ul>
                  <li>{job?.working_hours || "-"}</li>
                </ul>
              </div>
            </CompanyWorkInforSection>

            <hr />

            <div>
              <CompanySectionSubTitle>기타 요구사항</CompanySectionSubTitle>
              <div>{job?.additional_requirements || "-"}</div>
            </div>

            <CompanyButtonWrap>
              <SubmitButton
                Text={"추가자료 다운로드"}
                TextColor={"#6c6c6c"}
                BackColor={"white"}
              />
              <SubmitButton
                Text={"채용의뢰서 다운로드"}
                TextColor={"white"}
                BackColor={"#3449B4"}
              />
            </CompanyButtonWrap>
          </SectionItemWrap>
          <SectionItemWrap
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <SectionTitle>AI 기업 분석</SectionTitle>
            <CompanyAiInforWrap>
              {companyData.ai_analysis.split(".").map((item, index) => {
                return (
                  <div key={index} style={{ marginBottom: "10px" }}>
                    {item}
                  </div>
                );
              })}
            </CompanyAiInforWrap>
            <KitWrap>
              <img src="../src/assets/images/KIT.svg" alt="" />
            </KitWrap>
          </SectionItemWrap>
        </div>
        <div>
          <CompanyInfor companyId={companyId} />
          <SectionItemWrap>
            <SectionTitle>기업 위치</SectionTitle>
            <KakaoMapMini address={companyData.address} />
            <CompanySectionSubTitle style={{ marginTop: "20px" }}>
              주소
            </CompanySectionSubTitle>
            <SectionSmallTtile style={{ wordBreak: "keep-all" }}>
              {companyData.address}
            </SectionSmallTtile>
          </SectionItemWrap>
        </div>
      </CompanyInforAlign>
    </>
  );
};

const CompanyInforAlign = styled.div`
  margin-top: 20px !important;
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 25px;
  & hr {
    background-color: #dddddd;
    height: 2px;
    border: none;
    margin: 20px 0px;
  }
  & > div:nth-child(1) {
    width: 65%;
  }
  & > div:nth-child(2) {
    width: 35%;
  }
  & ul {
    padding: 10px;
    & li {
      margin-bottom: 10px;
      font-size: 16px;
      font-weight: 500;
    }
  }
`;

const CompanyApplicationSection = styled.div`
  width: 100%;
  /* background-color: aliceblue; */
  & > ul > li {
    color: #6c6c6c;
  }
`;

const CompanyApplicationSalaryWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  & > div {
    & > div:nth-child(1) {
      font-size: 16px;
      font-weight: 600;
      color: #6c6c6c;
      margin-bottom: 10px;
    }
  }
`;

const CompanySectionSubTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #111111;
  margin-bottom: 10px;
`;

const CompanyApplicationRequirementsWrap = styled.div`
  & > div:nth-child(1) {
    font-size: 18px;
    color: #111111;
    font-weight: bold;
    margin-bottom: 15px;
  }
  & > div:nth-child(2) {
    font-size: 16px;
    font-weight: 500;
  }
`;

const CompanyWorkInforSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 20px;
  & > div {
    width: 48%;
  }
`;

const CompanyButtonWrap = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 10px;
`;

const CompanyAiInforWrap = styled.div`
  border-radius: 10px;
  background-color: #f0f0f0;
  width: 85%;
  padding: 25px;
  line-height: 1.5;
  font-weight: 500;
  position: relative;
  border-bottom-right-radius: 0px;
  display: flex;
  justify-content: start;
  font-size: 24px;
  word-break: keep-all;
  align-items: start;
  flex-direction: column;
  & > div {
    font-weight: 500;
  }
  &::before {
    position: absolute;
    display: block;
    content: "";
    background-color: #f0f0f0;
    clip-path: polygon(0 33%, 0% 100%, 100% 100%);
    width: 80px;
    height: 80px;
    right: 0;
    bottom: 0;
    transform: translateX(100%);
  }
`;

const KitWrap = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  transform: translateY(25%);
`;

export default JobInforDetail;
