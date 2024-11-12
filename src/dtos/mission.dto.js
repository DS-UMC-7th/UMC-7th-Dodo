export const missionResponseDto = (mission) => ({
  id: mission.id,
  title: mission.title,
  description: mission.description,
  shopId: mission.shopId,
  points: mission.points,
  status: mission.status,
  shopName: mission.shop.name,
});

// 미션 목록 반환 (개별 DTO로 변환)
export const responseFromMissions = (missions) => {
  return missions.map(mission => missionResponseDto(mission));
};
