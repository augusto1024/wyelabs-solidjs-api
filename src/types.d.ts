type NotionDatabaseResponse = {
  object: 'list';
  results: {
    id: string;
    icon?: {
      file: {
        url: string
      };
    },
    cover?: {
      external: {
        url: string
      }
    }
    properties: {
      ID: {
        people: {
          name: string;
        }[];
      };
    };
  }[];
};

type NotionBlocksResponse = {
  object: 'blocks';
  results: {
    type: string;
    image?: {
      file?: {
        url: string;
      };
      external?: {
        url: string;
      };
    };
  }[];
};

type Person = {
  id: string;
  name: string;
  imageUrl?: string;
};
