import { type SchemaTypeDefinition } from 'sanity';
import experience from './experience';
import galleryItem from './gallery';
import residencyProgram from './residency';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [experience, galleryItem, residencyProgram],
}
