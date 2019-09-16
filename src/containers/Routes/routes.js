// import { lazy } from 'react';
import { NAV_SIDEBAR } from '../../constants';
import Category from '../user/InterView/Category';
import Questions from '../user/InterView/Question';
import List from '../user/InterView/List';

// const CompanyDashboard = lazy(() => import('../user/CompanyDashboard/Examples/Demo'));
// const SimulationSetting = lazy(() => import('../SimulationSetting'));
// const MyProfile = lazy(() => import('../user/My Profile'));
// const CompanySetting = lazy(() => import('../user/CompanyDashboard/CompanySetting'));
// const Simulation = lazy(() => import('../user/Simulation'));

export const userRoutes = [
  {
    path: '/category', exact: true, name: 'Category', component: Category, group: NAV_SIDEBAR.companyDashboard, icon: 'pe-7s-display1',
  },
  {
    path: '/category/question', exact: true, name: 'Questions', component: Questions, group: NAV_SIDEBAR.companyDashboard, icon: 'pe-7s-display1',
  },
  {
    path: '/category/list', exact: true, name: 'List', component: List, group: NAV_SIDEBAR.companyDashboard, icon: 'pe-7s-display1',
  },
];

// const ManageUser = lazy(() => import('../admin/ManageUser'));
// const UserMyProfile = lazy(() => import('../admin/UserProfile'));
// const UserCompanySetting = lazy(() => import('../admin/CompanySetting'));

export const adminRoutes = [
  // {
  //   path: '/admin', exact: true, name: 'Userdqwdqw Management', component: ManageUser, group: NAV_SIDEBAR_ADMIN.menu, icon: 'pe-7s-users',
  // },
  // {
  //   path: '/admin/user-profile/:id?', exact: true, name: 'User Profile', component: UserMyProfile, group: NAV_SIDEBAR_ADMIN.menu, icon: 'pe-7s-keypad',
  // },
  // {
  //   path: '/admin/user-company-setting/:id?', exact: true, name: 'User Company Setting', component: UserCompanySetting, group: NAV_SIDEBAR_ADMIN.menu, icon: 'pe-7s-keypad',
  // },
];
