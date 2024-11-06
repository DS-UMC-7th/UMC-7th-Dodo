export const bodyToChallengeMission = (body) => {
  return {
    userId: body.userId,
    missionId: body.missionId,
    status: 'challenging', // 미션 도전 상태.
    startDate: new Date(),
  };
};