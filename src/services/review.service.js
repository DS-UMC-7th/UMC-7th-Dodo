export const getReviewsByUserId = async (userId) => {
  // repository에서 리뷰 목록 조회
  const reviews = await getReviewByShopIdFromRepository(userId);

  return ResponseFromReviews(reviews);
};
