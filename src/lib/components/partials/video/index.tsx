"use client";

import { formatSeconds } from "@/lib/utilities/temporal";
import { getFileExtensionFromUrl } from "@/lib/utilities/url";
import { Button, Input } from "@headlessui/react";
import {
    PauseIcon,
    PlayIcon,
    SlashIcon,
    SpeakerLoudIcon,
    SpeakerOffIcon,
} from "@radix-ui/react-icons";
import { ChangeEvent, useEffect, useId, useRef, useState } from "react";

interface Props {
    src: string;
    description: string;
}

export default function Video({ src, description }: Props) {
    const id = useId();
    const fileType = getFileExtensionFromUrl(src);
    const playerRef = useRef<HTMLVideoElement>(null);

    // React state
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [durationSeconds, setDurationSeconds] = useState(0);
    const [currentSeconds, setCurrentSeconds] = useState(0);

    // When pressing the play button
    function togglePlay() {
        if (isPlaying) {
            playerRef.current?.pause();
        } else {
            playerRef.current?.play();
        }
        setIsPlaying(!isPlaying);
    }

    // When clicking or dragging the timeline
    function handlePositionChange(event: ChangeEvent<HTMLInputElement>) {
        if (playerRef.current) {
            playerRef.current.currentTime = parseFloat(event.target.value);
        }
    }

    // Update duration on mount (for when metadata is cached)
    useEffect(() => {
        if (playerRef.current && playerRef.current.readyState >= 1) {
            setDurationSeconds(playerRef.current.duration);
        }
    }, []);

    return (
        <figure className="py-8">
            <figcaption className="font-code text-sm text-neutral-400 mb-2">
                {description}
            </figcaption>
            <video
                id={`video-${id}`}
                ref={playerRef}
                onTimeUpdate={(event) => setCurrentSeconds(event.currentTarget.currentTime)}
                onDurationChange={(event) => setDurationSeconds(event.currentTarget.duration)}
                onLoadedMetadata={(event) => setDurationSeconds(event.currentTarget.duration)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                muted={isMuted}
                aria-label={description}
                onClick={togglePlay}
                onKeyDown={(event) => {
                    if (event.code === "Space") {
                        event.preventDefault();
                        togglePlay();
                    }
                }}
                className="cursor-pointer rounded size-full bg-neutral-800 border-neutral-800 border bg-stripes mb-4"
            >
                {fileType === "mp4" ? <source src={src} type="video/mp4" /> : null}
                {fileType === "webp" ? <source src={src} type="video/webp" /> : null}
                Your browser does not support the video tag.
            </video>
            <div
                role="toolbar"
                aria-label="Player controls"
                aria-orientation="horizontal"
                className="w-full flex flex-nowrap items-center gap-4"
            >
                <Button
                    onClick={togglePlay}
                    aria-label={isPlaying ? "Pause" : "Play"}
                    aria-controls={`video-${id}`}
                    className="cursor-pointer size-8 grid place-items-center border-neutral-800 hover:border-white hover:text-white border rounded"
                >
                    {isPlaying ? <PauseIcon aria-hidden="true" /> : <PlayIcon aria-hidden="true" />}
                </Button>
                <label className="grow grid place-items-center m-0!">
                    <span className="sr-only">Timeline</span>
                    <Input
                        type="range"
                        min={0}
                        max={durationSeconds}
                        value={currentSeconds}
                        onChange={handlePositionChange}
                        aria-controls={`video-${id}`}
                        aria-label="Timeline"
                        aria-valuemin={0}
                        aria-valuemax={durationSeconds}
                        aria-valuenow={currentSeconds}
                        aria-valuetext={`${formatSeconds(currentSeconds)} of ${formatSeconds(durationSeconds)}`}
                        className="size-full"
                    />
                </label>
                <output
                    aria-live="polite"
                    aria-atomic="true"
                    className="font-code text-xs flex flex-nowrap items-center m-0! h-8 px-3 border-neutral-800 border rounded-full"
                >
                    <time dateTime={`PT${currentSeconds}S`}>{formatSeconds(currentSeconds)}</time>
                    <SlashIcon aria-hidden="true" />
                    <time dateTime={`PT${durationSeconds}S`}>{formatSeconds(durationSeconds)}</time>
                </output>
                <Button
                    onClick={() => setIsMuted(!isMuted)}
                    aria-label={isMuted ? "Unmute" : "Mute"}
                    aria-controls={`video-${id}`}
                    className="cursor-pointer size-8 grid place-items-center border-neutral-800 hover:border-white hover:text-white border rounded"
                >
                    {isMuted ? (
                        <SpeakerOffIcon aria-hidden="true" />
                    ) : (
                        <SpeakerLoudIcon aria-hidden="true" />
                    )}
                </Button>
            </div>
        </figure>
    );
}
