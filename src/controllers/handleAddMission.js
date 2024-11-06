import { StatusCodes } from "http-status-codes";
import { addMissionToShop } from "../services/missionService";

export const handleAddMission = async (req, res, next) => {
  try {
    const { shopId } = req.params; // 가게 id
    const { description, status, points } = req.body; // 미션 정보

    // 미션 추가
    const mission = await addMissionToShop(shopId, { description, status, points });

    if (!mission) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "미션 추가 실패" });
    }

    return res.status(StatusCodes.CREATED).json({ mission });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "서버 오류" });
  }
}