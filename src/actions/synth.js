export const triggerAttack = (note, time) => {
  console.log("trigger attack");
  return {
    type: 'TRIGGER_ATTACK',
    note,
    time,
  }
}
