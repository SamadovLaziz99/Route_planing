import {isAuthGuardActive} from '../constants/config'
import {whiteList} from "../constants/config";

export default (to, from, next) => {
  if (isAuthGuardActive) {
    if (localStorage.getItem('token')) {
      // && localStorage.getItem('detail')
      console.log(to);
      if (!whiteList.includes(to.name)) {
        // && to.meta.roles.includes(JSON.parse(localStorage.getItem('detail')).role.role)
        next();
      } else next('/app');
    } else {
      if (whiteList.includes(to.name)) {
        next();
      } else next({name: 'login'});
    }
  } else next();
}
