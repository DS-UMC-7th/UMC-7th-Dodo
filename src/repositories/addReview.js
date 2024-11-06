import { pool } from "../db.config.js";

// 가게 -> 리뷰 추가
export const addReview = async (shopId, reviewData) => {
  const conn = await pool.getConnection();

  try {
    // 가게 존재 여부 확인
    const [shopExists] = await conn.query(
      `SELECT EXISTS(SELECT 1 FROM shop WHERE id = ?) as isExistShop;`,
      [shopId]
    );

    if (!shopExists[0].isExistShop) {
      return null; // 가게 존재 X
    }

    // 가게 리뷰 추가
    const [result] = await conn.query(
      `INSERT INTO review (shop_id, user_id, rating, comment, created_at) VALUES (?, ?, ?, ?, NOW());`,
      [shopId, reviewData.userId, reviewData.rating, reveiwData.comment]
    );

    return result.insertId;
  } catch (error) {
    throw new Error(
      `리뷰 추가 중 오류 발생. 요청 파라미터 확인 필요. (${err})`
    );
  } finally {
    conn.release();
  }
};

export const getReviewById = async (reviewId) => {
  const conn = await pool.getConnection();

  try {
    const [review] = await conn.query(`SELECT * FROM review WHERE id = ?;`, [
      reviewId,
    ]);

    return review.length ? review[0] : null;
  } finally {
    conn.release();
  }
};