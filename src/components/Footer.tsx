import { useEffect, useState } from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import { toast } from "sonner";

const SubscribeForm = ({
  status,
  message,
  onValidated,
}: {
  status: string;
  message: string | Error;
  onValidated: (formData: { EMAIL: string }) => void;
}) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regex.test(email)) {
      return toast.error("Invalid email");
    }

    email &&
      email.indexOf("@") > -1 &&
      onValidated({
        EMAIL: email,
      });
  };

  useEffect(() => {
    generateToast(status, message);
  }, [status, message]);

  const generateToast = (status: string, message: string | Error) => {
    if (status === "error") {
      console.error(message);
      toast.error("Error! 😢");
    } else if (status === "success") {
      console.log(message);
      toast.success("Subscribed! 🎉");
      setEmail("");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center gap-3">
        <input
          type="email"
          placeholder="Your email address"
          className="border-2 border-gray-800 bg-transparent px-5 py-3 rounded"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <button
          className="bg-none underline text-gray-400"
          onClick={handleSubmit}
        >
          Subscribe
        </button>
      </div>
    </>
  );
};

const Footer = () => {
  const postUrl = import.meta.env.VITE_SIGNUP_FORM_URL as string;

  return (
    <div className="flex items-center justify-center gap-10 h-[200px] border-t border-t-gray-800 bg-[#111414]">
      <div>
        <h2 className="text-lg">Like what I do?</h2>
        <p className="text-xs text-gray-400">Subscribe? :)</p>
      </div>
      <MailchimpSubscribe
        url={postUrl}
        render={({ subscribe, status, message }) => (
          <div>
            <SubscribeForm
              status={status!}
              message={message!}
              onValidated={(formData) => subscribe(formData)}
            />
          </div>
        )}
      />
    </div>
  );
};

export default Footer;
