import { TranslateService } from 'ter-localization';

export const UserNav = [
  {
    icon: 'metismenu-icon pe-7s-display1',
    label: 'Category',
    to: '#/category',
  },
  {
    icon: 'metismenu-icon pe-7s-config',
    label: 'Questions',
    to: '#/category/question',
  },
  {
    icon: 'metismenu-icon pe-7s-config',
    label: 'List Questions',
    to: '#/category/list',
  },
];

export const UserNav1 = [
  {
    icon: 'metismenu-icon pe-7s-user',
    label: TranslateService.t('route')('My Profile'),
    to: '#/users/my-profile',
  },
];

export const AdminNav = [
  {
    icon: 'metismenu-icon pe-7s-users',
    label: TranslateService.t('route')('User Management'),
    to: '#/admin',
  },
];
