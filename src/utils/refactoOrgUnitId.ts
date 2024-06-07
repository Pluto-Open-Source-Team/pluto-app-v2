export const refactoOrgUnitId = (id: string): string => {
  const idPart = id.split(':')[1];

  return `orgunits/${idPart}`;
};
