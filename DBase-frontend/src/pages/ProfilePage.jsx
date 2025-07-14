import styled from "styled-components";
import {
  SectionItemWrap,
  SectionSmallTtile,
  SectionTitle,
  UserCompanyState,
  UserState,
} from "../style/SectionLayoutStyle";
import ProfileProject from "../components/ProfileProject";
import ProfileActivity from "../components/ProfileActivity";
import ProfileAward from "../components/ProfileAward";
import StackItem from "../components/StackItem";
import SubmitButton from "../components/SubmitButton";
import HeroAnimation from "../components/HeroAnimation";
import AcountButton from "../components/AcountButton";
import { useState } from "react";
import EditModal from "../components/EditModal";
import { useEffect } from "react";

const ProfilePage = ({ LoginState }) => {
  const [isEditStack, setIsEditStack] = useState(false);
  const [isEditProject, setIsEditProject] = useState(false);
  const [isEditActivity, setIsEditActivity] = useState(false);
  const [isEditAward, setIsEditAward] = useState(false);
  const [isEditProfileInfo, setIsEditProfileInfo] = useState(false);
  const [isEditEmploymentInfo, setIsEditEmploymentInfo] = useState(false);
  const [employmentStatus, setEmploymentStatus] = useState(true);
  const [newSkills, setNewSkills] = useState("");
  const [newProject, setNewProject] = useState({
    date: "",
    name: "",
    description: "",
  });

  // Sample profile state
  const [profile, setProfile] = useState({
    affiliation: "서울디지텍고등학교 3학년 3반",
    phone_number: "010-0000-0000",
    address: "서울시 강서구",
    desired_position: "프론트 개발자",
    company_name: "(주)ABC 회사",
    work_start_date: "2023",
    work_end_date: "재직중",
  });

  const [userData, setUserData] = useState({
    user_profile: {
      name: "",
      email: "",
      category: "",
      affiliation: "",
      phone_number: "",
      porfolio_url: "",
      skills: "",
      address: "",
    },
    company: {
      desired_position: "",
      employment_status: "",
      company_name: "", // default: undefined
      work_end_date: "",
      work_start_date: "",
      main_business: "",
    },
    experiences: [],
  });

  useEffect(() => {
    fetch("http://localhost:4433/user/profile/personal", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        setProfile({
          affiliation: data.user_profile.affiliation || "",
          phone_number: data.user_profile.phone_number || "",
          address: data.user_profile.address || "",
          desired_position: data.company.desired_position || "",
          company_name: data.company.company_name || "",
          work_start_date: data.company.work_start_date || "",
          work_end_date: data.company.work_end_date || "",
        });
        setEmploymentStatus(
          data.company.employment_status === "구직중" ? false : true
        );
      })
      .catch((err) => {
        console.error("회사 정보 가져오기 실패:", err);
      });
  }, []);

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const updateUserInfo = async () => {
    const updateData = {
      affiliation: profile.affiliation,
      phone_number: profile.phone_number,
      address: profile.address,
    };

    await fetch("http://localhost:4433/user/profile/update", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json", // ✅ 이게 필요함!
      },
      credentials: "include",
      body: JSON.stringify(updateData),
    });
  };

  const updateUserJobInfo = async () => {
    const updateData = {
      company_name: profile.company_name,
      work_start_date: profile.work_start_date.toString(),
      work_end_date: profile.work_end_date.toString(),
      desired_position: profile.desired_position,
      employment_status: employmentStatus ? "취업 완료" : "구직중",
    };

    await fetch("http://localhost:4433/user/profile/update-status", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json", // ✅ 이게 필요함!
      },
      credentials: "include",
      body: JSON.stringify(updateData),
    });
  };

  const handleAddSkill = async () => {
    if (!newSkills.trim()) return;

    await fetch("http://localhost:4433/user/profile/update-skills", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ skills: newSkills }),
    });

    setNewSkills("");

    location.reload();
  };

  const handleAddProject = async () => {
    if (!newProject.name || !newProject.description) {
      alert("활동명과 내용은 필수입니다.");
      return;
    }

    const response = await fetch(
      "http://localhost:4433/user/profile/update-exp",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...newProject,
          type: "project",
        }),
      }
    );

    const result = await response.json();
    if (result.success) {
      // UI에 추가 반영: userData에 직접 push 하거나 fetch 다시 호출
      setUserData((prev) => ({
        ...prev,
        experiences: [...prev.experiences, { ...newProject, type: "project" }],
      }));
      setNewProject({ date: "", name: "", description: "" });
      setIsEditProject(false);
    } else {
      alert("추가에 실패했습니다.");
    }
  };

  const handleAddExperience = async () => {
    if (!newProject.name || !newProject.description) {
      alert("활동명과 내용은 필수입니다.");
      return;
    }

    const response = await fetch(
      "http://localhost:4433/user/profile/update-exp",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...newProject,
          type: "experience",
        }),
      }
    );

    const result = await response.json();
    if (result.success) {
      // UI에 추가 반영: userData에 직접 push 하거나 fetch 다시 호출
      setUserData((prev) => ({
        ...prev,
        experiences: [
          ...prev.experiences,
          { ...newProject, type: "experience" },
        ],
      }));
      setNewProject({ date: "", name: "", description: "" });
      setIsEditProject(false);
    } else {
      alert("추가에 실패했습니다.");
    }
  };

  const handleAddAward = async () => {
    if (!newProject.name || !newProject.description) {
      alert("활동명과 내용은 필수입니다.");
      return;
    }

    const response = await fetch(
      "http://localhost:4433/user/profile/update-exp",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...newProject,
          type: "award",
        }),
      }
    );

    const result = await response.json();
    if (result.success) {
      // UI에 추가 반영: userData에 직접 push 하거나 fetch 다시 호출
      setUserData((prev) => ({
        ...prev,
        experiences: [...prev.experiences, { ...newProject, type: "award" }],
      }));
      setNewProject({ date: "", name: "", description: "" });
      setIsEditProject(false);
    } else {
      alert("추가에 실패했습니다.");
    }
  };

  return (
    <>
      <HeroAnimation />
      <Wrap>
        {LoginState ? (
          <>
            <PageinforWrap>
              <PageTitleWrap>
                <PageTitle>프로필</PageTitle>
                <PageSubTitle>
                  나의 역량과 경험을 체계적으로 관리하세요
                </PageSubTitle>
              </PageTitleWrap>
            </PageinforWrap>
            <ProfileWrapAlign>
              <div>
                <SectionItemWrap>
                  <SectionTitle style={{ marginBottom: "0px" }}>
                    <EditInputWrap
                      style={{ fontSize: "24px", fontWeight: "bold" }}
                      disabled
                      value={userData.user_profile.name}
                    />
                  </SectionTitle>
                  <SectionSmallTtile>
                    <EditInputWrap
                      style={{ fontSize: "16px", color: "#6c6c6c" }}
                      disabled={!isEditProfileInfo}
                      placeholder="예)3학년 3반"
                      value={profile.affiliation}
                      onChange={(e) => {
                        handleChange("affiliation", e.target.value);
                      }}
                    />
                  </SectionSmallTtile>
                  <div style={{ display: "flex" }}>
                    <UserState $State={"재학"}>
                      {userData.user_profile.category === "student"
                        ? "학생"
                        : "선생님"}
                    </UserState>
                  </div>
                  <SectionSmallTtile style={{ marginBottom: "0px" }}>
                    <EditInputWrap
                      style={{ fontSize: "16px", color: "#6c6c6c" }}
                      disabled
                      value={userData.user_profile.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  </SectionSmallTtile>
                  <SectionSmallTtile style={{ marginBottom: "0px" }}>
                    <EditInputWrap
                      style={{ fontSize: "16px", color: "#6c6c6c" }}
                      disabled={!isEditProfileInfo}
                      placeholder="예)010-0000-0000"
                      value={profile.phone_number}
                      onChange={(e) =>
                        handleChange("phone_number", e.target.value)
                      }
                    />
                  </SectionSmallTtile>
                  <SectionSmallTtile>
                    <EditInputWrap
                      style={{ fontSize: "16px", color: "#6c6c6c" }}
                      disabled={!isEditProfileInfo}
                      placeholder="예)서울시 강서구"
                      value={profile.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                    />
                  </SectionSmallTtile>
                  <SubmitButton
                    TextColor={"#6c6c6c"}
                    Text={isEditProfileInfo ? "저장" : "정보 수정"}
                    clickEvent={() => {
                      if (isEditProfileInfo) updateUserInfo();
                      setIsEditProfileInfo((prev) => !prev);
                    }}
                  />
                </SectionItemWrap>

                <SectionItemWrap>
                  <SectionTitle>취업현황</SectionTitle>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <UserCompanyState
                      $State={employmentStatus}
                      onClick={() =>
                        isEditEmploymentInfo &&
                        setEmploymentStatus((prev) => !prev)
                      }
                    >
                      {employmentStatus ? "취업 완료" : "구직중"}
                    </UserCompanyState>
                  </div>

                  <SectionSmallTtile style={{ marginBottom: "0px" }}>
                    <EditInputWrap
                      style={{ fontSize: "16px", color: "#6c6c6c" }}
                      disabled={!isEditEmploymentInfo}
                      placeholder="예)프론트 개발자"
                      value={profile.desired_position}
                      onChange={(e) =>
                        handleChange("desired_position", e.target.value)
                      }
                    />
                  </SectionSmallTtile>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                      gap: "10px",
                    }}
                  >
                    <SectionSmallTtile style={{ flex: 1 }}>
                      <EditInputWrap
                        style={{ fontSize: "16px", color: "#6c6c6c" }}
                        disabled={!isEditEmploymentInfo}
                        value={profile.company_name}
                        placeholder="(주)ABC 회사"
                        onChange={(e) =>
                          handleChange("company_name", e.target.value)
                        }
                      />
                    </SectionSmallTtile>
                    <div
                      style={{
                        flex: "2",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <SectionSmallTtile style={{ width: "auto" }}>
                        <EditInputWrap
                          style={{
                            fontSize: "16px",
                            color: "#6c6c6c",
                            textAlign: "center",
                          }}
                          disabled={!isEditEmploymentInfo}
                          placeholder="예)2023.03"
                          value={profile.work_start_date}
                          onChange={(e) =>
                            handleChange("work_start_date", e.target.value)
                          }
                        />
                      </SectionSmallTtile>
                      <p style={{ width: "auto", textAlign: "center" }}>~</p>
                      <SectionSmallTtile style={{ width: "auto" }}>
                        <EditInputWrap
                          style={{
                            fontSize: "16px",
                            color: "#6c6c6c",
                            textAlign: "center",
                          }}
                          disabled={!isEditEmploymentInfo}
                          placeholder="예)재직중"
                          value={profile.work_end_date}
                          onChange={(e) =>
                            handleChange("work_end_date", e.target.value)
                          }
                        />
                      </SectionSmallTtile>
                    </div>
                  </div>

                  <SubmitButton
                    TextColor={"#6c6c6c"}
                    Text={isEditEmploymentInfo ? "저장" : "정보 수정"}
                    clickEvent={() => {
                      setIsEditEmploymentInfo((prev) => !prev);
                      if (isEditEmploymentInfo) updateUserJobInfo();
                    }}
                  />
                </SectionItemWrap>
              </div>
              <div>
                <SectionItemWrap>
                  <SubmitButton
                    TextColor={"#6c6c6c"}
                    Text={isEditStack ? "수정" : "편집"}
                    BackColor={"white"}
                    clickEvent={() => {
                      setIsEditStack((prev) => !prev);
                    }}
                  />
                  <SectionTitle>기술 스택</SectionTitle>

                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      flexWrap: "wrap",
                    }}
                  >
                    {userData.user_profile.skills?.trim()
                      ? userData.user_profile.skills
                          .split(",")
                          .map((item, i) => (
                            <StackItem Stack={item.trim()} key={i} />
                          ))
                      : null}
                  </div>

                  {isEditStack && (
                    <EditModal
                      title="기술 스택 편집"
                      onClose={() => setIsEditStack(false)}
                    >
                      <EditInput
                        placeholder="스택 입력"
                        value={newSkills}
                        onChange={(e) => {
                          setNewSkills(e.target.value);
                        }}
                      />
                      <AddButton
                        onClick={() => {
                          handleAddSkill();
                          setIsEditStack(false);
                        }}
                      >
                        추가
                      </AddButton>
                    </EditModal>
                  )}
                </SectionItemWrap>
                <SectionItemWrap>
                  <SubmitButton
                    TextColor={"#6c6c6c"}
                    Text={isEditProject ? "추가" : "편집"}
                    BackColor={"white"}
                    clickEvent={() => setIsEditProject((prev) => !prev)}
                  />
                  <SectionTitle>프로젝트</SectionTitle>
                  {userData.experiences.map((item, i) => {
                    if (item.type === "project") {
                      return (
                        <ProfileProject
                          key={i}
                          ProjectName={item.name}
                          ProjectExplain={item.description}
                          ProjectStacks={item.skills}
                        />
                      );
                    }
                    return null;
                  })}

                  {isEditProject && (
                    <EditModal
                      title="프로젝트 추가"
                      onClose={() => setIsEditProject(false)}
                    >
                      <EditInput
                        placeholder="활동 날짜"
                        value={newProject.date}
                        onChange={(e) =>
                          setNewProject((prev) => ({
                            ...prev,
                            date: e.target.value,
                          }))
                        }
                      />
                      <EditInput
                        placeholder="활동명"
                        value={newProject.name}
                        onChange={(e) =>
                          setNewProject((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                      />
                      <EditInput
                        placeholder="활동 내용"
                        value={newProject.description}
                        onChange={(e) =>
                          setNewProject((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                      />
                      <AddButton onClick={handleAddProject}>추가</AddButton>
                    </EditModal>
                  )}
                </SectionItemWrap>
                <SectionItemWrap>
                  <SubmitButton
                    TextColor={"#6c6c6c"}
                    Text={isEditActivity ? "추가" : "편집"}
                    BackColor={"white"}
                    clickEvent={() => setIsEditActivity((prev) => !prev)}
                  />
                  <SectionTitle>경험 / 활동 / 교육</SectionTitle>
                  {userData.experiences.map((item, i) => {
                    if (item.type === "experience") {
                      return (
                        <ProfileProject
                          key={i}
                          ProjectName={item.name}
                          ProjectExplain={item.description}
                          ProjectStacks={item.skills}
                        />
                      );
                    }
                    return null;
                  })}

                  {isEditActivity && (
                    <EditModal
                      title="활동 내역 추가"
                      onClose={() => setIsEditActivity(false)}
                    >
                      <EditInput
                        placeholder="활동 날짜"
                        value={newProject.date}
                        onChange={(e) =>
                          setNewProject((prev) => ({
                            ...prev,
                            date: e.target.value,
                          }))
                        }
                      />
                      <EditInput
                        placeholder="활동명"
                        value={newProject.name}
                        onChange={(e) =>
                          setNewProject((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                      />
                      <EditInput
                        placeholder="활동 내용"
                        value={newProject.description}
                        onChange={(e) =>
                          setNewProject((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                      />
                      <AddButton onClick={handleAddExperience}>추가</AddButton>
                    </EditModal>
                  )}
                </SectionItemWrap>

                <SectionItemWrap>
                  <SubmitButton
                    TextColor={"#6c6c6c"}
                    Text={isEditAward ? "추가" : "편집"}
                    BackColor={"white"}
                    clickEvent={() => setIsEditAward((prev) => !prev)}
                  />
                  <SectionTitle>자격 / 어학 / 수상</SectionTitle>

                  {userData.experiences.map((item) => {
                    if (item.type === "award") {
                      <ProfileAward
                        AwardDate={item.date}
                        AwardTitle={item.name}
                        AwardInstitution={item.description}
                      />;
                    }
                  })}

                  {isEditAward && (
                    <EditModal
                      title="활동 내역 추가"
                      onClose={() => setIsEditAward(false)}
                    >
                      <EditInput
                        placeholder="수상,취득일"
                        value={newProject.date}
                        onChange={(e) =>
                          setNewProject((prev) => ({
                            ...prev,
                            date: e.target.value,
                          }))
                        }
                      />
                      <EditInput
                        placeholder="자격증,수상 명"
                        value={newProject.name}
                        onChange={(e) =>
                          setNewProject((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                      />
                      <EditInput
                        placeholder="자격증 내용 및 수상 내용"
                        value={newProject.description}
                        onChange={(e) =>
                          setNewProject((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                      />
                      <AddButton onClick={handleAddAward}>추가</AddButton>
                    </EditModal>
                  )}
                </SectionItemWrap>
              </div>
            </ProfileWrapAlign>
          </>
        ) : (
          <div
            style={{
              height: "100vh",
              marginTop: "100px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            로그인 후 이용해주세요.
            <AcountButton
              LinkPath={"http://localhost:4433/auth/google"}
              Label={"구글 계정으로 로그인"}
            />
            <div>@sdh.hs.kr 계정만 사용 가능합니다</div>
          </div>
        )}
      </Wrap>
    </>
  );
};

const EditInputWrap = styled.input`
  &:disabled {
    background-color: white;
    /* border: 1px solid #ccc; */
    color: black;
    outline: none;
    border: none;
    font-weight: 500;
    cursor: default;
  }
  &:enabled {
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    color: black;
    outline: none;
    font-weight: 500;
    border-radius: 10px;
    padding: 5px;
  }

  padding: 5px;
  display: flex;
  align-items: center;
  flex-direction: column;

  width: 100%;
  gap: 10px;
  margin-top: 10px;
  & > input {
    width: 100%;
  }
`;

const EditInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  flex: 1;
`;

const AddButton = styled.button`
  background-color: #3449b4;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #2c3ea2;
  }
`;

const Wrap = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(
    to bottom,
    #001300 0%,
    #072807 25vh,
    #1b3d1b 50vh,
    #3c6b39 75vh,
    #52904f 100vh
  );
  color: white;
  padding-bottom: 100px;

  & > div {
    margin: 0px 200px;
  }

  @media screen and (max-width: 1000px) {
    & > div {
      margin: 0px 20px;
    }
  }
`;

const PageinforWrap = styled.div`
  /* height: 100%; */

  /* background-color: #95a8b93b; */
  margin-top: 100px !important;
  padding: 50px 0px;
`;

const PageTitleWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  gap: 30px;
`;

const PageTitle = styled.div`
  font-size: 60px;
  font-weight: bold;
`;

const PageSubTitle = styled.div`
  font-size: 20px;
`;

const ProfileWrapAlign = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  gap: 50px;
  & > div:nth-child(1) {
    width: 30%;
  }
  & > div:nth-child(2) {
    width: 70%;
    & > div {
      position: relative;
      & > div:nth-child(1) {
        height: auto;
        position: absolute;
        top: 20px;
        right: 20px;
      }
    }
  }
`;

export default ProfilePage;
