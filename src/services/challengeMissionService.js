import { pool } from "../db.config";
import { addMissionToShop } from "./missionService";

export const challengeMission = async (shopId, missionId, userId) => {
  const conn = await pool.getConnection();

  try {
    // 미션 도전 여부 확인
    const [existingChallenge] = await conn.query(
      `SELECT * FROM user_mission WHERE userId = ? AND missionId = ? AND status = 'challenging`,
      [userId, missionId]
    );

    // 이미 도전 중이라면
    if (existingChallenge.length > 0) {
      return null;
    }

    const missionChallenge = await addMissionToUser(userId, missionId, shopId);
    
    return missionChallenge;
  } catch (error) {
    console.error(error);
    throw new Error("미션 도전 실패");
  } finally {
    conn.release();
  }
};