"use client";

import { formatSeconds } from "@/lib/utilities/temporal";
import { getFileExtensionFromUrl } from "@/lib/utilities/url";
import { Button, Input } from "@headlessui/react";
import { PauseIcon, PlayIcon, SlashIcon } from "@radix-ui/react-icons";
import { ChangeEvent, useEffect, useId, useRef, useState } from "react";

interface Props {
    src: string;
    description: string;
}

export default function Audio({ src, description }: Props) {
    const id = useId();
    const fileType = getFileExtensionFromUrl(src);
    const playerRef = useRef<HTMLAudioElement>(null);

    // React state
    const [isPlaying, setIsPlaying] = useState(false);
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
            <audio
                id={`audio-${id}`}
                ref={playerRef}
                preload="metadata"
                onTimeUpdate={(event) => setCurrentSeconds(event.currentTarget.currentTime)}
                onDurationChange={(event) => setDurationSeconds(event.currentTarget.duration)}
                onLoadedMetadata={(event) => setDurationSeconds(event.currentTarget.duration)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                aria-label={description}
            >
                {fileType === "mp3" ? <source src={src} type="audio/mpeg" /> : null}
                {fileType === "ogg" ? <source src={src} type="audio/ogg" /> : null}
                {fileType === "wav" ? <source src={src} type="audio/wav" /> : null}
            </audio>
            <div className="w-full flex flex-nowrap items-center border-neutral-800 border p-4 gap-4 rounded">
                <Button
                    onClick={togglePlay}
                    aria-label={isPlaying ? "Pause" : "Play"}
                    aria-controls={`audio-${id}`}
                    className="cursor-pointer size-8 grid place-items-center border-neutral-800 hover:border-white hover:text-white border rounded"
                >
                    {isPlaying ? <PauseIcon aria-hidden="true" /> : <PlayIcon aria-hidden="true" />}
                </Button>
                <label className="grow grid place-items-center h-full m-0!">
                    <span className="sr-only">Timeline</span>
                    <Input
                        type="range"
                        min={0}
                        max={durationSeconds}
                        value={currentSeconds}
                        onChange={handlePositionChange}
                        aria-controls={`audio-${id}`}
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
            </div>
            <figcaption className="font-code text-sm text-neutral-400 mt-2">
                {description}
            </figcaption>
        </figure>
    );
}
