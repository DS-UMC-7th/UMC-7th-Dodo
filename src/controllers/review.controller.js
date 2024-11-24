import { getReviewsByUserId } from "../services/review.service.js";

export const handleGetReviewsByUserId = async (req, res, next) => {
  console.log("나의 리뷰 목록을 조회했습니다.")
  
  try {
    const { userId } = req.params;
    const reviews = await getReviewsByUserId(userId);
  
    /*
    # swagger.summary = '내 리뷰 목록 조회 API';
    # swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              userId: { type: "int" },
              reviewId: { type: "int" },
              title: { type: "string" },
              description: { type: "string" },
              rating: { type: "int" },
              storeId: { type: "int" },        
            }
          }
        }
      }
    };

    #swagger.respone[200] = {
      description: "진행 중인 미션 목록 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  userId: { type: "int" },
                  reviewId: { type: "int" },
                  title: { type: "string" },
                  description: { type: "string" },
                  rating: { type: "int" },
                  storeId: { type: "int" },  
                }
              }
            }
          }
        }
      }
    };

        #swagger.respone[400] = {
      description: "진행 중인 미션 목록 조회 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  userId: { type: "int" },
                  reviewId: { type: "int" },
                  title: { type: "string" },
                  description: { type: "string" },
                  rating: { type: "int" },
                  storeId: { type: "int" },  
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
    */

    res.status(200).success(reviews);
  } catch (error) {
    next(error);
  }
};