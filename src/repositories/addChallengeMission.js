export const addMissionToUser = async (userId, missionId, shopId) => {
  const conn = await pool.getConnection();

  try {
    const [result] = await conn.query(
      `INSERT INTO user_mission (userId, missionId, shopId, status, start_date)
      VALUES (?, ?, ?, ?, ?)`,
      [userid, missionId, shopId, 'challenging', new Date()]
    );

    return {
      id: result.insertId,
      userId,
      missionId,
      shopId,
      status: 'challenging',
      startDate: new Date(),
    };
  } catch (error) {
    console.error(error);
    throw new Error("미션 도전 추가 실패");
  } finally {
    conn.release();
  }
};