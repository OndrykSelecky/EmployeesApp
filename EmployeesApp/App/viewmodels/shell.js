define(['plugins/router', 'durandal/app'], function (router, app) {
    return {
        router: router,
        
        activate: function () {
            router.map([
                { route: ['about', ''], title: 'About', moduleId: 'viewmodels/about', nav: true },
                { route: 'positionTypes', title: 'Positions', moduleId: 'viewmodels/positionTypes', nav: true },
                { route: 'employeeList', title: 'Employees', moduleId: 'viewmodels/employeeList', nav: true },
                { route: 'employee/:param1', title: 'Employee', hash:"#employee", moduleId: 'viewmodels/employee', nav: false },
            ]).buildNavigationModel();
            
            return router.activate();
        }
    };
});

