import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import global from "../../global/index.module.css";
import typography from "../../global/typography.module.css";
import styles from "./index.module.css";
import ContainerWrap from "@/components/container";

/**
 * Props for `VideoEmbed`.
 */
export type VideoEmbedProps = SliceComponentProps<Content.VideoEmbedSlice>;

/**
 * Component for "VideoEmbed" Slices.
 */
const VideoEmbed = ({ slice }: VideoEmbedProps): JSX.Element => {
  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={global.section__dark + ' ' + styles.videoembed}
    >
      <ContainerWrap>
        <div className="video-embed__content">
          <h2 className={typography.h2}>{slice.primary.title}</h2>
        </div>
        <iframe
          className={styles.videoEmbed__iframe}
          height={opts.height}
          width={opts.width}
          src={`https://www.youtube.com/embed/${slice.primary.youtube_id}`}
          title=""
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </ContainerWrap>
    </section>
  );
};

export default VideoEmbed;
