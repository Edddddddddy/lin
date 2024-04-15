const megRouter = {
  route: null,
  name: null,
  title: '脑磁数据分析平台',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  isElementIcon: false,
  filePath: 'view/meg/', // 文件路径
  order: null,
  inNav: true,
  children: [
    {
      title: '展示meg',
      type: 'view',
      name: 'MegOverview',
      route: '/meg/overview',
      // filePath: 'view/meg/meg-overview.vue',
      // filePath: 'view/meg/meg-vis-test2.vue',
      filePath: 'view/meg/meg-vis.vue',
      inNav: true,
      icon: 'iconfont icon-add',
      isElementIcon: false,
    },
  ],
}

export default megRouter
