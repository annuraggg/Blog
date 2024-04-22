import { collection, getDocs, getFirestore } from "firebase/firestore";
import { fb } from "../../firebaseConfig";
import { useEffect, useState } from "react";

interface Tag {
  id: string;
  text: string;
}

interface Post {
  id: string;
  slug: string;
  title: string;
  tags: Tag[];
  publishDate: string;
}

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      const fs = getFirestore(fb);
      const postsSnapshot = await getDocs(collection(fs, "posts"));
      if (postsSnapshot.empty) return;

      // @ts-expect-error Property 'docs' does not exist on type 'QuerySnapshot<DocumentData>'.
      const postsData: Post[] = postsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPosts(postsData);
    };

    getPosts();
  }, []);

  return (
    <div className="pt-28 flex flex-col items-center">
      <h1 className="text-5xl mb-5">Home</h1>

      {posts.map((post) => (
        <div
          className="border p-5 px-10 rounded-lg w-[50%] border-gray-500 cursor-pointer hover:scale-[1.01] transition-all duration-200"
          key={post.id}
          onClick={() => window.location.assign(`/post/${post.slug}`)}
        >
          <div className="flex items-center justify-between">
            <div>
              <p>
                {post.title.length > 50
                  ? post.title.slice(0, 50) + "..."
                  : post.title}
                <span className="text-gray-500"> - Anurag Sawant</span>
              </p>
              <div className="flex mt-2 gap-2">
                {post.tags.map((tag: { id: string; text: string }) => (
                  <div
                    className="rounded-full text-xs opacity-50 underline underline-offset-2"
                    key={tag.id}
                  >
                    {tag.text}
                  </div>
                ))}
              </div>
            </div>

            <div>{post.publishDate}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
