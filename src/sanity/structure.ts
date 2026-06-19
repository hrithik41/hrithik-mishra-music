import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Global Components')
        .child(
          S.list()
            .title('Global Components')
            .items([
              S.listItem()
                .title('Navbar')
                .child(S.document().schemaType('navbar').documentId('navbar')),
              S.listItem()
                .title('Footer')
                .child(S.document().schemaType('footer').documentId('footer')),
            ])
        ),
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('Home Page')
                .child(S.document().schemaType('homePage').documentId('homePage')),
              S.listItem()
                .title('About Page')
                .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
            ])
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !['navbar', 'footer', 'homePage', 'aboutPage'].includes(listItem.getId()!)
      ),
    ])
