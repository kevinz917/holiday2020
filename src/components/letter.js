import React, { useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

import "../styles/color.css";
import "../styles/layout.css";
import "../styles/typography.css";
import "../styles/animation.css";
import styles from "./letter.module.css";

import PaperCard from "../components/papercard";
import ReactAudioPlayer from "react-audio-player";
import BlurredObject from "../assets/blurredObject.png";
import { createCard } from "../util/api";
import { sendAmplitudeData } from "../util/amplitude";
import CanvasDraw from "react-canvas-draw";
import canvas_styles from "../pages/write.module.css";

const Letter = ({ letterContent, sent = 0, setIsPreview = null }) => {
  let history = useHistory();
  const drawing_ref = useRef(null);
  const sendLetter = async (e) => {
    let createdCard = await createCard(
      letterContent.author,
      letterContent.recipient,
      letterContent.email,
      letterContent.message,
      letterContent.audioFile,
      letterContent.sticker,
      letterContent.drawing,
      letterContent.netId
    );

    if (JSON.parse(localStorage.getItem("sent")) === 0) {
      sendAmplitudeData("Unlocked");
    }
    localStorage.setItem("sent", 1);
    sendAmplitudeData("Sent letter");
    history.push("/done");
  };
  useEffect(() => {
    if (drawing_ref && drawing_ref.current && letterContent.drawing) {
      drawing_ref.current.loadSaveData(letterContent.drawing);
    }
  }, [letterContent]);

  const randNum = (a, b) => {
    return Math.random() * (b - a) + a;
  };
  if (!letterContent) return <div />;
  return (
    <PaperCard>
      {setIsPreview && (
        <React.Fragment>
          <div className="link">
            <span
              className="navigation body"
              onClick={() => {
                setIsPreview(false);
              }}
            >
              ← Back
            </span>
          </div>
          <hr />
          <br />
        </React.Fragment>
      )}
      <div className="body textMain">
        Dear {letterContent.recipient.split(" ")[0]},
      </div>
      <br />
      {sent === 1 || setIsPreview ? (
        <>
          <div className="body textMain">{letterContent.message}</div>
          {letterContent.drawing &&
            JSON.parse(letterContent.drawing).lines.length > 0 && (
              <CanvasDraw
                ref={drawing_ref}
                lazyRadius={0}
                brushRadius={5}
                hideGrid={true}
                canvasWidth={"100%"}
                canvasHeight={200}
                className={canvas_styles.canvas}
                disabled={true}
              />
            )}
        </>
      ) : (
        <img src={BlurredObject} alt="blurred" style={{ width: "100%" }} />
      )}
      {letterContent.audioUrl ? (
        <React.Fragment>
          <br />
          {sent === 1 || setIsPreview ? (
            <ReactAudioPlayer src={letterContent.audioUrl} controls />
          ) : (
            <div className="body textMain blurred">[ Hidden for now ]</div>
          )}
          <br />
        </React.Fragment>
      ) : null}

      <br />
      <div className="body textMain" style={{ textAlign: "right" }}>
        Sincerely, <br />{" "}
        {letterContent.author ? letterContent.author : "Anonymous :)"}
      </div>
      <br />
      {letterContent.sticker && (
        <div style={{ display: "flex" }}>
          {letterContent.sticker.map((sticker) => (
            <span style={{ margin: "auto" }} key={sticker}>
              <img
                src={sticker}
                alt="sticker"
                width={100}
                className={styles.placedSticker}
                style={{ transform: `rotate(${randNum(-5, 5)}deg)` }}
              />
            </span>
          ))}
        </div>
      )}

      {setIsPreview ? (
        <button className="buttonMain buttonPrimary" onClick={sendLetter}>
          <div>Send letter →</div>
        </button>
      ) : (
        <Link to="/" className="link">
          {sent !== 1 ? (
            <div>You must send a letter to unlock. Pay it forward!</div>
          ) : null}
          <button className="buttonMain buttonPrimary">
            {sent === 1 ? "Send letter to friend" : "Send a letter to unlock →"}
          </button>
        </Link>
      )}
    </PaperCard>
  );
};

export default Letter;
