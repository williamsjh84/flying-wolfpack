import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: 'd77831b8955909de40ff859c78ada0515fa8d8e0', queries,  });
export default client;
  