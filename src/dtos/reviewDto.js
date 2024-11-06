export const bodyToReview = (body) => {
  if (!body.shopId || !body.userId || !body.rating) {
    throw new Error("shopId, userId, rating are required");
  }

  return {
    shopId: body.shopId,
    userId: body.userId,
    rating: body.rating,
    comment: body.comment || "",
  };
};