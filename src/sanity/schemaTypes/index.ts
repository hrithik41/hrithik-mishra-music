import { type SchemaTypeDefinition } from 'sanity';
import experience from './experience';
import galleryItem from './gallery';
import residencyProgram from './residency';
import siteSettings from './siteSettings';
import video from './video';
import timelineItem from './timelineItem';
import stat from './stat';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    experience, 
    galleryItem, 
    residencyProgram, 
    siteSettings, 
    video, 
    timelineItem, 
    stat
  ],
}
