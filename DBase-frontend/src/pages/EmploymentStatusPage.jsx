import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import KakaoMap from "../layouts/KakaoMap";
import CompanyInfor from "../components/CompanyInfor";
import {
  SectionItemWrap,
  SectionSmallTtile,
  SectionTitle,
} from "../style/SectionLayoutStyle";
import EmployeeItem from "../components/EmployeeItem";
import HeroAnimation from "../components/HeroAnimation";
import AcountButton from "../components/AcountButton";

const EmploymentStatusPage = ({ LoginState }) => {
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [placeCounts, setPlaceCounts] = useState({
    subway: 0,
    convenience: 0,
    restaurant: 0,
  });
  const [employees, setEmployees] = useState([]); // 재직자 목록 상태 추가

  // 주변 장소 위치 정보 배열
  // {lat, lng, type, name}
  const [placePositions, setPlacePositions] = useState([]);

  useEffect(() => {
    if (!selectedCompanyId) {
      setSelectedCompany(null);
      setPlaceCounts({ subway: 0, convenience: 0, restaurant: 0 });
      setPlacePositions([]);
      setEmployees([]); // 회사 선택 해제 시 재직자 목록도 초기화
      return;
    }

    axios
      .get(`http://localhost:4433/job/company?id=${selectedCompanyId}`)
      .then((res) => {
        setSelectedCompany(res.data);
      })
      .catch((err) => {
        console.error("선택된 회사 정보 가져오기 실패:", err);
        setSelectedCompany(null);
        setPlacePositions([]);
      });

    // 회사별 재직자 목록 fetch
    axios
      .get(`http://localhost:4433/employee/list?companyId=${selectedCompanyId}`)
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((err) => {
        console.error("재직자 목록 가져오기 실패:", err);
        setEmployees([]);
      });
  }, [selectedCompanyId]);

  useEffect(() => {
    if (!selectedCompany?.address) {
      setPlaceCounts({ subway: 0, convenience: 0, restaurant: 0 });
      setPlacePositions([]);
      return;
    }

    const geocoder = new window.kakao.maps.services.Geocoder();
    const places = new window.kakao.maps.services.Places();

    geocoder.addressSearch(selectedCompany.address, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const { x, y } = result[0];
        const location = new window.kakao.maps.LatLng(y, x);

        // 주변 장소 개수와 위치 검색 함수
        const searchPlaceCount = (keyword, key) => {
          const options = {
            location,
            radius: 300, // 300m 반경 내 검색
            size: 15,
          };

          places.keywordSearch(
            keyword,
            (data, status) => {
              if (status === window.kakao.maps.services.Status.OK) {
                // 개수 상태 업데이트
                setPlaceCounts((prev) => ({ ...prev, [key]: data.length }));

                // 위치 정보도 업데이트 (기존 타입 데이터 제거 후 새로 추가)
                setPlacePositions((prev) => {
                  const filtered = prev.filter((item) => item.type !== key);
                  const newPlaces = data.map((place) => ({
                    lat: place.y,
                    lng: place.x,
                    type: key,
                    name: place.place_name,
                  }));
                  return [...filtered, ...newPlaces];
                });
              } else {
                setPlaceCounts((prev) => ({ ...prev, [key]: 0 }));
                setPlacePositions((prev) =>
                  prev.filter((item) => item.type !== key)
                );
              }
            },
            options
          );
        };

        // 키워드별 검색 실행
        searchPlaceCount("지하철역", "subway");
        searchPlaceCount("편의점", "convenience");
        searchPlaceCount("음식점", "restaurant");
      } else {
        setPlaceCounts({ subway: 0, convenience: 0, restaurant: 0 });
        setPlacePositions([]);
      }
    });
  }, [selectedCompany]);

  return (
    <>
      <HeroAnimation />

      <Wrap>
        {LoginState ? (
          <>
            <PageinforWrap>
              <PageTitleWrap>
                <PageTitle>취업 현황</PageTitle>
                <PageSubTitle>
                  학생들의 취업 현황을 지도로 확인해보세요
                </PageSubTitle>
              </PageTitleWrap>
            </PageinforWrap>

            <SectionWrap>
              <div>
                <SectionItemWrap>
                  <SectionMapalign>
                    <SectionTitle>취업 현황 지도</SectionTitle>
                    <SectionSmallTtile>
                      학생들이 재직 중인 회사 위치를 확인하세요
                    </SectionSmallTtile>
                    {/* 장소 위치 정보 placePositions 전달 */}
                    <KakaoMap
                      onSelectCompany={setSelectedCompanyId}
                      placePositions={placePositions}
                    />
                  </SectionMapalign>
                </SectionItemWrap>

                <SectionItemWrap>
                  <SectionMenualign>
                    <SectionTitle>선택된 회사 정보</SectionTitle>
                    {selectedCompany ? (
                      <div
                        style={{
                          fontSize: "18px",
                          color: "black",
                          fontWeight: "bold",
                        }}
                      >
                        {selectedCompany.company_name}
                      </div>
                    ) : (
                      <div
                        style={{
                          fontSize: "18px",
                          color: "black",
                          fontWeight: "bold",
                        }}
                      >
                        기업을 선택하세요
                      </div>
                    )}
                    <SectionSmallTtile>
                      {selectedCompany?.address || "-"}
                    </SectionSmallTtile>
                    <MakerMenuWrap>
                      <MakerItem style={{ padding: "20px" }}>
                        지하철
                        <img
                          src="../src/assets/images/subway.svg"
                          alt=""
                          style={{ padding: "10px" }}
                        />
                        <MakerCount>{placeCounts.subway}</MakerCount>
                      </MakerItem>
                      <MakerItem style={{ padding: "20px" }}>
                        편의점
                        <img
                          src="../src/assets/images/convenience.svg"
                          alt=""
                          style={{ padding: "10px" }}
                        />
                        <MakerCount>{placeCounts.convenience}</MakerCount>
                      </MakerItem>
                      <MakerItem style={{ padding: "20px" }}>
                        음식점
                        <img
                          src="../src/assets/images/restaurant.svg"
                          alt=""
                          style={{ padding: "10px" }}
                        />
                        <MakerCount>{placeCounts.restaurant}</MakerCount>
                      </MakerItem>
                    </MakerMenuWrap>
                  </SectionMenualign>
                </SectionItemWrap>
              </div>

              <div>
                <CompanyInfor companyId={selectedCompanyId} />

                <SectionItemWrap>
                  <SectionTitle style={{ marginBottom: "5px" }}>
                    재직자
                  </SectionTitle>
                  <SectionSmallTtile style={{ marginBottom: "20px" }}>
                    {selectedCompany?.company_name || "기업명"}
                  </SectionSmallTtile>
                  <EmployeeWrap>
                    {employees.length === 0 ? (
                      <div style={{ color: "black", fontSize: "16px" }}>
                        재직자 정보가 없습니다.
                      </div>
                    ) : (
                      employees.map((emp, idx) => (
                        <EmployeeItem
                          key={emp.user_id || idx}
                          name={emp.name}
                          work_start_date={emp.work_start_date}
                          work_end_date={emp.work_end_date}
                          skills={emp.skills}
                        />
                      ))
                    )}
                  </EmployeeWrap>
                </SectionItemWrap>
              </div>
            </SectionWrap>
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

// 🔽 Styled Components
const Wrap = styled.div`
  width: 100%;
  background: linear-gradient(
    to bottom,
    #0e0219 0%,
    rgb(52, 18, 80) 20%,
    #3e1a5c 25%,
    #5c258c 60%,
    #aa49ff 100%
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

const SectionWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  gap: 50px;

  & > div {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  & > div:nth-child(1) {
    width: 70%;
  }

  & > div:nth-child(2) {
    width: 30%;
  }
`;

const SectionMapalign = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  flex-direction: column;
  gap: 10px;
`;

const SectionMenualign = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  flex-direction: column;
  gap: 10px;
`;

const MakerMenuWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

const MakerItem = styled.div`
  background-color: #f0f0f0;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 33%;
  aspect-ratio: 16 / 5;
  color: black;
`;

const MakerCount = styled.div`
  margin-top: 4px;
  font-weight: bold;
  color: #3e8eff;
  font-size: 18px;
`;

const EmployeeWrap = styled.div`
  overflow-y: auto;
  padding-right: 20px;

  &::-webkit-scrollbar {
    display: block;
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #e0e0e0;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export default EmploymentStatusPage;
