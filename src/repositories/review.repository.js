import { prisma } from "../db.config.js"

export const getReviewByShopIdFromRepository = async (userId) => {
  return await prisma.review.findMany({
    where: { userId: parseInt(userId) },
    include: {
      mission: true, // 리뷰가 속한 미션 정보
      user: true, // 리뷰 작성 사용자 정보
    },
  });
};