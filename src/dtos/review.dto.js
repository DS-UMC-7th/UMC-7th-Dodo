export const reviewResponseDto = (review) => ({
  id: review.id,
  rating: review.rating,
  content: review.content,
  createdAt: review.createdAt,
  missionTitle: review.mission.title,
  userName: review.user.name,
});

// 리뷰 목록 전체 -> 개별 리뷰
export const responseFromReviews = (reviews) => {
  return reviews.map((review) => reviewResponseDto(review));
};