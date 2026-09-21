import Service from '../models/Service.js';
import { crudController } from './crudController.js';

export default crudController(Service, { sort: { createdAt: 1 } });
