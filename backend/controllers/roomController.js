import Room from '../models/Room.js';
import { crudController } from './crudController.js';

export default crudController(Room, { sort: { number: 1 } });
