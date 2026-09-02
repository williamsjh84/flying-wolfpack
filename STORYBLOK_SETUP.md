# Storyblok visual editing setup

The Storyblok integration is intentionally running beside Tina until every migrated page has been checked. The public website remains unchanged during this transition.

## 1. Create the Storyblok space

The Flying Wolfpack space is in Storyblok's EU region. In **Settings > Access Tokens**, create a Preview token. In your Storyblok account, create a Personal Access Token for the one-time migration.

## 2. Add local credentials

Copy `.env.storyblok.example` values into `.env.local`:

```env
STORYBLOK_SPACE_ID=your_space_id
STORYBLOK_MANAGEMENT_TOKEN=your_personal_access_token
STORYBLOK_DELIVERY_API_TOKEN=your_preview_token
STORYBLOK_REGION=eu
```

Do not commit `.env.local` or share the Personal Access Token publicly.

## 3. Import the current site

First validate the local content without contacting Storyblok:

```bash
npm run storyblok:migrate:dry
```

Then create the editable components and import the current pages:

```bash
npm run storyblok:migrate
```

The migration is safe to rerun. Existing imported stories and component definitions are updated instead of duplicated.

## 4. Connect the visual editor

Run the secure preview server:

```bash
npm run storyblok:preview
```

In Storyblok **Settings > Visual Editor**, set the preview URL to:

```text
https://localhost:3000/storyblok-preview/
```

Open a migrated story in Storyblok. Its page appears in the editor; click text, cards, lists, or images to edit them. Replace imported image references through Storyblok's Asset Library as desired.

## 5. Publish safely

After the migrated pages have been reviewed, add `STORYBLOK_DELIVERY_API_TOKEN` and `STORYBLOK_REGION=eu` to Vercel. The final cutover removes Tina from the build and makes the Storyblok stories power the public routes.
