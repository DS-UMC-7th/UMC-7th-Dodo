import { missionResponseDto } from "../dtos/mission.dto.js";
import { getMissionByShopId } from "../services/mission.service.js";

export const handleGetMissionByShopId = async (req, res, next) => {
  
  try {
    console.log("특정 가게의 미션 목록을 조회하였습니다.");
    console.log("body: ", req.body);

    const { shopId } = req.params;
    const missions = await getMissionByShopId(shopId);
    
    /*
    # swagger.summary = '특정 가게 미션 목록 조회 API';
    # swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              id: { type: "int" },
              title: { type: "string" },
              description: { type: "string" },
              storeId: { type: "int" },        
            }
          }
        }
      }
    };

    #swagger.respone[200] = {
      description: "특정 가게 미션 목록 조회 성공 응답",
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
                  id: { type: "int" },
                  title: { type: "string" },
                  description: { type: "string" },
                  storeId: { type: "int" } 
                }
              }
            }
          }
        }
      }
    };

        #swagger.respone[400] = {
      description: "특정 가게 미션 목록 조회 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  id: { type: "int" },
                  title: { type: "string" },
                  description: { type: "string" },
                  storeId: { type: "int" } 
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
    */

    res.status(200).success(missionResponseDto); // key: value 형식으로 클라이언트에게 응답
  } catch (error) {
    next(error);
  }
};

export const handleGetOngoingMissions = async (req, res, next) => {
  
  try {
    console.log("진행 중인 미션 목록을 조회하였습니다.");
    
    const missions = await handleGetOngoingMissions();
    res.status(200).success(missions);

    /*
    # swagger.summary = '진행 중인 미션 목록 조회 API';
    # swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              id: { type: "int" },
              title: { type: "string" },
              description: { type: "string" },
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
                  id: { type: "int" },
                  title: { type: "string" },
                  description: { type: "string" },
                  storeId: { type: "int" } 
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
                  id: { type: "int" },
                  title: { type: "string" },
                  description: { type: "string" },
                  storeId: { type: "int" } 
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
    */

  } catch (error) {
    next(error);
  }
};


{/* 
  result: missions 예시 응답 값
  {
    "result": [
      {
        "id": 1,
        "title": "미션 1",
        "description": "미션 1 설명",
        "storeId": 1
      },
      {
        "id": 2,
        "title": "미션 2",
        "description": "미션 2 설명",
        "storeId": 1
      }
    ]
  }
*/}