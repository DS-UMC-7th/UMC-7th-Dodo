import { missionResponseDto } from "../dtos/mission.dto.js";
import { getMissionByShopId } from "../services/user.service.js";

export const handleGetMissionByShopId = async (req, res, next) => {
  
  try {
    console.log("특정 가게의 미션 목록을 조회하였습니다.");
    console.log("body: ", req.body);

    const { shopId } = req.params;
    const missions = await getMissionByShopId(shopId);
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