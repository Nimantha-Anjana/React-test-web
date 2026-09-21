import Restaurant from '../models/Restaurant.js';
import MenuItem from '../models/MenuItem.js';
import { crudController } from './crudController.js';

export const restaurants = crudController(Restaurant, { sort: { createdAt: 1 } });
export const menuItems = crudController(MenuItem, { sort: { category: 1, name: 1 } });
