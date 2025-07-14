import { useEffect, useState, useRef } from "react";
import styled from "styled-components";

const { kakao } = window;

const KakaoMap = ({ onSelectCompany, placePositions }) => {
  const [companyList, setCompanyList] = useState([]);
  const mapRef = useRef(null); // 지도 객체 저장용

  useEffect(() => {
    fetch("http://localhost:4433/job/company/employed")
      .then((res) => res.json())
      .then((data) => setCompanyList(data))
      .catch((err) => {
        console.error("회사 정보 가져오기 실패:", err);
        setCompanyList([]);
      });
  }, []);

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(37.538917, 126.990532), // 디지텍 위치 기본값
      level: 8,
    };

    if (!mapRef.current) {
      mapRef.current = new kakao.maps.Map(container, options);
    }
    const map = mapRef.current;
    const geocoder = new kakao.maps.services.Geocoder();

    // 기본 마커 
    const defaultMarker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(37.538917, 126.990532),
    });
    defaultMarker.companyId = "default";
    kakao.maps.event.addListener(defaultMarker, "click", () => {
      if (onSelectCompany) onSelectCompany(null);
      map.setLevel(3);
      map.setCenter(defaultMarker.getPosition());
    });

    // 회사 마커 생성
    companyList.forEach((companyWrapper) => {
      const address = companyWrapper.company?.address;
      if (!address) {
        console.warn(`주소 없음: company_id=${companyWrapper.company_id}`);
        return;
      }

      geocoder.addressSearch(address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          const marker = new kakao.maps.Marker({
            map: map,
            position: coords,
          });

          marker.companyId = companyWrapper.company_id;

          kakao.maps.event.addListener(marker, "click", () => {
            if (onSelectCompany) onSelectCompany(marker.companyId);
            map.setLevel(3);
            map.setCenter(marker.getPosition());
          });
        } else {
          console.warn(`주소 변환 실패: ${address}`);
        }
      });
    });

    if (window.placeMarkers) {
      window.placeMarkers.forEach((marker) => marker.setMap(null));
    }
    window.placeMarkers = [];

    const iconInfo = {
      subway: {
        url: "https://cdn-icons-png.flaticon.com/512/67/67347.png",
        size: new kakao.maps.Size(24, 24),
        options: { offset: new kakao.maps.Point(12, 12) },
      },
      convenience: {
        url: "https://cdn-icons-png.flaticon.com/512/891/891462.png",
        size: new kakao.maps.Size(24, 24),
        options: { offset: new kakao.maps.Point(12, 12) },
      },
      restaurant: {
        url: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
        size: new kakao.maps.Size(24, 24),
        options: { offset: new kakao.maps.Point(12, 12) },
      },
    };

    const typeNameMap = {
      subway: "지하철",
      convenience: "편의점",
      restaurant: "음식점",
    };

    // 장소 마커 생성
    if (placePositions && placePositions.length > 0) {
      placePositions.forEach((pos) => {
        const imageInfo = iconInfo[pos.type] || iconInfo.편의점;
        const markerImage = new kakao.maps.MarkerImage(
          imageInfo.url,
          imageInfo.size,
          imageInfo.options
        );

        const marker = new kakao.maps.Marker({
          map,
          position: new kakao.maps.LatLng(pos.lat, pos.lng),
          image: markerImage,
        });

        kakao.maps.event.addListener(marker, "click", () => {
          alert(`${typeNameMap[pos.type] || pos.type} - ${pos.name}`);
        });

        window.placeMarkers.push(marker);
      });
    }

    return () => {
      if (window.placeMarkers) {
        window.placeMarkers.forEach((marker) => marker.setMap(null));
      }
      window.placeMarkers = [];
    };
  }, [companyList, onSelectCompany, placePositions]);

  return <Wrap id="map" />;
};

const Wrap = styled.div`
  width: 100%;
  height: 400px;
  background-color: lightgray;
  border-radius: 10px;
`;

export default KakaoMap;
