let records = [];
export function getPlans() {
  return records.map((record) => ({ ...record }));
}
export function retrievePlans(plans) {
  records = plans.map((record) => ({ ...record }));
}

export function searchData(id) {
  const record = records.find((item) => item.id === id);
  return record ? { ...record } : undefined;
}
