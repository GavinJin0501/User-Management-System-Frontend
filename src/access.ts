/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
const ADMIN_ROLE = 1;
const VIP_ROLE = 2;

export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canAdmin: currentUser && currentUser.userRole === ADMIN_ROLE,
    canVip: currentUser && currentUser.userRole === VIP_ROLE
  };
}
