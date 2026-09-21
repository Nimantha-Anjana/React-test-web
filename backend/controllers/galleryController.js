import GalleryImage from '../models/GalleryImage.js';
import { crudController } from './crudController.js';

export default crudController(GalleryImage, { sort: { displayOrder: 1 } });
