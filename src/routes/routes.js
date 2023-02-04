import Home from '../pages/Home' 
import { HeaderOnly } from '../layouts';
import Following from '../pages/Following'
import Profile from '../pages/Profile';
import Upload from '../pages/Upload';
import Search from '../pages/Search';
import config from '../config';
import { Link } from 'react-router-dom';
import Live from '../pages/Live';
//public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.live, component: Live },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.upload, component: Upload ,layout : HeaderOnly},
    { path: config.routes.search, component: Search, layout : null },

];
//private routes
const privateRoutes = [];

export {publicRoutes,privateRoutes} ;
