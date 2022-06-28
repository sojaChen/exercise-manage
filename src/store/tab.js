import router from '@/router'
export default {
    namespaced: true,
    state: {
        isCollapse: false,
        isAddRoutes: false,
        menuList: [],
        breadcrumbList: []
    },
    mutations: {
        setMenuList(state, val) {
            if (val) {
                state.menuList = val;
                if (state.breadcrumbList.length === 0) state.breadcrumbList.push(state.menuList[0]);
            }
        },
        setRoutes(state) {
            // 动态添加路由
            state.isAddRoutes = true;
            state.menuList.forEach((element) => {
                if (element.children) {
                    element.children.forEach((childElement) => {
                        router.addRoute("main", {
                            path: childElement.path,
                            name: childElement.name,
                            component: () => import(`@/pages/${childElement.url}`),
                        });
                    });
                } else {
                    router.addRoute("main", {
                        path: element.path,
                        name: element.name,
                        component: () => import(`@/pages/${element.url}`),
                    });
                }
            });
        },
        isCollapseChange(state) {
            state.isCollapse = !state.isCollapse
        },
        updateBreadcrumbList(state, value) {
            const isRepeat = state.breadcrumbList.findIndex((element) => element.name === value.name)
            if (isRepeat < 0) {
                state.breadcrumbList.push(value)
            }
        },
        deleteBreadcrumbList(state, value) {
            const index = state.breadcrumbList.indexOf(value)
            state.breadcrumbList.splice(index, 1)
        },
        resetTab(state) {
            state.isCollapse = false;
            state.menuList = [];
            state.breadcrumbList = [];
        }
    }
}