import { StatusCodes } from 'http-status-codes';
import { bodyToReview } from '../dtos/reviewDto';
import { addReview } from '../repositories/addReview';

export const hanldeAddReview = async (req, res, next) => {
  try {
    console.log("리뷰 추가 요청");
    console.log("body: ", req.body);

    const review = await addReview(req.params.shopId, bodyToReview(req.body));

    res.status(StatusCodes.CREATED).json({ result: review });
  } catch (error) {
    console.error("리뷰 추가 중 오류 발생: ", error);
    res.status(StatusCode.BAD_REQUEST).json({ message: error.message });
  }
};