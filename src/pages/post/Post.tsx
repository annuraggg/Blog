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

  const getRandomName = () => {
    const adjectives = [
      "Dynamic",
      "Radiant",
      "Inspired",
      "Vibrant",
      "Curious",
      "Innovative",
      "Passionate",
      "Creative",
      "Adventurous",
      "Empowered",
      "Joyful",
      "Enthusiastic",
      "Resilient",
      "Fearless",
      "Determined",
      "Ambitious",
      "Tenacious",
      "Optimistic",
      "Energetic",
      "Playful",
      "Confident",
      "Courageous",
      "Resourceful",
      "Spirited",
      "Expressive",
      "Imaginative",
      "Driven",
      "Focused",
      "Lively",
      "Charismatic",
      "Bold",
      "Invincible",
      "Exuberant",
      "Jubilant",
      "Limitless",
      "Unstoppable",
      "Unbreakable",
      "Unshakable",
      "Unyielding",
      "Unwavering",
      "Unconquerable",
      "Unflappable",
      "Unassailable",
      "Unbending",
      "Unfettered",
      "Unstinting",
      "Badass",
      "Wicked",
      "Radical",
      "Boss",
      "Legend",
      "Maverick",
      "Savage",
      "Rockstar",
      "Ninja",
      "Chill",
      "Epic",
      "Lit",
      "Awesome",
      "Dope",
      "Swag",
      "Fabulous",
      "Fierce",
      "Boss",
      "Guru",
      "Genius",
      "Whiz",
      "Wizard",
      "Maestro",
      "Sultan",
      "Hotshot",
      "Prodigy",
      "Ace",
      "Mastermind",
      "Legend",
      "Superstar",
      "Champion",
      "Warrior",
      "Rocker",
      "Pioneer",
      "Trendsetter",
      "Influencer",
      "Hipster",
      "Trailblazer",
      "Rebel",
      "Hero",
      "Daredevil",
      "Firecracker",
      "Wunderkind",
      "Troublemaker",
      "Trailblazer",
      "Dynamo",
      "Phenom",
      "Enigma",
      "Game-changer",
      "Whizkid",
      "Brainiac",
      "Prodigy",
      "Einstein",
      "Visionary",
    ];

    return adjectives[Math.floor(Math.random() * adjectives.length)];
  };

  return (
    <div className="flex flex-col items-center justify-center pt-28 pb-20">
      <div className="px-5 md:w-[50%] md:p-0 text-center">
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

      <p className="text-xs opacity-50 mt-10">
        &copy; {new Date().getFullYear()} Made with ❤️ by Anurag "
        {getRandomName()}" Sawant
      </p>
    </div>
  );
};

export default Post;
