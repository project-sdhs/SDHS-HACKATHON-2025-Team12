import { useEffect, useRef } from "react";

const KakaoMapMini = ({ address }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) {
      console.error("Kakao Map API가 로드되지 않았습니다.");
      return;
    }

    // 1. 지도를 표시할 div
    const container = mapRef.current;

    // 2. 지도 생성 (임시 기본 좌표, 나중에 주소 좌표로 변경)
    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 서울 중심 좌표 기본값
      level: 3, // 지도 확대 레벨
    };
    const map = new window.kakao.maps.Map(container, options);

    // 3. 주소 -> 좌표 변환 객체 생성
    const geocoder = new window.kakao.maps.services.Geocoder();

    // 4. 주소로 좌표 검색
    geocoder.addressSearch(address, function (result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

        // 지도 중심을 변환된 좌표로 이동
        map.setCenter(coords);

        // 마커 생성 및 지도에 표시
        const marker = new window.kakao.maps.Marker({
          map: map,
          position: coords,
        });
      } else {
        console.error("주소 변환 실패:", status);
      }
    });
  }, [address]);

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "300px", borderRadius: "10px" }}
    ></div>
  );
};

export default KakaoMapMini;