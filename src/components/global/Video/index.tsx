import React, {CSSProperties, ReactNode, VideoHTMLAttributes} from 'react';
import clsx from 'clsx';
import {useBaseUrlUtils} from '@docusaurus/useBaseUrl';
import {asBool, parseSource, toCssLength} from './utils';
import styles from './styles.module.css';

type Position = 'start' | 'center' | 'end';

const positionMap: Record<Position, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
};

type NativeVideoProps = Omit<
  VideoHTMLAttributes<HTMLVideoElement>,
  | 'src'
  | 'title'
  | 'width'
  | 'height'
  | 'poster'
  | 'controls'
  | 'autoPlay'
  | 'loop'
  | 'muted'
  | 'playsInline'
  | 'preload'
  | 'className'
  | 'style'
>;

interface VideoProps extends NativeVideoProps {
  /** A path under /static (e.g. `/video/foo.mp4`) or a YouTube/Vimeo URL. */
  src: string;
  /** Accessible name. Required: an iframe has none otherwise. */
  title: string;
  caption?: ReactNode;
  maxWidth?: string | number;
  position?: Position;
  /** `'16 / 9'`, `'1492 / 958'`, or `'auto'` to opt out. */
  aspectRatio?: string;
  poster?: string;
  /** A .vtt file, local sources only. */
  captions?: string;
  captionsLang?: string;
  controls?: boolean | string;
  autoPlay?: boolean | string;
  /** Alias: React drops raw lowercase DOM props, so authors need this to work. */
  autoplay?: boolean | string;
  loop?: boolean | string;
  muted?: boolean | string;
  playsInline?: boolean | string;
  /** Alias, as above. */
  playsinline?: boolean | string;
  preload?: 'none' | 'metadata' | 'auto';
  cornerRadius?: boolean | string;
  className?: string;
  style?: CSSProperties;
}

function Video({
  src,
  title,
  caption,
  maxWidth = 720,
  position = 'center',
  aspectRatio = '16 / 9',
  poster,
  captions,
  captionsLang = 'en',
  controls,
  autoPlay,
  autoplay,
  loop,
  muted,
  playsInline,
  playsinline,
  preload,
  cornerRadius,
  className,
  style,
  ...rest
}: VideoProps): JSX.Element {
  const {withBaseUrl} = useBaseUrlUtils();
  const parsed = parseSource(src);

  const shouldAutoPlay = asBool(autoPlay ?? autoplay, false);
  const isAuto = aspectRatio === 'auto';
  const mediaClassName = clsx(
    styles.frame,
    asBool(cornerRadius, false) && styles.cornerRadius,
    className,
  );

  let media: ReactNode;

  if (parsed.kind === 'embed') {
    // No `...rest` here: video-only props such as poster or preload are not
    // valid iframe attributes and React would warn about every one of them.
    media = (
      <iframe
        className={clsx(mediaClassName, styles.embed)}
        style={{aspectRatio: isAuto ? 'auto' : aspectRatio, ...style}}
        src={parsed.src}
        title={title}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  } else if (parsed.kind === 'file') {
    media = (
      <video
        className={clsx(mediaClassName, styles.video)}
        style={{aspectRatio: isAuto ? 'auto' : `auto ${aspectRatio}`, ...style}}
        // Not `title`: that renders a hover tooltip, which is just noise.
        aria-label={title}
        poster={poster ? withBaseUrl(poster) : undefined}
        controls={asBool(controls, true)}
        preload={preload ?? (poster ? 'none' : 'metadata')}
        autoPlay={shouldAutoPlay}
        loop={asBool(loop, false)}
        // Browsers block autoplay unless the video is muted.
        muted={asBool(muted, shouldAutoPlay)}
        playsInline={asBool(playsInline ?? playsinline, true)}
        {...rest}
      >
        <source src={withBaseUrl(parsed.src)} type={parsed.type} />
        {captions && (
          <track
            kind="captions"
            src={withBaseUrl(captions)}
            srcLang={captionsLang}
            label="Captions"
            default
          />
        )}
        <a href={withBaseUrl(parsed.src)}>Download the video</a>
      </video>
    );
  } else {
    // Never throw: an exception during the static build aborts it entirely and
    // fails CI with an opaque stack trace. Warn loudly and render something the
    // author cannot miss in review instead.
    console.warn(`[Video] Unrecognised src, rendering a fallback link: ${src}`);
    media = (
      <a className={styles.fallback} href={src}>
        {title || src}
      </a>
    );
  }

  return (
    <div
      className={styles.root}
      style={{justifyContent: positionMap[position] ?? positionMap.center}}
    >
      <figure className={styles.figure} style={{maxWidth: toCssLength(maxWidth)}}>
        {media}
        {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
      </figure>
    </div>
  );
}

export default Video;
