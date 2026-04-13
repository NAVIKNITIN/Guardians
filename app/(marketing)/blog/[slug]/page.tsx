import { BlogDetail, type BlogDetailPost } from "@/components/blog/BlogDetail";
import { LOCAL_IMAGES } from "@/lib/local-images";
import type { Metadata } from "next";

// In production this data would come from a CMS or API based on the slug.
const POST: BlogDetailPost = {
  category: "CATEGORY",
  date: "12 Dec 2025",
  title: "Revolutionising real estate - The Power of GIS mapping in India",
  featuredImage: LOCAL_IMAGES.newsroom,
  featuredImageAlt: "GIS mapping in real estate",
  body: `Lorem ipsum dolor sit amet consectetur. Diam tellus nunc et pulvinar rhoncus semper non dolor. Volutpat eget tincidunt turpis enim semper purus in rhoncus. Viverra condimentum scelerisque sit nisl dignissim lectus. Sed fames cras turpis scelerisque posuere lectus. Turpis in natoque id elit. Proin quis aliquam sed euismod sit eleifend. Eleifend et ac a fermentum netus in enim. Congue consequat tincidunt amet consequat massa gravida nulla nunc. A pellentesque blandit nec habitant magna ultrices accumsan. Elit odio adipiscing urna ultricies ultrices malesuada nisl quam.

Eget posuere vulputate morbi parturient. Elementum non amet faucibus dolor. Lobortis id ut sem rhoncus. Orci dignissim sem risus ultricies mauris id erat. Phasellus consectetur et lacinia neque. Tellus facilisi etiam aliquet eget eleifend sed. Urna libero aliquam platea feugiat ligula est vivamus purus nunc. Morbi eu pellentesque suspendisse volutpat mauris sed imperdiet. Molestie id massa porttitor aliquet libero consectetur arcu ut. Orci nisl ornare ut lobortis. Sed viverra facilisis iaculis viverra. Adipiscing sagittis hendrerit pretium neque purus adipiscing eu nec ultrices.

Hac odio vitae lorem in vivamus nec imperdiet egestas malesuada. Potenti leo tincidunt feugiat nulla adipiscing et convallis a. Tempor in lectus consectetur et vivamus amet pharetra leo. Ut egestas mauris faucibus phasellus nibh auctor nunc orci. Pulvinar posuere ultricies in semper donec purus. Tortor tincidunt hac dignissim massa lobortis aenean.

Tortor nulla enim egestas in. Mauris sed libero nisi facilisi sed amet tellus at. Sapien risus amet felis nunc lobortis eget nullam. Sit augue fermentum cras amet mauris velit senectus. Facilisis posuere quisque nulla vitae sagittis rhoncus cras nibh. Est id enim non ac. Sed tempor convallis pellentesque facilisi ultricies amet non sit. Justo pharetra in dictum pharetra rhoncus est sed. In mauris orci consequat mattis ac porttitor lobortis. Quam pellentesque porttitor eu massa pretium adipiscing velit a.`,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: { absolute: `${POST.title} | The Guardians` },
    description: POST.body.slice(0, 160),
    openGraph: {
      images: [POST.featuredImage],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // `slug` would be used to fetch the correct post in production
  await params;
  return <BlogDetail post={POST} />;
}
