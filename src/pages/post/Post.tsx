import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Quill, { Delta } from "quill/core";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { fb } from "../../firebaseConfig";

interface Tag {
  id: string;
  text: string;
}

const auth = getAuth(fb);

const Post = () => {
  const [title, setTitle] = useState("");
  const [estimatedReadingTime, setEstimatedReadingTime] = useState(0);
  const [content, setContent] = useState<Delta>({} as Delta);
  const [date, setDate] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    const getPost = async () => {
      const slug = window.location.pathname.split("/").pop()!;
      const fs = getFirestore();

      const docRef = doc(fs, "posts", slug);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setTitle(data.title);
        setTags(data.tags);
        setEstimatedReadingTime(data.estimatedReadingTime);
        setContent(JSON.parse(data.content));
        setDate(data.publishDate);
      } else {
        toast.error("Post not found");
      }
    };

    try {
      getPost();
    } catch (error) {
      toast.error("Failed to fetch post");
    }
  }, []);

  useEffect(() => {
    const quill = new Quill("#editor", {
      theme: "snow",
      readOnly: true,
      modules: {
        toolbar: false,
      },
    });

    quill.setContents(content);
  }, [content]);

  const getEstimatedLogic = () => {
    if (estimatedReadingTime < 1) {
      return "< 1 min read";
    } else {
      return `${Math.round(estimatedReadingTime)} min read`;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-28">
      <div className="w-[50%] text-center">
        <div className="my-20">
          <div className="flex gap-3 items-center justify-center">
            {tags.map((tag: { id: string; text: string }) => (
              <div
                key={tag.id}
                className="rounded-full p-1 opacity-50 underline underline-offset-2"
              >
                {tag.text}
              </div>
            ))}
          </div>
          <h1 className=" text-6xl">{title}</h1>

          <div className="flex gap-3 justify-center items-center mt-3">
            <p className="text-xs opacity-70">{date}</p>
            <div className="rounded-full opacity-70 bg-[#e3dedb] w-1 h-1"></div>
            <p className="text-xs opacity-70">{getEstimatedLogic()}</p>
          </div>

          {auth.currentUser && (
            <a
              href={`/editor/${window.location.pathname.split("/").pop()!}`}
              className="text-xs underline"
            >
              Edit This
            </a>
          )}
        </div>

        <div className="leading-7 text-lg" id="editor"></div>
      </div>
    </div>
  );
};

export default Post;
