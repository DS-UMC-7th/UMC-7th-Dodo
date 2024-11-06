import { addMission } from "../repositories/addMisson";

export const addMissionToShop = async (shopId, {description, status, points }) => {
  try {
    // repository 미션 추가
    const mission = await addMission(shopId, { description, status, points });

    return mission;
  } catch (error) {
    console.error(error);
    throw new Error("Service 미션 추가 실패");
  }
};