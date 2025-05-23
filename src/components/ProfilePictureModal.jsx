import { useNavigate } from "react-router";
import styles from "./ModifyaccountModal.module.css";
import { motion } from "framer-motion";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";
import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import { updateUserPosts } from "../helpers/updateUserPosts";
import toast from "react-hot-toast";

const BASE_URL = "https://658c7c29859b3491d3f6257e.mockapi.io";
const PICTURE_API_URL =
  "https://api.imgbb.com/1/upload?key=1f8988d2d3af8f2806d4d77a1325ec15";

function ProfilePictureModal() {
  const { user, setUser } = useUser();

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [imageError, setImageError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const { div: MotionDiv } = motion;

  useEffect(() => {
    if (!file) return;
    console.log("bbbb");
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  function uploadPhoto(e) {
    setImageError("");
    const selected = e.target.files[0];

    if (!selected.type.startsWith("image/")) {
      setImageError("Datoteka mora biti slika.");
      setPreviewUrl("");
      return;
    }

    if (file?.size > 5 * 1024 * 1024) {
      setImageError("Datoteka ne smije biti veća od 5MB");
      setPreviewUrl("");
      return;
    }

    setFile(selected);
  }

  async function handleUpload(e) {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch(PICTURE_API_URL, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Something went wrong");
      const data = await res.json();
      console.log(data.data.image.url);
      setUser({ ...user, pictureUrl: data.data.image.url });
      await fetch(BASE_URL + `/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pictureUrl: data.data.image.url }),
      });
      await updateUserPosts({
        userId: user.id,
        newProfilePicture: data.data.image.url,
      });
      navigate("/homepage");
      toast.success("Profile picture changed");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles.backdrop} onClick={() => navigate("/homepage")}>
      <MotionDiv
        className={styles.modal}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleUpload}>
          <input
            type="file"
            accept="image/*"
            style={{ backgroundColor: "#4a90e2" }}
            onChange={uploadPhoto}
          />
          <p className={styles.error}>
            {imageError ? imageError : "\u00A0" /* &nbsp; fallback */}
          </p>
          {previewUrl && (
            <img
              className={styles.previewImg}
              src={previewUrl}
              alt="Preview image"
            />
          )}
          <Button isDisabled={isSubmitting}>Prenesi</Button>
        </form>
        <button
          className={styles.closeBtn}
          onClick={() => navigate("/homepage")}
        >
          <FontAwesomeIcon className={styles.closeBtnIcon} icon={faXmark} />
        </button>
      </MotionDiv>
    </div>
  );
}

export default ProfilePictureModal;
