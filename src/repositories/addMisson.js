import { pool } from "../db.config";

export const addMission = async (shopId, { description, status, points }) => {
  const conn = await pool.getConnection();

  try {
    const [result] = await conn.query(
      `INSERT INTO missions (shopId, description, status, points) VALUES (?, ?, ?, ?)`,
      [shopId, description, status, points]
    );

    return {
      id: result.insertId, // 추가된 미션 id
      shopId,
      description,
      status,
      points,
    };
  } catch (error) {
    console.error(error);
    throw new Error("미션 추가 실패");
  } finally {
    conn.release();
  }
}