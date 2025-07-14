import { useState, useEffect } from "react";
import { SectionItemWrap, SectionTitle } from "../style/SectionLayoutStyle";
import styled from "styled-components";
import axios from "axios";

const CompanyInfor = ({ companyId }) => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!companyId) {
      setCompany(null);
      return;
    }

    setLoading(true);
    setError(null);

    axios
      .get(`http://localhost:4433/job/company?id=${companyId}`)
      .then((res) => {
        setCompany(res.data);
      })
      .catch((err) => {
        console.error("회사 정보 가져오기 실패:", err);
        setError("회사 정보를 불러오는데 실패했습니다.");
        setCompany(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [companyId]);

  if (!companyId) {
    return (
      <SectionItemWrap>
        <SectionTitle style={{ marginBottom: "10px" }}>기업정보</SectionTitle>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "15px",
            marginBottom: "20px",
            color: "black",
            fontSize: "18px",
            fontWeight: "600",
          }}
        >
          기업을 선택해주세요
        </div>
      </SectionItemWrap>
    );
  }

  if (loading) {
    return (
      <SectionItemWrap>
        <SectionTitle style={{ marginBottom: "10px" }}>기업정보</SectionTitle>
        <div>로딩 중...</div>
      </SectionItemWrap>
    );
  }

  if (error) {
    return (
      <SectionItemWrap>
        <SectionTitle style={{ marginBottom: "10px" }}>기업정보</SectionTitle>
        <div style={{ color: "red" }}>{error}</div>
      </SectionItemWrap>
    );
  }

  if (!company) {
    return null;
  }

  return (
    <SectionItemWrap>
      <SectionTitle style={{ marginBottom: "10px" }}>기업정보</SectionTitle>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "15px",
          marginBottom: "20px",
          color: "black",
          fontSize: "18px",
          fontWeight: "600",
        }}
      >
        {company.company_name || "기업 이름 없음"}
      </div>
      <div
        style={{
          color: "#6c6c6c",
          fontSize: "16px",
          fontWeight: "600",
          marginBottom: "20px",
        }}
      >
        {company.business_type || "업태 정보 없음"}
      </div>
      <hr style={{ marginBottom: "20px" }} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "30px",
          width: "100%",
        }}
      >
        <CompanyInforItem>
          <div>설립연도</div>
          <div>{company.establishment_year || "-"}</div>
        </CompanyInforItem>
        <CompanyInforItem>
          <div>직원 수</div>
          <div>{company.employee_count || "-"}</div>
        </CompanyInforItem>
        <CompanyInforItem>
          <div>주요 사업 내용</div>
          <div>{company.main_business || "-"}</div>
        </CompanyInforItem>
        <CompanyInforItem>
          <div>홈페이지</div>
          <div>
            {company.website ? (
              <a href={company.website} target="_blank" rel="noreferrer">
                {company.website}
              </a>
            ) : (
              "-"
            )}
          </div>
        </CompanyInforItem>
      </div>
    </SectionItemWrap>
  );
};

const CompanyInforItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  width: 100%;

  & > div {
    width: 50%;
  }
  & > div:nth-child(1) {
    color: #6c6c6c;
    font-weight: bold;
  }
  & > div:nth-child(2) {
    color: black;
    text-align: end;
    word-break: keep-all;
  }
`;

export default CompanyInfor;
