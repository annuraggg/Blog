import Quill from "quill";
import { useEffect, useState } from "react";
import "quill/dist/quill.core.css";
import { Delta } from "quill/core";
import { WithContext as ReactTags } from "react-tag-input";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { toast } from "sonner";
import { fb } from "./firebaseConfig";

const Editor = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [wordCount, setWordCount] = useState(0);
  const [content, setContent] = useState<Delta>({} as Delta);

  const [isNew, setIsNew] = useState(true);

  const auth = getAuth(fb);
  const fs = getFirestore(fb);

  auth.onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = "/auth";
    }
  });

  useEffect(() => {
    const quill = new Quill("#editor", {
      theme: "snow",
      placeholder: "Write your post here...",
      modules: {
        toolbar: [
          [{ header: 1 }, { header: 2 }, { header: 3 }], // custom button values
          ["bold", "italic", "underline", "strike"], // toggled buttons
          ["code-block"],
          ["link", "image"],

          [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
          ["clean"],
        ],
      },
    });

    quill.on("text-change", function () {
      setContent(quill.getContents());
      setWordCount(quill.getText().split(" ").length);
    });

    const slug = window.location.pathname.split("/").pop();
    if (slug !== "editor" && slug !== undefined) {
      setIsNew(false);
      const getPost = async () => {
        const docRef = doc(fs, "posts", slug);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title);
          setTags(data.tags);
          setContent(JSON.parse(data.content));
          quill.setContents(JSON.parse(data.content));
        } else {
          toast.error("Post not found");
        }
      };

      try {
        getPost();
      } catch (error) {
        toast.error("Failed to fetch post");
      }
    }
  }, [fs]);

  const publish = async () => {
    const dashedSlug = title.toLowerCase().replace(/\s/g, "-");
    const slug = dashedSlug.replace(/[^a-zA-Z0-9-]/g, "");

    const estimatedReadingTime = wordCount / 200;
    const plainContent = JSON.stringify(content);
    const date = new Date();
    const options = { month: "long", day: "numeric", year: "numeric" }; // @ts-expect-error - NO Error
    const publishDate = date.toLocaleDateString("en-US", options);

    try {
      await setDoc(doc(fs, "posts", slug), {
        title,
        slug,
        tags,
        content: plainContent,
        estimatedReadingTime,
        publishDate,
      });

      toast.success("Post published successfully");
      setTimeout(() => {
        window.location.href = `/post/${slug}`;
      }, 1000);
    } catch (error) {
      toast.error("Failed to publish post");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-28 pb-10">
      <h2 className="text-xl">{isNew ? "New Post" : "Edit Post"}</h2>
      <button
        className="bg-transparent underline text-white rounded-md p-2 mb-5"
        onClick={publish}
      >
        Publish
      </button>

      <div className="w-[50%] flex items-center justify-center text-md">
        {/* @ts-expect-error - NO Error */}
        <ReactTags
          tags={tags}
          handleAddition={(tag: string) => setTags([...tags, tag])}
          handleDelete={(i: number) =>
            setTags(tags.filter((_tag, index) => index !== i))
          }
        />
      </div>

      <textarea
        wrap="soft"
        placeholder="Title"
        className="border-gray-500 rounded-md w-[50%] mt-5 text-6xl bg-transparent text-center mb-5 text-wrap"
        rows={2}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="border border-gray-900 rounded-md p-5 w-[50%] h-full overflow-auto">
        <div className="w-full text-center" id="editor"></div>
      </div>
    </div>
  );
};

export default Editor;
