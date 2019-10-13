import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from '../pages/Login/index';
import List from '../pages/List/index';
import Book from '../pages/Book/index';

const Routes = createAppContainer(
  createSwitchNavigator({
    Login,
    List,
    Book,
  })
);

export default Routes;
