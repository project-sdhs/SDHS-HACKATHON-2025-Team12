import { useEffect, useRef, useState } from "react";

import styled from "styled-components";
import SubmitButton from "../components/SubmitButton";
import { useNavigate } from "react-router-dom";

const JobUploadLayout = ({ TeacherState }) => {
  const navigate = useNavigate();

  const [jobId, setJobId] = useState(null);

  useEffect(() => {
    if (!TeacherState) {
      alert("접근권한이 존재하지 않는 페이지입니다.");
      navigate("/");
    }
  }, [TeacherState]);
  const [nextPage, setNextPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [jobFileName, setJobFileName] = useState("");
  // const [CompanyInfor, setCompanyInfor] = useState(null);

  const handleJobFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const decodedName = decodeURIComponent(file.name);
      setJobFileName(decodedName);
    }
  };

  const handleNextPage = async () => {
    if (nextPage === 0) {
      await handleFirstFormSubmit();
    } else if (nextPage === 1) {
      setNextPage((prevNextPage) => prevNextPage + 1);
    } else if (nextPage === 2) {
      await handleUploadCompany();
    }
  };

  const handlebeforePage = () => {
    if (nextPage != 0) {
      setNextPage((prev) => prev - 1);
    }
    // setNextPage((prev) => prev - 1);
  };

  const jobFileRef = useRef(null);

  let updatePayload = {
    company_information: {
      company_name: "",
      deadline: "",
      year: "",
      business_type: "",
      employee_count: "",
      main_business: "",
      website: "",
      address: "",
    },
    job_information: {
      job_title: "",
      recruitment_count: "",
      job_description: "",
      required_documents: [],
      qualifications: "",
      working_hours: "",
      work_type: "",
      internship_pay: "",
      salary: "",
      additional_requirements: "",
    },
  };

  const handleFirstFormSubmit = async () => {
    setLoading(true);
    const formData = new FormData();

    const jobFile = jobFileRef.current.files[0];

    if (jobFile) formData.append("file", jobFile);

    try {
      const res = await fetch(
        `http://localhost:4433/job/input?fileName=${encodeURIComponent(
          jobFileName
        )}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error(`업로드 실패: ${res.status}`);

      const data = await res.json();
      console.log("업로드 성공:", data);

      if (data) {
        setLoading(false);
      }

      setNextPage((prevNextPage) => prevNextPage + 1);
      setJobId(data.company_information.id);
      document.getElementById("companyName").value =
        data.company_information.company_name;
      document.getElementById("companyYear").value =
        data.company_information.year;
      document.getElementById("companyWork").value =
        data.company_information.business_type;
      document.getElementById("companyMainWork").value =
        data.company_information.main_business;
      document.getElementById("companyEmployees").value =
        data.company_information.employee_count;
      document.getElementById("companyWebsite").value =
        data.company_information.website;
      document.getElementById("companyAddress").value =
        data.company_information.address;
      document.getElementById("jobTitleInput").value =
        data.job_information.job_title;
      document.getElementById("recruitmentNumberInput").value =
        data.job_information.recruitment_count;
      document.getElementById("jobDescriptionInput").value =
        data.job_information.job_description;
      document.getElementById("jobRequirementsInput").value =
        data.job_information.qualifications;
      document.getElementById("jobWorkingHoursInput").value =
        data.job_information.working_hours;
      document.getElementById("jobTypeInput").value =
        data.job_information.work_type;
      document.getElementById("internshipAllowanceInput").value =
        data.job_information.internship_pay;
      document.getElementById("salaryInput").value =
        data.job_information.salary;
      document.getElementById("otherRequirementsInput").value =
        data.job_information.additional_requirements;
    } catch (err) {
      console.error("업로드 에러:", err);
      alert("업로드 중 오류가 발생했습니다.");
    }
  };

  const handleUploadCompany = async () => {
    updatePayload.company_information.company_name =
      document.getElementById("companyName").value;
    updatePayload.company_information.year =
      document.getElementById("companyYear").value;
    updatePayload.company_information.business_type =
      document.getElementById("companyWork").value;
    updatePayload.company_information.employee_count =
      document.getElementById("companyEmployees").value;
    updatePayload.company_information.main_business =
      document.getElementById("companyMainWork").value;
    updatePayload.company_information.website =
      document.getElementById("companyWebsite").value;
    updatePayload.company_information.address =
      document.getElementById("companyAddress").value;
    updatePayload.company_information.deadline =
      document.getElementById("UploadDeadLine").value;
    updatePayload.job_information.job_title =
      document.getElementById("jobTitleInput").value;
    updatePayload.job_information.recruitment_count = document.getElementById(
      "recruitmentNumberInput"
    ).value;
    updatePayload.job_information.job_description = document.getElementById(
      "jobDescriptionInput"
    ).value;
    updatePayload.job_information.qualifications = document.getElementById(
      "jobRequirementsInput"
    ).value;
    updatePayload.job_information.working_hours = document.getElementById(
      "jobWorkingHoursInput"
    ).value;
    updatePayload.job_information.work_type =
      document.getElementById("jobTypeInput").value;
    updatePayload.job_information.internship_pay = document.getElementById(
      "internshipAllowanceInput"
    ).value;
    updatePayload.job_information.salary =
      document.getElementById("salaryInput").value;
    updatePayload.job_information.additional_requirements =
      document.getElementById("otherRequirementsInput").value;

    console.log("업데이트할 데이터:", updatePayload);
    try {
      const res = await fetch(`http://localhost:4433/job/input/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", // ✅ 중요!!
        },
        body: JSON.stringify(updatePayload),
      });

      if (!res.ok) throw new Error(`업로드 실패: ${res.status}`);

      const data = await res.json();

      navigate("/jobinfor"); // 업로드 성공 후 페이지 이동
    } catch (err) {
      console.error("업로드 에러:", err);
      alert("업로드 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <JobUplaodForm>
        {loading && (
          <LoadingWrap>
            <div className="loader"></div>
          </LoadingWrap>
        )}
        <FormHeader>
          <div>
            <img src="../src/assets/images/world.svg" alt="지구본" />
            <div>채용의뢰서 등록</div>
          </div>
          <div>기업으로부터 받은 채용 의뢰서와 관련 서류를 업로드하세요.</div>
        </FormHeader>
        <FormWrap $index={nextPage + 1}>
          <JobUploadFileForm>
            <div>
              <SectionTitle>기본정보</SectionTitle>
              <div>
                <div>
                  <InputLabel htmlFor="UploadDeadLine">지원마감일</InputLabel>
                  <InputWrap>
                    <input type="date" id="UploadDeadLine" />
                  </InputWrap>
                </div>
              </div>
            </div>

            <div>
              <div>
                <img
                  src="../src/assets/images/fileUpload.svg"
                  alt="파일 업로드"
                />
                <SectionTitle>관련 서류 업로드</SectionTitle>
              </div>
              <div>
                <div>
                  <InputLabel>채용의뢰서</InputLabel>
                  <input
                    type="file"
                    id="jobFile"
                    ref={jobFileRef}
                    onChange={handleJobFileChange}
                    accept=".pdf"
                  />
                  <label
                    htmlFor="jobFile"
                    style={{
                      border: `${jobFileName && "2px solid blue"}`,
                    }}
                  >
                    <img
                      src="../src/assets/images/fileUpload.svg"
                      alt="파일 업로드"
                      style={{
                        filter: jobFileName
                          ? "invert(34%) sepia(98%) saturate(1067%) hue-rotate(201deg) brightness(90%) contrast(100%)"
                          : "none",
                      }}
                    />

                    <div style={{ textAlign: "center" }}>
                      {jobFileName ? (
                        <div style={{ color: "blue", fontWeight: "bold" }}>
                          선택한 파일: {jobFileName}
                        </div>
                      ) : (
                        <>
                          PDF파일을 업로드하세요 <br />
                          최대 10MB
                        </>
                      )}
                    </div>
                  </label>
                </div>
              </div>
              <div
                style={{ color: "red", fontWeight: "bold", fontSize: "18px" }}
              >
                AI 분석 결과는 참고용이며, 정확하지 않은 정보일 수 있습니다.
                중요한 정보는 반드시 직접 확인해주세요.
              </div>
            </div>
          </JobUploadFileForm>
          <JobUploadCompanyForm>
            <SectionTitle>기업 기본 정보</SectionTitle>
            <div>
              <div>
                <InputLabel htmlFor="companyName">회사명</InputLabel>
                <InputWrap>
                  <input type="text" id="companyName" />
                </InputWrap>
              </div>
              <div>
                <InputLabel htmlFor="companyYear">설립연도</InputLabel>
                <InputWrap>
                  <input type="text" id="companyYear" />
                </InputWrap>
              </div>
              <div>
                <InputLabel htmlFor="companyWork">업태</InputLabel>
                <InputWrap>
                  <input type="text" id="companyWork" />
                </InputWrap>
              </div>
              <div>
                <InputLabel htmlFor="companyEmployees">직원수</InputLabel>
                <InputWrap>
                  <input type="text" id="companyEmployees" />
                </InputWrap>
              </div>
            </div>
            <div>
              <div>
                <InputLabel htmlFor="companyMainWork">
                  주요 사업 내용
                </InputLabel>
                <InputWrap>
                  <input type="text" id="companyMainWork" />
                </InputWrap>
              </div>
              <div>
                <InputLabel $essentialState={true} htmlFor="companyWebsite">
                  홈페이지
                </InputLabel>
                <InputWrap>
                  <input type="text" id="companyWebsite" />
                </InputWrap>
              </div>
            </div>
            <div>
              <InputLabel htmlFor="companyAddress">소재지</InputLabel>
              <InputWrap>
                <input type="text" id="companyAddress" />
              </InputWrap>
            </div>
          </JobUploadCompanyForm>
          <JobUploadCompanyDetailForm>
            <SectionTitle>채용 정보</SectionTitle>
            <div>
              <div>
                <InputLabel htmlFor="jobTitleInput">모집 직종</InputLabel>
                <InputWrap>
                  <input type="text" id="jobTitleInput" />
                </InputWrap>
              </div>
              <div>
                <InputLabel htmlFor="recruitmentNumberInput">
                  모집 인원
                </InputLabel>
                <InputWrap>
                  <input type="text" id="recruitmentNumberInput" />
                </InputWrap>
              </div>
            </div>
            <div>
              <InputLabel htmlFor="jobDescriptionInput">
                직무 내용(구체적)
              </InputLabel>
              <TextareaWrap>
                <textarea id="jobDescriptionInput"></textarea>
              </TextareaWrap>
            </div>
            <div>
              <div>
                <InputLabel htmlFor="jobRequirementsInput">
                  자격요건(우대자격)
                </InputLabel>
                <TextareaWrap>
                  <textarea id="jobRequirementsInput"></textarea>
                </TextareaWrap>
              </div>
              <div>
                <InputLabel htmlFor="jobWorkingHoursInput">
                  근무 시간
                </InputLabel>
                <TextareaWrap>
                  <textarea id="jobWorkingHoursInput"></textarea>
                </TextareaWrap>
              </div>
            </div>
            <div>
              <div>
                <InputLabel htmlFor="jobTypeInput">근무형태</InputLabel>
                <InputWrap>
                  <input type="text" id="jobTypeInput" />
                </InputWrap>
              </div>
            </div>

            <div>
              <div>
                <InputLabel htmlFor="internshipAllowanceInput">
                  실습 수당(현장실습)
                </InputLabel>
                <InputWrap>
                  <input type="text" id="internshipAllowanceInput" />
                </InputWrap>
              </div>
              <div>
                <InputLabel htmlFor="salaryInput">
                  급여 (정규직 채용 시)
                </InputLabel>
                <InputWrap>
                  <input type="text" id="salaryInput" />
                </InputWrap>
              </div>
            </div>
            <div>
              <InputLabel htmlFor="otherRequirementsInput">
                기타 요구 사항
              </InputLabel>
              <InputWrap>
                <input type="text" id="otherRequirementsInput" />
              </InputWrap>
            </div>
          </JobUploadCompanyDetailForm>
        </FormWrap>
        <ButtonWrap>
          <SubmitButton
            clickEvent={handlebeforePage}
            BackColor={"white"}
            TextColor={"#6c6c6c"}
            TextSize={"16px"}
            Text={"이전"}
          />
          <SubmitButton
            clickEvent={handleNextPage}
            BackColor={"#3449b4"}
            TextColor={"white"}
            TextSize={"16px"}
            Text={nextPage == 2 ? "등록" : "다음"}
          />
        </ButtonWrap>
        <StepBar $index={nextPage + 1}>
          <div></div>
        </StepBar>
      </JobUplaodForm>
    </>
  );
};

const LoadingWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;

  background-color: rgba(171, 171, 171, 0.571);
  display: flex;
  justify-content: center;
  align-items: center;

  .loader {
    position: relative;
    height: 80px;
    aspect-ratio: 1;
    padding: 10px;
    border-radius: 50%;
    box-sizing: border-box;

    mask: conic-gradient(#000 0 0) content-box exclude, conic-gradient(#000 0 0);

    filter: blur(12px);
  }

  .loader::before {
    content: "";
    position: absolute;
    inset: 0;

    background: repeating-conic-gradient(#0000 0% 5%, #3478f6, #0000 20% 50%);

    animation: spin 1.5s linear infinite;
  }

  @keyframes spin {
    to {
      rotate: 1turn;
    }
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  gap: 10px;
  justify-content: end;
  width: 100%;
  margin-top: 20px;
  & > div {
    font-weight: 400;
    font-size: 24px;
    width: 15%;
  }
`;

const JobUplaodForm = styled.div`
  color: black;
  /* width: 100%; */
  margin: 0px 200px !important;
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  gap: 20px;
  @media screen and (max-width: 1000px) {
    & {
      margin: 0px 20px !important;
    }
  }
`;

const StepBar = styled.span`
  width: 100%;
  height: 15px;
  position: absolute;
  top: 0%;
  left: 0%;
  z-index: 100;
  background-color: #c2c2c27e;
  /* 게이지바 */
  & > div {
    transform: translateX(-5%);
    transition: all 0.5s ease-in-out;
    height: 100%;
    width: ${(props) => props.$index * 36}%;
    background-color: #6dba69;
    border-radius: 100px;
  }
`;

const FormHeader = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  flex-direction: column;
  gap: 10px;

  & > div:nth-child(1) {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    gap: 10px;
    & > div {
      font-weight: bold;
    }
  }
  & > div:nth-child(2) {
    font-size: 16px;
    color: #6c6c6c;
    font-weight: 500;
  }
`;

const InputWrap = styled.div`
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  background-color: white;
  & > input {
    border: none;
    outline: none;
    background-color: white;
    width: 100%;
  }

  /* 자식 input이 disabled일 때 부모(InputWrap)의 배경색 변경 */
  & > input:disabled {
    background-color: #f0f0f0; /* input 자체 배경색 */
  }

  &:has(> input:disabled) {
    background-color: #f0f0f0; /* InputWrap 배경색도 변경 */
  }
`;

const TextareaWrap = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  border: 1px solid #cccccc;
  background-color: white;
  width: 100%;
  & > textarea {
    resize: none;
    width: 100%;
    outline: none;
    border: none;
  }
`;

const FormWrap = styled.div`
  position: relative;
  width: 100%;
  min-height: 300px; /* 폼이 사라질 때 높이 유지용 */

  & > div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    transition: opacity 0.4s ease-in-out, transform 0.4s ease-in-out;
    opacity: 0;
    pointer-events: none;
    transform: translateY(20px);
  }

  & > div:nth-child(${(props) => props.$index}) {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
    position: relative;
  }
`;

const SectionTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const InputLabel = styled.label`
  font-size: 16px;
  color: #505050;
  position: relative;

  &::after {
    display: ${(props) => (props.$essentialState ? "none" : "block")};
    position: absolute;
    top: 0px;
    right: 0px;
    transform: translateX(110%) translateY(-20%);
    content: "*";
    color: red;
  }
`;

const JobUploadFileForm = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  & > div:nth-child(1) {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    gap: 20px;
    & > div:nth-child(2) {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
      width: 50%;

      & > div {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: start;
        flex-direction: column;
        gap: 5px;
      }
      & > div > input {
        width: 100%;
        border-radius: 10px;
        border: 1px solid #cccccc;
        font-size: 20px;
        /* padding: 10px; */
        outline: none;
      }
    }
  }

  & > div:nth-child(2) {
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    & > div:nth-child(1) {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }
    & > div:nth-child(2) {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      gap: 20px;
      & > div {
        display: flex;
        justify-content: center;
        align-items: start;
        flex-direction: column;
        width: 100%;
        gap: 5px;
        & > label:nth-child(3) {
          cursor: pointer;
          width: 50%;
          /* background-color: #cccccc; */
          aspect-ratio: 8 / 2;
          border: 3px dashed #a1a1a1;
          border-radius: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          gap: 10px;
          color: #a1a1a1;
          & > img {
            width: 25px;
          }
        }

        input[type="file"] {
          position: absolute;
          width: 0;
          height: 0;
          padding: 0;
          overflow: hidden;
          border: 0;
        }
      }
    }
  }

  & > div:nth-child(3) {
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    gap: 20px;

    & > div:nth-child(n + 2) {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      & > label {
        &:hover {
          cursor: pointer;
        }
      }
      & > label:nth-child(2) {
        width: 25px;
        height: 25px;
        border: 1px solid #cccccc;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        overflow: hidden;
      }
      input[type="checkbox"] {
        display: none;
      }

      input:checked + label::before {
        content: "✓";
        background-color: black;
        color: white;
        font-size: 20px;
        width: 100%;
        height: 100%;
        text-align: center;
      }
    }
  }
`;

const JobUploadCompanyForm = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  /* background-color: aliceblue; */
  & label {
    color: #242424;
    font-weight: 500;
    font-size: 18px;
  }

  & > div:nth-child(2) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 20px;
    & > div {
      display: flex;
      justify-content: center;
      align-items: start;
      flex-direction: column;
      gap: 5px;
      width: 100%;
    }
    & > div:nth-child(even) {
      width: 30%;
    }
  }
  & > div:nth-child(3) {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 100%;
    & > div {
      display: flex;
      justify-content: center;
      align-items: start;
      flex-direction: column;
      gap: 5px;
    }
    & > div:nth-child(1) {
      width: 60%;
    }

    & > div:nth-child(2) {
      width: 40%;
    }
  }

  & > div:nth-child(4) {
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    width: 100%;
    gap: 5px;
  }
`;

const JobUploadCompanyDetailForm = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: start;
  flex-direction: column;
  gap: 10px;
  & > div:nth-child(2) {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;
    & > div {
      display: flex;
      justify-content: start;
      align-items: start;
      flex-direction: column;
      gap: 5px;
    }
    & > div:nth-child(1) {
      width: 100%;
    }
    & > div:nth-child(2) {
      width: 30%;
    }
  }
  & > div:nth-child(3) {
    display: flex;
    justify-content: start;
    align-items: start;
    flex-direction: column;
    width: 100%;
    gap: 5px;
  }
  & > div:nth-child(4) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 50px;
    & > div {
      display: flex;
      justify-content: start;
      align-items: start;
      flex-direction: column;
      gap: 5px;
      width: 100%;
    }
    & > div:nth-child(2) {
      width: 40%;
    }
  }
  & > div:nth-child(5) {
    display: flex;
    justify-content: center;
    align-items: center;
    /* flex-direction: column; */
    gap: 10px;
    width: 100%;
    & > div {
      display: flex;
      justify-content: start;
      align-items: start;
      flex-direction: column;
      gap: 5px;
      width: 100%;
    }
    & > div:nth-child(1) {
      & > div:nth-child(2) {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
      }
    }
    & > div:nth-child(2) {
      width: 30%;
    }
  }

  & > div:nth-child(6) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 20px;
    & > div {
      width: 100%;
      display: flex;
      justify-content: start;
      align-items: start;
      flex-direction: column;
      gap: 5px;
    }
  }

  & > div:nth-child(7) {
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: start;
    flex-direction: column;
    gap: 5px;
  }
`;
export default JobUploadLayout;
