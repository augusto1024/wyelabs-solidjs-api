import axios from 'axios';

const API_URL = process.env.NOTION_API_URL;
const DATABASE_ID = process.env.NODION_DATABASE_ID;
const NOTION_API_KEY = process.env.NOTION_API_KEY;

class NotionApi {
  private static instance: NotionApi;
  private headers;
  private pages: Person[];

  public static async init(): Promise<NotionApi> {
    if (!NotionApi.instance) {
      const instance = new NotionApi();
      instance.headers = {
        Authorization:
          `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': '2022-02-22',
      };

      const { data } = await axios.post<NotionDatabaseResponse>(
        `${API_URL}/databases/${DATABASE_ID}/query`,
        undefined,
        {
          headers: instance.headers,
        }
      );

      instance.pages = data.results.map((result) => ({
        id: result.id,
        name: result.properties.ID.people[0].name,
        imageUrl: result.icon?.file.url || result.icon?.file.url,
      }));
      NotionApi.instance = instance;
    }

    return NotionApi.instance;
  }

  public async getRandomPerson(): Promise<Person> {
    const randomIndex = Math.floor(Math.random() * this.pages.length);
    const pageId = this.pages[randomIndex].id;

    const { data } = await axios.get<NotionBlocksResponse>(
      `${API_URL}/blocks/${pageId}/children`,
      {
        headers: this.headers,
      }
    );
    const image = data.results.find((resut) => resut.type === 'image');
    return {
      id: pageId,
      name: this.pages[randomIndex].name,
      imageUrl:
        image?.image.external?.url ||
        image?.image.file?.url ||
        this.pages[randomIndex].imageUrl ||
        null,
    };
  }
}

export default NotionApi;
