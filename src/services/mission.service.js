import { missionResponseDto, responseFromMissions } from "../dtos/mission.dto.js";
import { getMissionByShopIdFromRepository } from "../repositories/mission.repository.js";

export const getMissionByShopId = async (shopId) => {
  // repository -> 미션 목록 조회
  const missions = await getMissionByShopIdFromRepository(shopId);

  // DTO 변환 -> 반환
  return responseFromMissions(missions);
};

export const getOngoingMission = async () => {
  const missions = await getOngoingMissionFromRepository();
  
  return responseFromMissions(missions);
}