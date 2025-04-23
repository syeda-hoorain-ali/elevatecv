import type { StructureResolver } from 'sanity/structure';
import { AppWindowIcon } from 'lucide-react';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) => {

  console.log('S', S);

  return S.list()
    .title('Website')
    .items([
      S.documentTypeListItem('pages').title("Pages").icon(AppWindowIcon).child(
        S.list()
          .title('Web Pages')
          .items([
            S.listItem()
              .title("Home Page")
              .id("homePage")
              .child(S.document().schemaType("homePage").documentId("homePage")),
            S.listItem()
              .title("Contact Page")
              .id("contactPage")
              .child(S.document().schemaType("contactPage").documentId("contactPage")),
          ])),

      S.divider(),
      S.documentTypeListItem('features'),
      S.documentTypeListItem('pricing'),
    ])
}
