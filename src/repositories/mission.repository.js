import { prisma } from "../db.config";

// 특정 가게 미션 목록 조회
export const getMissionByShopIdFromRepository = async (shopId) => {
  return await prisma.mission.findMany({
    where: { storeId: parseInt(shopId) }, // parseInt: 숫자로 변환
    include: { // include: 연관된 데이터 함께 가져오기 옵션
      shop: true,
    },
  });
};

// 진행 중인 미션 목록 조회
export const getOngoingMissionFromRepository = async () => {
  return await prisma.mission.findMany({
    where: {
      status: "미션 중",
    },
    include: {
      shop: true, // 미션과 연관된 가게 정보
    },
  });
};