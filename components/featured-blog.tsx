import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";

const blogPosts = [
  {
    id: 1,
    title:
      "Facebook is creating a news section in Watch to feature breaking news",
    excerpt: "Facebook launched the Watch platform in August",
    author: "Gloria",
    date: "Jan 09, 2021",
    image:
      "https://images.unsplash.com/photo-1669828230990-9b8583a877ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80",
    avatar:
      "https://images.unsplash.com/photo-1669837401587-f9a4cfe3126e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
  },
  {
    id: 2,
    title: "What CFR (Conversations, Feedback, Recognition) really is about",
    excerpt: "For a lot of people these days, Measure What Matters.",
    author: "Gloria",
    date: "May 30, 2021",
    image:
      "https://images.unsplash.com/photo-1611625618313-68b87aaa0626?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80",
    avatar:
      "https://images.unsplash.com/photo-1669837401587-f9a4cfe3126e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80",
  },
];

export default function FeaturedBlog() {
  return (
    <section className="py-20 rounded-4xl">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-flex items-center rounded-full border border-gray-300 px-4 py-1 text-sm font-medium mb-4 text-gray-600">
            <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
            Our Blog
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Read Our Latest Blog Posts
          </h2>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-2">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="group relative overflow-hidden border-0 bg-transparent p-0 shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <a
                href="#"
                className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl"
              >
                <div className="relative h-[350px] w-full overflow-hidden rounded-xl">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Author info */}
                  <div className="absolute left-0 right-0 top-0 z-10 p-4 sm:p-6">
                    <div className="flex items-center space-x-3">
                      <div className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-white shadow-sm">
                        <Image
                          src={post.avatar}
                          alt={post.author}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="truncate font-semibold text-white">
                          {post.author}
                        </h4>
                        <p className="text-xs text-white/80">{post.date}</p>
                      </div>
                    </div>
                  </div>

                  {/* Post content */}
                  <div className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-6">
                    <div className="space-y-2">
                      <h3 className="line-clamp-3 text-lg font-semibold leading-tight text-white transition-colors group-hover:text-white/90 group-focus:text-white/90 sm:text-2xl lg:text-3xl">
                        {post.title}
                      </h3>
                      <p className="line-clamp-2 text-sm text-white/80 sm:text-base">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
