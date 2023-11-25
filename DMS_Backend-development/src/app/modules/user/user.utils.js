import User from "../user/user.model.js";

export const findLastEmployeeId = async () => {
  const lastEmployee = await User.findOne({}, { employeeId: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastEmployee?.employeeId
    ? lastEmployee.employeeId.substring(2)
    : undefined;
};

export const generateEmployeeId = async () => {
  const currentId =
    (await findLastEmployeeId()) || (0).toString().padStart(5, "0");

  let incremented = (parseInt(currentId) + 1).toString().padStart(5, "0");

  incremented = `${incremented}`;

  return incremented;
};
