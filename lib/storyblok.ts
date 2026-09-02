import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";
import StoryblokPage from "@/components/storyblok/StoryblokPage";
import HeroBlock from "@/components/storyblok/HeroBlock";
import EditorialBlock from "@/components/storyblok/EditorialBlock";
import GalleryBlock from "@/components/storyblok/GalleryBlock";
import ListBlock from "@/components/storyblok/ListBlock";
import EmailSignupBlock from "@/components/storyblok/EmailSignupBlock";
import CardGridBlock from "@/components/storyblok/CardGridBlock";

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.STORYBLOK_DELIVERY_API_TOKEN || "storyblok-not-configured",
  use: [apiPlugin],
  components: {
    page: StoryblokPage,
    hero_section: HeroBlock,
    editorial_section: EditorialBlock,
    gallery_section: GalleryBlock,
    list_section: ListBlock,
    email_signup_section: EmailSignupBlock,
    card_grid_section: CardGridBlock,
  },
  apiOptions: {
    region: process.env.STORYBLOK_REGION || "us",
  },
});
