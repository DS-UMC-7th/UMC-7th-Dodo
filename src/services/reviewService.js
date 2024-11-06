import { addReview } from '../repositories/addReview';

export const reviewService = async (shopId, reviewData) => {
  const reviewId = await addReview(shopId, reviewData);

  if (!reviewId) {
    throw new Error('가게가 존재하지 않아 리뷰를 추가할 수 없음');
  }

  return reviewId; // 추가된 리뷰 id 반환
}