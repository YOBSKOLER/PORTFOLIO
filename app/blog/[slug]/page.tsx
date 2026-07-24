import { notFound } from "next/navigation";
import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import { Post } from "@/lib/models/Post";
import { ParticlesBackground } from "@/components/ui/ParticlesBackground";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";

async function getPost(slug: string) {
  await connectDB();
  const post = await Post.findOne({ slug, published: true }).lean();
  return JSON.parse(JSON.stringify(post));
}

type PostType = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags: string[];
  createdAt: string;
  readTime: number;
};

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post: PostType | null = await getPost(params.slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-[#0a0e1a] text-white relative">
      <ParticlesBackground />

      <div className="max-w-3xl mx-auto px-6 py-24">
        <Link
          href="/blog"
          className="flex items-center gap-2 text-slate-400 hover:text-violet-400 transition mb-8 w-fit"
        >
          <ArrowLeft size={16} /> Retour au blog
        </Link>

        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-64 object-cover rounded-2xl mb-8"
          />
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-400 flex items-center gap-1"
            >
              <Tag size={10} /> {tag}
            </span>
          ))}
        </div>

        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        <div className="flex items-center gap-4 text-sm text-slate-500 mb-8 pb-8 border-b border-slate-800">
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {new Date(post.createdAt).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} /> {post.readTime} min de lecture
          </span>
        </div>

        <div
          className="prose prose-invert prose-violet max-w-none text-slate-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
        />
      </div>
    </main>
  );
}
