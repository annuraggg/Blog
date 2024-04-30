import { collection, getDocs, getFirestore } from "firebase/firestore";
import { fb } from "../../firebaseConfig";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";

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
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

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
      setFilteredPosts(postsData);
      setLoading(false);
    };

    getPosts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const searchPosts = (query: string) => {
    if (posts.length === 0) return;
    if (query === "") {
      setFilteredPosts(posts);
      return;
    }

    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredPosts(filtered);
  };

  return (
    <div className="pt-28 flex flex-col items-center">
      <h1 className="text-5xl mb-5">Home</h1>

      <div>
        <input
          type="text"
          placeholder="Search Posts"
          className="bg-transparent border border-gray-400 py-2 px-3 w-80 rounded"
          onChange={(e) => searchPosts(e.target.value)}
        />
      </div>

      <div className="w-full flex flex-col items-center px-5 md:px-0">
        {filteredPosts.map((post) => (
          <div
            className="mt-4 border p-5 rounded-lg px-5 w-[100%] md:w-[50%] md:px-10 border-gray-500 cursor-pointer hover:scale-[1.01] transition-all duration-200"
            key={post.id}
            onClick={() => window.location.assign(`/post/${post.slug}`)}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between text-xs md:text-sm">
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

              <div className="md:mt-0 mt-5">{post.publishDate}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
