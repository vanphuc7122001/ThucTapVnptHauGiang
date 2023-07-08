const role = sessionStorage.getItem("role");
let permissionList = sessionStorage.getItem("permissionList");
permissionList = JSON.parse(permissionList);
// console.log("permissionList", permissionList);
let user = sessionStorage.getItem("user");
console.log("user:", user);
// khách hàng
const isDeleteCustomer = () => {
  return user == "admin" || permissionList.includes("xoá khách hàng");
};
const isEditCustomer = () => {
  return user == "admin" || permissionList.includes("sửa thông tin khách hàng");
};
const isReadCustomer = () => {
  return user == "admin" || permissionList.includes("xem thông tin khách hàng");
};
const isCreateCustomer = () => {
  return (
    user == "admin" || permissionList.includes("thêm thông tin khách hàng")
  );
};

// nhân viên
const isDeleteEmployee = () => {
  return user == "admin" || permissionList.includes("xoá nhân viên");
};
const isEditEmployee = () => {
  return user == "admin" || permissionList.includes("sửa thông tin nhân viên");
};
const isReadEmployee = () => {
  return user == "admin" || permissionList.includes("xem nhân viên");
};
const isCreateEmployee = () => {
  return user == "admin" || permissionList.includes("thêm thông tin nhân viên");
};

// Sự kiện
const isDeleteEvent = () => {
  return user == "admin" || permissionList.includes("xóa sự kiện");
};
const isEditEvent = () => {
  return user == "admin" || permissionList.includes("sửa sự kiện");
};
const isCreateEvent = () => {
  return user == "admin" || permissionList.includes("thêm sự kiện");
};
const isReadEvent = () => {
  return user == "admin" || permissionList.includes("xem sự kiện");
};

const isSetEvent = () => {
  return user == "admin" || permissionList.includes("áp dụng sự kiện");
};

// Thói quen
const isDeleteHabit = () => {
  return user == "admin" || permissionList.includes("xóa thói quen");
};
const isEditHabit = () => {
  return user == "admin" || permissionList.includes("sửa thói quen");
};
const isCreateHabit = () => {
  return user == "admin" || permissionList.includes("thêm thói quen");
};
const isReadHabit = () => {
  return user == "admin" || permissionList.includes("xem thói quen");
};

const isSetHabit = () => {
  return user == "admin" || permissionList.includes("áp dụng thói quen");
};

// Phân công
const isDeleteAssignement = () => {
  return user == "admin" || permissionList.includes("xóa phân công");
};
const isEditAssignement = () => {
  return user == "admin" || permissionList.includes("sửa phân công");
};
const isCreateAssignement = () => {
  return user == "admin" || permissionList.includes("thêm phân công");
};
const isReadAssignement = () => {
  return user == "admin" || permissionList.includes("xem phân công");
};
const isSelfAssignement = () => {
  return user == "admin" || permissionList.includes("tự phân công");
};
const isSetAssignement = () => {
  // console.log("PerList: ", permissionList);
  return user == "admin" || permissionList.includes("giao phân công ");
};
const isFeedbackAssignment = () => {
  return user == "admin" || permissionList.includes("thêm đánh giá phân công");
};

const isReNewAssignment = () => {
  return user == "admin" || permissionList.includes("tái phân công");
};

// lịch hẹn
const isDeleteAppointment = () => {
  return user == "admin" || permissionList.includes("xóa lịch hẹn");
};
const isCreateAppointment = () => {
  return user == "admin" || permissionList.includes("thêm lịch hẹn");
};
const isEditAppointment = () => {
  return user == "admin" || permissionList.includes("sửa lịch hẹn");
};
const isReadAppointment = () => {
  console.log("Xem lịch hẹn", permissionList);
  return user == "admin" || permissionList.includes("xem lịch hẹn");
};

// Thống kê
const isReadDashboard = () => {
  return user == "admin" || permissionList.includes("xem thống kê");
};

// Báo cáo
const isReadReport = () => {
  return (
    user == "admin" ||
    permissionList.includes("báo cáo khách hàng lâu chưa chăm sóc")
  );
};

const isReadReportLeaderCustomer = () => {
  return (
    user == "admin" ||
    permissionList.includes("báo cáo khách hàng do lãnh đạo phụ trách")
  );
};

const isReadReportLeaderStaff = () => {
  return (
    user == "admin" ||
    permissionList.includes("báo cáo nhân viên do lãnh đạo phụ trách")
  );
};

const isReadReportCustomerCycle = () => {
  return (
    user == "admin" ||
    permissionList.includes("báo cáo khách hàng tới chu kì nhưng chưa chăm sóc")
  );
};

const isReadReportAssinmentStaff = () => {
  return (
    user == "admin" ||
    permissionList.includes("báo cáo khách hàng do nhân viên chăm sóc")
  );
};

const isPrintReport = () => {
  return user == "admin" || permissionList.includes("in báo cáo");
};

// Mail
const isMail = () => {
  return user == "admin" || permissionList.includes("gửi mail");
};

// Tài khoản
const isReadAccount = () => {
  return user == "admin" || permissionList.includes("xem tài khoản");
};

// Vai trò
const isReadRole = () => {
  return user == "admin" || permissionList.includes("xem vai trò");
};
const isCreateRole = () => {
  return user == "admin" || permissionList.includes("thêm vai trò");
};
const isDeleteRole = () => {
  return user == "admin" || permissionList.includes("xóa vai trò");
};
const isSetRole = () => {
  return user == "admin" || permissionList.includes("áp dụng vai trò");
};

// quyền
const isCreatePermission = () => {
  return user == "admin" || permissionList.includes("thêm quyền");
};
const isDeletePermission = () => {
  return user == "admin" || permissionList.includes("xóa quyền");
};
const isReadPermission = () => {
  return user == "admin" || permissionList.includes("xem quyền");
};
const isSetPermission = () => {
  return user == "admin" || permissionList.includes("áp dụng quyền");
};

export {
  role,
  permissionList,
  // Khách hàng
  isDeleteCustomer,
  isEditCustomer,
  isReadCustomer,
  isCreateCustomer,
  // Nhân viên
  isDeleteEmployee,
  isEditEmployee,
  isReadEmployee,
  isCreateEmployee,
  // sự kiện
  isDeleteEvent,
  isEditEvent,
  isCreateEvent,
  isReadEvent,
  isSetEvent,
  // thói quen
  isDeleteHabit,
  isEditHabit,
  isCreateHabit,
  isReadHabit,
  isSetHabit,
  // phân công
  isDeleteAssignement,
  isEditAssignement,
  isCreateAssignement,
  isReadAssignement,
  isSelfAssignement,
  isSetAssignement,
  isFeedbackAssignment,
  isReNewAssignment,
  // lịch hẹn
  isDeleteAppointment,
  isCreateAppointment,
  isEditAppointment,
  isReadAppointment,
  // Thống kê
  isReadDashboard,
  // báo cáo
  isReadReport,
  isReadReportLeaderCustomer,
  isReadReportLeaderStaff,
  isReadReportCustomerCycle,
  isReadReportAssinmentStaff,
  isPrintReport,
  // mail
  isMail,
  // Tài khoản
  isReadAccount,
  // vai trò
  isReadRole,
  isCreateRole,
  isDeleteRole,
  isSetRole,
  // quyền
  isCreatePermission,
  isDeletePermission,
  isReadPermission,
  isSetPermission,
};
