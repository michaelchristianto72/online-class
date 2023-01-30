import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/course.css";

export default function Course() {
  const [courses, setCourses] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const API_URL = "https://staging.komunitasmea.com/api";

  useEffect(() => {
    axios
      .get(API_URL + `/user/${location.state.user_id}/courses/active`, {
        withCredentials: true,
        headers: {
          "Content-Type": "x-www-form-url-encoded",
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setCourses(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [location.state]);

  const selectCourse = (course_id) => {
    navigate(
      `/course?course_id=${course_id}&user_id=${location.state.user_id}`,
      {
        state: {
          user_id: location.state.user_id,
          course_id: course_id,
        },
      }
    );
  };
  
  return (
    <div className="container">
      <h1>Kelas ({courses.length})</h1>
      <div className="courses">
        {courses &&
          courses.map((data, key) => {
            return (
              <div id={key} className="course">
                <img className="course-book" src={data.image} alt="course" />
                <div className="description">
                  <h2>{data.title}</h2>
                  {data.instructors &&
                    data.instructors.map((instructor, key) => {
                      return (
                        <div id={key} className="instructor">
                          <img
                            className="avatar"
                            src={instructor.photo}
                            alt="instructor"
                          />
                          <p>{instructor.name}</p>
                        </div>
                      );
                    })}
                  <button
                    className="button"
                    onClick={() => selectCourse(data.course_id)}
                  >
                    Lanjut
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
