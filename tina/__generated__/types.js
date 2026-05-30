export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const JournalPartsFragmentDoc = gql`
    fragment JournalParts on Journal {
  __typename
  title
  excerpt
  date
  category
  readTime
  image
  body
}
    `;
export const EpisodesPartsFragmentDoc = gql`
    fragment EpisodesParts on Episodes {
  __typename
  title
  country
  flag
  episode
  duration
  description
  image
  youtubeId
  body
}
    `;
export const GearPartsFragmentDoc = gql`
    fragment GearParts on Gear {
  __typename
  name
  category
  price
  rating
  summary
  image
  affiliateUrl
}
    `;
export const DestinationsPartsFragmentDoc = gql`
    fragment DestinationsParts on Destinations {
  __typename
  name
  flag
  summary
  image
  episodeCount
}
    `;
export const TravelHacksPartsFragmentDoc = gql`
    fragment TravelHacksParts on TravelHacks {
  __typename
  title
  category
  readTime
  image
  body
}
    `;
export const JournalDocument = gql`
    query journal($relativePath: String!) {
  journal(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...JournalParts
  }
}
    ${JournalPartsFragmentDoc}`;
export const JournalConnectionDocument = gql`
    query journalConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: JournalFilter) {
  journalConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...JournalParts
      }
    }
  }
}
    ${JournalPartsFragmentDoc}`;
export const EpisodesDocument = gql`
    query episodes($relativePath: String!) {
  episodes(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...EpisodesParts
  }
}
    ${EpisodesPartsFragmentDoc}`;
export const EpisodesConnectionDocument = gql`
    query episodesConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: EpisodesFilter) {
  episodesConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...EpisodesParts
      }
    }
  }
}
    ${EpisodesPartsFragmentDoc}`;
export const GearDocument = gql`
    query gear($relativePath: String!) {
  gear(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...GearParts
  }
}
    ${GearPartsFragmentDoc}`;
export const GearConnectionDocument = gql`
    query gearConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: GearFilter) {
  gearConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...GearParts
      }
    }
  }
}
    ${GearPartsFragmentDoc}`;
export const DestinationsDocument = gql`
    query destinations($relativePath: String!) {
  destinations(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...DestinationsParts
  }
}
    ${DestinationsPartsFragmentDoc}`;
export const DestinationsConnectionDocument = gql`
    query destinationsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: DestinationsFilter) {
  destinationsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...DestinationsParts
      }
    }
  }
}
    ${DestinationsPartsFragmentDoc}`;
export const TravelHacksDocument = gql`
    query travelHacks($relativePath: String!) {
  travelHacks(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...TravelHacksParts
  }
}
    ${TravelHacksPartsFragmentDoc}`;
export const TravelHacksConnectionDocument = gql`
    query travelHacksConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: TravelHacksFilter) {
  travelHacksConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...TravelHacksParts
      }
    }
  }
}
    ${TravelHacksPartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    journal(variables, options) {
      return requester(JournalDocument, variables, options);
    },
    journalConnection(variables, options) {
      return requester(JournalConnectionDocument, variables, options);
    },
    episodes(variables, options) {
      return requester(EpisodesDocument, variables, options);
    },
    episodesConnection(variables, options) {
      return requester(EpisodesConnectionDocument, variables, options);
    },
    gear(variables, options) {
      return requester(GearDocument, variables, options);
    },
    gearConnection(variables, options) {
      return requester(GearConnectionDocument, variables, options);
    },
    destinations(variables, options) {
      return requester(DestinationsDocument, variables, options);
    },
    destinationsConnection(variables, options) {
      return requester(DestinationsConnectionDocument, variables, options);
    },
    travelHacks(variables, options) {
      return requester(TravelHacksDocument, variables, options);
    },
    travelHacksConnection(variables, options) {
      return requester(TravelHacksConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "https://content.tinajs.io/2.4/content/fa3c2638-02f0-4fd0-b1ad-ad74615afbd2/github/master",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
