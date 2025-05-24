import home from '~/user/component/pages/Homeee/home';
import History from '~/addmin/component/page/history';
import menu from '~/user/component/pages/menu';
import login from '~/user/component/pages/login';
import Signup from '~/user/component/pages/signup/signup';
import fogot from '~/user/component/pages/forgot';
import manage from '~/addmin/component/page/manage';
import Staff from '~/addmin/component/page/staff';
import Table from '~/addmin/component/page/Table';
import member from '~/addmin/component/page/member';
import Cart from '~/user/component/pages/cart';
import routesconfig from '~/config/routes';
import reset from '~/user/component/pages/forgot/resetpw';
import Defaultlayout from '~/addmin/component/defaulayout';
import Order from '~/user/component/pages/table';
import Onlyheader from '~/user/component/default/onlyheader';
import Dashboard from '~/addmin/component/page/Dashboard/booking';
import contact from '~/user/component/pages/contact';
import Voucher from '~/user/component/pages/voucher';
import BillList from '~/addmin/component/page/bill/BillList';
import BillDetail from '~/addmin/component/page/bill/BillDetail';
import BillForm from '~/addmin/component/page/bill/BillForm';
import BookingHistory from '~/user/component/pages/history/index';
import Introduce from '~/user/component/pages/introduce';
import CheckoutPage from '~/user/component/pages/checkout';
import Loginadmin from '~/addmin/component/page/login';
import BillNow from '~/addmin/component/page/billNow/BillList';
import AddBill from '~/addmin/component/page/billNow/addbill';

const publicRoutes = [
    { path: routesconfig.home, component: home },
    { path: routesconfig.hitry, component: BookingHistory, layout: Onlyheader },
    { path: routesconfig.loginadmin, component: Loginadmin, layout: null },
    { path: routesconfig.menu, component: menu },
    { path: routesconfig.order, component: Order },
    { path: routesconfig.fogot, component: fogot, layout: null },
    { path: routesconfig.manage, component: manage, layout: Defaultlayout },
    { path: routesconfig.cart, component: Cart, layout: Onlyheader },
    { path: routesconfig.login, component: login, layout: null },
    { path: routesconfig.signup, component: Signup, layout: null },
    { path: routesconfig.staff, component: Staff, layout: Defaultlayout },
    { path: routesconfig.member, component: member, layout: Defaultlayout },
    { path: routesconfig.Table, component: Table, layout: Defaultlayout },
    { path: routesconfig.dashboard, component: Dashboard, layout: Defaultlayout },
    { path: routesconfig.history, component: History, layout: Defaultlayout },
    { path: routesconfig.billist, component: BillList, layout: Defaultlayout },
    { path: routesconfig.biifrom, component: BillForm, layout: Defaultlayout },
    { path: routesconfig.detalbil, component: BillDetail, layout: Defaultlayout },
    { path: routesconfig.addbill, component: AddBill, layout: Defaultlayout },
    { path: routesconfig.reset, component: reset },
    { path: routesconfig.contact, component: contact, layout: Onlyheader },
    { path: routesconfig.checkout, component: CheckoutPage },
    { path: routesconfig.voucher, component: Voucher, layout: Onlyheader },
    { path: routesconfig.introduce, component: Introduce, layout: Onlyheader },
    { path: routesconfig.billNow, component: BillNow, layout: Defaultlayout },
];
export { publicRoutes };
