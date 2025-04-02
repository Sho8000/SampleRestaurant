/* export interface RecipeProps {
  metadata: {
    tags: { sys: TagLink }[];
  };
  sys: {
    space: {
      sys: {
        type: 'Link';
        linkType: 'Space';
        id: string;
      };
    };
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    environment: {
      sys: {
        id: string;
        type: 'Link';
        linkType: 'Environment';
      };
    };
    publishedVersion: number;
    revision: number;
    contentType: {
      sys: {
        type: 'Link';
        linkType: 'ContentType';
        id: string;
      };
    };
    locale: string;
  };
  fields: {
    recipeName: string;
    recipeImg: {
      metadata: {
        tags: string[];
        concepts: string[];
      };
      sys: {
        space: {
          sys: {
            type: 'Link';
            linkType: 'Space';
            id: string;
          };
        };
        id: string;
        type: string;
        createdAt: string;
        updatedAt: string;
        environment: {
          sys: {
            id: string;
            type: 'Link';
            linkType: 'Environment';
          };
        };
        publishedVersion: number;
        revision: number;
        locale: string;
      };
      fields: {
        title: string;
        file: {
          url: string;
          details: {
            size: number;
            image: {
              width: number;
              height: number;
            };
          };
          fileName: string;
          contentType: string;
        };
      };
    };
    recipeDescription: {
      data: {};
      content: Array<{
        data: {};
        content: Array<{
          data: {};
          marks: Array<{ type: string }>;
          value: string;
          nodeType: string;
        }>;
        nodeType: string;
      }>;
      nodeType: string;
    };
    price: number;
    category: string;
    ingredients: string;
  };
}
 */