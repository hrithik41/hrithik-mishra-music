import { type SchemaTypeDefinition } from 'sanity';
import experience from './experience';
import galleryItem from './gallery';
import residencyProgram from './residency';
import video from './video';
import timelineItem from './timelineItem';
import stat from './stat';
import navbar from './navbar';
import footer from './footer';
import homePage from './homePage';
import aboutPage from './aboutPage';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    experience, 
    galleryItem, 
    residencyProgram, 
    video, 
    timelineItem, 
    stat,
    navbar,
    footer,
    homePage,
    aboutPage,
  ],
}
