import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/learning.css";

export default function Learning() {
  const [learning, setLearning] = useState("");
  const [bab, setBab] = useState(0);
  const [materi, setMateri] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const API_URL = "https://staging.komunitasmea.com/api";
  useEffect(() => {
    axios
      .get(
        API_URL +
          `/course?course_id=${location.state.course_id}&user_id=${location.state.user_id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "x-www-form-url-encoded",
          },
        }
      )
      .then((response) => {
        console.log(response.data.data);
        setLearning(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [location.state]);

  const nextLesson = () => {
    if (learning && bab < learning.chapters.length) {
      if (learning && materi < learning.chapters[bab].lessons.length - 1) {
        setMateri(materi + 1);
      } else if (
        learning &&
        materi === learning.chapters[bab].lessons.length - 1
      ) {
        setMateri(0);
        setBab(bab + 1);
      }
    }
  };

  const prevLesson = () => {
    if (materi !== 0) {
      setMateri(materi - 1);
    } else {
      setBab(bab - 1);
      setMateri(learning.chapters[bab - 1].lessons.length - 1);
    }
  };

  const backHome = () => {
    navigate(`/user/${location.state.user_id}/courses/active`, {
      state: {
        user_id: location.state.user_id,
      },
    });
  }

  return (
    <div className="learning">
      <div className="title">
        <h1>Modul {learning && learning.title}</h1>
        <br />
        <h3>
          Bab {bab + 1} - {learning.chapters && learning.chapters[bab].title}
        </h3>
        <h3>
          Materi {materi + 1} :{" "}
          {learning.chapters && learning.chapters[bab].lessons[materi].title}
        </h3>
      </div>
      <div className="video">
        <iframe
          className="responsive-iframe"
          src={learning.chapters && learning.chapters[bab].lessons[materi].link}
          title="learning-video"
        ></iframe>
      </div>
      <div className="actions">
        <button
          disabled={bab === 0 && materi === 0}
          onClick={() => prevLesson()}
        >
          Previous
        </button>
        <button
          disabled={
            bab === (learning.chapters && learning.chapters.length - 1) &&
            materi ===
              (learning.chapters && learning.chapters[bab].lessons.length - 1)
          }
          onClick={() => nextLesson()}
        >
          Next
        </button>
      </div>
      <button onClick={() => backHome()}>Home</button>
    </div>
  );
}
