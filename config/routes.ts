export default [
  { 
    path: '/user', 
    layout: false, 
    routes: [
      { path:  '/user/login', component: './User/Login' },
      { path:  '/user/register', component: './User/Register' }
    ] 
  },
  { path: '/welcome', icon: 'smile', component: './Welcome', menu: {name: 'Welcome'} },
  {
    path: '/admin',
    access: 'canAdmin',
    // component: './Admin',
    icon: 'crown',
    menu: {name: 'Admin Pages'},
    routes: [
      { path: '/admin/user-management', icon: 'smile', menu: {name: 'User Management'}, component: './Admin/UserManagement' },
      { path: '/admin/sub-page', icon: 'smile', menu: {name: 'Sub Sample'}, component: './Welcome' },
    ],
  },
  { icon: 'table', path: '/list', component: './TableList', menu: {name: 'Table List'}},
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
