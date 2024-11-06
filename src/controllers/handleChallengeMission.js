import { StatusCodes } from "http-status-codes";
import { challengMission } from "../services/mission.services.js";

export const handleChallengeMission = async (req, res, next) => {
  try {
    const { shopId, missionId } = req.params;
    const { userId } = req.body;

    // 미션 도전
    const missionChallenge = await handleChallengeMission(shopId, missionId, userId);

    if (!missionChallenge) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "이미 도전 중인 미션"});
    }

    return res.status(StatusCodes.CREATED).json({ missionChallenge });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "서버 오류"});
  }
};