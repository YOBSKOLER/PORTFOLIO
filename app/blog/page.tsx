import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import { Post } from "@/lib/models/Post";
import { ParticlesBackground } from "@/components/ui/ParticlesBackground";
import { Calendar, Clock, Tag } from "lucide-react";

async function getPosts() {
  await connectDB();
  const posts = await Post.find({ published: true })
    .sort({ createdAt: -1 })
    .lean();
  return JSON.parse(JSON.stringify(posts));
}

type PostType = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
  tags: string[];
  createdAt: string;
  readTime: number;
};

export default async function BlogPage() {
  const posts: PostType[] = await getPosts();

  return (
    <main className="min-h-screen bg-[#0a0e1a] text-white relative">
      <ParticlesBackground />

      <div className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Mon <span className="text-violet-400">Blog</span>
          </h1>
          <p className="text-slate-400">
            Mes articles sur le développement web, mobile et la tech en Afrique
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center text-slate-500 py-20">
            <p className="text-xl mb-2">Aucun article pour le moment.</p>
            <p className="text-sm">Reviens bientôt !</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug}`}
                className="group bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden hover:border-violet-500/50 transition"
              >
                {post.coverImage && (
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition duration-500"
                  />
                )}
                <div className="p-6 space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-400 flex items-center gap-1"
                      >
                        <Tag size={10} /> {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl font-bold group-hover:text-violet-400 transition">
                    {post.title}
                  </h2>
                  <p className="text-slate-400 text-sm line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-2">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(post.createdAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {post.readTime} min
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
