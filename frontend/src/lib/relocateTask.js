import { isColumnId } from '../components/boardColumns';


export const relocateTask = (tasks, activeId, overId, targetStatus) => {
  const from = tasks.findIndex((t) => t._id === activeId);
  if (from === -1) return tasks;

  const next = [...tasks];
  const [moved] = next.splice(from, 1);
  const updated = { ...moved, estado: targetStatus };

  const anchorId = overId && !isColumnId(overId) ? overId : null;
  let to = anchorId ? next.findIndex((t) => t._id === anchorId) : -1;

  if (to === -1) {
    const sameColumn = next.reduce(
      (acc, t, i) => (t.estado === targetStatus ? [...acc, i] : acc),
      []
    );
    to = sameColumn.length ? sameColumn[sameColumn.length - 1] + 1 : next.length;
  }

  next.splice(to, 0, updated);
  return next;
};
