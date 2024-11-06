export const bodyToMission = (body) => {
  return {
    description: body.description,
    status: body.status,
    points: body.points,
  };
};