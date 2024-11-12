export const handleGetReviewsByUserId = async (req, res, next) => {
  console.log("나의 리뷰 목록을 조회했습니다.")
  
  try {
    const { userId } = req.params;
    const reviews = await getReviewsByUserId(userId);
  
    res.status(200).success(reviews);
  } catch (error) {
    next(error);
  }
};