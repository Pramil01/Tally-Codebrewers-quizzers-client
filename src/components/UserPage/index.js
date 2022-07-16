import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import NotWithinTime from "./NotWithinTime";
import WithinTime from "./WithinTime";
import api from "../../service/api";

const UserPage = () => {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [withinTime, setWithinTime] = useState(true);
  useEffect(() => {
    if (!searchParams.get("id")) return;
    api
      .get("ques/", {
        headers: {
          qId: searchParams.get("id"),
        },
      })
      .then((res) => {
        setData(res.data.questions);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchParams]);

  const formatDate = (value) => {
    let yyyy = parseInt(value.substring(0, 4));
    let mm = parseInt(value.substring(5, 7));
    let dd = parseInt(value.substring(8, 10));
    let HH = parseInt(value.substring(11, 13));
    let MM = parseInt(value.substring(14, 16));
    return { yyyy, mm, dd, HH, MM };
  };
  const checkValues = (start, curr, end) => {
    return start < curr && curr < end
      ? "passed"
      : start === curr || end === curr
      ? "checkNext"
      : "failed";
  };
  useEffect(() => {
    if (data.length === 0) return;
    let today = new Date();
    let yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    let HH = today.getHours();
    let MM = today.getMinutes();
    let start = formatDate(data[0].startTime);
    let end = formatDate(data[0].endTime);
    if (checkValues(start.yyyy, yyyy, end.yyyy) === "failed")
      setWithinTime(false);
    else if (checkValues(start.yyyy, yyyy, end.yyyy) === "passed")
      setWithinTime(true);
    else {
      if (checkValues(start.mm, mm, end.mm) === "failed") setWithinTime(false);
      else if (checkValues(start.mm, mm, end.mm) === "passed")
        setWithinTime(true);
      else {
        if (checkValues(start.dd, dd, end.dd) === "failed")
          setWithinTime(false);
        else if (checkValues(start.dd, dd, end.dd) === "passed")
          setWithinTime(true);
        else {
          if (checkValues(start.HH, HH, end.HH) === "failed")
            setWithinTime(false);
          else if (checkValues(start.HH, HH, end.HH) === "passed")
            setWithinTime(true);
          else {
            if (checkValues(start.MM, MM, end.MM) === "failed")
              setWithinTime(false);
            else if (checkValues(start.MM, MM, end.MM) === "passed")
              setWithinTime(true);
            else {
              if (start.MM === MM) setWithinTime(true);
              else setWithinTime(false);
            }
          }
        }
      }
    }
  }, [data]);

  return (
    <div>
      {data.length !== 0 && !withinTime && (
        <NotWithinTime
          startTime={data.length === 0 ? "" : data[0].startTime}
          endTime={data.length === 0 ? "" : data[0].endTime}
        />
      )}
      {data.length !== 0 && withinTime && <WithinTime data={data} />}
    </div>
  );
};

export default UserPage;
