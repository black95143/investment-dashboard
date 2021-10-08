import Home from "./components/Home/index";
import Macroeconomics from "./components/Macroeconomics/index";
import TaiwanStockTA from './components/TaiwanStockTA/index';

//
const routes = [
  {
    key: "route-home",
    name: "home",
    path: "/",
    withHeader: true,
    withFooter: true,
    public: true, // 若在維護開發中請設定 false
    authority: null,
    component: Home,
  },
  {
    key: "route-macroeconomics",
    name: "macroeconomics",
    path: "/macroeconomics",
    withHeader: true,
    withFooter: true,
    public: true, // 若在維護開發中請設定 false
    authority: null,
    component: Macroeconomics,
  },
  {
    key: "route-taiwanstockta",
    name: "taiwanstockta",
    path: "/taiwanstockta",
    withHeader: true,
    withFooter: true,
    public: true, // 若在維護開發中請設定 false
    authority: null,
    component: TaiwanStockTA,
  }
];

export default routes;